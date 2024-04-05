import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import { firestore } from "./firebase"

export const createAddress = async (
  address: Address
): Promise<APIResponse<{ addressId: string }>> => {
  const addressRef = collection(firestore, "address")

  try {
    const defAddRes = await fetchDefaultAddress(address.userId)
    if (!defAddRes.success)
      return {
        success: false,
        error: "Not able to update default address, Try again!"
      }
    
    if (defAddRes.data && defAddRes.data.address) {
      if (address.default && defAddRes.data?.address.id) {
        const remAddDefRes = await removeAddressDefault(defAddRes.data?.address.id)
        if (!remAddDefRes.success)
          return remAddDefRes
      }
    } else address.default = true

    const result = await addDoc(
      addressRef,
      { ...address, createdAt: new Date() }
    )
    return { success: true, data: { addressId: result.id } }
  } catch(e) {
    console.log(e)
    return { success: false, error: "Not able to create address, Try again!" }
  }
}

export const fetchDefaultAddress = async (
  userId: string
): Promise<APIResponse<{ address: Address | null }>> => {
  const addressRef = collection(firestore, "address")

  try {
    const defAddQuery = query(
      addressRef,
      where("userId", '==', userId),
      where("default", '==', true),
      where("active", '==', true),
    )
    const addresses = await getDocs(defAddQuery)
    if (addresses.docs.length)
      return {
        success: true,
        data: {
          address: {
            ...addresses.docs[0].data(),
            id: addresses.docs[0].id,
          } as Address
        }
      }
    
    return { success: true, data: { address: null }}
  } catch(e) {
    console.log(e)
    return { success: false, error: "Not able to fetch default address, Try again!" }
  }
}

const removeAddressDefault = async (addressId: string) => {
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

export const fetchAllAddresses = async (
  userId: string
): Promise<APIResponse<{ addresses: Address[] }>> => {
  const addressRef = collection(firestore, "address")

  try {
    const defAddQuery = query(
      addressRef,
      where("userId", '==', userId),
      where("active", '==', true),
    )
    const result = await getDocs(defAddQuery)
    let addresses: Address[] = result.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    } as Address))
    
    return { success: true, data: { addresses: addresses }}
  } catch(e) {
    console.log(e)
    return { success: false, error: "Not able to fetch default address, Try again!" }
  }
}

export const updateDefaultAddress = async (
  userId: string,
  newDefAddId: string
): Promise<APIResponse<null>> => {
  const addressRef = doc(firestore, "address", newDefAddId)
  const failResponse = {
    success: false,
    error: "Not able to update default address, Try again!"
  }

  try {
    const result = await fetchDefaultAddress(userId)
    if (!result.success) return failResponse
    if (result.data?.address && result.data?.address.id) {
      const removeResult = await removeAddressDefault(result.data?.address.id)
      if (!removeResult.success) return failResponse
    }

    await updateDoc(addressRef, { default: true })
    return { success: true }
  } catch(e) {
    console.log(e)
    return failResponse
  }
}

export const fetchAddressById = async (
  userId: string,
  addressId: string,
): Promise<APIResponse<{ address: Address | null }>> => {
  const addressRef = doc(firestore, "address", addressId)

  try {
    const addressDoc = await getDoc(addressRef)
    return {
      success: true,
      data: {
        address: addressDoc.exists() && addressDoc.data().userId === userId ? {
          ...addressDoc.data(),
          id: addressDoc.id,
        } as Address : null
      }
    }
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to update default address, Try again!"
    }
  }
}

export const updateAddress = async (
  userId: string,
  address: Address
): Promise<APIResponse<{ addressId: string }>> => {
  const failResponse = {
    success: false,
    error: "Not able to update address details, Try again!"
  }
  const { id, ...addressDetails } = address
  if (!id) return failResponse
  const addressRef = doc(firestore, "address", id)

  try {
    const result = await fetchAddressById(userId, id)
    if (!result.data?.address) return failResponse

    await updateDoc(addressRef, { active: false, default: false })
    return await createAddress(addressDetails)
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to update default address, Try again!"
    }
  }
}
