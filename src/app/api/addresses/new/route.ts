import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"
import { authenticate } from "../../authenticate"

export async function POST(request: NextRequest) {
  return authenticate(request, async () => {
    try {
      let {
        name,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        isDefault = false,
      } = await request.json()
      
      // Validation
      if (!name || !addressLine1 || !city || !state || !pincode || !country) {
        return NextResponse.json({}, {
          status: 400,
          statusText: "Missing Required Fields",
        })
      }

      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid
      
      const addressesRef = firestore.collection('addresses')
      const newAddressRef = addressesRef.doc()

      // Run Firestore transaction
      await firestore.runTransaction(async (transaction) => {
        // Find the current default address
        const defaultAddressQuery = addressesRef
          .where('userId', '==', userId)
          .where('isDefault', '==', true)
          .limit(1)

        const defaultAddressSnapshot = await transaction.get(defaultAddressQuery)

        // Unset the current default address if it exists
        if (!defaultAddressSnapshot.empty) {
          if (isDefault) {
            const defaultAddressDoc = defaultAddressSnapshot.docs[0]
            transaction.update(defaultAddressDoc.ref, { isDefault: false })
          }
        } else {
          // If there is no current default address, ensure the new address is set as default
          isDefault = true
        }

        // Add the new address and set it as default if required
        transaction.set(newAddressRef, {
          userId,
          name,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
          country,
          isActive: true,
          isDefault,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        })
      })

      return NextResponse.json(
        { addressId: newAddressRef.id },
        { status: 201 }
      )
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Create Address API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Address Creation Failed" }
      )
    }
  })
}
