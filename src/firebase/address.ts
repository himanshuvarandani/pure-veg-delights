import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
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
        const defAddRef = doc(firestore, "address", defAddRes.data.address.id)
        await updateDoc(defAddRef, { default: false })
      }
    } else address.default = true

    const result = await addDoc(addressRef, {
      ...address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
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

export const fetchAllAddresses = async (
  userId: string
): Promise<APIResponse<{ addresses: Address[] }>> => {
  const addressRef = collection(firestore, "address")

  try {
    const defAddQuery = query(
      addressRef,
      where("userId", '==', userId),
      orderBy("updatedAt", "desc"),
    )
    const result = await getDocs(defAddQuery)
    let addresses: Address[] = result.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    } as Address))
    
    return { success: true, data: { addresses: addresses }}
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to fetch all user address, Try again!"
    }
  }
}

export const updateDefaultAddress = async (
  userId: string,
  newDefAddId: string
): Promise<APIResponse<null>> => {
  const addressRef = doc(firestore, "address", newDefAddId)

  try {
    const result = await fetchDefaultAddress(userId)
    if (!result.success) return {
      success: false,
      error: result.error
    }
    if (result.data?.address && result.data.address.id) {
      const defAddRef = doc(firestore, "address", result.data.address.id)
      await updateDoc(defAddRef, { default: false })
    }

    await updateDoc(addressRef, { default: true })
    return { success: true }
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to update default address, Try again!"
    }
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
      error: "Not able to fetch address details, Try again!"
    }
  }
}

export const updateAddress = async (
  userId: string,
  address: Address
): Promise<APIResponse<null>> => {
  const { id, ...addressDetails } = address
  if (!id) return {
    success: false,
    error: "Not able to update address details, Try again!",
  }
  const addressRef = doc(firestore, "address", id)

  try {
    const result = await fetchAddressById(userId, id)
    if (!result.data?.address) return {
      success: false,
      error: "Wrong address details provided, Try again!"
    }

    await updateDoc(addressRef, {
      ...addressDetails,
      updateAt: new Date(),
    })
    return { success: true }
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to update address details, Try again!"
    }
  }
}


export const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<APIResponse<null>> => {
  if (!addressId) return {
    success: false,
    error: "No address details provided, Try again!"
  }
  const addressRef = doc(firestore, "address", addressId)

  try {
    const result = await fetchAddressById(userId, addressId)
    if (!result.data?.address) return {
      success: false,
      error: "Wrong address details provided, Try again!"
    }

    await deleteDoc(addressRef)
    return { success: true }
  } catch(e) {
    console.log(e)
    return {
      success: false,
      error: "Not able to delete default address, Try again!"
    }
  }
}
