import SearchBar from "@/components/SearchBar"
import SearchProductsList from "@/components/SearchProductsList"
import TodaySpecial from "@/components/TodaySpecial"
import { todaySpecialProducts } from "@/firebase/products"
import { Suspense } from "react"

const Products = async () => {
  const todaySpecial: Array<Product> = await todaySpecialProducts()

  return (
    <div className="pt-10">
      <div className="flex justify-center pb-5">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      <Suspense>
        <SearchProductsList />
      </Suspense>

      <TodaySpecial theme="orange" />
    </div>
  )
}

export default Products
