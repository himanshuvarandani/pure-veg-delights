import { authenticate } from "@/app/api/authenticate"
import { auth, firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

// Allow to cancel by admin or the user with same user id as order
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return authenticate(request, async () => {
    try {
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid
      const user = await auth.getUser(decodedToken.uid)
      const isAdmin: boolean = user.customClaims?.admin

      const ordersRef = firestore.collection("orders")

      const orderId = params.id
      const orderRef = ordersRef.doc(orderId)
      const orderDoc = await orderRef.get()

      const order = orderDoc.data() as Order
      if (!orderDoc.exists || (!isAdmin && order.userId !== userId))
        return NextResponse.json({}, {
          status: 404,
          statusText: "Order Not Found"
        })

      const updateData: any = {
        status: "Cancelled",
        "timestamps.cancelled": FieldValue.serverTimestamp()
      }

      switch (order.status) {
        case "Initiated":
          updateData.paymentStatus = "Failed"
        case "Placed":
          break
        default:
          return NextResponse.json({}, {
            status: 400,
            statusText: "Cancellation Not Allowed"
          })
      }

      await orderRef.update(updateData)

      return NextResponse.json({}, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Cancel Order API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Cancelling Order" }
      )
    }
  })
}
