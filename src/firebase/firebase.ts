import { getAuth } from "firebase/auth"
import firebaseApp from "./config"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const auth = getAuth(firebaseApp)

export const firestore = getFirestore(firebaseApp)

export const storage = getStorage(firebaseApp)
