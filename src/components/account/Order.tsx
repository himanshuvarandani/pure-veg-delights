"use client"

import AddressCard from "@/components/address/Card"
import { fetchOrderDetails } from "@/firebase/order"
import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import OrderLoading from "./loading/Order"

type PropsType = { orderId: string }

const Order = ({ orderId }: PropsType) => {
  const { isLoading, user } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [products, setProducts] = useState<ProductsObject>({})
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    setPageLoading(true)
    if (isLoading || !user) return

    fetchOrderDetails(orderId, user.uid)
      .then(response => {
        if (response.success) {
          if (response.data) {
            setOrder(response.data?.order)
            setProducts(response.data?.products)
          }
          setPageLoading(false)
        } else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Fetching Order Details"))
  }, [isLoading, user])

  return pageLoading ? (<OrderLoading />) : (
    <div>
      {!order ? (
        <div className="flex flex-col items-center p-10">
          <p>
            Wrong order Id. Please check the order id again.
          </p>
          <Link
            href="/products"
            className="rounded-2xl bg-orange-550 text-white px-4 py-2 my-10"
          >
            Order Again
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-orange-550">
              Status
            </h3>
            <p className="rounded-2xl border-2 border-orange-550 text-xs sm:text-sm md:text-base text-orange-550 px-4 py-2 my-5">
              {order.status}
            </p>
          </div>
          <div className="py-5">
            <h3 className="text-xl font-bold mb-2 text-orange-550">
              Products
            </h3>
            <div className="px-2 xs:px-5">
              {order.products.map(item => (
                <div
                  key={item.product}
                  className="flex flex-col sm:flex-row justify-between sm:items-center space-x-2 py-3"
                >
                  <p className="sm:w-2/3">{products[item.product].name}</p>
                  <div className="sm:w-1/3 flex justify-end items-center space-x-2 text-lg">
                    <p>Rs. {products[item.product].price}/-</p>
                    <FontAwesomeIcon icon={faMultiply} height={15} />
                    <p>{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-5">
            <h3 className="text-xl font-bold mb-2 text-orange-550">
              Address
            </h3>
            <div className="flex justify-center">
              <div className="w-full sm:w-3/4">
                <AddressCard
                  address={order.address}
                  deletable={false}
                  editable={false}
                />
              </div>
            </div>
          </div>
          <div className="py-5">
            <h3 className="text-xl font-bold mb-2 text-orange-550">
              Bill Details
            </h3>
            <div className="px-2 xs:px-5">
              <div className="flex justify-between space-x-2">
                <h5 className="font-bold">Item Total</h5>
                <p>Rs. {order.itemsPrice}/-</p>
              </div>
              <div className="flex justify-between space-x-2 mt-2">
                <h5 className="font-bold">G.S.T.</h5>
                <p>Rs. {order.gst}/-</p>
              </div>
              <hr className="mt-5" />
              <div className="flex justify-between space-x-2 mt-2">
                <h5 className="font-bold">Total Price</h5>
                <p>Rs. {order.total}/-</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
