"use client"

import { createAddress } from "@/firebase/address"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

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

const NewAddress = () => {
  const { user } = useAuth()
  const [address, setAddress] = useState<Address>(initialAddress)
  const [error, setError] = useState("")
  const router = useRouter()

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

    createAddress({
      ...address,
      userId: user?.uid!,
    })
      .then((response) => {
        if (response.success && response.data)
          router.push(`/account/address/${response.data.addressId}`)

        setError(response.error!)
      })
      .catch((e) => setError("Not able to create address, Try Again!"))
  }

  return (
    <div className="flex justify-center py-10 px-4 sm:px-10">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 border-2 border-yellow-500 rounded-xl flex flex-col space-y-5 p-5 sm:px-10"
      >
        <p className="text-center text-lg text-orange-550 font-bold">Add New Address</p>
        <div className="flex flex-col space-y-1">
          <label htmlFor="addressLine1">Address Line 1 *</label>
          <input
            name="addressLine1"
            type="text"
            placeholder="Enter your room no and building name"
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
            required
            className="border-2 rounded-xl text-sm py-2 px-4"
            onChange={handleCredentials}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="name">
            Address Name <span className="text-xs">(for reference)</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter address name for reference"
            className="border-2 rounded-xl text-sm py-2 px-4"
            onChange={handleCredentials}
          />
        </div>
        <div className="flex space-x-1">
          <input
            name="default"
            type="checkbox"
            onChange={handleCredentials}
          />
          <label htmlFor="default">Make this as default address</label>
        </div>
        {error ? (
          <p className="text-center text-red-500 tex-sm my-3">
            {error}
          </p>
        ) : null}
        <div className="text-center text-sm">
          <button className="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewAddress
