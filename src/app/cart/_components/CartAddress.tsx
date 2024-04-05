"use client"

import AddressCard from "@/components/address/Card"
import { fetchAllAddresses, fetchDefaultAddress } from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import ChangeAddressModal from "./ChangeAddress"

type CartAddressProps = {
  address: Address | null
  updateAddress: (address: Address | null) => void
}

const CartAddress = ({ address, updateAddress }: CartAddressProps) => {
  const { user } = useAuth()
  const [allAddresses, setAllAddresses] = useState<Address[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchDefaultAddress(user?.uid!)
      .then(response => {
        if (response.success && response.data)
          updateAddress(response.data?.address)
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
        <div className="flex flex-col items-center px-2 xs:px-5 md:px-0">
          {!address ? (
            <Link href="/account/address/new">
              <button
                className="rounded-2xl bg-orange-550 text-white px-4 py-2"
              >
                Add New Address
              </button>
            </Link>
          ) : (
            <div className="w-full sm:w-3/4">
              <AddressCard
                address={address}
                deletable={false}
                editable={true}
              />
            </div>
          )}
        </div>
      </div>

      <ChangeAddressModal
        addresses={allAddresses}
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        updateAddress={(address: Address) => {
          updateAddress(address)
          setShowModal(false)
        }}
      />
    </div>
  )
}

export default CartAddress
