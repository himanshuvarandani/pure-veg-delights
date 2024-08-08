import { authenticate } from "@/app/api/authenticate"
import { firestore } from "@/firebase/server"
import crypto from "crypto"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

type VerifyPaymentRequest = {
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string,
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return authenticate(request, async () => {
    try {
      const {
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature
      }: VerifyPaymentRequest = await request.json()

      if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature)
        return NextResponse.json({}, {
          status: 400,
          statusText: "Invalid Payment Details"
        })

      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const ordersRef = firestore.collection("orders")

      const orderId = params.id
      const orderRef = ordersRef.doc(orderId)
      const orderDoc = await orderRef.get()

      const order = orderDoc.data() as Order
      if (!orderDoc.exists || order.userId !== userId)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Order Not Found"
        })

      if (order.status !== "Initiated" || order.paymentStatus !== "Pending")
        return NextResponse.json({}, {
          status: 404,
          statusText: "Invalid Order"
        })

      if (order.razorpayOrderId !== razorpayOrderId)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Invalid Payment Details"
        })
      
      const body = razorpayOrderId + "|" + razorpayPaymentId
      const expectedSignature = crypto
        .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex")

      const isAuthentic = expectedSignature === razorpaySignature

      if (!isAuthentic) {
        await orderRef.update({
          status: "Cancelled",
          paymentStatus: "Failed",
          razorpayPaymentId: razorpayPaymentId,
          "timestamps.placed": FieldValue.serverTimestamp()
        })

        return NextResponse.json({}, {
          status: 400,
          statusText: "Invalid Payment Signature"
        })
      }

      await orderRef.update({
        status: "Placed",
        paymentStatus: "Completed",
        razorpayPaymentId: razorpayPaymentId,
        razorpaySignature: razorpaySignature,
        "timestamps.placed": FieldValue.serverTimestamp()
      })
      
      return NextResponse.json({}, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Verify Payment Status API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Verifying Payment Status" }
      )
    }
  })
}
