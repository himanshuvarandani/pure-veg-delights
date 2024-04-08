import {
  CollectionReference,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
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
  const productsLimit = 5

  try {
    const productsQuery = query(
      productRef,
      where("todaySpecial", "==", true),
      limit(productsLimit)
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

export const bestSellingProducts = async (): Promise<Array<Product>> => {
  const soldProductRef = collection(firestore, "sold-products")
  const productsLimit = 5

  try {
    const soldProductsQuery = query(
      soldProductRef,
      orderBy("quantity", "desc"),
      limit(productsLimit),
    )
    
    const data = await getDocs(soldProductsQuery)
    let productIds: string[] = []
    data.docs.forEach(doc => {
      productIds.push(doc.id)
    })

    const promises: Promise<Product>[] =
      productIds.map(async (id: string) => {
        const productRef = doc(firestore, "products", id)
        const product = await getDoc(productRef)
        return { ...product.data(), id } as Product
      })
    
    const products: Product[] = await Promise.all(promises)

    return products
  } catch (e) {
    return []
  }
}
