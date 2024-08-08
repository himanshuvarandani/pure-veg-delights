import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const fromDate = request.nextUrl.searchParams.get("fromDate")
    const toDate = request.nextUrl.searchParams.get("toDate")

    const productsRef = firestore.collection("products")
    const ordersRef = firestore.collection("orders")

    let ordersQuery = ordersRef.where("status", "==", "Completed")
    
    if (fromDate !== null)
      ordersQuery = ordersQuery.where("placedAt", ">=", fromDate)
    
    if (toDate !== null)
      ordersQuery = ordersQuery.where("placedAt", "<=", toDate)
    
    const ordersSnapshot = await ordersQuery.get()

    if (ordersSnapshot.empty)
      return NextResponse.json({ products: [] }, { status: 200 })

    const productSales: Record<string, number> = {}
    ordersSnapshot.docs.forEach(orderDoc => {
      const order = orderDoc.data()
      order.products.forEach(
        ({ product, quantity }: { product: string, quantity: number }) => {
          if (productSales[product]) {
            productSales[product] += quantity
          } else {
            productSales[product] = quantity
          }
        }
      )
    })

    const sortedProducts = Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([product]) => product)
    
    if (sortedProducts.length == 0)
      return NextResponse.json({ products: [] }, { status: 200 })

    const productDetailsPromises = sortedProducts.map(
      productId => productsRef.doc(productId).get()
    )
    const productDetailsSnapshots = await Promise.all(productDetailsPromises)

    const bestSellingProducts: Array<Product> = productDetailsSnapshots.map(
      productDoc => {
        return { id: productDoc.id, ...productDoc.data() } as Product
      }
    )

    return NextResponse.json({ products: bestSellingProducts }, { status: 200 })
  } catch (err: any) {
    const error: FirebaseAppError = err
    console.log("Fetch All Addresses API Error -> ", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Error Fetching Products" }
    )
  }
}
