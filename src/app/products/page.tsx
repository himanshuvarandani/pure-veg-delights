import ProductsList from "@/components/ProductsList"
import SearchBar from "@/components/SearchBar"
import SearchProductsList from "@/components/SearchProductsList"
import { todaySpecialProducts } from "@/firebase/products"
import { Suspense } from "react"

const Products = async () => {
  const todaySpecial: Array<Product> = await todaySpecialProducts()

  return (
    <div className="py-10">
      <div className="flex justify-center pb-5">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      <SearchProductsList />

      <div className="bg-orange-500 py-10 px-5 sm:px-10 lg:px-20">
        <h3 className="text-2xl text-white text-center font-bold mb-2">Today&apos;s Special</h3>
        <ProductsList
          classNames="justify-around"
          theme="orange"
          products={todaySpecial}
        />
      </div>
    </div>
  )
}

export default Products
