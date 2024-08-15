"use client"

import { restoreProduct, deleteProduct } from "@/actions/admin/products"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type PropsType = {
  theme: "white" | "orange"
  product: Product
  task: "delete" | "restore"
}

const Product = ({ theme, product, task }: PropsType) => {
  const [hover, setHover] = useState(false)

  return (
    <Link
      className={`w-full sm:w-60 border-2 rounded-xl overflow-hidden flex sm:flex-col sm:justify-between shadow-xl m-2
        ${theme === "white" ? "border-yellow-500" : "border-white"}
      `}
      href={`/admin/products/${product.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
        <p className="text-xs sm:text-sm sm: mb-2">{product.description}</p>
        <div>
          <p
            className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-4
              ${theme === "white" ? "text-orange-550" : "text-white"}
            `}
          >
            Rs. {product.price}/-
          </p>
          {task === "delete" ? (
            <button
              className={`w-full rounded-2xl text-sm sm:text-base text-center px-4 py-2
                ${theme === "white" ? "bg-orange-550" : "bg-white"}
              `}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()

                deleteProduct(product.id)
              }}
            >
              Delete
            </button>
          ) : (
            <button
              className={`w-full rounded-2xl text-sm sm:text-base text-center px-4 py-2
                ${theme === "white" ? "bg-orange-550" : "bg-white"}
              `}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                
                restoreProduct(product.id)
              }}
            >
              Restore
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Product
