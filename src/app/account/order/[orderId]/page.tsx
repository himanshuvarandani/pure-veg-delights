import OrderDetails from "@/components/OrderDetails"
import Services from "@/components/Services"

const Order = ({ params }: { params: { orderId: string } }) => {
  return (
    <div>
      <div className="py-10 px-2 sm:px-5 md:px-10">
        <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">Order Details</h2>
        <OrderDetails orderId={params.orderId} />        
      </div>
      
      <Services />
    </div>
  )
}

export default Order
