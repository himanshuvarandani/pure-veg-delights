import { collection, getDocs } from "firebase/firestore"
import { firestore } from "./firebase"

export const categoriesList = async (): Promise<Array<string>> => {
  const categoryRef = collection(firestore, "categories")

  try {
    const data = await getDocs(categoryRef)

    return data.docs.map(doc => doc.data().name)
  } catch(e) {
    return []
  }
}
