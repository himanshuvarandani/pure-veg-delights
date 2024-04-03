import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type AddCardProps = { address: Address, deletable: boolean, editable: boolean }

const AddressCard = ({ address, deletable, editable }: AddCardProps) => {
  return (
    <div
      className="w-full border-2 border-yellow-500 rounded-xl shadow-lg py-4 px-6"
    >
      <div className="flex justify-between items-center">
        <p className="font-bold">{!address.name? "Other" : address.name}</p>
        <div className="flex text-orange-550">
          {!editable ? null : (
            <Link href={`/account/address/${address.id}`}>
              <FontAwesomeIcon
                icon={faEdit}
                size="sm"
                className="cursor-pointer"
              />
            </Link>
          )}
          {!deletable ? null : (
            <FontAwesomeIcon
              icon={faTrash}
              size="sm"
              className="cursor-pointer ml-4"
            />
          )}
        </div>
      </div>
      <div>
        <p className="break-words px-2">
          {address.addressLine1}, {address.addressLine2}, {address.city},
          {address.state} - {address.pincode}
        </p>
      </div>
    </div>
  )
}

export default AddressCard
