import { Suspense } from 'react'
import CatalogClient from '@/components/catalog/CatalogClient'
import { getProducts } from '@/lib/products'
import type { ProductCategory } from '@/types'

interface PageProps {
  searchParams: Promise<{ cat?: string; q?: string; stock?: string }>
}

export const metadata = {
  title: 'Tienda — DAMIR',
  description: 'Catálogo de ropa, calzado, muebles y accesorios DAMIR en Magdalena de Kino, Sonora.',
}

export const dynamic = 'force-dynamic'

export default async function TiendaPage({ searchParams }: PageProps) {
  const params = await searchParams
  const category = params.cat as ProductCategory | undefined
  const search = params.q
  const inStock = params.stock === 'true'

  const products = await getProducts({ category, search, inStock })

  return (
    <main className="min-h-screen" style={{ background: 'transparent' }}>
      {/* Header */}
      <div className="py-10 px-4" style={{ background: 'rgba(12,6,1,0.65)', borderBottom: '1px solid rgba(200,150,60,0.12)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-sm mb-1" style={{ color: 'rgba(200,150,60,0.6)' }}>Inicio / Tienda</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : search
              ? `Resultados: "${search}"`
              : 'Toda la Tienda'}
          </h1>
          <p className="text-cream-300 mt-2">
            {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center" style={{ color: 'rgba(200,150,60,0.5)' }}>Cargando...</div>}>
        <CatalogClient
          initialProducts={products}
          activeCategory={category}
          searchQuery={search}
        />
      </Suspense>
    </main>
  )
}
