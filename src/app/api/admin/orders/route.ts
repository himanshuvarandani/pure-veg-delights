import { authorize } from "@/app/api/admin/authorize"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return authorize(request, async () => {
    let page = Number(request.nextUrl.searchParams.get("page"))
    let limit = Number(request.nextUrl.searchParams.get("limit"))
    let status = request.nextUrl.searchParams.get("status")
    
    try {
      if (page <= 0) page = 1
      if (limit <= 0) limit = 10
      
      const ordersRef = firestore.collection("orders")
      const addressesRef = firestore.collection("addresses")
      const productsRef = firestore.collection("products")
      
      let ordersPromise
      switch (status) {
        case "Placed":
        case "Accepted":
        case "Prepared":
        case "Completed":
        case "Cancelled":
          ordersPromise = ordersRef
            .where("status", "==", status)
            .orderBy(`timestamps.${status.toLowerCase()}`, "desc")
          break
        default:
          ordersPromise = ordersRef
            .where("status", "!=", "Initiated")
            .orderBy("timestamps.placed", "desc")
      }

      const countPromise = ordersPromise
        .get()
        .then(snapshot => snapshot.size)
      
      ordersPromise = ordersPromise
        .offset((page - 1) * limit)
        .limit(limit)
        .get()

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
      console.log("Fetch Admin Orders API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Orders" }
      )
    }
  })
}
