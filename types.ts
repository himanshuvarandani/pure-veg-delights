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
