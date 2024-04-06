"use client"

import { useRouter } from "next/navigation"

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const onDismiss = () => router.back()

  return (
    <div
      className="fixed top-0 left-0 z-10 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onDismiss}
    >
      <div
        className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 border-2 border-yellow-500 rounded-xl bg-white mx-2 xs:mx-5 my-20"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
