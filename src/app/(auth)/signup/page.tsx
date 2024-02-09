import Link from "next/link"

const SignUp = () => {
  return (
    <div className="flex justify-center py-10 px-4 sm:px-10">
      <form className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 border-2 border-yellow-500 rounded-xl flex flex-col space-y-10 p-5 sm:p-10">
        <input
          name="name"
          type="string"
          placeholder="Enter your Name"
          className="border-2 border-orange-550 rounded-xl py-2 px-4"
        />
        <input
          name="contact"
          type="number"
          placeholder="Enter your Mobile Number"
          className="border-2 border-orange-550 rounded-xl py-2 px-4"
        />
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="border-2 border-orange-550 rounded-xl py-2 px-4"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="border-2 border-orange-550 rounded-xl py-2 px-4"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          className="border-2 border-orange-550 rounded-xl py-2 px-4"
        />
        <div className="text-center text-sm">
          <button className="w-full rounded-2xl bg-orange-550 text-lg px-4 py-2 mb-2">Sign Up</button>
          <p className="text-orange-550 mt-5">
            Already have an account?&nbsp;
            <Link href="/signin" className="text-blue-600 underline">SignIn Here!</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
