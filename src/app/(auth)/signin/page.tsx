"use client"

import { signIn } from "@/firebase/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"

type Credentials = {
  email: string
  password: string
}

const SignIn = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleCredentials = (e: any) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    signIn(credentials.email, credentials.password)
      .then((response) => {
        if (response.success)
          redirect("/")

        setError(response.error!)
      })
      .catch((e) => setError("Not able to sign in, Try Again!"))
  }

  return (
    <div className="flex justify-center py-10 px-4 sm:px-10">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 border-2 border-yellow-500 rounded-xl flex flex-col space-y-5 p-5 sm:px-10"
      >
        <p className="text-center text-lg text-orange-550 font-bold">SIGN IN</p>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
            className="border-2 rounded-xl py-2 px-4"
            onChange={handleCredentials}
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
            onChange={handleCredentials}
          />
        </div>
        {error ? (
          <p className="text-center text-red-500 tex-sm my-3">
            {error}
          </p>
        ) : null}
        <div className="text-center text-sm">
          <button className="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2">
            Sign In
          </button>
          <Link href="/forgotpass" className="text-blue-600 underline">Forgot Password?</Link>
          <p className="text-orange-550 my-5">
            Don&apos;t have an account?&nbsp;
            <Link href="/signup" className="text-blue-600 underline">Create Here!</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn
