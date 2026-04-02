'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Info, Package, DollarSign, Tag, Layers } from 'lucide-react'
import toast from 'react-hot-toast'
import ImageUploader from './ImageUploader'
import type { ProductCategory } from '@/types'

interface ProductFormData {
  name: string
  description: string
  price: string
  category: ProductCategory
  stock: string
  sizes: string
  colors: string
  featured: boolean
  active: boolean
  images: string[]
}

const CATEGORIES: Array<{ value: ProductCategory; label: string; emoji: string }> = [
  { value: 'ropa',        label: 'Ropa',        emoji: '👔' },
  { value: 'calzado',     label: 'Calzado',      emoji: '👟' },
  { value: 'muebles',     label: 'Muebles',      emoji: '🪑' },
  { value: 'accesorios',  label: 'Accesorios',   emoji: '👜' },
  { value: 'restaurante', label: 'Restaurante',  emoji: '🍽️' },
]

const SIZE_PRESETS: Record<string, string> = {
  'Ropa adulto': 'XS, S, M, L, XL, XXL',
  'Ropa niño':   '2, 4, 6, 8, 10, 12, 14',
  'Calzado M':   '25, 26, 27, 28, 29, 30',
  'Calzado F':   '22, 23, 24, 25, 26, 27',
  'Cinturones':  'S, M, L, XL',
}

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '1rem',
  padding: '1.5rem',
}

export default function ProductForm({
  initialData,
  productId,
}: {
  initialData?: Partial<ProductFormData>
  productId?: string
}) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<ProductFormData>({
    name:        initialData?.name        ?? '',
    description: initialData?.description ?? '',
    price:       initialData?.price       ?? '',
    category:    initialData?.category    ?? 'ropa',
    stock:       initialData?.stock       ?? '',
    sizes:       initialData?.sizes       ?? '',
    colors:      initialData?.colors      ?? '',
    featured:    initialData?.featured    ?? false,
    active:      initialData?.active      ?? true,
    images:      initialData?.images      ?? [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('El nombre es obligatorio'); return }
    if (!form.price || parseFloat(form.price) <= 0) { toast.error('El precio debe ser mayor a 0'); return }
    if (!form.stock || parseInt(form.stock) < 0) { toast.error('El stock no puede ser negativo'); return }
    if (form.images.length === 0) {
      const ok = confirm('¿Guardar producto sin fotos? (puedes agregarlas después)')
      if (!ok) return
    }

    setSaving(true)
    try {
      const payload = {
        ...form,
        price:  parseFloat(form.price),
        stock:  parseInt(form.stock),
        sizes:  form.sizes  ? form.sizes.split(',').map((s) => s.trim()).filter(Boolean)  : [],
        colors: form.colors ? form.colors.split(',').map((c) => c.trim()).filter(Boolean) : [],
      }

      const isEditing = Boolean(productId)
      const url    = isEditing ? `/api/productos/${productId}` : '/api/productos'
      const method = isEditing ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok && res.status !== 500) throw new Error('Error del servidor')

      toast.success(
        isEditing ? '✅ Producto actualizado correctamente' : '🎉 ¡Producto agregado a la tienda!',
        { duration: 3000, style: { borderRadius: '12px', background: '#2d1a06', color: '#e8dcc8' } }
      )
      router.push('/admin/productos')
    } catch {
      toast.error('Error al guardar. Intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  const labelClass = "block text-sm font-semibold mb-1.5" 
  const sectionIcon = "w-8 h-8 rounded-lg flex items-center justify-center shrink-0"

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">

      {/* ── IMÁGENES ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-5">
          <div className={sectionIcon} style={{ background: 'rgba(200,150,60,0.2)' }}>
            <Layers size={16} style={{ color: '#c8963c' }} />
          </div>
          <div>
            <h3 className="font-bold text-white">Fotos del Producto</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Las fotos son lo más importante para vender</p>
          </div>
        </div>
        <ImageUploader
          images={form.images}
          onChange={(imgs) => setForm((p) => ({ ...p, images: imgs }))}
          maxImages={6}
        />
      </div>

      {/* ── INFO BÁSICA ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-5">
          <div className={sectionIcon} style={{ background: 'rgba(99,179,237,0.15)' }}>
            <Package size={16} style={{ color: '#63b3ed' }} />
          </div>
          <h3 className="font-bold text-white">Información del Producto</h3>
        </div>

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>
              Nombre del producto <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ej: Camisa Linen Premium"
              className="input-damir text-base"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>
              Descripción <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe bien el producto: material, para quién es, qué lo hace especial..."
              className="input-damir resize-none text-sm leading-relaxed"
            />
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{form.description.length}/500 caracteres</p>
          </div>

          {/* Categoría */}
          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>
              Categoría <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, category: c.value }))}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all text-sm font-semibold"
                  style={form.category === c.value
                    ? { borderColor: '#c8963c', background: 'rgba(200,150,60,0.15)', color: '#f5e6c8' }
                    : { borderColor: 'rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.55)' }
                  }
                >
                  <span className="text-xl">{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRECIO & STOCK ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-5">
          <div className={sectionIcon} style={{ background: 'rgba(72,199,142,0.15)' }}>
            <DollarSign size={16} style={{ color: '#48c78e' }} />
          </div>
          <h3 className="font-bold text-white">Precio e Inventario</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>
              Precio en pesos MXN <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-base" style={{ color: 'rgba(200,150,60,0.8)' }}>$</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="1"
                step="1"
                placeholder="0"
                className="input-damir pl-8 text-lg font-bold"
              />
            </div>
            {form.price && (
              <p className="text-xs mt-1 font-medium" style={{ color: '#48c78e' }}>
                Precio: ${parseFloat(form.price || '0').toLocaleString('es-MX')} MXN
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>
              Cantidad disponible <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
              className="input-damir text-lg font-bold"
            />
            {form.stock !== '' && (
              <p className={`text-xs mt-1 font-medium ${
                parseInt(form.stock) === 0 ? 'text-red-400' :
                parseInt(form.stock) <= 3 ? 'text-amber-400' : 'text-green-400'
              }`}>
                {parseInt(form.stock) === 0
                  ? '⚠️ Aparecerá como Agotado'
                  : parseInt(form.stock) <= 3
                  ? `⚡ Últimas ${form.stock} piezas`
                  : `✅ En stock — ${form.stock} disponibles`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── VARIANTES ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-4">
          <div className={sectionIcon} style={{ background: 'rgba(167,139,250,0.15)' }}>
            <Tag size={16} style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <h3 className="font-bold text-white">Tallas y Colores</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Opcional — déjalo vacío si el producto no tiene variantes</p>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {/* Tallas */}
          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>Tallas disponibles</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {Object.entries(SIZE_PRESETS).map(([label, sizes]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, sizes }))}
                  className="text-xs px-3 py-1.5 rounded-full transition-colors font-medium"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="sizes"
              value={form.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL  —  o  —  25, 26, 27, 28"
              className="input-damir"
            />
          </div>

          {/* Colores */}
          <div>
            <label className={labelClass} style={{ color: 'rgba(255,255,255,0.75)' }}>Colores disponibles</label>
            <input
              type="text"
              name="colors"
              value={form.colors}
              onChange={handleChange}
              placeholder="Negro, Blanco, Café, Azul marino"
              className="input-damir"
            />
          </div>
        </div>
      </div>

      {/* ── OPCIONES ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-4">
          <div className={sectionIcon} style={{ background: 'rgba(251,191,36,0.15)' }}>
            <Info size={16} style={{ color: '#fbbf24' }} />
          </div>
          <h3 className="font-bold text-white">Opciones de Visibilidad</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border-2 transition-all"
            style={{ borderColor: form.featured ? '#fbbf24' : 'rgba(255,255,255,0.1)', background: form.featured ? 'rgba(251,191,36,0.08)' : 'transparent' }}>
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-5 h-5 mt-0.5 rounded shrink-0 accent-amber-500"
            />
            <div>
              <p className="font-semibold text-white text-sm">⭐ Producto destacado</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Aparece en la página de inicio</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border-2 transition-all"
            style={{ borderColor: form.active ? '#48c78e' : 'rgba(255,255,255,0.1)', background: form.active ? 'rgba(72,199,142,0.08)' : 'transparent' }}>
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="w-5 h-5 mt-0.5 rounded shrink-0 accent-green-500"
            />
            <div>
              <p className="font-semibold text-white text-sm">👁️ Visible en tienda</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Los clientes pueden ver este producto</p>
            </div>
          </label>
        </div>
      </div>

      {/* ── RESUMEN PREVIEW ── */}
      {form.name && form.price && (
        <div className="rounded-2xl p-4 flex items-center gap-4"
          style={{ background: 'rgba(200,150,60,0.1)', border: '1px solid rgba(200,150,60,0.25)' }}>
          {form.images[0] ? (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <img src={form.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 text-2xl"
              style={{ background: 'rgba(200,150,60,0.15)' }}>
              {CATEGORIES.find(c => c.value === form.category)?.emoji}
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'rgba(200,150,60,0.7)' }}>Vista previa</p>
            <p className="font-bold text-white text-lg leading-tight">{form.name}</p>
            <p className="font-semibold" style={{ color: '#d4a55a' }}>${parseFloat(form.price || '0').toLocaleString()} MXN</p>
          </div>
          <div className="ml-auto text-right">
            <p className={`text-sm font-bold ${parseInt(form.stock || '0') === 0 ? 'text-red-400' : 'text-green-400'}`}>
              {parseInt(form.stock || '0') === 0 ? 'Agotado' : `${form.stock} en stock`}
            </p>
            {form.featured && <p className="text-xs text-amber-400 mt-0.5">⭐ Destacado</p>}
          </div>
        </div>
      )}

      {/* ── BOTONES ── */}
      <div className="flex items-center gap-3 pb-8">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary flex-1 justify-center py-4 text-base"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </span>
          ) : (
            <>
              <Save size={20} />
              Guardar Producto
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex items-center gap-2 py-4 px-5"
        >
          <ArrowLeft size={18} />
          Cancelar
        </button>
      </div>
    </form>
  )
}
