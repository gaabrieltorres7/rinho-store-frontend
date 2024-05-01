import Product from './products.types'

interface Category {
  id: number
  name: string
  displayName: string
  imageUrl: string
  products: Product[]
}

export default Category
