import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const productsRef = firestore.collection("products")

    const productsQuery = productsRef
      .where("todaySpecial", "==", true)
      .limit(5)
    
    const productsSnapshot = await productsQuery.get()

    const products = productsSnapshot.docs.map(productDoc => {
      return { id: productDoc.id, ...productDoc.data() }
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
