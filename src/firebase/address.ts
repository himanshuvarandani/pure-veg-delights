import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import { firestore } from "./firebase"

type CreateAddResponse = {
  success: boolean
  data?: { addressId: string }
  error?: string
}

export const createAddress = async (
  address: Address
): Promise<CreateAddResponse> => {
  const addressRef = collection(firestore, "address")

  try {
    const defAddRes = await fetchDefaultAddress(address.userId)
    if (!defAddRes.success)
      return {
        success: false,
        error: "Not able to update default address, Try again!"
      }
    
    if (defAddRes.data && defAddRes.data.address) {
      if (address.default) {
        const remAddDefRes = await removeAddressDefault(defAddRes.data?.address.id)
        if (!remAddDefRes.success)
          return remAddDefRes
      }
    } else address.default = true

    const result = await addDoc(addressRef, address)
    return { success: true, data: { addressId: result.id } }
  } catch(e) {
    console.log(e)
    return { success: false, error: "Not able to create address, Try again!" }
  }
}

export const fetchDefaultAddress = async (userId: string) => {
  const addressRef = collection(firestore, "address")

  try {
    const defAddQuery = query(
      addressRef,
      where("userId", '==', userId),
      where("default", '==', true),
    )
    const addresses = await getDocs(defAddQuery)
    if (addresses.docs.length)
      return { success: true, data: { address: addresses.docs[0] } }
    
    return { success: true, data: { address: null }}
  } catch(e) {
    console.log(e)
    return { success: false, error: "Not able to fetch default address, Try again!" }
  }
}

export const removeAddressDefault = async (addressId: string) => {
  const addressRef = doc(firestore, "address", addressId)

  try {
    await updateDoc(addressRef, { default: false })
    return { success: true }
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to update default address, Try again!"
    }
  }
}
