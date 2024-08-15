"use client"

import { fetchProductDetails, updateProductDetails } from "@/actions/admin/products"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

const initialProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  category: "",
  image: "",
  tags: [],
  todaySpecial: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: false,
  isDeleted: false,
}

const UpdateProduct = (
  { productId, from }: { productId: string, from: "Page" | "Modal" }
) => {
  const [product, setProduct] = useState<Product>(initialProduct)
  const [tag, setTag] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    if (loading || !productId) return

    setLoading(true)
    fetchProductDetails(productId)
      .then((response) => {
        if (response.product)
          setProduct(response.product)
      })
      .finally(() => setLoading(false))
  }, [productId])

  const handleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    if (type === "number" && Number(value) < 0) return
    
    setProduct(prev => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox" ? checked : value
    }))
  }
  
  const updateProduct = (e: any) => {
    e.preventDefault()
    if (!product.tags.length)
      toast.error("Tags are Required")

    if (loading || !productId) return
    
    setLoading(true)
    updateProductDetails(productId, product)
      .then((response) => {
        if (from === "Page") {
          if (response.productId !== productId)
            router.replace(`/account/product/${response.productId}`)
        } else {
          router.back()
        }
      })
      .catch((error: AxiosError) => {
        console.log("Error Updating Product Details ->", error)
        toast.error(error.response?.statusText || "Error Updating Product Details")
      })
      .finally(() => setLoading(false))
  }

  return (
    <form
      onSubmit={updateProduct}
      className="w-full flex flex-col space-y-5 p-5 sm:px-10"
    >
      <p className="text-center text-lg text-orange-550 font-bold">Product</p>
      <div className="flex flex-col space-y-1">
        <label htmlFor="state">
          Product Name *
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter product name"
          value={product.name}
          className="border-2 rounded-xl text-sm py-2 px-4"
          disabled
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          placeholder="Enter product description"
          value={product.description}
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="price">Price *</label>
        <input
          name="price"
          type="number"
          min={0}
          placeholder="Enter product price"
          value={product.price ? product.price : ""}
          required
          className="border-2 rounded-xl text-sm py-2 px-4 [&::-webkit-inner-spin-button]:appearance-none"
          onChange={handleCredentials}
          onWheel={event => event.currentTarget.blur()}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="category">Category *</label>
        <input
          name="category"
          type="text"
          placeholder="Enter product category"
          value={product.category}
          required
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="image">Image URL *</label>
        <input
          name="image"
          type="text"
          placeholder="Enter product image url"
          value={product.image}
          required
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="image">Tags *</label>
        {!product.tags || !product.tags.length ? null : (
          <div className="flex flex-wrap items-center text-sm">
            {product.tags.map(productTag => (
              <div
                key={productTag}
                className="bg-orange-550 text-white rounded-xl flex items-center py-1 px-2 m-1"
              >
                <p>{productTag}</p>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="sm"
                  className="cursor-pointer ml-2"
                  onClick={() => setProduct(prev => ({
                    ...prev,
                    tags: prev.tags.filter(prevTag => prevTag !== productTag)
                  }))}
                />
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex space-x-1">
          <input
            name="tag"
            type="text"
            placeholder="Enter tag name"
            value={tag}
            className="w-full border-2 rounded-xl text-sm py-2 px-4"
            onChange={e => setTag(e.target.value)}
          />
          <button
            className="rounded-2xl bg-orange-550 text-sm px-4 py-2"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()

              if (!tag.trim().length) return
              for (let i = 0; i <= product.tags.length; i += 1)
                if (product.tags[i] === tag) {
                  toast.error("Duplicate Tags")
                  return
                }
              
              setProduct(prev => ({
                ...prev,
                tags: [...prev.tags, tag.trim()]
              }))
              setTag("")
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex space-x-1">
        <input
          name="todaySpecial"
          type="checkbox"
          checked={product.todaySpecial}
          onChange={handleCredentials}
        />
        <label htmlFor="default">Make this product as Today&apos;s Special</label>
      </div>
      <div className="text-center text-sm">
        <button
          className="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2"
        >
          Update
        </button>
      </div>
    </form>
  )
}

export default UpdateProduct
