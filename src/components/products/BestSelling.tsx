import api from "@/axios/instance"
import { AxiosError } from "axios"
import ProductsList from "./List"

type PropsType = {
  theme: "white" | "orange"
}

const BestSelling = async ({ theme }: PropsType) => {
  const fetchBestSellingProducts = async (): Promise<Array<Product>> => {
    // const fromDate = new Date()
    // fromDate.setDate(fromDate.getDate() - 7)
    // { params: { fromDate } }

    return await api.get("/products/best-selling")
      .then(response => response.data.products)
      .catch((error: AxiosError) => {
        console.log("Error Fetching Best Selling Products ->", error)
        return []
      })
  }

  const products: Array<Product> = await fetchBestSellingProducts()

  return (
    <div className={`py-10 px-5 sm:px-10 lg:px-20
      ${theme === "orange" ? "bg-orange-500" : "bg-white"}
    `}>
      <h3 className={`text-2xl text-center font-bold mb-2
        ${theme === "orange" ? "text-white" : "text-orange-550"}
      `}>
        Best Selling Products
      </h3>
      <ProductsList
        classNames="justify-around"
        theme={theme}
        products={products}
      />
    </div>
  )
}

export default BestSelling
