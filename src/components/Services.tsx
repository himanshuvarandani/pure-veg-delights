import { faBasketShopping, faGlobe, faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

const Services = () => {
  return (
    <div className="bg-orange-500 flex flex-col lg:flex-row justify-around sm:items-center py-20 px-5 sm:px-10 lg:px-20">
      <div className="pb-10 lg:pb-0 lg:pr-5">
        <h3 className="text-lg text-white font-bold sm:text-xl mb-6">Our Services</h3>
        <div className="flex flex-col sm:flex-row space-x-0 space-y-5 sm:space-x-5 sm:space-y-0 mb-5">
          <Link
            href="/dine-in"
            className="w-full sm:w-52 lg:w-60 rounded-2xl flex justify-between items-center bg-white px-4 py-2"
          >
            Dine In
            <FontAwesomeIcon icon={faLocationDot} height={30} className="text-orange-550" />
          </Link>
          <Link
            href="/pick-up"
            className="w-full sm:w-52 lg:w-60 rounded-2xl flex justify-between items-center bg-white px-4 py-2"
          >
            Pick Up
            <FontAwesomeIcon icon={faBasketShopping} height={30} className="text-orange-550" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row space-x-0 space-y-5 sm:space-x-5 sm:space-y-0">
          <Link
            href="/"
            className="w-full sm:w-52 lg:w-60 rounded-2xl flex justify-between items-center bg-white px-4 py-2"
          >
            Order On Website
            <FontAwesomeIcon icon={faGlobe} height={30} className="text-orange-550" />
          </Link>
          <Link
            href="https://www.swiggy.com/menu/829023"
            className="w-full sm:w-52 lg:w-60 rounded-2xl flex justify-between items-center bg-white px-4 py-2"
          >
            Order on Swiggy
            <FontAwesomeIcon icon={faTruck} height={30} className="text-orange-550" />
          </Link>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden w-full md:w-80 h-60">
        <Image
          src="/home.jpeg"
          alt="Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  )
}

export default Services
