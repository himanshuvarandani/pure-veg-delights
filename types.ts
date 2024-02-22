type Product = {
  id: string
  name: string
  price: number
  category: string
  image: string
  tags: Array<string>
  todaySpecial: boolean
}

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
