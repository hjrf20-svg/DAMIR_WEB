'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Product, ProductCategory } from '@/types'
import { CATEGORY_LABELS } from '@/lib/utils'

interface Props {
  initialProducts: Product[]
  activeCategory?: ProductCategory
  searchQuery?: string
}

const categories: Array<{ value: ProductCategory | 'todos'; label: string; emoji: string }> = [
  { value: 'todos', label: 'Todos', emoji: '🏪' },
  { value: 'ropa', label: 'Ropa', emoji: '👔' },
  { value: 'calzado', label: 'Calzado', emoji: '👟' },
  { value: 'muebles', label: 'Muebles', emoji: '🪑' },
  { value: 'accesorios', label: 'Accesorios', emoji: '👜' },
]

const sortOptions = [
  { value: 'newest', label: 'Más nuevos' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre A–Z' },
]

export default function CatalogClient({ initialProducts, activeCategory, searchQuery }: Props) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>(
    activeCategory ?? 'todos'
  )
  const [sortBy, setSortBy] = useState('newest')
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleCategoryChange = (cat: ProductCategory | 'todos') => {
    setSelectedCategory(cat)
    if (cat === 'todos') {
      router.push('/tienda' + (searchQuery ? `?q=${searchQuery}` : ''))
    } else {
      router.push(`/tienda?cat=${cat}` + (searchQuery ? `&q=${searchQuery}` : ''))
    }
  }

  const products = useMemo(() => {
    let list = [...initialProducts]

    if (!showOutOfStock) {
      list = list.filter((p) => p.stock > 0)
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    return list
  }, [initialProducts, sortBy, showOutOfStock])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200"
            style={
              (cat.value === 'todos' ? !activeCategory : activeCategory === cat.value)
                ? { background: 'linear-gradient(135deg, #c8963c, #a07230)', color: 'white', boxShadow: '0 4px 15px rgba(200,150,60,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }
            }
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span className="font-semibold text-white">{products.length}</span> productos
        </p>

        <div className="flex items-center gap-3">
          {/* Stock toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Solo disponibles</span>
            <div
              onClick={() => setShowOutOfStock(!showOutOfStock)}
              className="w-10 h-5 rounded-full relative transition-colors"
              style={{ background: !showOutOfStock ? '#c8963c' : 'rgba(255,255,255,0.12)' }}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  !showOutOfStock ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </label>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-damir py-2 pr-8 text-sm appearance-none cursor-pointer"
              style={{ width: 'auto', paddingRight: '2rem', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)' }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: '#1a1208', color: 'white' }}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="font-serif text-xl text-white mb-2">No encontramos productos</h3>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Intenta con otra categoría o búsqueda</p>
          <button
            onClick={() => handleCategoryChange('todos')}
            className="btn-primary"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
