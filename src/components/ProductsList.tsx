import ProductCard from "./ProductCard"

type PropsType = {
  classNames: string
}

const ProductsList = ({ classNames }: PropsType) => {
  return (
    <div className={`flex flex-wrap ${classNames}`}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default ProductsList
