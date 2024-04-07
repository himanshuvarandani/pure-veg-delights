import ProductLoadingCard from "@/components/product/LoadingCard"

const SearchListLoading = () => {
  return (
    <div>
      <div className="pb-10 px-2 xs:px-5 sm:px-10 lg:px-20">
        <div className="w-40 h-8 bg-gray-300" />
        <div className="md:px-5">
          <div className="flex flex-wrap">
            <ProductLoadingCard theme="white" />
            <ProductLoadingCard theme="white" />
            <ProductLoadingCard theme="white" />
          </div>
        </div>
      </div>
      <div className="pb-10 px-2 xs:px-5 sm:px-10 lg:px-20">
        <div className="w-40 h-8 bg-gray-300" />
        <div className="md:px-5">
          <div className="flex flex-wrap">
            <ProductLoadingCard theme="white" />
            <ProductLoadingCard theme="white" />
            <ProductLoadingCard theme="white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchListLoading
