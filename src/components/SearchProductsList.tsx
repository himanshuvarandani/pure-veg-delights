"use client"

import { searchProducts } from "@/firebase/products"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProductsList from "./ProductsList"

const SearchProductsList = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<CategoryProducts>({})
  
  useEffect(() => {
    searchProducts(searchParams.get("q") || "")
      .then((data) => setProducts(data))
      .catch(() => console.log("Error while fetching products"))
  }, [searchParams.get("q")])

  return (
    <div>
      {Object.keys(products).map((category) => (
        <div className="pb-10 px-2 xs:px-5 sm:px-10 lg:px-20" key={category}>
          <h3 className="text-2xl text-orange-550 font-bold mb-2">{category}</h3>
          <div className="md:px-5">
            <ProductsList theme="white" products={products[category]} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchProductsList
