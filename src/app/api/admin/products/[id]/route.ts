import { authorize } from "@/app/api/admin/authorize"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return authorize(request, async () => {
    try {
      const productId = params.id
      const productsRef = firestore.collection("products")
      const productDoc = await productsRef.doc(productId).get()

      const productData = productDoc.data()
      if (!productDoc.exists || !productData)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Product Not Found",
        })
      
      const product: Product = {
        id: productDoc.id,
        ...productData,
        createdAt: productData.createdAt.toDate(),
        updatedAt: productData.updatedAt.toDate(),
      } as Product

      return NextResponse.json({ product }, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Fetch Product Details Admin API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Fetching Product Details" }
      )
    }
  })
}

// Update if updating any field except price otherwise
// Create new product and make this inactive if ordered previously otherwise just update
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return authorize(request, async () => {
    let {
      name,
      description="",
      price,
      category,
      image,
      tags,
      todaySpecial=false
    }: Product = await request.json()
    
    try {
      if (!name || !price || !category || !image || !tags || !tags.length)
        return NextResponse.json({}, {
          status: 400,
          statusText: "Missing Required Fields",
        })

      const productId = params.id
      const productsRef = firestore.collection("products")
      const ordersRef = firestore.collection("orders")

      const productRef = productsRef.doc(productId)
      const productDoc = await productRef.get()

      const currentProduct = productDoc.data() as Product
      if (!productDoc.exists || !currentProduct.isActive)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Product Not Found or Inactive",
        })
      
      if (price !== currentProduct.price) {
        const ordersSnapshot = await ordersRef
          .where("products.product", "array-contains", productId)
          .get()
        if (!ordersSnapshot.empty) {
          const newProductRef = productsRef.doc()
          await firestore.runTransaction(async (transaction) => {
            transaction.update(productRef, {
              isActive: false,
              updatedAt: FieldValue.serverTimestamp(),
            })

            transaction.set(newProductRef, {
              name,
              description,
              price,
              category,
              image,
              tags,
              todaySpecial,
              createdAt: currentProduct.createdAt,
              updatedAt: FieldValue.serverTimestamp(),
              isActive: true,
              isDeleted: false,
            })
          })

          return NextResponse.json(
            { productId: newProductRef.id },
            { status: 200 }
          )
        }
      }
      
      if (
        name === currentProduct.name &&
        description === currentProduct.description &&
        category === currentProduct.category &&
        image === currentProduct.image &&
        tags.length === currentProduct.tags.length &&
        currentProduct.tags.every(tag => tags.includes(tag)) &&
        todaySpecial === currentProduct.todaySpecial
      )
        return NextResponse.json({}, {
          status: 400,
          statusText: "No Changes Detected",
        })
      
      await productRef.update({
        name,
        description,
        category,
        image,
        tags,
        todaySpecial,
        updatedAt: FieldValue.serverTimestamp(),
      })

      return NextResponse.json({ productId: productRef.id }, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Update Product Details API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Updating Product Details" }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return authorize(request, async () => {
    try {
      const productId = params.id
      const productsRef = firestore.collection("products")
      const ordersRef = firestore.collection("orders")

      const productRef = productsRef.doc(productId)
      const productDoc = await productRef.get()

      if (!productDoc.exists)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Product Not Found or Inactive",
        })
      
      const ordersSnapshot = await ordersRef.get()
      const productOrders = ordersSnapshot.docs.filter(orderDoc => {
        const order = orderDoc.data() as Order
        return order.products.some(({ product }) => product === productId)
      })
      if (productOrders.length) {
        productRef.update({
          isActive: false,
          isDeleted: true,
          updatedAt: FieldValue.serverTimestamp(),
        })

        return NextResponse.json({}, { status: 200 })
      }

      await productRef.delete()

      return NextResponse.json({}, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Delete Product Admin API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Deleting Product" }
      )
    }
  })
}
