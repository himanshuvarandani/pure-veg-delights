import { addDoc, collection } from "firebase/firestore"
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
