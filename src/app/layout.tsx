import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { AuthContextProvider } from "@/context/AuthContext"
import type { Metadata } from "next"
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
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Header />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
