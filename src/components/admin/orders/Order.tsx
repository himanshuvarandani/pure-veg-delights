"use client"

import { updateOrderStatus } from "@/actions/admin/orders"
import { cancelOrder, fetchOrderDetails } from "@/actions/orders"
import OrderLoading from "@/components/account/loading/Order"
import AddressCard from "@/components/address/Card"
import AddressLoadingCard from "@/components/address/Loading"
import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"

type PropsType = { orderId: string }

const Order = ({ orderId }: PropsType) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const [products, setProducts] = useState<ProductsObject>({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (loading && !orderId) return
    
    setLoading(true)
    fetchOrderDetails(orderId)
      .then(response => {
        setOrder(response.order as Order)
        setAddress(response.address as Address)
        setProducts(response.products as ProductsObject)
      })
      .finally(() => setLoading(false))
  }, [refresh, orderId])

  return loading ? (<OrderLoading />) : (
    <div>
      {!order ? (
        <div className="flex flex-col items-center p-10">
          <p>
            Invalid order Id!
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
          {
            !order ||
            order.status === "Initiated" ||
            order.status === "Cancelled" ||
            order.status === "Completed"
            ? null
            : (
              <div className="flex justify-center items-center mt-5">
                <button
                  className="rounded-2xl px-4 py-2 bg-green-700 text-white"
                  onClick={() => 
                    updateOrderStatus(order.id!, order.status)
                      .then(() => setRefresh(!refresh))
                  }
                >
                  {order.status === "Placed"
                    ? "Accept"
                    : order.status === "Accepted"
                      ? "Mark as Prepared"
                      : "Complete"
                  }
                </button>
                {order.status == "Placed" ? (
                  <button
                    className="rounded-2xl bg-red-500 text-white px-4 py-2 ml-2"
                    onClick={() => 
                      cancelOrder(order.id!)
                        .then(() => setRefresh(!refresh))
                    }
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            )
          }
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
                {!address ? (
                  <AddressLoadingCard />
                ) : (
                  <AddressCard
                    address={address}
                    deletable={false}
                    editable={false}
                  />
                )}
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
