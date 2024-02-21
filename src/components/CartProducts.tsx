"use client"

import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import ProductCard from "./ProductCard"

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
        <div className="flex flex-wrap justify-center">
          {Object.keys(cart).map(productId => (
            <ProductCard
              theme="white"
              product={cart[productId].product}
              key={productId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CartProducts
