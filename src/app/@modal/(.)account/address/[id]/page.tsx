import UpdateAddress from "@/components/address/Update"
import Modal from "@/components/Modal"

const UpdateAddressModal = ({ params }: { params: { id: string } }) => {
  return (
    <Modal>
      <UpdateAddress addressId={params.id} from="Modal" />
    </Modal>
  )
}

export default UpdateAddressModal
