import AddressLoadingCard from "@/components/address/Loading"
import ProductLoadingCard from "@/components/product/LoadingCard"

const CartLoading = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {[1, 2, 3].map(key => (
          <ProductLoadingCard theme="white" key={key} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 pt-10">
          <h3 className="text-xl text-center font-bold text-orange-550 mb-5">
            Address
          </h3>
          <div className="flex justify-center">
            <div className="w-full sm:w-3/4">
              <AddressLoadingCard />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-10">
          <h3 className="text-xl text-center font-bold text-orange-550 mb-5">
            Bill Details
          </h3>
          <div className="px-2 xs:px-5 md:px-0">
            <div className="flex justify-between space-x-2">
              <h5 className="font-bold">Item Total</h5>
              <div className="w-20 h-6 bg-gray-300" />
            </div>
            <div className="flex justify-between space-x-2 mt-2">
              <h5 className="font-bold">G.S.T.</h5>
              <div className="w-20 h-6 bg-gray-300" />
            </div>
            <hr className="mt-5" />
            <div className="flex justify-between space-x-2 mt-2">
              <h5 className="font-bold">To Pay</h5>
              <div className="w-20 h-6 bg-gray-300" />
            </div>
          </div>
        </div>
        <button
          className="rounded-2xl bg-orange-550 text-white px-4 py-2 my-5 opacity-20"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CartLoading
