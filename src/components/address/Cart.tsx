"use client"

import { fetchAllAddresses, fetchDefaultAddress } from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import AddressCard from "./Card"

const CartAddress = () => {
  const { user } = useAuth()
  const [address, setAddress] = useState<Address | null>(null)
  const [allAddresses, setAllAddresses] = useState<Address[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchDefaultAddress(user?.uid!)
      .then(response => {
        if (response.success && response.data)
          setAddress(response.data?.address)
      })
      .catch(() => console.log("Error while fetching default address"))
    
    fetchAllAddresses(user?.uid!)
      .then(response => {
        if (response.success && response.data)
          setAllAddresses(response.data?.addresses)
      })
      .catch(() => console.log("Error while fetching all addresses"))
  }, [user])

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 pt-10"
      >
        <div className="relative">
          <h3 className="text-xl text-center font-bold text-orange-550 mb-5">
            Address
          </h3>
          <div className="absolute bottom-1 right-0 flex items-center text-orange-550">
            <Link href="/account/address/new">
              <FontAwesomeIcon
                icon={faPlus}
                size="sm"
                className="cursor-pointer mx-2"
              />
            </Link>
            {allAddresses.length > 1 ? (
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="sm"
                className="cursor-pointer mx-2"
                onClick={() => setShowModal(true)}
              />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-3/4">
            {!address ? null : (
              <AddressCard
                address={address}
                deletable={false}
                editable={true}
              />
            )}
          </div>
        </div>
      </div>

      {!showModal ? null : (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 mx-2 xs:mx-5 my-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex flex-col items-center max-h-[90vh] overflow-auto border-2 border-orange-550 bg-white rounded-xl shadow-xl p-5"
            >
              <h3 className="text-lg text-center text-orange-550 font-bold mb-5">Select Address</h3>
              {allAddresses.map(add => (
                <div
                  className="my-2 cursor-pointer"
                  onClick={() => {
                    setAddress(add)
                    setShowModal(false)
                  }}
                >
                  <AddressCard address={add} deletable={false} editable={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartAddress
