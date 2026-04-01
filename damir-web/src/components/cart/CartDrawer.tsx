'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore()
  const total = getTotalPrice()
  const totalItems = getTotalItems()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={closeCart} />

      {/* Drawer */}
      <div className="cart-slide animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(200,150,60,0.15)', background: 'rgba(255,255,255,0.03)' }}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: '#c8963c' }} />
            <h2 className="font-serif text-lg font-bold text-white">
              Mi Carrito
            </h2>
            {totalItems > 0 && (
              <span className="text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#c8963c' }}>
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag size={60} className="mb-4" style={{ color: 'rgba(200,150,60,0.3)' }} />
              <h3 className="font-serif text-xl mb-2 text-white">Tu carrito está vacío</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Agrega productos para comenzar tu compra</p>
              <Link
                href="/tienda"
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Ver Productos
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const key = `${item.product.id}-${item.size}-${item.color}`
                return (
                  <div key={key} className="flex gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* Product image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0" style={{ background: '#1a1208' }}>
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(200,150,60,0.3)' }}>
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm leading-tight truncate">
                        {item.product.name}
                      </p>
                      {(item.size || item.color) && (
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {item.size && `Talla: ${item.size}`}
                          {item.size && item.color && ' · '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                      )}
                      <p className="font-bold text-sm mt-1" style={{ color: '#d4a55a' }}>
                        {formatPrice(item.product.price)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer with total */}
        {items.length > 0 && (
          <div className="px-5 py-4 space-y-3" style={{ borderTop: '1px solid rgba(200,150,60,0.15)', background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center justify-between">
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>Subtotal</span>
              <span className="font-bold text-white text-lg">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-center flex items-center justify-center gap-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              📍 Recoger en tienda · Magdalena de Kino
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center text-base"
            >
              Proceder al Checkout
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/tienda"
              onClick={closeCart}
              className="block text-center text-sm py-1 transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Seguir comprando
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
