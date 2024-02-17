import { CollectionReference, QueryDocumentSnapshot, SnapshotOptions, collection, getDocs } from "firebase/firestore"
import { firestore } from "./firebase"

type ResponseType = {
  success: boolean,
  products: { [key: string]: Array<Product> }
  error?: string,
}

export const searchProducts = async (query: string = ""): Promise<ResponseType> => {
  const productRef: CollectionReference = collection(firestore, "products")

  try {
    const data = await getDocs(productRef)
    let products: { [key: string]: Array<Product> } = {}

    // data: { [categoryKey]: { [number]: Product }}
    data.forEach((category) => {
      products[category.id] = Object.values(category.data()).map(doc => doc as Product)
    })

    return { success: true, products: products }
  } catch (e) {
    return {
      success: false,
      products: {},
      error: "Not able to create user, Try again!"
    }
  }
}
