"use client"

import AuthLoading from "@/components/auth/Loading"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
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
      router.push("/")
    }
  }, [isLoading, user])

  return (
    <>
      <Header />
      <main className="min-h-[35vh] sm:min-h-[65vh]">
        {(isLoading || user) ? (<AuthLoading />) : children}
      </main>
      <Footer />
    </>
  )
}
