"use client"

import { fetchUserDetails, updateUser } from "@/firebase/user"
import useAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react"

const AccountDetails = () => {
  const { user } = useAuth()
  const [userDetails, setUserDetails] = useState<User>({
    name: "", contact: 0, email: ""
  })

  useEffect(() => {
    fetchUserDetails(user?.uid!)
      .then(data => {
        if (data) setUserDetails(data)
      })
      .catch(e => console.log("Not able to fetch Account details."))
  }, [])

  const handleInput = (e: any) => {
    const { name, type, value } = e.target
    setUserDetails(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    updateUser(user?.uid!, userDetails.name, userDetails.contact)
      .then(() => console.log("Updated Details"))
      .catch(() => console.log("Not able to update details. Try Again!"))
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-5 px-2 sm:px-5"
      >
        <div className="flex justify-between items-center my-2">
          <p>Name</p>
          <input
            name="name"
            type="string"
            placeholder="Enter your Name"
            value={userDetails.name}
            required
            className="w-3/4 border-2 rounded-xl py-2 px-4"
            onChange={handleInput}
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <p>Contact</p>
          <input
            name="contact"
            type="number"
            placeholder="Enter your Mobile Number"
            value={userDetails.contact}
            required
            className="w-3/4 border-2 rounded-xl py-2 px-4"
            onChange={handleInput}
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <p>Email</p>
          <input
            name="name"
            type="email"
            value={userDetails.email}
            required
            disabled
            className="w-3/4 border-2 rounded-xl py-2 px-4"
          />
        </div>
        <div className="text-center text-sm mt-10">
          <button className="rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountDetails
