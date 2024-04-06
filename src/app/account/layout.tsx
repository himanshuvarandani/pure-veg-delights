"use client"

import Services from "@/components/Services"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      toast("Login Required")
      router.push("/signin")
    } else setLoading(true)
  }, [user])
  
  return !loading ? null : (
    <div>
      {children}
      <Services />
    </div>
  )
}
