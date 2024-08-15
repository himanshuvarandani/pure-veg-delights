import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("q")
  
  try {
    const productsRef = firestore.collection("products")

    let productsQuery = productsRef.where("isActive", "==", true)
    if (searchQuery && searchQuery.trim() !== "")
      productsQuery = productsQuery
        .where("tags", "array-contains-any", searchQuery.split(" "))

    const productsSnapshot = await productsQuery.get()
    const products: CategoryProducts = {}
    productsSnapshot.docs.forEach(productDoc => {
      const product = productDoc.data()

      if (!products[product.category]) {
        products[product.category] = []
      }
      
      products[product.category].push(
        { id: productDoc.id, ...product } as Product
      )
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (err: any) {
    const error: FirebaseAppError = err
    console.log("Fetch Products Error -> ", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Error Fetching Products" }
    )
  }
}
