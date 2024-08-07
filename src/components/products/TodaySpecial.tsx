import api from "@/axios/instance"
import { AxiosError } from "axios"
import ProductsList from "./List"

type PropsType = {
  theme: "white" | "orange"
}

const TodaySpecial = async ({ theme }: PropsType) => {
  const fetchTodaySpecialProducts = async (): Promise<Array<Product>> => {
    return await api.get("/products/today-special")
      .then(response => response.data.products)
      .catch((error: AxiosError) => {
        console.log("Error Fetching Today's Special Products ->", error)
        return []
      })
  }
  const products: Array<Product> = await fetchTodaySpecialProducts()
  
  return (
    <div className={`py-10 px-5 sm:px-10 lg:px-20
      ${theme === "orange" ? "bg-orange-500" : "bg-white"}
    `}>
      <h3 className={`text-2xl text-center font-bold mb-2
        ${theme === "orange" ? "text-white" : "text-orange-550"}
      `}>
        Today&apos;s Special
      </h3>
      <ProductsList
        classNames="justify-around"
        theme={theme}
        products={products}
      />
    </div>
  )
}

export default TodaySpecial
