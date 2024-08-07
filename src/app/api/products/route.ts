import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchQuery = request.nextUrl.searchParams.get("q")

    const productsRef = firestore.collection("products")

    let productsSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>
    if (!searchQuery || searchQuery.trim() == "") {
      productsSnapshot = await productsRef.get()
    } else {
      const productsQuery = productsRef
        .where("tags", "array-contains-any", searchQuery.split(" "))
      
      productsSnapshot = await productsQuery.get()
    }

    const products: Record<string, Array<{}>> = {}
    productsSnapshot.docs.forEach(productDoc => {
      const product = productDoc.data()

      if (!products[product.category]) {
        products[product.category] = []
      }
      
      products[product.category].push({ id: productDoc.id, ...product })
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (err: any) {
    const error: FirebaseAppError = err
    console.log("Fetch All Addresses API Error -> ", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Error Fetching Products" }
    )
  }
}
