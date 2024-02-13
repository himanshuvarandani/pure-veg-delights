import { doc, setDoc } from "firebase/firestore"
import { firestore } from "./firebase"

export const createUser = async (
  userId: string,
  name: string,
  contact: number,
  email: string,
): Promise<{ success: boolean, error?: string}> => {
  const userRef = doc(firestore, "users", userId)

  try {
    await setDoc(userRef, { name, contact, email })
    return { success: true }
  } catch (e) {
    return { success: false, error: "Not able to create user, Try again!" }
  }
}
