"use client"

import api from "@/axios/instance"
import ProductCard from "@/components/admin/products/Card"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const DeletedProducts = () => {
  const [products, setProducts] = useState<CategoryProducts>({})

  useEffect(() => {
    api.get("/admin/products/deleted")
      .then(response => setProducts(response.data.products))
      .catch((error: AxiosError) => {
        console.log("Error Fetching Deleted Products", error)
        toast.error(error.response?.statusText || "Error Fetching Deleted Products")
      })
  }, [])

  return (
    <div className="pt-10">
      <h2 className="text-3xl text-orange-550 text-center font-bold mb-2">
        Deleted Products
      </h2>
      {!Object.keys(products).length ? null :
        Object.keys(products).map((category) => (
          <div className="pb-10 px-2 xs:px-5 sm:px-10 lg:px-20" key={category}>
            <h3 className="text-2xl text-orange-550 font-bold mb-2">{category}</h3>
            <div className="md:px-5">
              <div className="flex flex-wrap">
                {products[category].map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    theme="white"
                    product={product}
                    task="restore"
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default DeletedProducts
