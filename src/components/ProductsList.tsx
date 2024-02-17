import ProductCard from "./ProductCard"

type PropsType = {
  classNames?: string
  theme: "white" | "orange"
  products: Array<Product>
}

const ProductsList = ({ classNames, theme, products=[] }: PropsType) => {
  return (
    <div className={`flex flex-wrap ${classNames}`}>
      {products.map((product: Product) => (
        <ProductCard theme={theme} product={product} key={product.name} />
      ))}
    </div>
  )
}

export default ProductsList
