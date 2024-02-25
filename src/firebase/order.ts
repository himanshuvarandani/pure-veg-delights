import { Timestamp, addDoc, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore"
import { firestore } from "./firebase"

export const createOrder = async (
  order: Order
) => {
  const orderRef = collection(firestore, "orders")

  try {
    const result = await addDoc(orderRef, order)
    return result.id
  } catch(e) {
    console.log(e)
    return null
  }
}

export const updateOrder = async (
  orderId: string,
  status: OrderStatus,
  razorpayOrderId: string = "",
  razorpayPaymentId: string = "",
): Promise<{ success: boolean, error?: string}> => {
  const orderRef = doc(firestore, "orders", orderId)

  try {
    await updateDoc(orderRef, { status, razorpayOrderId, razorpayPaymentId })
    return { success: true }
  } catch (e) {
    return { success: false, error: "Not able to create user, Try again!" }
  }
}

export const fetchOrderDetails = async (
  orderId: string,
  userId: string,
): Promise<{ order: Order, products: ProductsObject } | null> => {
  const orderRef = doc(firestore, "orders", orderId)

  try {
    const result = await getDoc(orderRef)
    const data = result.data()
    if (data) {
      const order: Order = {
        ...data as Order,
        placedAt: data.placedAt.toDate(),
        lastUpdated: data.lastUpdated.toDate(),
      }

      if (order.userId === userId) {
        const promises: Array<Promise<ProductsObject>> =
          order.products.map(async (item: Order["products"][0]) => {
            const productRef = doc(firestore, "products", item.product)
            const product = await getDoc(productRef)
            return { [item.product]: product.data() as Product }
          })

        const productObjectsArray: Array<ProductsObject> = await Promise.all(promises)
        const products: ProductsObject = Object.assign({}, ...productObjectsArray)

        return { order, products }
      }
    }
    return null
  } catch (e) {
    return null
  }
}

export const fetchUserOrders = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<{
    orders: Array<OrderWithId>,
    products: ProductsObject,
    totalOrders: number,
    totalPages: number,
  } | null
> => {
  const ordersRef = collection(firestore, "orders")

  try {
    const p1 = async () => {
      let lastDoc = null
      
      if (page > 1) {
        const lastDocQuery = query(
          ordersRef,
          orderBy("userId"),
          where("userId", '==', userId),
          orderBy("placedAt", "desc"),
          limit((page-1)*pageSize),
        )
        const result = await getDocs(lastDocQuery)

        if (!result.docs.length)
          return { orders: [], products: {} }
        
        lastDoc = result.docs[result.docs.length-1]
      }
      
      const ordersQuery = query(
        ordersRef,
        orderBy("userId"),
        where("userId", '==', userId),
        orderBy("placedAt", "desc"),
        startAfter(lastDoc),
        limit(pageSize),
      )
      const result = await getDocs(ordersQuery)
      
      const orders: Array<OrderWithId> = []
      let promises: Array<Promise<ProductsObject>> = []

      if (!result.docs.length)
        return { orders: [], products: {} }
      
      result.docs.forEach(document => {
        const order = document.data()
        orders.push({
          id: document.id,
          ...order as Order,
          placedAt: order.placedAt.toDate(),
          lastUpdated: order.lastUpdated.toDate(),
        })
        
        promises = promises.concat(
          order.products.map(async (item: Order["products"][0]) => {
            const productRef = doc(firestore, "products", item.product)
            const product = await getDoc(productRef)
            return { [item.product]: product.data() as Product }
          })
        )
      })

      const productObjectsArray: Array<ProductsObject> = await Promise.all(promises)
      const products: ProductsObject = Object.assign({}, ...productObjectsArray)

      return { orders, products }
    }
    
    const p2 = async () => {
      const countQuery = query(
        ordersRef,
        where("userId", "==", userId),
      )
      const snapshot = await getCountFromServer(countQuery)
      return {
        totalOrders: snapshot.data().count,
        totalPages: Math.ceil(snapshot.data().count/pageSize),
      }
    }

    const result = await Promise.all([p1(), p2()])
    return Object.assign({}, ...result)
  } catch (e) {
    return null
  }
}
