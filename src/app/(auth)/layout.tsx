"use client"

import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return children

  router.push("/")
}
