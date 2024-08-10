"use client"

import AdminHeader from "@/components/AdminHeader"
import Footer from "@/components/Footer"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CustomerLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode,
}>) {
  const { isLoading, user } = useAuth()
  const [pageLoading, setPageLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/404")
    } else {
      user.getIdTokenResult()
        .then(result => {
          if (!result.claims.admin)
            router.push("/404")
          else
            setPageLoading(true)
        })
    }
  }, [isLoading, user])

  return (
    <>
      {!pageLoading ? null : (
        <>
          <AdminHeader />
          <main className="min-h-[35vh] sm:min-h-[65vh]">
            {children}
            {modal}
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
