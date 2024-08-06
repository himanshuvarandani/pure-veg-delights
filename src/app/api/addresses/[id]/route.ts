import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { DecodedIdToken } from "firebase-admin/auth"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"
import { authenticate } from "../../authenticate"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return authenticate(request, async () => {
    try {
      const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
      const userId = decodedToken.uid

      const addressId = params.id
      const addressesRef = firestore.collection('addresses')
      const addressDoc = await addressesRef.doc(addressId).get()
      
      if (!addressDoc.exists || addressDoc.data()?.userId !== userId) {
        return NextResponse.json({}, {
          status: 404,
          statusText: "Address Not Found"
        })
      }

      return NextResponse.json(
        { id: addressDoc.id, ...addressDoc.data() },
        { status: 200 }
      )
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Fetch Address API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Address" }
      )
    }
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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
      
      const addressId = params.id
      const addressesRef = firestore.collection('addresses')
      const ordersRef = firestore.collection('orders')
      
      // Check if the address exists and userId matches or not
      const addressRef = addressesRef.doc(addressId)

      const addressDoc = await addressRef.get()
      const currentAddress = addressDoc.data()
      if (!addressDoc.exists || currentAddress?.userId !== userId) {
        return NextResponse.json({}, {
          status: 404,
          statusText: "Address Not Found"
        })
      }

      // Change Validation
      if (
        name === currentAddress.name &&
        addressLine1 === currentAddress.addressLine1 &&
        addressLine2 === currentAddress.addressLine2 &&
        city === currentAddress.city &&
        state === currentAddress.state &&
        pincode === currentAddress.pincode &&
        country === currentAddress.country
      ) {
        return NextResponse.json({}, {
          status: 500,
          statusText: "No Changes Detected"
        })
      }

      const ordersSnapshot = await ordersRef.where('addressId', '==', addressId).get()
      if (!ordersSnapshot.empty) {
        // Run Firestore transaction
        const newAddressRef = addressesRef.doc()
        await firestore.runTransaction(async (transaction) => {
          transaction.update(addressRef, { isActive: null })

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
          { status: 200 }
        )
      }

      addressRef.update({
        name,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        updatedAt: FieldValue.serverTimestamp(),
      })
      
      return NextResponse.json(
        { addressId: addressRef.id },
        { status: 200 }
      )
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Update Address API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Updating Address" }
      )
    }
  })
}
