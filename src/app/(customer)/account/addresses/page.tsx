"use client"

import api from "@/axios/instance"
import AddressCard from "@/components/address/Card"
import { AxiosError } from "axios"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AddressesLoading from "./_components/Loading"

const Addresses = () => {
  const pathname = usePathname()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [pageLoading, setPageLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    if (pathname != '/account/addresses') return
    if (updateLoading) return
    setPageLoading(true)

    api.get("/addresses")
      .then((response) => {
        setAddresses(response.data.addresses)
      })
      .catch((error: AxiosError) => {
        console.log("Error Fetching All Addresses ->", error)
        toast.error(error.response?.statusText || "Error Fetching All Addresses")
      })
      .finally(() => setPageLoading(false))
  }, [updateLoading, pathname])
  
  const updateDefAddress = (addressId: string) => {
    if (updateLoading) return

    setUpdateLoading(true)
    api.put(`/addresses/default/${addressId}`)
      .then(() => {
        toast.success("Default Address Updated")
      })
      .catch((error: AxiosError) => {
        console.log("Error Updating Default Address ->", error)
        toast.error(error.response?.statusText || "Error Updating Default Address")
      })
      .finally(() => setUpdateLoading(false))
  }
  
  const deleteAddress = (addressId: string) => {
    if (updateLoading) return

    setUpdateLoading(true)
    api.delete(`/addresses/${addressId}`)
      .then(() => {
        toast.success("Address Deleted Successfully")
      })
      .catch((error: AxiosError) => {
        console.log("Error Deleting Address ->", error)
        toast.error(error.response?.statusText || "Error Deleting Address")
      })
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
                    deleteAddress={deleteAddress}
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
