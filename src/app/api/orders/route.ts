import { authenticate } from "@/app/api/authenticate"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { v4 as uuid } from "uuid"

const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
})

export async function GET(request: NextRequest) {
  return authenticate(request, async () => {
    try {
      let page = Number(request.nextUrl.searchParams.get("page"))
      let limit = Number(request.nextUrl.searchParams.get("limit"))

      if (page <= 0) page = 1
      if (limit <= 0) limit = 10
      
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const ordersRef = firestore.collection("orders")
      const addressesRef = firestore.collection("addresses")
      const productsRef = firestore.collection("products")

      const ordersPromise = ordersRef
        .where("userId", "==", userId)
        .where("status", "!=", "Initiated")
        .orderBy("timestamps.placed", "desc")
        .offset((page - 1) * limit)
        .limit(limit)
        .get()
      
      const countPromise = ordersRef
        .where("userId", "==", userId)
        .get()
        .then(snapshot => snapshot.size)

      const [totalOrders, ordersSnapshot] = await Promise.all([
        countPromise,
        ordersPromise
      ])

      const totalPages = Math.ceil(totalOrders/limit)

      const orders: Array<Order> = []
      const addressIds = new Set<string>()
      const productIds = new Set<string>()

      ordersSnapshot.forEach(orderDoc => {
        const orderData = orderDoc.data()
        const order: Order = {
          id: orderDoc.id,
          ...orderData,
          timestamps: {
            initiated: orderData.timestamps.initiated?.toDate(),
            placed: orderData.timestamps.placed?.toDate(),
            accepted: orderData.timestamps.accepted?.toDate(),
            prepared: orderData.timestamps.prepared?.toDate(),
            completed: orderData.timestamps.completed?.toDate(),
            cancelled: orderData.timestamps.cancelled?.toDate()
          }
        } as Order
        orders.push(order)

        addressIds.add(order.address)
        order.products.forEach(({ product }) => productIds.add(product))
      })

      // Fetch addresses and products in parallel
      const addressPromises = Array.from(addressIds).map(
        addressId => addressesRef.doc(addressId).get()
      )
      const productPromises = Array.from(productIds).map(
        productId => productsRef.doc(productId).get()
      )

      const [addressSnapshots, productSnapshots] = await Promise.all([
        Promise.all(addressPromises),
        Promise.all(productPromises)
      ])

      const addresses = addressSnapshots.reduce((acc, snapshot) => {
        acc[snapshot.id] = snapshot.data() as Address
        return acc
      }, {} as AddressesObject)

      const products = productSnapshots.reduce((acc, snapshot) => {
        acc[snapshot.id] = snapshot.data() as Product
        return acc
      }, {} as ProductsObject)
      
      return NextResponse.json(
        { orders, addresses, products, totalOrders, totalPages },
        { status: 200 }
      )
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Fetch All Orders API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Orders" }
      )
    }
  })
}

type CrrateOrderRequest = {
  addressId: string
  products: Order["products"]
  itemsPrice: number
  gst: number
  total: number
  type?: OrderType
}

export async function POST(request: NextRequest) {
  return authenticate(request, async () => {
    try {
      const {
        addressId,
        products,
        itemsPrice,
        gst,
        total,
        type = "Delivery"
      }: CrrateOrderRequest = await request.json()

      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const ordersRef = firestore.collection("orders")
      const addressesRef = firestore.collection("addresses")
      const productsRef = firestore.collection("products")

      // Validation
      if (!itemsPrice || !gst || !total)
        return NextResponse.json({}, {
          status: 400,
          statusText: "Bad Request"
        })
      if (!products || !products.length)
        return NextResponse.json({}, {
          status: 400,
          statusText: "No Products Found"
        })
      if (!addressId)
        return NextResponse.json({}, {
          status: 400,
          statusText: "No Address Found"
        })

      // Verify address and products
      const addressPromise = addressesRef.doc(addressId).get()
      const productPromises = products.map(
        ({ product }) => productsRef.doc(product).get()
      )

      const [addressSnapshot, productSnapshots] = await Promise.all([
        addressPromise,
        Promise.all(productPromises)
      ])
      
      // Verify address
      if (!addressSnapshot.exists)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Address Not Found"
        })

      // Verify products
      const verifiedProducts: ProductsObject = {}
      try {
        productSnapshots.forEach(snapshot => {
          if (!snapshot.exists) {
            throw new Error(`Product ${snapshot.id} not found`)
          }
          verifiedProducts[snapshot.id] = snapshot.data() as Product
        })
      } catch {
        return NextResponse.json({}, {
          status: 404,
          statusText: "Product Not Found"
        })
      }

      // Calculate itemsPrice
      let calculatedItemsPrice = 0
      products.forEach(({ product, quantity }) => {
        calculatedItemsPrice += verifiedProducts[product].price * quantity
      })

      // Calculate GST and total
      const calculatedGst = (calculatedItemsPrice * 18)/100
      const calculatedTotal = calculatedItemsPrice + calculatedGst

      if (
        itemsPrice !== calculatedItemsPrice ||
        gst !== calculatedGst ||
        total !== calculatedTotal
      )
        return NextResponse.json({}, {
          status: 400,
          statusText: "Price Validation Failed"
        })
      
      // Run Firestore transaction
      const { orderId, razorpayOrder } = await firestore.runTransaction(
        async (transaction) => {
          const newOrderRef = ordersRef.doc()

          const order = {
            userId,
            address: addressId,
            products,
            itemsPrice,
            gst,
            total,
            type,
            status: "Initiated",
            paymentStatus: "Pending",
            timestamps: {
              initiated: FieldValue.serverTimestamp(),
            },
            razorpayOrderId: "",
            razorpayPaymentId: ""
          }
          
          // Create Razorpay Order
          const razorpayOrder = await razorpayInstance.orders.create({
            amount: total*100,
            currency: "INR",
            receipt: uuid(),
          })

          order.razorpayOrderId = razorpayOrder.id

          transaction.set(newOrderRef, order)

          return { orderId: newOrderRef.id, razorpayOrder }
        }
      )

      return NextResponse.json({ orderId, razorpayOrder }, { status: 201 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Create Order API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Creating Order" }
      )
    }
  })
}
