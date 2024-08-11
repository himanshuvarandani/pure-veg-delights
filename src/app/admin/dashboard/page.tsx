"use client"

import { fetchOrders } from "@/actions/admin/orders"
import OrdersLoading from "@/components/account/loading/Orders"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Order from "./_components/Order"

type TabsType = "all" | "new" | "current" | "delivery"

const AdminDashboard = () => {
  const [tab, setTab] = useState<TabsType>("current")
  const [orders, setOrders] = useState<Array<Order>>([])
  const [addresses, setAddresses] = useState<AddressesObject>({})
  const [products, setProducts] = useState<ProductsObject>({})
  const [totalPages, setTotalPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const pageSize = 10

  useEffect(() => {
    if (loading) return

    setLoading(true)
    fetchOrders(page, pageSize, tab)
      .then(response => {
        setOrders(response.orders as Array<Order>)
        setAddresses(response.addresses as AddressesObject)
        setProducts(response.products as ProductsObject)
        setTotalPages(response.totalPages)
      })
      .finally(() => setLoading(false))
  }, [page, pageSize, tab])

  return (
    <div>
      <div className="flex justify-around space-x-2 text-xs md:text-sm py-5 px-2">
        <button
          className={`cursor-pointer ${tab === "new" ? "text-orange-550" : ""}`}
          onClick={() => setTab("new")}
        >
          New Orders
        </button>
        <button
          className={`cursor-pointer ${tab === "current" ? "text-orange-550" : ""}`}
          onClick={() => setTab("current")}
        >
          Current Orders
        </button>
        <button
          className={`cursor-pointer ${tab === "delivery" ? "text-orange-550" : ""}`}
          onClick={() => setTab("delivery")}
        >
          Orders for Delivery
        </button>
        <button
          className={`cursor-pointer ${tab === "all" ? "text-orange-550" : ""}`}
          onClick={() => setTab("all")}
        >
          All Orders
        </button>
      </div>
      {loading ? (<OrdersLoading />) : (
        <div className="py-10 px-2 xs:px-5">
          {!orders.length ? (
            <div className="flex flex-col items-center p-10">
              <p>No Orders available in this tab</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-5">
              {orders.map(order => 
                <Order
                  key={order.id}
                  order={order}
                  address={addresses[order.address]}
                  products={products}
                />
              )}
              {totalPages <= 1 ? null : (
                <div
                  className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 flex justify-around text-orange-550 my-5"
                >
                  <button
                    className={`flex items-center space-x-1
                      ${page <= 1 ? "opacity-20" : ""}
                    `}
                    onClick={() => setPage(prev => prev > 1 ? prev-1 : prev)}
                    disabled={page <= 1}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} size="sm" />
                    <p>Previous</p>
                  </button>
                  <button
                    className={`flex items-center space-x-1
                      ${page >= totalPages ? "opacity-20" : ""}
                    `}
                    onClick={() => setPage(prev => prev < totalPages ? prev+1 : prev)}
                    disabled={page >= totalPages}
                  >
                    <p>Next</p>
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
