import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/admin/ProductForm'
import { getProductById } from '@/lib/products'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditarProductoPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <Link
          href="/admin/productos"
          className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <ArrowLeft size={16} />
          Volver a productos
        </Link>
        <h1 className="text-2xl font-bold text-white">Editar Producto</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Modifica los datos de <strong className="text-white">{product.name}</strong>
        </p>
      </div>
      <ProductForm
        initialData={{
          name:        product.name,
          description: product.description,
          price:       String(product.price),
          category:    product.category,
          stock:       String(product.stock),
          sizes:       product.sizes?.join(', ') ?? '',
          colors:      product.colors?.join(', ') ?? '',
          featured:    product.featured,
          active:      product.active,
          images:      product.images ?? [],
        }}
        productId={id}
      />
    </div>
  )
}
