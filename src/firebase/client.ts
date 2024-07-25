import { getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import firebaseConfig from "./config"

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(firebaseApp)
