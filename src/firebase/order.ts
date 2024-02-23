import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./firebase"

export const createOrder = async (
  order: Order
) => {
  const orderRef = collection(firestore, "orders")

  try {
    const result = await addDoc(orderRef, order)
    return result.id
  } catch(e) {
    console.log(e)
    return null
  }
}

export const updateOrder = async (
  orderId: string,
  status: OrderStatus,
  razorpayOrderId: string = "",
  razorpayPaymentId: string = "",
): Promise<{ success: boolean, error?: string}> => {
  const orderRef = doc(firestore, "orders", orderId)

  try {
    await updateDoc(orderRef, { status, razorpayOrderId, razorpayPaymentId })
    return { success: true }
  } catch (e) {
    return { success: false, error: "Not able to create user, Try again!" }
  }
}

export const fetchOrderDetails = async (
  orderId: string,
  userId: string,
): Promise<{ order: Order, products: { [key: string]: Product } }| null> => {
  const orderRef = doc(firestore, "orders", orderId)

  try {
    const result = await getDoc(orderRef)
    const order: Order = result.data() as Order

    if (order && order.userId === userId) {
      let products: { [key: string]: Product } = {}
      for (const item of order.products) {
        const productRef = doc(firestore, "products", item.product)
        const product = await getDoc(productRef)

        products[item.product] = product.data() as Product
      }

      return { order: order, products }
    }
    return null
  } catch (e) {
    return null
  }
}
