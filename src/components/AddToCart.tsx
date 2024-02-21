"use client"

import useAuth from "@/hooks/useAuth"
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PropsType = {
  theme: "white" | "orange"
  product: Product
}

const AddToCart = ({ theme, product }: PropsType) => {
  const { cart, setCart } = useAuth()

  const addProduct = () => {
    setCart(prev => ({
      ...prev,
      [product.id]: {
        product: product,
        quantity: 1,
      }
    }))
  }

  const updateQuantity = (quantity: number) => {
    // if (!cart[product.id] || !cart[product.id].quantity) return
    if (quantity <= 0)
    // if (cart[product.id].quantity === 1)
      setCart(prev => {
        const temp = { ...prev }
        delete temp[product.id]
        return temp
      })
    else
      setCart(prev => ({
        ...prev,
        [product.id]: {
          product,
          quantity,
        }
      }))
  }

  return (
    <>
      {product.id in cart ? (
        <div
          className={`w-full rounded-2xl flex justify-between items-center sm:text-lg px-4 py-2
            ${theme === "white" ? "bg-orange-550 text-white" : "bg-white text-orange-550"}
          `}
        >
          <FontAwesomeIcon
            icon={faMinusCircle}
            height={45}
            className="cursor-pointer"
            onClick={() => updateQuantity(cart[product.id].quantity-1)}
          />
          <p>{cart[product.id].quantity}</p>
          <FontAwesomeIcon
            icon={faPlusCircle}
            height={45}
            className="cursor-pointer"
            onClick={() => updateQuantity(cart[product.id].quantity+1)}
          />
        </div>
      ) : (
        <button
          className={`w-full rounded-2xl text-sm sm:text-base text-center px-4 py-2
            ${theme === "white" ? "bg-orange-550" : "bg-white"}
          `}
          onClick={addProduct}
        >
          Add to Cart
        </button>
      )}
    </>
  )
}

export default AddToCart
