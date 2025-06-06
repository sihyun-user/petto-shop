export interface Product {
  id: string
  name: string
  category: string
  subcategory: string
  price: number
  discount: number | null
  description: string
  image: string
  pet_type: '狗' | '貓'
  stock: number
  created_at: string
}

export interface Atricle {
  id: number
  name: string
  description: string
  image: string
  date: string
  author: string
}
