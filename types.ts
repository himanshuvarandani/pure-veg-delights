type APIResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

type User = {
  name: string
  email: string
  contact: number
}

type Product = {
  id: string
  name: string
  price: number
  category: string
  image: string
  tags: Array<string>
  todaySpecial: boolean
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
  userId: string
  products: Array<{
    product: string
    quantity: number
  }>
  itemsPrice: number
  gst: number
  total: number
  placedAt: Date
  status: OrderStatus
  lastUpdated: Date
  razorpayOrderId?: string
  razorpayPaymentId?: string
}

type OrderStatus =
  "Payment Pending" |
  "Payment Cancelled" |
  "Payment Done" |
  "Accepted" |
  "Preparing" |
  "Delivering" |
  "Completed" |
  "Cancelled"

type OrderWithId = { id: string } & Order

type Address = {
  id?: string
  userId: string
  name?: string
  addressLine1: string
  addressLine2: string
  pincode: number
  city: string
  state: string
  default: boolean
  createdAt: Date
  updatedAt: Date
}
