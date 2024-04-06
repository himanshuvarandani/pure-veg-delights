"use client"

import Services from "@/components/Services"
import useAuth from "@/hooks/useAuth"
import { redirect } from "next/navigation"

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth()

  if (!user) redirect("/signin")
  
  return (
    <div>
      {children}
      <Services />
    </div>
  )
}
