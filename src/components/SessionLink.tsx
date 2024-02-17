"use client"

import useAuth from "@/hooks/useAuth"
import Link from "next/link"

type SessionLinkProps = {
  title: string
  href: string
  classNames: string
  sessionRequire: boolean
}

const SessionLink = ({
  title,
  href,
  classNames,
  sessionRequire
}: SessionLinkProps) => {
  const { user } = useAuth()

  if ((sessionRequire && !user) || (!sessionRequire && user)) return null

  return (
    <Link href={href} className={classNames}>
      {title}
    </Link>
  )
}

export default SessionLink
