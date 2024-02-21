"use client"

import Link from "next/link"
import ProductsList from "./ProductsList"
import useAuth from "@/hooks/useAuth"

const CartProducts = () => {
  const { cart } = useAuth()

  return (
    <div>
      {!cart || !Object.keys(cart).length ? (
        <div className="p-10 text-center">
          <p>
            Your Cart is Empty! Add products from&nbsp;
            <Link href="/products" className="text-blue-600 underline">
              here
            </Link>
          </p>
        </div>
      ) : (
        <ProductsList theme="white" products={[]} />
      )}
    </div>
  )
}

export default CartProducts
