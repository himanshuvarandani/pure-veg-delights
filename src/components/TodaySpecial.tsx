import { todaySpecialProducts } from "@/firebase/products"
import ProductsList from "./ProductsList"

type PropsType = {
  theme: "white" | "orange"
}

const TodaySpecial = async ({ theme }: PropsType) => {
  const products: Array<Product> = await todaySpecialProducts()

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
