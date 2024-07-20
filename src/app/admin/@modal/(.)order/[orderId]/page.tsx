import OrderDetails from "@/components/account/Order"
import Modal from "@/components/Modal"

const OrderModal = ({ params }: { params: { orderId: string } }) => {
  return (
    <Modal>
      <h2 className="text-2xl text-orange-550 text-center font-bold mb-2">Order Details</h2>
      <OrderDetails orderId={params.orderId} />
    </Modal>
  )
}

export default OrderModal
