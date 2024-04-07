import AddressLoadingCard from "@/components/address/Loading"

const AddressesLoading = () => {
  return (
    <div className="flex flex-col items-center px-2 xs:px-5 md:px-0">
      {[1, 2, 3].map(key => (
        <div
          key={key}
          className="w-full sm:w-3/4 my-2"
        >
          <AddressLoadingCard />
        </div>
      ))}
    </div>
  )
}

export default AddressesLoading
