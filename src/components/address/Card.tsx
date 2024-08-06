import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type AddCardProps = {
  address: Address
  deletable: boolean
  editable: boolean
  defAddButtonDisable?: boolean
  updateDefAddress?: (addressId: string) => void
  deleteAddress?: (addressId: string) => void
}

const AddressCard = ({
  address,
  deletable,
  editable,
  defAddButtonDisable,
  updateDefAddress,
  deleteAddress,
}: AddCardProps) => {
  return (
    <div
      className="w-full border-2 border-yellow-500 rounded-xl shadow py-4 px-6"
    >
      <div className="flex justify-between items-center">
        <p className="font-bold">
          {!address.name? "Other" : address.name}
          {!address.isDefault ? null : (
            <span className="text-xs text-orange-550 font-normal ml-2 pb-1">(Default)</span>
          )}
        </p>
        <div className="flex items-center text-orange-550">
          {!editable ? null : (
            <Link href={`/account/address/${address.id}`}>
              <FontAwesomeIcon
                icon={faEdit}
                size="sm"
                className="cursor-pointer"
              />
            </Link>
          )}
          {!deletable || !deleteAddress ? null : (
            <FontAwesomeIcon
              icon={faTrash}
              size="sm"
              className="cursor-pointer ml-4"
              onClick={() => deleteAddress(address.id!)}
            />
          )}
        </div>
      </div>

      <div>
        <p className="break-words px-2">
          {address.addressLine1}, {!address.addressLine2
            ? null
            : address.addressLine2 + ", "
          } {address.city}, {address.state} - {address.pincode}
        </p>
      </div>

      {!editable || address.isDefault || !updateDefAddress ? null : (
        <button
          className={`text-xs text-yellow-500 mt-3
            ${defAddButtonDisable ? "text-gray-300" : ""}
          `}
          disabled={defAddButtonDisable}
          onClick={() => updateDefAddress(address.id!)}
        >
          Make this as Default address
        </button>
      )}
    </div>
  )
}

export default AddressCard
