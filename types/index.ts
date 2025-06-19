export interface Product {
  id: string
  name: string
  slug: string
  category: string
  subcategory: string
  price: number
  discount: number | null
  description: string
  specification: string
  images: string
  pet_type: '狗' | '貓'
  stock: number
  created_at: string
}

export interface Article {
  id: number
  name: string
  description: string
  content: string
  image: string
  created_at: string
}

export interface CartItem {
  id: string
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}
