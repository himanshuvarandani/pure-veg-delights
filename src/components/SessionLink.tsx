"use client"

import useAuth from "@/hooks/useAuth"
import Link from "next/link"

type SessionLinkProps = {
  children: React.ReactNode
  href: string
  classNames: string
}

const SessionLink = ({
  children,
  href,
  classNames
}: SessionLinkProps) => {
  const { user } = useAuth()

  return (
    <Link href={!user ? "/signin" : href} className={classNames}>
      {children}
    </Link>
  )
}

export default SessionLink
