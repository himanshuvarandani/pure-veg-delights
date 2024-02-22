import CartDetails from "@/components/CartDetails"
import TodaySpecial from "@/components/TodaySpecial"

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
