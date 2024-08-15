import ProductDetails from "@/components/admin/products/Update"
import Modal from "@/components/Modal"

const Product = ({ params }: { params: { id: string } }) => {
  return (
    <Modal>
      <ProductDetails productId={params.id} from="Page" />
    </Modal>
  )
}

export default Product
