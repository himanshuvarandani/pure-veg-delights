"use client"

import { signUpAction } from "@/app/actions/auth"
import SubmitButton from "@/components/SubmitButton"
import Link from "next/link"
import { useFormState } from "react-dom"

const initialState = { message: "" }

const SignUp = () => {
  const [state, formAction] = useFormState(signUpAction, initialState)

  return (
    <div className="flex justify-center py-10 px-4 sm:px-10">
      <form
        action={formAction}
        className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 border-2 border-yellow-500 rounded-xl flex flex-col space-y-5 p-5 sm:px-10"
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
          />
        </div>
        {state.message ? (
          <p className="text-center text-red-500 tex-sm my-3">
            {state.message}
          </p>
        ) : null}
        <div className="text-center text-sm">
          <SubmitButton
            classNames="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2"
            title="Sign Up"
          />
          <p className="text-orange-550 my-5">
            Already have an account?&nbsp;
            <Link href="/signin" className="text-blue-600 underline">SignIn Here!</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
