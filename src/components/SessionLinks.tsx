"use client"

import useAuth from "@/hooks/useAuth"
import Link from "next/link"

const SessionLinks = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuth()

  return isLoading || !user ? (
    <Link href="/signin" className="px-3 py-2 text-sm font-semibold">
      Sign In
    </Link>
  ) : children
}

export default SessionLinks
