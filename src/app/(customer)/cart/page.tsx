import ProductsLoading from "@/components/products/Loading"
import TodaySpecial from "@/components/products/TodaySpecial"
import { Suspense } from "react"
import CartDetails from "./_components/CartDetails"

const Cart = () => {
  return (
    <div>
      <div className="py-10 px-2 sm:px-5 md:px-10">
        <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">Cart</h2>
        <CartDetails />
      </div>
      
      <Suspense
        fallback={<ProductsLoading theme="orange" heading="Today's Special" />}
      >
        <TodaySpecial theme="orange" />
      </Suspense>
    </div>
  )
}

export default Cart
