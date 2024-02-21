import CartProducts from "@/components/CartProducts"
import TodaySpecial from "@/components/TodaySpecial"

const Cart = () => {
  return (
    <div>
      <div className="p-10">
        <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">Cart</h2>
        <CartProducts />
      </div>
      
      <TodaySpecial theme="orange" />
    </div>
  )
}

export default Cart
