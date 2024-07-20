"use client"

import OrdersLoading from "@/components/account/loading/Orders"
import { fetchUserOrders } from "@/firebase/order"
import useAuth from "@/hooks/useAuth"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Order from "./_components/Order"

type TabsType = "all" | "new" | "current" | "delivery"

const AdminDashboard = () => {
  const { isLoading, user } = useAuth()
  const [tab, setTab] = useState<TabsType>("current")
  const [orders, setOrders] = useState<OrderWithId[]>([])
  const [products, setProducts] = useState<ProductsObject>({})
  const [totalPages, setTotalPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [pageLoading, setPageLoading] = useState(true)
  const pageSize = 10

  useEffect(() => {
    setPageLoading(true)
    if (isLoading || !user) return

    fetchUserOrders(user.uid, page, pageSize)
      .then(response => {
        if (response.success) {
          if (response.data) {
            setOrders(response.data.orders)
            setProducts(response.data.products)
            setTotalPages(response.data.totalPages)
          }
          setPageLoading(false)
        } else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Fetching Orders"))
  }, [isLoading, user, page, tab])

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
      {pageLoading ? (<OrdersLoading />) : (
        <div className="py-10 px-2 xs:px-5">
          {!orders.length ? (
            <div className="flex flex-col items-center p-10">
              <p>No Orders available in this tab</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-5">
              {orders.map(order => 
                <Order order={order} products={products} />
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
