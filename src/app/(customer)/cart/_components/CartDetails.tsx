"use client"

import ProductCard from "@/components/product/Card"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import { useEffect, useState } from "react"
import CartAddress from "./CartAddress"
import CartLoading from "./Loading"
import PlaceOrder from "./PlaceOrder"

const CartDetails = () => {
  const { isLoading, cart } = useAuth()
  const [itemsPrice, setItemsPrice] = useState<number>()
  const [gst, setGST] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [address, setAddress] = useState<Address | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    if (isLoading || !cart) return

    let itemsTotal = 0
    Object.keys(cart).map(productId => {
      itemsTotal += cart[productId].product.price * cart[productId].quantity
    })
    const gstTemp = (itemsTotal*18)/100

    setItemsPrice(itemsTotal)
    setGST(gstTemp)
    setTotal(itemsTotal + gstTemp)
    setPageLoading(false)
  }, [isLoading, cart])

  return pageLoading ? (<CartLoading />) : (
    <div>
      {!cart || !Object.keys(cart).length ? (
        <div className="flex flex-col items-center p-10">
          <p>
            Your Cart is Empty!!!
          </p>
          <Link
            href="/products"
            className="rounded-2xl bg-orange-550 text-white px-4 py-2 my-10"
          >
            Add Products
          </Link>
        </div>
      ) : (
        <>
          <div>
            <div className="flex flex-wrap justify-center">
              {Object.keys(cart).map(productId => (
                <ProductCard
                  theme="white"
                  product={cart[productId].product}
                  key={productId}
                />
              ))}
            </div>
          </div>
          <CartAddress
            address={address}
            updateAddress={(address: Address | null) => setAddress(address)}
          />
          <div className="flex flex-col items-center">
            <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-10">
              <h3 className="text-xl text-center font-bold text-orange-550 mb-5">
                Bill Details
              </h3>
              <div className="px-2 xs:px-5 md:px-0">
                <div className="flex justify-between space-x-2">
                  <h5 className="font-bold">Items Total</h5>
                  <p>Rs. {itemsPrice}/-</p>
                </div>
                <div className="flex justify-between space-x-2 mt-2">
                  <h5 className="font-bold">G.S.T.</h5>
                  <p>Rs. {gst}/-</p>
                </div>
                <hr className="mt-5" />
                <div className="flex justify-between space-x-2 mt-2">
                  <h5 className="font-bold">To Pay</h5>
                  <p>Rs. {total}/-</p>
                </div>
              </div>
            </div>
            <PlaceOrder address={address} />
          </div>
        </>
      )}
    </div>
  )
}

export default CartDetails
