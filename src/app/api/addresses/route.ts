import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { NextRequest, NextResponse } from "next/server"
import { authenticate } from "../authenticate"

export async function GET(request: NextRequest) {
  return authenticate(request, async () => {
    try {
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const addressesRef = firestore.collection('addresses')

      const addressQuery = addressesRef
          .where('userId', '==', userId)
          .where('isActive', '==', true)
          .orderBy("updatedAt", "desc")
      const addressSnapshot = await addressQuery.get()

      const addresses: Array<Address> = addressSnapshot.docs.map(addressDoc => {
        const addressData = addressDoc.data()
        const address: Address = {
          id: addressDoc.id,
          ...addressData,
          updatedAt: addressData.updatedAt.toDate(),
          createdAt: addressData.createdAt.toDate()
        } as Address
        return address
      })

      return NextResponse.json({ addresses }, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Fetch All Addresses API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching All Addresses" }
      )
    }
  })
}
