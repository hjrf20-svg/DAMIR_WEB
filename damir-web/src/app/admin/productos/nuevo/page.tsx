import ProductForm from '@/components/admin/ProductForm'

export const metadata = { title: 'Nuevo Producto — Admin DAMIR' }

export default function NuevoProductoPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Nuevo Producto</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Agrega un nuevo producto al catálogo</p>
      </div>
      <ProductForm />
    </div>
  )
}
