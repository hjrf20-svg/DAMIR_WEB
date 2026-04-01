export type ProductCategory = 'ropa' | 'calzado' | 'muebles' | 'accesorios' | 'restaurante'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  stock: number
  images: string[]
  sizes?: string[]
  colors?: string[]
  featured: boolean
  active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface PickupSlot {
  id: string
  date: string
  time: string
  max_orders: number
  current_orders: number
  active: boolean
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  pickup_slot_id: string
  pickup_slot?: PickupSlot
  notes?: string
  whatsapp_sent: boolean
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  size?: string
  color?: string
  subtotal: number
}

export type OrderStatus =
  | 'pendiente'
  | 'confirmado'
  | 'preparando'
  | 'listo'
  | 'entregado'
  | 'cancelado'

export interface AdminStats {
  total_orders: number
  pending_orders: number
  revenue_today: number
  revenue_month: number
  low_stock_products: number
}
