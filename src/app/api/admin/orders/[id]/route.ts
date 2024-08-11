import { authorize } from "@/app/api/admin/authorize"
import { firestore } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { FieldValue } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

type UpdateOrderRequest = { status: string }

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return authorize(request, async () => {
    try {
      const { status }: UpdateOrderRequest = await request.json()

      if (!status)
        return NextResponse.json({}, {
          status: 400,
          statusText: "Invalid Order Status"
        })

      const ordersRef = firestore.collection("orders")

      const orderId = params.id
      const orderRef = ordersRef.doc(orderId)
      const orderDoc = await orderRef.get()

      const order = orderDoc.data() as Order
      if (!orderDoc.exists || !order)
        return NextResponse.json({}, {
          status: 404,
          statusText: "Order Not Found"
        })

      const updateData: any = {}
      let validTransition = false

      switch (status) {
        case "Accepted":
          if (order.status === "Placed") {
            updateData.status = "Accepted"
            updateData["timestamps.accepted"] = FieldValue.serverTimestamp()
            validTransition = true
          }
          break
        case "Prepared":
          if (order.status === "Accepted") {
            updateData.status = "Prepared"
            updateData["timestamps.prepared"] = FieldValue.serverTimestamp()
            validTransition = true
          }
          break
        case "Completed":
          if (order.status === "Prepared") {
            updateData.status = "Completed"
            updateData["timestamps.completed"] = FieldValue.serverTimestamp()
            validTransition = true
          }
          break
        default:
          return NextResponse.json({}, {
            status: 400,
            statusText: "Invalid Order Status"
          })
      }

      if (!validTransition)
        return NextResponse.json({}, {
          status: 400,
          statusText: `Invalid status transition from ${order.status} to ${status}`
        })

      await orderRef.update(updateData)

      return NextResponse.json({}, { status: 200 })
    } catch (err: any) {
      const error: FirebaseAppError = err
      console.log("Update Order Status API Error -> ", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500, statusText: "Error Updating Order Status" }
      )
    }
  })
}
