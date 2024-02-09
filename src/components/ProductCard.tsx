import Image from "next/image"

type PropsType = {
  theme: "white" | "orange"
}

const ProductCard = ({ theme }: PropsType) => {
  return (
    <div 
      className={`border-2 rounded-xl overflow-hidden w-60 m-2
        ${theme === "white" ? "border-yellow-500" : "border-white"}
      `}
    >
      <div className="relative w-full h-40">
        <Image
          src="/food.jpeg"
          alt="Food Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="py-5 px-2">
        <h5 className="sm:text-lg mb-1">Chole Kulche</h5>
        <p
          className={`text-2xl font-bold mb-4
            ${theme === "white" ? "text-orange-550" : "text-white"}
          `}
        >
          Rs. 70
        </p>
        <button
          className={`w-full rounded-2xl text-center px-4 py-2
            ${theme === "white" ? "bg-orange-550" : "bg-white"}
          `}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
