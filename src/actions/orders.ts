import api from "@/axios/instance"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

type OrderDetails = {
  order: Order | null
  address: Address | null
  products: ProductsObject
}

export const fetchOrderDetails = async (
  orderId: string
): Promise<OrderDetails> => {
  return await api.get(`/orders/${orderId}`)
    .then(response => {
      return response.data as OrderDetails
    })
    .catch((error: AxiosError) => {
      console.log("Error Fetching Order Details ->", error)
      toast.error(error.response?.statusText || "Error Fetching Order Details")
      return { order: null, address: null, products: {} }
    })
}

export const cancelOrder = async (orderId: string) => {
  return await api.put(`/orders/${orderId}/cancel`)
    .then(() => toast.success("Order Cancelled Successfully"))
    .catch((error: AxiosError) => {
      console.log("Error Cancelling Order ->", error)
      toast.error(error.response?.statusText || "Error Cancelling Order")
    })
}
