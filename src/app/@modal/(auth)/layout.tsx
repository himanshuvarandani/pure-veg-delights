"use client"

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
    if (!isLoading && user) {
      toast.success("Already Logged In")
      router.replace("/")
    }
  }, [isLoading, user])

  return (isLoading || user) ? null : children
}
