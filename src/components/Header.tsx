import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import CartLink from './CartLink'
import SessionLinks from './SessionLinks'

export default function Header() {
  return (
    <div className="relative w-full bg-orange-550 text-white py-2">
      <div className="flex items-center justify-between px-4 sm:px-6 sm:mx-10">
        <div className="flex items-center space-x-5">
          <Link href={"/"} className="inline-flex items-center space-x-2 md:mr-5">
            <div className="inline-block mr-2">
              <Image
                width={60}
                height={60}
                src={"/logo.png"}
                alt="Delhi Delights"
                priority={true}
              />
            </div>
            <h1 className="font-bold">SHRI RAM<br />Pure Veg</h1>
          </Link>
          <Link href="/menu" className="hidden md:block text-sm font-semibold">
            Menu
          </Link>
          <Link href="/products" className="hidden md:block text-sm font-semibold">
            Products
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <CartLink />
          <SessionLinks>
            <Link href="/account" className="px-3 py-2">
              <FontAwesomeIcon icon={faUser} height={30} />
            </Link>
          </SessionLinks>
        </div>
      </div>
    </div>
  )
}
