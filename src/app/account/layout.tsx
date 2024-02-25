"use client"

import Services from "@/components/Services";
import useAuth from "@/hooks/useAuth";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth()

  if (!user) return null
  
  return (
    <div>
      {children}
      <Services />
    </div>
  )
}
