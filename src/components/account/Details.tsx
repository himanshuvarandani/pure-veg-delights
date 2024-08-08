"use client"

import useAuth from "@/hooks/useAuth"

const AccountDetails = () => {
  const { user } = useAuth()

  return (
    <div className="flex justify-center">
      <form
        className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-5 px-2 sm:px-5"
      >
        <div className="flex justify-between items-center my-2">
          <p>Name</p>
          <input
            name="name"
            type="string"
            placeholder="Enter your Name"
            value={user?.displayName || ""}
            required
            className="w-3/4 border-2 rounded-xl py-2 px-4"
            disabled
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <p>Email</p>
          <input
            name="name"
            type="email"
            value={user?.email || ""}
            required
            disabled
            className="w-3/4 border-2 rounded-xl py-2 px-4"
          />
        </div>
        <div className="text-center text-sm mt-10">
          <button className="rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2" disabled>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountDetails
