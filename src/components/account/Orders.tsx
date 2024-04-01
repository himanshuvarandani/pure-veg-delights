"use client"

import { fetchUserOrders } from "@/firebase/order"
import useAuth from "@/hooks/useAuth"
import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"

const Orders = () => {
  const [orders, setOrders] = useState<Array<OrderWithId>>([])
  const [products, setProducts] = useState<ProductsObject>({})
  const [totalPages, setTotalPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const pageSize = 10
  const { user } = useAuth()

  useEffect(() => {
    fetchUserOrders(user?.uid!, page, pageSize)
      .then(response => {
        console.log(response)
        
        if (response) {
          setOrders(response.orders)
          setProducts(response.products)
          setTotalPages(response.totalPages)
        }
      })
      .catch(() => console.log("Error while fetching order details"))
  }, [page])

  return (
    <div className="py-10">
      {!orders.length ? (
        <div className="flex flex-col items-center p-10">
          <p>
            You haven&apos;t ordered till now. Go ahead and order now!!!
          </p>
          <Link
            href="/products"
            className="rounded-2xl bg-orange-550 text-white px-4 py-2 my-10"
          >
            Order Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-5">
          {orders.map(order => (
            <Link
              key={order.id}
              href={`/account/order/${order.id}`}
              className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 border-2 rounded-xl text-sm p-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs">
                  <p>
                    #{order.id}
                  </p>
                  <p className="pl-2 pt-1">
                    {order.placedAt.toLocaleString("default", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
                <div className="flex justify-end py-2 sm:py-0">
                  <p className="rounded-2xl border-2 border-orange-550 text-orange-550 px-2 py-1">
                    {order.status}
                  </p>
                </div>
              </div>
              <div className="px-2 my-3">
                {order.products.map(item => (
                  <div
                    className="flex justify-between items-center space-x-2"
                    key={item.product}
                  >
                    <p className="text-xs text-orange-550">
                      {products[item.product]
                        ? products[item.product].name
                        : "Product Name"
                      }
                    </p>
                    <div className="flex justify-end items-center space-x-2">
                      <FontAwesomeIcon
                        className="pt-1"
                        icon={faMultiply}
                        size="xs"
                      />
                      <p className="text-lg">{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between space-x-2">
                <h5 className="font-bold">Total Price</h5>
                <p>Rs. {order.total}/-</p>
              </div>
            </Link>
          ))}
          {totalPages <= 1 ? null : (
            <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 flex justify-around text-orange-550 my-5">
              <button
                className={page <= 1 ? "opacity-20" : ""}
                onClick={() => setPage(prev => prev > 1 ? prev-1 : prev)}
                disabled={page <= 1}
              >
                Previous
              </button>
              <button
                className={page >= totalPages ? "opacity-20" : ""}
                onClick={() => setPage(prev => prev < totalPages ? prev+1 : prev)}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Orders
