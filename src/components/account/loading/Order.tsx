import AddressLoadingCard from "@/components/address/Loading"
import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OrderLoading = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-orange-550">
            Status
          </h3>
          <div className="w-40 h-10 rounded-xl bg-gray-300" />
        </div>
        <div className="py-5">
          <h3 className="text-xl font-bold mb-2 text-orange-550">
            Products
          </h3>
          <div className="px-2 xs:px-5">
            {[1, 2, 3].map(key => (
              <div
                key={key}
                className="flex flex-col sm:flex-row justify-between sm:items-center space-x-2 py-3"
              >
                <div className="w-60 h-6 bg-gray-300" />
                <div
                  className="sm:w-1/3 flex justify-end items-center space-x-2 text-lg"
                >
                  <div className="w-20 h-6 bg-gray-300" />
                  <FontAwesomeIcon
                    className="pt-1"
                    icon={faMultiply}
                    size="xs"
                  />
                  <div className="w-8 h-6 bg-gray-300" />
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
              <AddressLoadingCard />
            </div>
          </div>
        </div>
        <div className="py-5">
          <h3 className="text-xl font-bold mb-2 text-orange-550">
            Bill Details
          </h3>
          <div className="px-2 xs:px-5">
            <div className="flex justify-between space-x-2">
              <div className="w-40 h-6 bg-gray-300" />
              <div className="w-20 h-6 bg-gray-300" />
            </div>
            <div className="flex justify-between space-x-2 mt-2">
              <div className="w-40 h-6 bg-gray-300" />
              <div className="w-20 h-6 bg-gray-300" />
            </div>
            <hr className="mt-5" />
            <div className="flex justify-between space-x-2 mt-2">
              <div className="w-40 h-6 bg-gray-300" />
              <div className="w-20 h-6 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderLoading
