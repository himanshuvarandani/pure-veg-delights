"use client"

import useAuth from "@/hooks/useAuth"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"

const CartLink = () => {
  const { isLoading, cart } = useAuth()
  const [prodCount, setProdCount] = useState(0)

  useEffect(() => {
    if (isLoading || !cart) return
    
    setProdCount(0)
    Object.keys(cart).map(key => setProdCount(prev => prev+cart[key].quantity))
  }, [isLoading, cart])

  return (
    <Link
      href="/cart"
      className="mx-3 my-2 text-sm font-semibold"
    >
      <div className="relative">
        <FontAwesomeIcon icon={faCartShopping} height={30} />
        {!prodCount ? null : (
          <span className="absolute left-[80%] bottom-[80%] text-xs">
            {prodCount}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartLink
