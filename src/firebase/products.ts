import { CollectionReference, collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "./firebase"

export const searchProducts = async (
  searchQuery: string = ""
): Promise<CategoryProducts> => {
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

    return products
  } catch (e) {
    return {}
  }
}

export const todaySpecialProducts = async (): Promise<Array<Product>> => {
  const productRef: CollectionReference = collection(firestore, "products")

  try {
    const productsQuery = query(
      productRef,
      where("todaySpecial", "==", true)
    )
    
    const data = await getDocs(productsQuery)
    let products: Array<Product> = []
    
    data.docs.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() } as Product)
    })

    return products
  } catch (e) {
    return []
  }
}
