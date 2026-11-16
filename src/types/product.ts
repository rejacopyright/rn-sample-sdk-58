export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  sku: string
  thumbnail: string
  images: string[]
  tags: string[]
}

export type ProductList = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductParams = {
  q?: string
  category?: string
  limit?: number
  skip?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export type ProductInput = Partial<Omit<Product, 'id'>>
