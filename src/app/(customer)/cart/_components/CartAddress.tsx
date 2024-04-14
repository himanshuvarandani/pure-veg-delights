"use client"

import AddressCard from "@/components/address/Card"
import AddressLoadingCard from "@/components/address/Loading"
import {
  fetchAddressById,
  fetchAllAddresses,
  fetchDefaultAddress
} from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ChangeAddressModal from "./ChangeAddress"

type CartAddressProps = {
  address: Address | null
  updateAddress: (address: Address | null) => void
}

const CartAddress = ({ address, updateAddress }: CartAddressProps) => {
  const { isLoading, user } = useAuth()
  const pathname = usePathname()
  const [allAddresses, setAllAddresses] = useState<Address[]>([])
  const [showModal, setShowModal] = useState(false)
  const [addLoading, setAddLoading] = useState(true)

  useEffect(() => {
    if (isLoading || !user) return

    fetchDefaultAddress(user.uid)
      .then(response => {
        if (response.success) {
          if (response.data) updateAddress(response.data?.address)
        } else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Fetching Default Address"))
      .finally(() => setAddLoading(false))
  }, [isLoading, user])
  
  useEffect(() => {
    if (isLoading || !user) return
    if (pathname != "/cart") return
    if (addLoading) return

    setAddLoading(true)
    if (!address) {
      fetchDefaultAddress(user.uid)
        .then(response => {
          if (response.success) {
            if (response.data) updateAddress(response.data?.address)
          } else toast.error(response.error!)
        })
        .catch(() => toast.error("Error Fetching Default Address"))
        .finally(() => setAddLoading(false))
    } else {
      fetchAddressById(user.uid, address.id!)
        .then(response => {
          if (response.success) {
            if (response.data) updateAddress(response.data?.address)
          } else toast.error(response.error!)
        })
        .catch(() => toast.error("Error Fetching Updated Address"))
        .finally(() => setAddLoading(false))
    }
  }, [pathname])

  useEffect(() => {
    if (isLoading || !user) return
    if (pathname != "/cart") return
    
    fetchAllAddresses(user.uid)
      .then(response => {
        if (response.success) {
          if (response.data) setAllAddresses(response.data?.addresses)
        } else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Fetching All Addresses"))
  }, [isLoading, user, pathname])

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 pt-10">
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
              {addLoading ? (<AddressLoadingCard />) : (
                <AddressCard
                  address={address}
                  deletable={false}
                  editable={true}
                />
              )}
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
