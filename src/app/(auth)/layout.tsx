"use client"

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth()

  if (!user) return children

  redirect("/")
}
