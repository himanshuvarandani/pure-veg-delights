import Categories from "@/components/categories/Index"
import CategoriesLoading from "@/components/categories/Loading"
import BestSelling from "@/components/products/BestSelling"
import ProductsLoading from "@/components/products/Loading"
import TodaySpecial from "@/components/products/TodaySpecial"
import Services from "@/components/Services"
import { faClock, faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export default async function Home() {
  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/home.jpeg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="px-5 py-10 ml-5 md:ml-20 lg:ml-40">
            <h3 className="text-lg sm:text-xl mb-6">Eat Delhi Delight&apos;s From</h3>
            <h1 className="text-4xl sm:text-6xl mb-1">Shri Ram Pure Veg</h1>
            <h3 className="text-xl sm:text-3xl mb-10">Where Every Bite is a Blessing ...</h3>
            <Link
              href="/products"
              className="rounded-2xl bg-orange-550 text-white px-4 py-2"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-around space-y-5 lg:space-y-0 py-10 px-5 sm:p-10">
        <div className="flex items-center space-x-5">
          <FontAwesomeIcon icon={faTruck} height={45} className="text-orange-550" />
          <div>
            <h5 className="font-bold sm:text-lg">Free Delivery</h5>
            <p className="text-sm sm:text-base">To your door</p>
          </div>
        </div>
        <div className="border-t-2 lg:border-l-2 border-orange-550 w-full sm:w-3/4 md:w-1/2 lg:h-12 lg:w-auto" />
        <div className="flex items-center space-x-5">
          <FontAwesomeIcon icon={faLocationDot} height={45} className="text-orange-550" />
          <div>
            <h5 className="font-bold sm:text-lg">DineIn / PickUp</h5>
            <p className="text-sm sm:text-base">
              Check out&nbsp;
              <Link
                href="https://maps.app.goo.gl/KYDrKVc1daYVnXut6"
                className="underline text-blue-600"
              >
                Location
              </Link>
            </p>
          </div>
        </div>
        <div className="border-t-2 lg:border-l-2 border-orange-550 w-full sm:w-3/4 md:w-1/2 lg:h-12 lg:w-auto" />
        <div className="flex items-center space-x-5">
          <FontAwesomeIcon icon={faClock} height={45} className="text-orange-550" />
          <div>
            <h5 className="font-bold sm:text-lg">Available For You</h5>
            <p className="text-sm sm:text-base">From 8:00 AM to 11:59 PM</p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={<ProductsLoading theme="white" heading="Today's Special" />}
      >
        <TodaySpecial theme="white" />
      </Suspense>

      <Services />
      
      <Suspense
        fallback={
          <ProductsLoading theme="white" heading="Best Selling Products" />
        }
      >
        <BestSelling theme="white" />
      </Suspense>
      
      <Suspense fallback={<CategoriesLoading />}>
        <Categories />
      </Suspense>
    </div>
  )
}

export const revalidate = 3600
