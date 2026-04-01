'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus, Edit, Trash2, Package, AlertCircle, Eye, EyeOff,
  Search, Filter, ChevronDown, CheckCircle, XCircle
} from 'lucide-react'
import { formatPrice, getStockStatus, CATEGORY_LABELS } from '@/lib/utils'
import type { Product, ProductCategory } from '@/types'
import toast from 'react-hot-toast'

interface Props {
  initialProducts: Product[]
}

const CATEGORY_OPTIONS: Array<{ value: ProductCategory | 'todos'; label: string }> = [
  { value: 'todos',       label: 'Todas las categorías' },
  { value: 'ropa',        label: 'Ropa' },
  { value: 'calzado',     label: 'Calzado' },
  { value: 'muebles',     label: 'Muebles' },
  { value: 'accesorios',  label: 'Accesorios' },
  { value: 'restaurante', label: 'Restaurante' },
]

export default function AdminProductosClient({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'todos'>('todos')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Filter
  const filtered = products.filter((p) => {
    const matchCat = category === 'todos' || p.category === category
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const toggleActive = async (id: string) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    const newActive = !product.active
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: newActive } : p)))
    toast.success(
      newActive ? '👁️ Producto visible en la tienda' : '🔒 Producto oculto de la tienda',
      { style: { borderRadius: '12px' } }
    )
    await fetch(`/api/productos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: newActive }),
    })
  }

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setConfirmDelete(null)
    toast.success('Producto eliminado de la tienda', { style: { borderRadius: '12px' } })
    await fetch(`/api/productos/${id}`, { method: 'DELETE' })
  }

  const updateStock = async (id: string, newStock: number) => {
    if (newStock < 0) return
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)))
    toast.success(`Stock: ${newStock} unidades`, { style: { borderRadius: '12px' } })
    await fetch(`/api/productos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock }),
    })
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {products.length} productos · {products.filter((p) => p.active).length} visibles
          </p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary text-sm">
          <Plus size={18} />
          Nuevo Producto
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-damir pl-9 py-2 text-sm"
          />
        </div>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory | 'todos')}
            className="input-damir py-2 pr-8 text-sm appearance-none cursor-pointer"
            style={{ minWidth: 180 }}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Alert: low stock */}
      {products.some((p) => p.stock <= 3 && p.stock > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm text-amber-800">
          <AlertCircle size={16} className="text-amber-500 shrink-0" />
          <span>
            <strong>{products.filter((p) => p.stock <= 3 && p.stock > 0).length} productos</strong> con poco stock.
            Revisa y actualiza el inventario.
          </span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No se encontraron productos</p>
            <p className="text-gray-400 text-sm mt-1">Prueba con otra búsqueda o categoría</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-5 py-3.5">Producto</th>
                  <th className="text-left px-4 py-3.5 hidden md:table-cell">Categoría</th>
                  <th className="text-left px-4 py-3.5">Precio</th>
                  <th className="text-left px-4 py-3.5">Stock</th>
                  <th className="text-center px-4 py-3.5">Visible</th>
                  <th className="text-right px-5 py-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((product) => {
                  const stockInfo = getStockStatus(product.stock)
                  return (
                    <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${!product.active ? 'opacity-50' : ''}`}>
                      {/* Product info */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-cream-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg">
                                {product.category === 'ropa' ? '👔' :
                                 product.category === 'calzado' ? '👟' :
                                 product.category === 'muebles' ? '🪑' : '👜'}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 text-sm truncate max-w-[160px]">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {product.featured ? '⭐ Destacado · ' : ''}
                              {!product.active ? '🔒 Oculto' : '👁️ Visible'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-gray-600 capitalize">
                          {CATEGORY_LABELS[product.category] ?? product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5">
                        <span className="font-bold text-gray-800 text-sm">{formatPrice(product.price)}</span>
                      </td>

                      {/* Stock — editable inline */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateStock(product.id, product.stock - 1)}
                            className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 flex items-center justify-center text-xs font-bold leading-none"
                          >−</button>
                          <span className={`text-sm font-bold w-6 text-center ${
                            product.stock === 0 ? 'text-red-600' :
                            product.stock <= 3 ? 'text-amber-600' : 'text-gray-800'
                          }`}>
                            {product.stock}
                          </span>
                          <button
                            onClick={() => updateStock(product.id, product.stock + 1)}
                            className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 flex items-center justify-center text-xs font-bold leading-none"
                          >+</button>
                        </div>
                        <span className={`text-[10px] font-semibold ${stockInfo.color}`}>
                          {stockInfo.label}
                        </span>
                      </td>

                      {/* Toggle visible */}
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => toggleActive(product.id)}
                          title={product.active ? 'Ocultar de tienda' : 'Mostrar en tienda'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            product.active
                              ? 'text-green-600 bg-green-50 hover:bg-green-100'
                              : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {product.active ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/productos/${product.id}`}
                            className="p-2 text-gray-500 hover:text-damir-700 hover:bg-damir-50 rounded-lg transition-colors"
                            title="Editar producto"
                          >
                            <Edit size={15} />
                          </Link>
                          <button
                            onClick={() => setConfirmDelete(product.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setConfirmDelete(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">¿Eliminar producto?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Esta acción no se puede deshacer. El producto desaparecerá de la tienda permanentemente.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="btn-secondary flex-1 justify-center py-2.5 text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => deleteProduct(confirmDelete)}
                  className="flex-1 py-2.5 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={15} />
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
