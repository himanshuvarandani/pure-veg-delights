import { faChevronRight, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex flex-col md:flex-row justify-around items-start py-5 px-5 lg:px-20 xl:px-40">
        <div className="px-5 py-2">
          <Image
            width={120}
            height={120}
            src={"/logo.png"}
            alt="Delhi Delights"
            priority={true}
          />
        </div>
        <div className="flex flex-col space-y-1 text-sm md:text-base px-5 py-2">
          <h6 className="text-base md:text-lg text-orange-550 font-medium mb-1">Quick Links</h6>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faChevronRight} height={10} className="text-orange-550" />
            <Link href="/">Home</Link>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faChevronRight} height={10} className="text-orange-550" />
            <Link href="/about">About Us</Link>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faChevronRight} height={10} className="text-orange-550" />
            <Link href="/menu">Menu</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1 text-sm md:text-base px-5 py-2">
          <h6 className="text-base md:text-lg text-orange-550 font-medium mb-1">Contact Us</h6>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPhone} height={12} className="text-orange-550" />
            <span>+91-1234567890</span>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faLocationDot} height={12} className="text-orange-550" />
            <Link href="https://maps.app.goo.gl/KYDrKVc1daYVnXut6">
              White Rose Layout, Whitefield, Bangalore
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-orange-550 flex flex-col md:flex-row justify-center sm:justify-between items-center text-sm text-white py-5 px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-2 md:mb-0">
          <p>@2024 SHRI RAM PURE VEG</p>
          <p>All rights reserved</p>
        </div>
        <div className="flex space-x-5">
          <Link href="/service-terms">Terms Of Service</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
