import { authorize } from "@/app/api/admin/authorize"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return authorize(request, async () => {
    try {
      const productsRef = firestore.collection("products")

      const productsSnapshot = await productsRef
        .where("isDeleted", "==", true)
        .get()

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
      console.log("Fetch Deleted Products Admin API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Deleted Products" }
      )
    }
  })
}
