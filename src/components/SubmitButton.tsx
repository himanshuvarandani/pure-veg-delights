"use client"

import { useFormStatus } from "react-dom"

type PropTypes = {
  title: string
  classNames: string
}

const SubmitButton = ({ title, classNames }: PropTypes) => {
  const { pending } = useFormStatus()

  return (
    <button className={classNames} aria-disabled={pending}>
      {title}
    </button>
  )
}

export default SubmitButton
