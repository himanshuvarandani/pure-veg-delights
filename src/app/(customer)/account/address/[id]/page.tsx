import UpdateAddress from "@/components/address/Update"

const UpdateAddressPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex justify-center py-10 px-4 sm:px-10">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 border-2 border-yellow-500 rounded-xl">
        <UpdateAddress addressId={params.id} from="Page" />
      </div>
    </div>
  )
}

export default UpdateAddressPage
