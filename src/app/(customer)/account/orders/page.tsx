import OrdersList from "@/components/account/Orders"

const Orders = () => {
  return (
    <div className="py-10 px-2 sm:px-5 md:px-10">
      <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">Your Orders</h2>
      <OrdersList />
    </div>
  )
}

export default Orders
