import Image from "next/image"
import AddToCart from "./AddToCart"

type PropsType = {
  theme: "white" | "orange"
  product: Product
}

const ProductCard = ({ theme, product }: PropsType) => {
  return (
    <div 
      className={`w-full sm:w-60 border-2 rounded-xl overflow-hidden flex sm:flex-col sm:justify-between shadow-xl m-2
        ${theme === "white" ? "border-yellow-500" : "border-white"}
      `}
    >
      <div className="relative h-full w-20 xs:w-28 sm:w-full sm:h-40">
        <Image
          src={product.image}
          alt="Food Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between py-2 sm:py-5 px-3">
        <h5 className="text-sm sm:text-lg sm:mb-2">{product.name}</h5>
        <div>
          <p
            className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-4
              ${theme === "white" ? "text-orange-550" : "text-white"}
            `}
          >
            Rs. {product.price}/-
          </p>
          <AddToCart theme={theme} product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
