type APIResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  tags: Array<string>
  todaySpecial: boolean
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  isDeleted: boolean
}

type ProductsObject = { [key: string]: Product }

type CategoryProducts = { [key: string]: Array<Product> }

type Cart = {
  [key: string]: {
    product: Product
    quantity: number
  }
}

type Order = {
  id?: string
  userId: string
  address: string
  products: Array<{
    product: string
    quantity: number
  }>
  itemsPrice: number
  gst: number
  total: number
  type: OrderType
  status: OrderStatus
  paymentStatus: PaymentStatus
  timestamps: {
    initiated: Date
    placed: Date
    accepted: Date
    prepared: Date
    completed: Date
    cancelled: Date
  }
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
}

type OrderType = "Dine In" | "Pickup" | "Delivery"

type OrderStatus =
  "Initiated" | "Placed" | "Accepted" | "Prepared" | "Completed" | "Cancelled"

type PaymentStatus = "Pending" | "Failed" | "Completed"

type Address = {
  id?: string
  userId: string
  name: string
  addressLine1: string
  addressLine2: string
  pincode: number
  city: string
  state: string
  country: string
  isActive: boolean
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

type AddressesObject = { [key: string]: Address }
