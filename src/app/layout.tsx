import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { AuthContextProvider } from "@/context/AuthContext"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Delhi Delights",
  description: "Pure Vegetarian Restaurant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <AuthContextProvider>
            <Header />
            <main className="min-h-[35vh] sm:min-h-[65vh]">
              {children}
            </main>
            <Footer />
          </AuthContextProvider>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  )
}
