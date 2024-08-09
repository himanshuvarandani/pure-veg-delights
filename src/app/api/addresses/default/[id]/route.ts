import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { NextRequest, NextResponse } from "next/server"
import { authenticate } from "../../../authenticate"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return authenticate(request, async () => {
    try {
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid
      
      const addressId = params.id
      const addressesRef = firestore.collection('addresses')
      const addressRef = addressesRef.doc(addressId)
      const addressDoc = await addressRef.get()
      
      const address = addressDoc.data() as Address
      if (!addressDoc.exists || address.userId !== userId || !address.isActive) {
        return NextResponse.json({}, {
          status: 404,
          statusText: "Address Not Found"
        })
      }

      if (!address.isDefault) {
        await firestore.runTransaction(async (transaction) => {
          const defaultAddressQuery = addressesRef
              .where('userId', '==', userId)
              .where('isActive', '==', true)
              .where('isDefault', '==', true)
              .limit(1)
          const defaultAddressSnapshot = await defaultAddressQuery.get()
          
          if (!defaultAddressSnapshot.empty) {
            const defaultAddressDoc = defaultAddressSnapshot.docs[0]
            transaction.update(defaultAddressDoc.ref, { isDefault: false })
          }

          transaction.update(addressRef, { isDefault: true })
        })
      }

      return NextResponse.json({}, {
        status: 200,
        statusText: "Default Address Updated Successfully"
      })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Update Default Address API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Updating Address" }
      )
    }
  })
}
