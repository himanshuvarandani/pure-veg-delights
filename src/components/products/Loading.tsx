import ProductLoadingCard from "../product/LoadingCard"

type PropsType = {
  theme: "white" | "orange"
  heading: string
}

const ProductsLoading = ({ theme, heading }: PropsType) => {
  return (
    <div className={`py-10 px-5 sm:px-10 lg:px-20
      ${theme === "orange" ? "bg-orange-500" : "bg-white"}
    `}>
      <h3 className={`text-2xl text-center font-bold mb-2
        ${theme === "orange" ? "text-white" : "text-orange-550"}
      `}>
        {heading}
      </h3>
      <div className="flex flex-wrap justify-around">
        <ProductLoadingCard theme={theme} />
        <ProductLoadingCard theme={theme} />
        <ProductLoadingCard theme={theme} />
        <ProductLoadingCard theme={theme} />
        <ProductLoadingCard theme={theme} />
      </div>
    </div>
  )
}

export default ProductsLoading
