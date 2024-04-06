"use client"

import { signUp } from "@/firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type UserDetails = {
  name: string
  contact: number
  email: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const [details, setDetails] = useState<UserDetails>({
    name: "",
    contact: 0,
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleInput = (e: any) => {
    const { name, type, value } = e.target
    setDetails(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (details.password !== details.confirmPassword)
      toast.error("Password do not match")

    signUp(details.name, details.contact, details.email, details.password)
      .then((response) => {
        if (response.success) {
          toast.success("Succcessfully Registered")
          router.push("/")
        } else toast.error(response.error!)
      })
      .catch((e) => toast.error("Sign In Failed, Try Again!"))
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col space-y-5 p-5 sm:px-10"
    >
      <p className="text-center text-lg text-orange-550 font-bold">SIGN UP</p>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="string"
          placeholder="Enter your Name"
          required
          className="border-2 rounded-xl py-2 px-4"
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="contact">Contact</label>
        <input
          name="contact"
          type="number"
          placeholder="Enter your Mobile Number"
          required
          className="border-2 rounded-xl py-2 px-4"
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="border-2 rounded-xl py-2 px-4"
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="border-2 rounded-xl py-2 px-4"
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
          className="border-2 rounded-xl py-2 px-4"
          onChange={handleInput}
        />
      </div>
      <div className="text-center text-sm">
        <button className="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2">
          Sign Up
        </button>
        <p className="text-orange-550 my-5">
          Already have an account?&nbsp;
          <Link href="/signin" className="text-blue-600 underline">SignIn Here!</Link>
        </p>
      </div>
    </form>
  )
}

export default SignUp
