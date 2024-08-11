import OrderDetails from "@/components/admin/orders/Order"

const Order = ({ params }: { params: { orderId: string } }) => {
  return (
    <div className="py-10 px-2 sm:px-5 md:px-10">
      <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">
        Order Details
      </h2>
      <div className="flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
          <OrderDetails orderId={params.orderId} />
        </div>
      </div>
    </div>
  )
}

export default Order
