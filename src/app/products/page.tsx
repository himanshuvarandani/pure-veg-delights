import TodaySpecial from "@/components/products/TodaySpecial"
import { Suspense } from "react"
import SearchBar from "./_components/SearchBar"
import SearchProductsList from "./_components/SearchProductsList"

const Products = (
  { searchParams }: { searchParams: { q: string | undefined } }
) => {
  return (
    <div className="pt-10">
      <div className="flex justify-center pb-5">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      <Suspense>
        <SearchProductsList query={searchParams.q} />
      </Suspense>

      <TodaySpecial theme="orange" />
    </div>
  )
}

export default Products
