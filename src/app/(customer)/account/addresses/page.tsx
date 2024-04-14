"use client"

import AddressCard from "@/components/address/Card"
import {
  deleteAddress,
  fetchAllAddresses,
  updateDefaultAddress
} from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AddressesLoading from "./_components/Loading"

const Addresses = () => {
  const { isLoading, user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [pageLoading, setPageLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    if (isLoading || !user) return
    if (updateLoading) return
    setPageLoading(true)

    fetchAllAddresses(user.uid)
      .then(response => {
        if (response.success) {
          if (response.data) setAddresses(response.data?.addresses)
          setPageLoading(false)
        } else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Fetching Addresses"))
  }, [isLoading, user, updateLoading])
  
  const updateDefAddress = (addressId: string) => {
    if (updateLoading) return

    setUpdateLoading(true)
    updateDefaultAddress(user?.uid!, addressId)
      .then(response => {
        if (response.success) toast.success("Default Address Changed")
        else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Updating Default Address"))
      .finally(() => setUpdateLoading(false))
  }
  
  const deleteAddressDoc = (addressId: string) => {
    if (updateLoading) return

    setUpdateLoading(true)
    deleteAddress(user?.uid!, addressId)
      .then(response => {
        if (response.success) toast.success("Address Deleted")
        else toast.error(response.error!)
      })
      .catch(() => toast.error("Error Deleting Address"))
      .finally(() => setUpdateLoading(false))
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-10">
        <h3 className="text-xl text-center font-bold text-orange-550 mb-5">
          Your Addresses
        </h3>
        <div className="px-2 xs:px-5 md:px-0">
          <div className="flex justify-center">
            <Link
              href="/account/address/new"
              className="border-2 border-orange-550 rounded-xl shadow-lg mb-8 py-2 px-5"
            >
              Add New Address
            </Link>
          </div>
          {pageLoading ? (<AddressesLoading />) : (
            <div className="flex flex-col items-center">
              {!addresses.length ? (
                <div className="flex flex-col items-center pb-10 px-2">
                  <p>
                    You have not created any address. Create One now!
                  </p>
                </div>
              ) : addresses.map(address => (
                <div
                  key={address.id}
                  className="w-full sm:w-3/4 my-2"
                >
                  <AddressCard
                    address={address}
                    deletable={true}
                    editable={true}
                    defAddButtonDisable={updateLoading}
                    updateDefAddress={updateDefAddress}
                    deleteAddress={deleteAddressDoc}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Addresses
