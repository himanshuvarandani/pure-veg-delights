import { cert, getApps, initializeApp, ServiceAccount } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

const firebaseApp = getApps().length === 0 ? initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  }) : getApps()[0]

export const auth = getAuth(firebaseApp)

export const firestore = getFirestore(firebaseApp)
