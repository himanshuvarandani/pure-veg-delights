import ProductCard from "./ProductCard"

type PropsType = {
  classNames?: string
  theme: "white" | "orange"
}

const ProductsList = ({ classNames, theme }: PropsType) => {
  return (
    <div className={`flex flex-wrap ${classNames}`}>
      <ProductCard theme={theme} />
      <ProductCard theme={theme} />
      <ProductCard theme={theme} />
      <ProductCard theme={theme} />
      <ProductCard theme={theme} />
    </div>
  )
}

export default ProductsList
