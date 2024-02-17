"use client"

import { onAuthStateChanged } from "@/firebase/auth"
import { User } from "firebase/auth"
import { ReactNode, createContext, useEffect, useState } from "react"

type PropsType ={
  children: ReactNode
}

export const AuthContext = createContext<{ user: User | null}>({ user: null })

export const AuthContextProvider = ({ children }: PropsType) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
