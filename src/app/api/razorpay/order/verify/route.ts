import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  const {
    razorpayOrderId,
    razorpaySignature,
    razorpayPaymentId,
  } = await request.json()
  const body = razorpayOrderId + "|" + razorpayPaymentId

  const expectedSignature = crypto
    .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  const isAuthentic = expectedSignature === razorpaySignature

  if (!isAuthentic) {
    return NextResponse.json(
      { success: false, error: "Invalid Payment Signature" },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true }, {  status: 200 })
}
