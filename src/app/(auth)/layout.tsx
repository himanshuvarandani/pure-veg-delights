"use client"

import AuthLoading from "@/components/auth/Loading"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading && user) {
      toast("Already Logged In")
      router.push("/")
    }
  }, [isLoading, user])

  return !isLoading ? (<AuthLoading />) : children
}
