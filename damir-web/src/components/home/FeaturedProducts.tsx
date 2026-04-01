'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/catalog/ProductCard'
import type { Product } from '@/types'

interface Props {
  products: Product[]
}

export default function FeaturedProducts({ products }: Props) {
  if (products.length === 0) return null

  return (
    <section className="py-16" style={{ background: 'rgba(20,10,3,0.65)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#a07840' }}>
              Lo mejor
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Productos Destacados
            </h2>
            <div className="section-divider mt-3" style={{ margin: '12px 0 0 0' }} />
          </div>
          <Link
            href="/tienda"
            className="hidden md:flex items-center gap-2 font-semibold transition-colors"
            style={{ color: '#c8963c' }}
          >
            Ver todo
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/tienda" className="btn-secondary">
            Ver todos los productos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
