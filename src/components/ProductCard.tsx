import Image from "next/image"

type PropsType = {
  theme: "white" | "orange"
  product: Product
}

const ProductCard = ({ theme, product }: PropsType) => {
  return (
    <div 
      className={`border-2 rounded-xl overflow-hidden flex sm:flex-col sm:justify-between w-full sm:w-60 m-2
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
          <button
            className={`w-full rounded-2xl text-sm sm:text-base text-center px-4 py-2
              ${theme === "white" ? "bg-orange-550" : "bg-white"}
            `}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
