import { todaySpecialProducts } from "@/firebase/products"
import ProductsList from "./List"

type PropsType = {
  theme: "white" | "orange"
}

const BestSelling = async ({ theme }: PropsType) => {
  // change api to bestselling products
  const products: Array<Product> = await todaySpecialProducts()

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
