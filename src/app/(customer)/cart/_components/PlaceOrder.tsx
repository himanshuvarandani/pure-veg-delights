"use client"

import api from "@/axios/instance"
import useAuth from "@/hooks/useAuth"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { Orders } from "razorpay/dist/types/orders"
import { useState } from "react"
import toast from "react-hot-toast"

const PlaceOrder = ({ address }: { address: Address | null }) => {
  const { user, cart, setCart } = useAuth()
  const [orderLoading, setOrderLoading] = useState(false)
  const router = useRouter()

  const createOrder = async (
    addressId: string,
    products: Order["products"],
    itemsPrice: number,
    gst: number,
    total: number,
  ) => {
    return await api.post(
      "/orders",
      { addressId, products, itemsPrice, gst, total }
    )
      .then(response => {
        return {
          orderId: response.data.orderId,
          razorpayOrder: response.data.razorpayOrder
        }
      })
  }

  const cancelOrder = async (orderId: string) => {
    return await api.put(`/orders/${orderId}/cancel`)
  }

  const verifyOrder = async (
    orderId: string,
    razorpayPaymentId: string,
    razorpayOrderId: string,
    razorpaySignature: string
  ) => {
    return await api.put(
      `/orders/${orderId}/verify-payment`,
      { razorpayOrderId, razorpayPaymentId, razorpaySignature }
    )
  }

  const placeOrder = async () => {
    if (orderLoading || !address) return

    setOrderLoading(true)
    if (!user) router.push("/signin")

    if (!Object.keys(cart).length) toast.error("Please add some products to cart.")

    let itemsPrice = 0
    let products: Array<{
      product: string
      quantity: number
    }> = []
    Object.values(cart).map(item => {
      products.push({
        product: item.product.id,
        quantity: item.quantity,
      })
      itemsPrice += item.product.price * item.quantity
    })

    // Create gst and itemsPrice
    const gst = (itemsPrice*18)/100
    const total = itemsPrice + gst

    // Create Order
    createOrder(address.id!, products, itemsPrice, gst, total)
      .then(async ({ orderId, razorpayOrder }) => {
        if (!orderId)
          toast.error("Error Creating Order")
        else {
          await makePayment(orderId, razorpayOrder)
        }
      })
      .catch((error: AxiosError) => {
        console.log("Error Creating Order ->", error)
        toast.error(error.response?.statusText || "Error Creating Order")
      })
      .finally(() => setOrderLoading(false))
  }

  const makePayment = async (orderId: string, razorpayOrder: Orders.RazorpayOrder) => {
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    
    const options = {
      key: razorpayKey,
      name: user?.displayName,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      order_id: razorpayOrder.id,
      modal: {
        ondismiss: async () => {
          cancelOrder(orderId)
            .then(() => toast.success("Payment Cancelled"))
            .catch(() => toast.error("Error Cancelling Order"))
        },
      },
      handler: async (response: {
        razorpay_payment_id: string,
        razorpay_order_id: string,
        razorpay_signature: string
      }) => {
        verifyOrder(
          orderId,
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        )
          .then(() => {
            toast.success("Order Placed Successfully")
            setCart({})
            router.push(`/account/order/${orderId}`)
          })
          .catch(() => toast.error("Payment Cancelled"))
      },
      prefill: {
        email: user?.email,
      },
    }

    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.open()

    // ToDo - On failing, Ask to start payment processing again
    paymentObject.on("payment.failed", async (response: any) => {
      cancelOrder(orderId)
        .then(() => toast.success("Payment Cancelled"))
        .catch(() => toast.error("Error Cancelling Order"))
    })
  }

  return (
    <button
      className={`rounded-2xl bg-orange-550 text-white px-4 py-2 my-5
        ${orderLoading || !address ? "opacity-20" : null }
      `}
      onClick={placeOrder}
      disabled={orderLoading}
    >
      Place Order
    </button>
  )
}

export default PlaceOrder
