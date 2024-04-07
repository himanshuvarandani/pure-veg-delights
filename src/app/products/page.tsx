import ProductsLoading from "@/components/products/Loading"
import TodaySpecial from "@/components/products/TodaySpecial"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import SearchBar from "./_components/SearchBar"
import SearchListLoading from "./_components/SearchListLoading"

const SearchProductsList = dynamic(
  () => import("./_components/SearchProductsList"),
  { loading: SearchListLoading }
)

const Products = (
  { searchParams }: { searchParams: { q: string | undefined } }
) => {
  return (
    <div className="pt-10">
      <div className="flex justify-center pb-5">
        <SearchBar searchQuery={searchParams.q} />
      </div>

      <SearchProductsList query={searchParams.q} />

      <Suspense
        key="today-special"
        fallback={<ProductsLoading theme="white" heading="Today's Special" />}
      >
        <TodaySpecial theme="orange" />
      </Suspense>
    </div>
  )
}

export default Products
