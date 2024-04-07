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
  isLoading: false,
  user: null,
  cart: {},
  setCart: () => {},
})

export const AuthContextProvider = ({ children }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<Cart>(initialCart)

  useEffect(() => {
    setIsLoading(false)
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
      setIsLoading(true)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setIsLoading(false)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
      setIsLoading(true)
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
