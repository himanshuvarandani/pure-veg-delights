import ProductsList from "@/components/ProductsList"
import SearchBar from "@/components/SearchBar"
import { searchProducts } from "@/firebase/products"
import { Suspense } from "react"

const Search = async () => {
  const { success, products, error } = await searchProducts()

  return (
    <div className="py-10">
      <div className="flex justify-center pb-5">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      {Object.keys(products).map((category) => (
        <div className="pb-10 px-5 sm:px-10 lg:px-20">
          <h3 className="text-2xl text-orange-550 font-bold mb-2">{category}</h3>
          <div className="md:px-5">
            <ProductsList theme="white" products={products[category]} />
          </div>
        </div>
      ))}

      <div className="bg-orange-500 py-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-white text-center font-bold mb-2">Today&apos;s Special</h3>
        <ProductsList
          classNames="justify-around"
          theme="orange"
          products={products["Chaats"]}
        />
      </div>
    </div>
  )
}

export default Search
