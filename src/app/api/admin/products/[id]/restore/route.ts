import { authorize } from "@/app/api/admin/authorize"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return authorize(request, async () => {
    try {
      const productId = params.id
      const productsRef = firestore.collection("products")

      const productRef = productsRef.doc(productId)
      const productDoc = await productRef.get()

      if (!productDoc.exists)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Product Not Found or Inactive",
        })
      
      if (!productDoc.data()?.isDeleted)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Product Already Active",
        })
      
      productRef.update({
        isActive: true,
        isDeleted: false,
        updatedAt: FieldValue.serverTimestamp(),
      })

      return NextResponse.json({}, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Activate Product Admin API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Activating Product" }
      )
    }
  })
}
