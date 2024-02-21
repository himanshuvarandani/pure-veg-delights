"use client"

import { onAuthStateChanged } from "@/firebase/auth"
import { User } from "firebase/auth"
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"

type PropsType = {
  children: ReactNode
}

type ContextType = {
  user: User | null
  cart: Cart
  setCart: Dispatch<SetStateAction<Cart>>
}

export const AuthContext = createContext<ContextType>({
  user: null,
  cart: {},
  setCart: () => {},
})

export const AuthContextProvider = ({ children }: PropsType) => {
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<Cart>({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <AuthContext.Provider value={{ user, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  )
}
