import TodaySpecial from "@/components/products/TodaySpecial"
import { Suspense } from "react"
import SearchBar from "./_components/SearchBar"
import SearchProductsList from "./_components/SearchProductsList"

const Products = async () => {
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
