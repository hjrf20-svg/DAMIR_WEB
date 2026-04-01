import AdminProductosClient from '@/components/admin/AdminProductosClient'
import { getAllProductsForAdmin } from '@/lib/products'

export const metadata = { title: 'Productos — Admin DAMIR' }
export const dynamic = 'force-dynamic'

export default async function AdminProductosPage() {
  const products = await getAllProductsForAdmin()
  return <AdminProductosClient initialProducts={products} />
}
