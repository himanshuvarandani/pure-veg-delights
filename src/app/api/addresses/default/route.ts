import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { NextRequest, NextResponse } from "next/server"
import { authenticate } from "../../authenticate"

export async function GET(request: NextRequest) {
  return authenticate(request, async () => {
    try {
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const addressesRef = firestore.collection('addresses')

      const defaultAddressQuery = addressesRef
          .where('userId', '==', userId)
          .where('isActive', '==', true)
          .where('isDefault', '==', true)
          .limit(1)
      const defaultAddressSnapshot = await defaultAddressQuery.get()
      
      if (defaultAddressSnapshot.empty) {
        return NextResponse.json({}, {
          status: 404,
          statusText: "Default Address Not Found"
        })
      }

      const defaultAddressDoc = defaultAddressSnapshot.docs[0]
      const defaultAddressData = defaultAddressDoc.data()
      const defaultAddress: Address = {
        id: defaultAddressDoc.id,
        ...defaultAddressData,
        updatedAt: defaultAddressData.updatedAt.toDate(),
        createdAt: defaultAddressData.createdAt.toDate()
      } as Address
      
      return NextResponse.json(
        defaultAddress,
        { status: 200 }
      )
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Fetch Default Address API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Default Address" }
      )
    }
  })
}
