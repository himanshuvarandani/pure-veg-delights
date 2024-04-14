import Footer from "@/components/Footer"
import { AuthContextProvider } from "@/context/AuthContext"
import type { Metadata } from "next"
import Script from "next/script"
import { Toaster } from "react-hot-toast"
import "./globals.css"

export const metadata: Metadata = {
  title: "Delhi Delights",
  description: "Pure Vegetarian Restaurant",
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode,
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <AuthContextProvider>
            {children}
            {modal}
            <Toaster toastOptions={{ duration: 4000 }} />
            <Footer />
          </AuthContextProvider>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  )
}
