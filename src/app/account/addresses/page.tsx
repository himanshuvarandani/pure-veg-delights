"use client"

import AddressCard from "@/components/address/Card"
import { deleteAddress, fetchAllAddresses, updateDefaultAddress } from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import { useEffect, useState } from "react"

const Addresses = () => {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) return

    fetchAllAddresses(user?.uid!)
      .then(response => {
        if (response.success && response.data)
          setAddresses(response.data?.addresses)
      })
      .catch(() => console.log("Error while fetching addresses"))
  }, [user, loading])
  
  const updateDefAddress = (addressId: string) => {
    if (loading) return

    setLoading(true)
    updateDefaultAddress(user?.uid!, addressId)
      .then(response => {
        if (!response.success) alert(response.error)
      })
      .catch(() => console.log("Error while updating default address"))
      .finally(() => setLoading(false))
  }
  
  const deleteAddressDoc = (addressId: string) => {
    if (loading) return

    setLoading(true)
    deleteAddress(user?.uid!, addressId)
      .then(response => {
        if (!response.success) alert(response.error)
      })
      .catch(() => console.log("Error while updating default address"))
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-10">
        <h3 className="text-xl text-center font-bold text-orange-550 mb-5">
          Your Addresses
        </h3>
        <div className="flex flex-col items-center px-2 xs:px-5 md:px-0">
          <Link
            href="/account/address/new"
            className="border-2 border-orange-550 rounded-xl shadow-lg mb-8 py-2 px-5"
          >
            Add New Address
          </Link>
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
                defAddButtonDisable={loading}
                updateDefAddress={updateDefAddress}
                deleteAddress={deleteAddressDoc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Addresses
