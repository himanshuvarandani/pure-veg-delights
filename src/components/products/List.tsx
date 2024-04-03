import ProductCard from "../product/Card"

type PropsType = {
  classNames?: string
  theme: "white" | "orange"
  products: Array<Product>
}

const ProductsList = ({ classNames, theme, products=[] }: PropsType) => {
  return (
    <div className={`flex flex-wrap ${classNames}`}>
      {products.map((product: Product) => (
        <ProductCard theme={theme} product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsList
