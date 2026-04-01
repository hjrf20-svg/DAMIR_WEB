import AdminOrdenesClient from '@/components/admin/AdminOrdenesClient'
import { readOrders } from '@/lib/db'

export const metadata = { title: 'Pedidos — Admin DAMIR' }
export const dynamic = 'force-dynamic'

export default function AdminOrdenesPage() {
  const orders = readOrders()
  return <AdminOrdenesClient initialOrders={orders} />
}
