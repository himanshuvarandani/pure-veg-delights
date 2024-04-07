import {
  faAngleLeft,
  faAngleRight,
  faMultiply
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OrdersLoading = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center space-y-5">
        {[1, 2, 3].map(key => (
          <div
            key={key}
            className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 border-2 rounded-xl p-2"
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="w-40 h-5 bg-gray-300" />
                <div className="w-32 h-5 bg-gray-300 mt-1" />
              </div>
              <div className="flex justify-end py-2 sm:py-0">
                <div className="w-40 h-10 rounded-xl bg-gray-300" />
              </div>
            </div>
            <div className="px-2 my-3">
              <div className="flex justify-between items-center space-x-2">
                <div className="w-60 h-5 bg-gray-300" />
                <div className="flex justify-end items-center space-x-2">
                  <FontAwesomeIcon
                    className="pt-1"
                    icon={faMultiply}
                    size="xs"
                  />
                  <div className="w-8 h-5 bg-gray-300" />
                </div>
              </div>
            </div>
            <div className="flex justify-between space-x-2">
              <div className="w-40 h-7 bg-gray-300" />
              <div className="w-20 h-7 bg-gray-300" />
            </div>
          </div>
        ))}
        <div
          className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 flex justify-around text-orange-550 my-5"
        >
          <button className="flex items-center space-x-1 opacity-20">
            <FontAwesomeIcon icon={faAngleLeft} size="sm" />
            <p>Previous</p>
          </button>
          <button className="flex items-center space-x-1 opacity-20">
            <p>Next</p>
            <FontAwesomeIcon icon={faAngleRight} size="sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdersLoading
