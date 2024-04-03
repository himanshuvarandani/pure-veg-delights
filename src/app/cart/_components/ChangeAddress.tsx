import AddressCard from "@/components/address/Card"

type ModalProps = {
  addresses: Address[]
  showModal: boolean
  closeModal: () => void
  updateAddress: (address: Address) => void
}

const ChangeAddressModal = ({
  addresses,
  showModal,
  closeModal,
  updateAddress
}: ModalProps) => {
  if (!showModal) return null
  
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 mx-2 xs:mx-5 my-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex flex-col items-center max-h-[90vh] overflow-auto border-2 border-orange-550 bg-white rounded-xl shadow-xl p-5"
        >
          <h3 className="text-lg text-center text-orange-550 font-bold mb-5">Select Address</h3>
          {addresses.map(address => (
            <div
              className="my-2 cursor-pointer"
              onClick={() => updateAddress(address)}
            >
              <AddressCard address={address} deletable={false} editable={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChangeAddressModal
