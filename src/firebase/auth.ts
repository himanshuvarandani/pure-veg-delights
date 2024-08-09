import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth"
import { auth } from "./client"
import { FirebaseAppError } from "firebase-admin/app"

export const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean, error?: string }> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    try {
      await updateProfile(auth.currentUser!, { displayName: name })
    } catch (error: any) {
      console.log(error)
    }
    return { success: true }
  } catch (err: any) {
    const error: FirebaseAppError = err

    let message
    switch (error.code) {
      case "auth/weak-password":
        message = "Password is weak"
        break
      case "auth/email-already-in-use":
        message = "Email is already in use"
        break
      case "auth/invalid-email":
        message = "Invalid Email"
        break
      default:
        message = "Error during sign up, Try Again!"
    }

    return { success: false, error: message }
  }
}

export const signIn = async (
  email: string,
  password: string
): Promise<{ success: boolean, error?: string }> => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { success: true }
  } catch (err: any) {
    const error: FirebaseAppError = err

    let message
    switch (error.code) {
      case "auth/invalid-credential":
        message = "Invalid Credential"
        break
      case "auth/network-request-failed":
        message = "Check your Network Connection and Try Again!"
        break
      default:
        message = "Error during sign in, Try Again!"
    }

    return { success: false, error: message }
  }
}

export const onAuthStateChanged = (callback: NextOrObserver<User>) => {
  return _onAuthStateChanged(auth, callback)
}
