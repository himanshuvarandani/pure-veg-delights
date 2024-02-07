import Image from "next/image"

const ProductCard = () => {
  return (
    <div className="border-2 border-yellow-500 rounded-xl overflow-hidden w-60 m-2">
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
        <p className="text-2xl text-orange-550 font-bold mb-4">Rs. 70</p>
        <button className="w-full rounded-2xl bg-orange-550 text-center px-4 py-2">Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard
