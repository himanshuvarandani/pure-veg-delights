import { CollectionReference, collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "./firebase"

type ResponseType = {
  success: boolean,
  products: CategoryProducts
  error?: string,
}

export const searchProducts = async (
  searchQuery: string = ""
): Promise<ResponseType> => {
  const productRef: CollectionReference = collection(firestore, "products")

  try {
    const productsQuery = query(
      productRef,
      where("tags", "array-contains-any", searchQuery.split(" "))
    )
    
    const data = await getDocs(!searchQuery ? productRef : productsQuery)
    let products: CategoryProducts = {}
    
    data.docs.forEach(doc => {
      const data = doc.data()

      if (!products[data.category])
        products[data.category] = []

      products[data.category].push({ id: doc.id, ...data } as Product)
    })

    return { success: true, products: products }
  } catch (e) {
    return {
      success: false,
      products: {},
      error: "Not able to fetch products, Try again!"
    }
  }
}
