"use server"

import { signIn, signUp } from "@/firebase/auth"
import { createUser } from "@/firebase/user"
import { redirect } from "next/navigation"

export const signUpAction = async (
  prevState: { message: string | undefined },
  data: FormData
) => {
  if (data.get("password") !== data.get("confirmPassword"))
    return { message: "Password do not match" }

  const response = await signUp(
    String(data.get("email")),
    String(data.get("password")),
  )

  if (response.success) {
    const result = await createUser(
      response.userId!,
      String(data.get("name")),
      Number(data.get("contact")),
      String(data.get("email")),
    )

    if (result.success) {
      redirect("/")
    }
    return { message: result.error }
  }
  return { message: response.error }
}

export const signInAction = async (
  prevState: { message: string | undefined },
  data: FormData
) => {
  const response = await signIn(
    String(data.get("email")),
    String(data.get("password")),
  )

  if (response.success) {
    redirect("/")
  }
  return { message: response.error }
}
