"use client"

import { fetchAddressById, updateAddress } from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const initialAddress: Address = {
  userId: "",
  addressLine1: "",
  addressLine2: "",
  pincode: 0,
  city: "",
  state: "",
  default: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const UpdateAddress = (
  { addressId, from }: { addressId: string, from: "Page" | "Modal" }
) => {
  const { user } = useAuth()
  const [address, setAddress] = useState<Address>(initialAddress)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchAddressById(user?.uid!, addressId)
      .then(response => {
        if (response.success && response.data && response.data.address !== null)
          setAddress(response.data.address)
        else router.push("/404")
      })
      .catch(() => {
        console.log("Error while fetching address details")
        router.push("/404")
      })
  }, [user, addressId])

  const handleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    
    setAddress(prev => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox" ? checked : value
    }))
  }
  
  const onSubmit = (e: any) => {
    e.preventDefault()

    updateAddress(user?.uid!, address)
      .then((response) => {
        if (response.success)
          if (from === "Modal") router.back()
          else alert("Address Updated")
        else setError(response.error!)
      })
      .catch((e) => setError("Not able to create address, Try Again!"))
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col space-y-5 p-5 sm:px-10"
    >
      <p className="text-center text-lg text-orange-550 font-bold">Update Address</p>
      <div className="flex flex-col space-y-1">
        <label htmlFor="addressLine1">Address Line 1 *</label>
        <input
          name="addressLine1"
          type="text"
          placeholder="Enter your room no and building name"
          value={address.addressLine1}
          required
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="addressLine2">Address Line 2</label>
        <input
          name="addressLine2"
          type="text"
          placeholder="Enter your area name"
          value={address.addressLine2}
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="pincode">Pincode *</label>
        <input
          name="pincode"
          type="number"
          placeholder="Enter your area pincode"
          value={address.pincode}
          required
          className="border-2 rounded-xl text-sm py-2 px-4 [&::-webkit-inner-spin-button]:appearance-none"
          onChange={handleCredentials}
          onWheel={event => event.currentTarget.blur()}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="city">City *</label>
        <input
          name="city"
          type="text"
          placeholder="Enter your city name"
          value={address.city}
          required
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="state">State *</label>
        <input
          name="state"
          type="text"
          placeholder="Enter state name"
          value={address.state}
          required
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="state">
          Address Name <span className="text-xs">(for reference)</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter address name for reference"
          value={address.name}
          className="border-2 rounded-xl text-sm py-2 px-4"
          onChange={handleCredentials}
        />
      </div>
      {error ? (
        <p className="text-center text-red-500 tex-sm my-3">
          {error}
        </p>
      ) : null}
      <div className="text-center text-sm">
        <button
          className="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2"
        >
          Update
        </button>
      </div>
    </form>
  )
}

export default UpdateAddress
