import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 9000) + 1000
  return `DAM-${year}${month}${day}-${random}`
}

export function getStockStatus(stock: number): {
  label: string
  color: string
  bg: string
} {
  if (stock === 0) return { label: 'Agotado', color: 'text-red-600', bg: 'bg-red-100' }
  if (stock <= 3) return { label: 'Últimas piezas', color: 'text-amber-600', bg: 'bg-amber-100' }
  return { label: 'Disponible', color: 'text-green-700', bg: 'bg-green-100' }
}

export const WHATSAPP_NUMBER = '526623159150'

export function buildWhatsAppOrderMessage(order: {
  order_number: string
  customer_name: string
  items: Array<{ product_name: string; quantity: number; subtotal: number }>
  total: number
  pickup_date: string
  pickup_time: string
  notes?: string
}): string {
  const itemsList = order.items
    .map((item) => `  • ${item.product_name} x${item.quantity} - $${item.subtotal}`)
    .join('\n')

  return encodeURIComponent(
    `🛍️ *Nuevo Pedido DAMIR*\n\n` +
      `📋 *Orden:* ${order.order_number}\n` +
      `👤 *Cliente:* ${order.customer_name}\n\n` +
      `*Productos:*\n${itemsList}\n\n` +
      `💰 *Total: $${order.total} MXN*\n\n` +
      `📅 *Pickup:* ${order.pickup_date} a las ${order.pickup_time}\n` +
      (order.notes ? `📝 *Notas:* ${order.notes}\n` : '') +
      `\n_Pedido realizado en damirstore.com_`
  )
}

export const CATEGORY_LABELS: Record<string, string> = {
  ropa: 'Ropa',
  calzado: 'Calzado',
  muebles: 'Muebles',
  accesorios: 'Accesorios',
  restaurante: 'Restaurante',
}

export const PICKUP_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]
