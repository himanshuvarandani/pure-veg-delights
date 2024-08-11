import api from "@/axios/instance"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

type OrdersData = {
  orders: Array<Order>
  addresses: AddressesObject
  products: ProductsObject
  totalOrders: number
  totalPages: number
}

export const fetchOrders = async (
  page: number,
  limit: number,
  tab: string
): Promise<OrdersData> => {
  let status
  switch (tab) {
    case "new":
      status = "Placed"
      break
    case "current":
      status = "Accepted"
      break
    case "delivery":
      status = "Prepared"
      break
    default:
      status = "All"
  }
  
  return await api.get("/admin/orders", { params: { page, limit, status } })
    .then(response => {
      return response.data as OrdersData
    })
    .catch((error: AxiosError) => {
      console.log("Error Fetching Orders ->", error)
      toast.error(error.response?.statusText || "Error Fetching Orders")
      return {
        orders: [],
        addresses: {},
        products: {},
        totalOrders: 0,
        totalPages: 0
      }
    })
}

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  let newStatus: OrderStatus = "Accepted"
  switch (status) {
    case "Placed":
      newStatus = "Accepted"
      break
    case "Accepted":
      newStatus = "Prepared"
      break
    case "Prepared":
      newStatus = "Completed"
      break
    default:
      toast.error("Error Updating Order Status")
      throw Error
  }
  
  return await api.put(`/admin/orders/${orderId}`, { status: newStatus })
    .then(() => toast.success("Order Status Updated Successfully"))
    .catch((error: AxiosError) => {
      console.log("Error Updating Order Status ->", error)
      toast.error(error.response?.statusText || "Error Updating Order Status")
    })
}
