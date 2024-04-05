import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./firebase"

export const createUser = async (
  userId: string,
  name: string,
  contact: number,
  email: string,
): Promise<APIResponse<null>> => {
  const userRef = doc(firestore, "users", userId)

  try {
    await setDoc(userRef, { name, contact, email })
    return { success: true }
  } catch (e) {
    return { success: false, error: "Not able to create user, Try again!" }
  }
}

export const fetchUserDetails = async (
  userId: string
): Promise<APIResponse<{ user: User }>> => {
  const userRef = doc(firestore, "users", userId)

  try {
    const user = await getDoc(userRef)
    return { success: true, data: { user: user.data() as User } }
  } catch (e) {
    return { success: false, error: "Not able to fetch user account details" }
  }
}

export const updateUser = async (
  userId: string,
  name: string,
  contact: number,
): Promise<APIResponse<null>> => {
  const userRef = doc(firestore, "users", userId)

  try {
    await updateDoc(userRef, { name, contact })
    return { success: true }
  } catch (e) {
    return { success: false, error: "Not able to create user, Try again!" }
  }
}
