"use client"

import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) setLoading(true)
    else {
      toast("Already Logged In")
      router.push("/")
    }
  }, [user])

  return !loading ? null : children
}
