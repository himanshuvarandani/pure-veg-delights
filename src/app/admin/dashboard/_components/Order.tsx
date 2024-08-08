import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type OrderProps = {
  order: Order
  address: Address
  products: ProductsObject
}

const Order = ({ order, address, products }: OrderProps) => {
  return (
    <Link
      key={order.id}
      href={`/admin/order/${order.id}`}
      className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 border-2 rounded-xl text-sm p-2"
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="text-xs">
          <p>
            #{order.id}
          </p>
          <p className="pl-2 pt-1">
            {new Date(order.timestamps.placed).toLocaleString(
              "default",
              { dateStyle: "medium", timeStyle: "short" }
            )}
          </p>
        </div>
        <div className="flex justify-end py-2 sm:py-0">
          <button
            className={`rounded-2xl px-2 py-1 ${order.status === "Completed"
              ? "border-2 border-green-700 text-green-700"
              : order.status === "Cancelled"
                ? "border-2 border-orange-550 text-orange-550"
                : "bg-green-700 text-white"
            }`}
          >
            {order.status === "Placed"
              ? "Accept"
              : order.status === "Accepted"
                ? "Mark as Prepared"
                : order.status === "Prepared"
                  ? "Complete"
                  : order.status
            }
          </button>
          {(order.status === "Completed" ||
            order.status === "Cancelled") ? null : (
            <button
              className="rounded-2xl bg-red-500 text-white px-2 py-1 ml-2"
            >
              Cancel
            </button>
          )}
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
  )
}

export default Order
