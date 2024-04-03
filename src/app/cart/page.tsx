import TodaySpecial from "@/components/products/TodaySpecial"
import CartDetails from "./_components/CartDetails"

const Cart = () => {
  return (
    <div>
      <div className="py-10 px-2 sm:px-5 md:px-10">
        <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">Cart</h2>
        <CartDetails />
      </div>
      
      <TodaySpecial theme="orange" />
    </div>
  )
}

export default Cart
