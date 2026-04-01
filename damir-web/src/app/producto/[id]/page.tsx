import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/catalog/ProductDetailClient'
import { getProductById, getRelatedProducts } from '@/lib/products'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return { title: 'Producto no encontrado — DAMIR' }
  return {
    title: `${product.name} — DAMIR`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  const related = await getRelatedProducts(product)

  return <ProductDetailClient product={product} related={related} />
}
