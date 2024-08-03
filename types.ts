type APIResponse<T> = {
  success: boolean
  data?: T
  error?: string
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
  address: Address
  placedAt: Date
  status: OrderStatus
  lastUpdated: Date
  razorpayOrderId?: string
  razorpayPaymentId?: string
}

type OrderStatus =
  "Payment Pending" |
  "Payment Failed" |
  "Payment Cancelled" |
  "Payment Done" |
  "Accepted" |
  "Ready For Pickup" |
  "Delivering" |
  "Completed" |
  "Cancelled"

type OrderWithId = { id: string } & Order

type Address = {
  id?: string
  name?: string
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
