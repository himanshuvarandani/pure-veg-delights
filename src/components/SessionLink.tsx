"use client"

import useAuth from "@/hooks/useAuth"
import Link from "next/link"

type SessionLinkProps = {
  children: React.ReactNode
  href: string
  classNames: string
  sessionRequire: boolean
}

const SessionLink = ({
  children,
  href,
  classNames,
  sessionRequire
}: SessionLinkProps) => {
  const { user } = useAuth()

  if ((sessionRequire && !user) || (!sessionRequire && user)) return null

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  )
}

export default SessionLink
