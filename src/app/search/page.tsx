import ProductsList from "@/components/ProductsList"

const Search = () => {
  return (
    <div className="py-10">
      <div className="pb-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-orange-550 text-center font-bold mb-2">Breakfast</h3>
        <ProductsList theme="white" />
      </div>
      <div className="pb-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-orange-550 text-center font-bold mb-2">Meals</h3>
        <ProductsList theme="white" />
      </div>
      <div className="pb-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-orange-550 text-center font-bold mb-2">Snacks</h3>
        <ProductsList theme="white" />
      </div>
      <div className="pb-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-orange-550 text-center font-bold mb-2">Rice</h3>
        <ProductsList theme="white" />
      </div>
      <div className="pb-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-orange-550 text-center font-bold mb-2">Breads</h3>
        <ProductsList theme="white" />
      </div>

      <div className="bg-orange-500 py-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-white text-center font-bold mb-2">Today's Special</h3>
        <ProductsList classNames="justify-around" theme="orange" />
      </div>
    </div>
  )
}

export default Search
