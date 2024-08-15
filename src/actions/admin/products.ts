import api from "@/axios/instance"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const createProduct = async (
  product: Product
): Promise<{ productId: string }> => {
  return await api.post(`/admin/products`, product)
    .then(response => {
      toast.success("Product Created")
      return { productId: response.data.productId }
    })
}

export const fetchProductDetails = async (
  productId: string
): Promise<{ product: Product | null }> => {
  return await api.get(`/admin/products/${productId}`)
    .then(response => {
      return { product: (response.data.product as Product) }
    })
    .catch((error: AxiosError) => {
      console.log("Error Fetching Product Details ->", error)
      toast.error(error.response?.statusText || "Error Fetching Product Details")
      return { product: null }
    })
}

export const updateProductDetails = async (
  productId: string,
  product: Product
): Promise<{ productId: string }> => {
  return await api.put(`/admin/products/${productId}`, product)
    .then(response => {
      toast.success("Product Updated")
      return { productId: response.data.productId }
    })
}

export const deleteProduct = async (productId: string) => {
  return await api.delete(`/admin/products/${productId}`)
    .then(() => toast.success("Product Deleted"))
    .catch((error: AxiosError) => {
      console.log("Error Deleting Product ->", error)
      toast.error(error.response?.statusText || "Error Deleting Product")
    })
}

export const restoreProduct = async (productId: string) => {
  return await api.put(`/admin/products/${productId}/restore`)
    .then(() => toast.success("Product Restored"))
    .catch((error: AxiosError) => {
      console.log("Error Restoring Product ->", error)
      toast.error(error.response?.statusText || "Error Restoring Product")
    })
}
