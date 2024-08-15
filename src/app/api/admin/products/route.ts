import { authorize } from "@/app/api/admin/authorize"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  return authorize(request, async () => {
    let {
      name,
      description="",
      price,
      category,
      image,
      tags,
      todaySpecial=false
    }: Product = await request.json()
    
    try {
      if (!name || !price || !category || !image || !tags || !tags.length)
        return NextResponse.json({}, {
          status: 400,
          statusText: "Missing Required Fields",
        })

      const productsRef = firestore.collection("products")

      const productsSnapshot = await productsRef
        .where("isActive", "==", true)
        .where("name", "==", name)
        .limit(1)
        .get()
      if (!productsSnapshot.empty)
        return NextResponse.json({}, {
          status: 400,
          statusText: "Duplicate Product Name",
        })
      
      const productRef = await productsRef.add({
        name,
        description,
        price,
        category,
        image,
        tags,
        todaySpecial,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        isActive: true,
        isDeleted: false,
      })

      return NextResponse.json({ productId: productRef.id }, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Create Product Admin API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Creating Product" }
      )
    }
  })
}
