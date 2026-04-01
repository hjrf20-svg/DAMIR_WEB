import ProductForm from '@/components/admin/ProductForm'

export const metadata = { title: 'Nuevo Producto — Admin DAMIR' }

export default function NuevoProductoPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
        <p className="text-gray-500 text-sm mt-1">Agrega un nuevo producto al catálogo</p>
      </div>
      <ProductForm />
    </div>
  )
}
