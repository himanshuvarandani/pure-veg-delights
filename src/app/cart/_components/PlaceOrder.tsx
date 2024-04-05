"use client"

import { createOrder, updatePaymentDetails } from "@/firebase/order"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"

const PlaceOrder = ({ address }: { address: Address | null }) => {
  const { user, cart, setCart } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const placeOrder = async () => {
    if (isLoading || !address) return

    setIsLoading(true)
    if (!user) router.push("/signin")

    if (!Object.keys(cart).length) alert("Please add some products to cart.")

    let total = 0
    let products: Array<{
      product: string
      quantity: number
    }> = []
    Object.values(cart).map(item => {
      products.push({
        product: item.product.id,
        quantity: item.quantity,
      })
      total += item.product.price * item.quantity
    })

    // Create gst and itemsPrice
    let gst = 0
    let itemsPrice = total

    // Create Order with Pending payment status and redirect to Razorpay
    const response = await createOrder({
      userId: user?.uid!,
      products,
      address,
      itemsPrice,
      gst,
      total,
      status: "Payment Pending",
      placedAt: new Date(),
      lastUpdated: new Date(),
    })
    
    if (!response.success || !response.data || !response.data.orderId)
      console.log("Something went wrong, Please Try Again!!")
    else {
      await makePayment(response.data.orderId, total)
    }
  }

  const makePayment = async (orderId: string, amount: number) => {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const data = await fetch("/api/razorpay/order/create?amount=" + amount)
    
    const { order: razorpayOrder } = await data?.json()
    const options = {
      key: key,
      name: user?.email,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      order_id: razorpayOrder.id,
      modal: {
        ondismiss: async () => {
          await updatePaymentDetails(orderId, "Payment Cancelled")
          setIsLoading(false)
        },
      },
      handler: async (response: any) => {
        const data = await fetch("/api/razorpay/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }),
        })

        const res = await data.json()
        if (!res?.success) {
          await updatePaymentDetails(orderId, "Payment Cancelled")
          setIsLoading(false)
        } else {
          await updatePaymentDetails(
            orderId,
            "Payment Done",
            response.razorpay_order_id,
            response.razorpay_payment_id,
          )

          setCart({})
          router.push(`/account/order/${orderId}`)
        }
      },
      prefill: {
        email: user?.email,
      },
    }

    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.open()

    paymentObject.on("payment.failed", async (response: any) => {
      alert("Payment failed. Please try again.")
      await updatePaymentDetails(orderId, "Payment Cancelled")
      setIsLoading(false)
    })
  }

  return (
    <button
      className={`rounded-2xl bg-orange-550 text-white px-4 py-2 my-5
        ${isLoading || !address ? "opacity-20" : null }
      `}
      onClick={placeOrder}
      disabled={isLoading}
    >
      Place Order
    </button>
  )
}

export default PlaceOrder
