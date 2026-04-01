'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Minus, Plus, MessageCircle, Share2, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, getStockStatus, WHATSAPP_NUMBER, CATEGORY_LABELS } from '@/lib/utils'
import type { Product } from '@/types'
import ProductCard from './ProductCard'
import toast from 'react-hot-toast'

interface Props {
  product: Product
  related: Product[]
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addItem } = useCartStore()
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const stockStatus = getStockStatus(product.stock)

  const handleAddToCart = () => {
    if (product.stock === 0) return
    addItem(product, quantity, selectedSize, selectedColor)
    toast.success(`${product.name} agregado al carrito`, {
      style: { background: '#5C4A1E', color: 'white', borderRadius: '10px' },
    })
  }

  const waMessage = encodeURIComponent(
    `Hola DAMIR, me interesa: ${product.name} - ${formatPrice(product.price)}\n¿Está disponible?`
  )

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-damir-400">
          <Link href="/" className="hover:text-damir-700">Inicio</Link>
          <ChevronRight size={14} />
          <Link href="/tienda" className="hover:text-damir-700">Tienda</Link>
          <ChevronRight size={14} />
          <Link href={`/tienda?cat=${product.category}`} className="hover:text-damir-700 capitalize">
            {CATEGORY_LABELS[product.category]}
          </Link>
          <ChevronRight size={14} />
          <span className="text-damir-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            {/* Main image */}
            <div className="relative aspect-square bg-cream-100 rounded-2xl overflow-hidden mb-4">
              {product.images?.[activeImage] ? (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cream-300">
                  <ShoppingCart size={80} />
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-white text-damir-800 font-bold px-6 py-2 rounded-full text-lg rotate-[-12deg]">
                    AGOTADO
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-damir-800 scale-95' : 'border-cream-200 hover:border-damir-400'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Category & status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-damir-500 font-medium capitalize bg-cream-100 px-3 py-1 rounded-full">
                {CATEGORY_LABELS[product.category]}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                {stockStatus.label}
                {product.stock > 0 && ` · ${product.stock} disponibles`}
              </span>
              {product.featured && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-damir-100 text-damir-700">
                  ⭐ Destacado
                </span>
              )}
            </div>

            {/* Name & Price */}
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-damir-900 leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-damir-800">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <p className="text-damir-600 leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-damir-700 mb-2">
                  Color: <span className="font-normal text-damir-500">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                        selectedColor === color
                          ? 'border-damir-800 bg-damir-800 text-white font-semibold'
                          : 'border-cream-300 text-damir-600 hover:border-damir-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-damir-700 mb-2">
                  Talla: <span className="font-normal text-damir-500">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg text-sm font-semibold border-2 transition-all ${
                        selectedSize === size
                          ? 'border-damir-800 bg-damir-800 text-white'
                          : 'border-cream-300 text-damir-700 hover:border-damir-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-damir-700 mb-2">Cantidad</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-cream-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 hover:bg-cream-100 transition-colors text-damir-700"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-bold text-damir-800 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-3 hover:bg-cream-100 transition-colors text-damir-700 disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-damir-400">
                  Total: <strong className="text-damir-800">{formatPrice(product.price * quantity)}</strong>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`btn-primary flex-1 justify-center py-4 text-base ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingCart size={20} />
                {product.stock === 0 ? 'Producto Agotado' : 'Agregar al Carrito'}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sage flex-none px-5 py-4 justify-center sm:flex-auto"
              >
                <MessageCircle size={20} />
                Consultar
              </a>
            </div>

            {/* Pickup info */}
            <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-sage-800 text-sm">Solo Pickup · Recoger en tienda</p>
                <p className="text-sage-600 text-xs mt-0.5">
                  Elige el día y hora para recoger tu pedido. Magdalena de Kino, Sonora.
                </p>
                <p className="text-sage-500 text-xs mt-1">Lun–Sáb 9:00–18:00 · Dom 10:00–15:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-damir-900 mb-6">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
