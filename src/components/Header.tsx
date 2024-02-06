import Image from 'next/image'
import Link from 'next/link'

export default function Header() {

  return (
    <div className="relative w-full bg-orange-550 text-white py-2">
      <div className="flex items-center justify-between px-4 sm:px-6 sm:mx-10">
        <div className="inline-flex items-center space-x-2">
          <Link href={"/"} className="inline-block mr-2">
            <Image
              width={60}
              height={60}
              src={"/logo.png"}
              alt="Delhi Delights"
              priority={true}
            />
          </Link>
          <h1 className="font-bold">SHRI RAM<br />Pure Veg</h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex border-2 border-white rounded-3xl overflow-hidden pl-2">
            <input
              className="bg-transparent text-white placeholder-white my-1 mx-2 p-1"
              placeholder="Search a product ... "
            />
            <button className="bg-white text-orange-600 px-2">
              Search
            </button>
          </div>
        </div>
        <div className="space-x-2">
          <Link
            href="/signin"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
