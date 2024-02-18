type Product = {
  id: string
  name: string
  price: number
  category: string
  image: string
  tags: Array<string>
}

type CategoryProducts = { [key: string]: Array<Product> }
