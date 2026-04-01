'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, getStockStatus } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCartStore()
  const stockStatus = getStockStatus(product.stock)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.stock === 0) return
    addItem(product, 1)
    toast.success(`${product.name} agregado al carrito`, {
      style: {
        background: '#5C4A1E',
        color: 'white',
        borderRadius: '10px',
      },
      iconTheme: { primary: '#FAF7F2', secondary: '#5C4A1E' },
    })
  }

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image container */}
      <Link href={`/producto/${product.id}`} className="block relative">
        <div className="relative aspect-3/4 overflow-hidden" style={{ background: '#2d1a06' }}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #2d1a06, #1a0e05)' }}>
              <span className="text-4xl opacity-40">
                {product.category === 'ropa' ? '👔' :
                 product.category === 'calzado' ? '👟' :
                 product.category === 'muebles' ? '🪑' :
                 product.category === 'accesorios' ? '👜' : '🛍️'}
              </span>
              <span className="text-xs font-medium" style={{ color: 'rgba(200,150,60,0.5)' }}>Sin foto aún</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(15,10,4,0.85)', color: 'rgba(255,255,255,0.7)' }}
              aria-label="Favorito"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={14} />
            </button>
            <Link
              href={`/producto/${product.id}`}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(15,10,4,0.85)', color: 'rgba(255,255,255,0.7)' }}
              aria-label="Ver detalles"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye size={14} />
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && (
              <span className="text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,150,60,0.85)' }}>
                Destacado
              </span>
            )}
            {product.stock === 0 && (
              <span className="badge-out">Agotado</span>
            )}
            {product.stock > 0 && product.stock <= 3 && (
              <span className="badge-low">¡Últimas!</span>
            )}
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="p-3.5">
        <Link href={`/producto/${product.id}`}>
          <p className="text-xs uppercase tracking-wider mb-1 font-medium" style={{ color: 'rgba(200,150,60,0.6)' }}>
            {product.category}
          </p>
          <h3 className="font-semibold leading-tight line-clamp-2 transition-colors mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="font-bold text-lg" style={{ color: '#d4a55a' }}>
              {formatPrice(product.price)}
            </p>
            <span className={`text-xs font-semibold ${stockStatus.color}`}>
              {stockStatus.label}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={
              product.stock === 0
                ? { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed' }
                : { background: 'linear-gradient(135deg, #c8963c, #a07230)', color: 'white', boxShadow: '0 4px 15px rgba(200,150,60,0.3)' }
            }
            aria-label="Agregar al carrito"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
