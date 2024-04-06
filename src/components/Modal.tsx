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
        className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 mx-2 xs:mx-5 my-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="max-h-[90vh] overflow-auto border-2 border-orange-550 bg-white rounded-xl shadow-2xl p-5"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
