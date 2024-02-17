import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth"
import { auth } from "./firebase"

export const signUp = async (
  email: string,
  password: string
): Promise<{ success: boolean, userId?: string, error?: string}> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return { success: true, userId: result.user.uid }
  } catch (error: any) {
    let message = "Error during sign up, Try Again!"
    if (error) {
      if(error.code === "auth/weak-password")
        message = "Password is weak"
      else if (error.code === "auth/email-already-in-use")
        message = "Email is already in use"
      else if (error.code === "auth/invalid-email")
        message = "Invalid Email"
      else if (error.code === "auth/network-request-failed")
        message = "Check your Network Connection and Try Again!"
    }

    return { success: false, error: message }
  }
}

export const signIn = async (
  email: string,
  password: string
): Promise<{ success: boolean, error?: string}> => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { success: true }
  } catch (error: any) {
    let message = "Error during sign in, Try Again!"
    if (error) {
      if(error.code === "auth/invalid-credential")
        message = "Invalid Credential"
      else if (error.code === "auth/network-request-failed")
        message = "Check your Network Connection and Try Again!"
    }

    return { success: false, error: message }
  }
}

export const onAuthStateChanged = (callback: NextOrObserver<User>) => {
  return _onAuthStateChanged(auth, callback)
}
