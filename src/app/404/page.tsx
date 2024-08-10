import Link from "next/link"

const Error404 = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-lg text-orange-550 mb-2">Page Not Found</p>
      <p className="text-sm mb-10">You&apos;re trying either wrong page or protected page</p>
      <Link href="/" className="text-sm text-orange-550 underline">Go to Home</Link>
      <Link href="/products" className="text-sm text-orange-550 underline">Explore Products</Link>
    </div>
  )
}

export default Error404
