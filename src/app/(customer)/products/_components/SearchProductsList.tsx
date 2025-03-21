import api from "@/axios/instance"
import ProductsList from "@/components/products/List"
import { AxiosError } from "axios"

const SearchProductsList = async (
  { query }: { query: string | undefined }
) => {
  const fetchProducts = async (): Promise<CategoryProducts> => {
    return await api.get("/products", { params: { q: query } })
      .then(response => response.data.products)
      .catch((error: AxiosError) => {
        console.log(
          "Error Fetching Products With Search Query ", query, " ->", error
        )
        return {}
      })
  }

  const products: CategoryProducts = await fetchProducts()

  return (
    <div>
      {!products || !Object.keys(products).length
        ? (
          <p className="py-10 text-center text-orange-550">
            <span className="text-lg font-bold">Sorry!!</span>
            &nbsp;No Products Available for this search query.
          </p>
        ) : Object.keys(products).map((category) => (
          <div className="pb-10 px-2 xs:px-5 sm:px-10 lg:px-20" key={category}>
            <h3 className="text-2xl text-orange-550 font-bold mb-2">{category}</h3>
            <div className="md:px-5">
              <ProductsList theme="white" products={products[category]} />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default SearchProductsList
