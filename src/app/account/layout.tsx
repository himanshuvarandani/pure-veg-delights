"use client"

import Services from "@/components/Services"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) router.push("/signin")
  
  return (
    <div>
      {children}
      <Services />
    </div>
  )
}
