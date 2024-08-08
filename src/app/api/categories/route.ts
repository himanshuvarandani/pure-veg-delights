import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const categoriesRef = firestore.collection("categories")
    
    const categoriesSnapshot = await categoriesRef.get()
    const categories: Array<string> = categoriesSnapshot.docs.map(
      categoryDoc => { return categoryDoc.data().name }
    )

    return NextResponse.json({ categories }, { status: 200 })
  } catch (err: any) {
    const error: FirebaseAppError = err
    console.log("Fetch Categories Error -> ", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Error Fetching Categories" }
    )
  }
}
