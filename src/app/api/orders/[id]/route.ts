import { authenticate } from "@/app/api/authenticate"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return authenticate(request, async () => {
    try {
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const ordersRef = firestore.collection("orders")
      const addressesRef = firestore.collection("addresses")
      const productsRef = firestore.collection("products")

      const orderId = params.id
      const orderDoc = await ordersRef.doc(orderId).get()

      const order = orderDoc.data() as Order
      if (!orderDoc.exists || order?.userId !== userId) {
        return NextResponse.json({}, {
          status: 404,
          statusText: "Order Not Found"
        })
      }

      const addressPromise = addressesRef.doc(order.address).get()
      const productPromises = order.products.map(
        ({ product }) => productsRef.doc(product).get()
      )

      const [addressSnapshot, productSnapshots] = await Promise.all([
        addressPromise,
        Promise.all(productPromises)
      ])

      const address: Address = addressSnapshot.data() as Address
      const products = productSnapshots.reduce((acc, snapshot) => {
        acc[snapshot.id] = snapshot.data() as Product
        return acc
      }, {} as ProductsObject)

      return NextResponse.json(
        { order, address, products },
        { status: 200 }
      )
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Fetch Order Details API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Order Details" }
      )
    }
  })
}
