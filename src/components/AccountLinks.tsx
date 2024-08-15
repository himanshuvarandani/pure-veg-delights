"use client"

import { signOut } from "@/firebase/auth"
import useAuth from "@/hooks/useAuth"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const AccountLinks = () => {
  const { isLoading, user } = useAuth()
  const router = useRouter()
  const [showLinks, setShowLinks] = useState(false)

  return isLoading || !user ? (
    <Link href="/signin" className="px-3 py-2 text-sm font-semibold">
      Sign In
    </Link>
  ) : (
    <div className="relative z-10">
      <div
        className="mx-3 my-2"
        onMouseEnter={() => setShowLinks(true)}
        onMouseLeave={() => setShowLinks(false)}
        onTouchStart={() => setShowLinks(!showLinks)}
      >
        <FontAwesomeIcon
          icon={faUser}
          height={30}
          className="cursor-pointer"
        />
        {!showLinks ? null : (
          <div className="absolute right-1/2">
            <div className="flex flex-col space-y-1 justify-start w-40 bg-white text-black rounded-xl shadow-xl py-2 px-5">
              <Link href="/account/orders">
                Your Orders
              </Link>
              <Link href="/account/addresses">
                Your Addresses
              </Link>
              <button
                className="text-start"
                onClick={async () => {
                  await signOut()
                  router.push("/")
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountLinks
