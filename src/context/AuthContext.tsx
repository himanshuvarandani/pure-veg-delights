"use client"

import { onAuthStateChanged } from "@/firebase/auth"
import { User } from "firebase/auth"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from "react"

type PropsType = {
  children: ReactNode
}

type ContextType = {
  isLoading: boolean
  user: User | null
  cart: Cart
  setCart: Dispatch<SetStateAction<Cart>>
}

const initialCart = {}

export const AuthContext = createContext<ContextType>({
  isLoading: true,
  user: null,
  cart: {},
  setCart: () => {},
})

export const AuthContextProvider = ({ children }: PropsType) => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<Cart>(initialCart)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (cart === initialCart) return
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <AuthContext.Provider value={{ isLoading, user, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  )
}
