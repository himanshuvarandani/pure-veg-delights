import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
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
