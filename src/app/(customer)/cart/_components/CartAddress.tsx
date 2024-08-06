"use client"

import api from "@/axios/instance"
import AddressCard from "@/components/address/Card"
import AddressLoadingCard from "@/components/address/Loading"
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AxiosError } from "axios"
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
  const pathname = usePathname()
  const [allAddresses, setAllAddresses] = useState<Address[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchDefaultAddress = () => {
    api.get("/addresses/default")
      .then((response) => {
        updateAddress(response.data as Address)
      })
      .catch((error: AxiosError) => {
        console.log("Error Fetching Default Address ->", error)
        toast.error(error.response?.statusText || "Error Fetching Default Address")
      })
      .finally(() => setLoading(false))
  }

  const fetchAddress = (addressId: string) => {
    api.get(`/addresses/${addressId}`)
      .then((response) => {
        updateAddress(response.data as Address)
      })
      .catch((error: AxiosError) => {
        console.log("Error Fetching Address ->", error)
        toast.error(error.response?.statusText || "Error Fetching Address")
      })
      .finally(() => setLoading(false))
  }

  const fetchAllAddresses = () => {
    api.get("/addresses")
      .then((response) => {
        setAllAddresses(response.data.addresses)
      })
      .catch((error: AxiosError) => {
        console.log("Error Fetching All Addresses ->", error)
        toast.error(error.response?.statusText || "Error Fetching All Addresses")
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (pathname != "/cart") return
    if (loading) return

    setLoading(true)
    if (!address) {
      fetchDefaultAddress()
    } else {
      fetchAddress(address.id!)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname != "/cart") return
    
    fetchAllAddresses()
  }, [pathname])

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
              {loading ? (<AddressLoadingCard />) : (
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
