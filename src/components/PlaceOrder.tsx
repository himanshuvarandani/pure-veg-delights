"use client"

import { createOrder, updateOrder } from "@/firebase/order"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"

const PlaceOrder = () => {
  const { user, cart, setCart } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const placeOrder = async () => {
    setIsLoading(true)
    if (!user) router.push("/signin")

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

    // Create Order with Pending payment status and redirect to Razorpay
    const orderId = await createOrder({
      userId: user?.uid!,
      products: products,
      itemsPrice: total,
      gst: 0,
      total: total,
      placedAt: new Date(),
      status: "Payment Pending",
      lastUpdated: new Date(),
    })
    
    if (!orderId) console.log("Something went wrong, Please Try Again!!")
    else {
      await makePayment(orderId, total)
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
          await updateOrder(orderId, "Payment Cancelled")
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
          await updateOrder(orderId, "Payment Cancelled")
          setIsLoading(false)
        } else {
          await updateOrder(
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

    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed. Please try again.")
      setIsLoading(false)
    })
  }

  return (
    <button
      className={`rounded-2xl bg-orange-550 text-white px-4 py-2 my-5
        ${isLoading ? "opacity-20" : null }
      `}
      onClick={placeOrder}
      disabled={isLoading}
    >
      Place Order
    </button>
  )
}

export default PlaceOrder
