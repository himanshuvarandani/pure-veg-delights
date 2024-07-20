import Image from 'next/image'
import Link from 'next/link'
import SessionLinks from './SessionLinks'

const AdminHeader = () => {
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
          <Link href="/admin/products" className="hidden md:block text-sm font-semibold">
            Products
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <SessionLinks>
            <Link href="/dashboard" className="px-3 py-2">
              Dashboard
            </Link>
            <Link href="/analysis" className="px-3 py-2">
              Analysis
            </Link>
          </SessionLinks>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
