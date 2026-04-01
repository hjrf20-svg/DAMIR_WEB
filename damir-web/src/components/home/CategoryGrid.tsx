'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'ropa',
    label: 'Ropa',
    description: 'Moda para toda la familia',
    href: '/tienda?cat=ropa',
    gradient: 'linear-gradient(135deg, #3d1f08 0%, #5c2e0d 50%, #8B4513 100%)',
    emoji: '👔',
  },
  {
    id: 'calzado',
    label: 'Calzado',
    description: 'Estilo en cada paso',
    href: '/tienda?cat=calzado',
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #3d6b3d 100%)',
    emoji: '👟',
  },
  {
    id: 'muebles',
    label: 'Muebles',
    description: 'Hogar con carácter',
    href: '/tienda?cat=muebles',
    gradient: 'linear-gradient(135deg, #2e2008 0%, #4a3410 50%, #6b4e18 100%)',
    emoji: '🪑',
  },
  {
    id: 'accesorios',
    label: 'Accesorios',
    description: 'El detalle que marca',
    href: '/tienda?cat=accesorios',
    gradient: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d4a 50%, #3d3d6b 100%)',
    emoji: '👜',
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16" style={{ background: 'rgba(26,14,5,0.6)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#a07840' }}>
            Explora
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            Nuestras Categorías
          </h2>
          <div className="section-divider" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative rounded-2xl overflow-hidden aspect-square card-hover block"
              style={{ background: cat.gradient }}
            >
              {/* Decorative glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,150,60,0.15), transparent 70%)' }} />

              {/* Emoji background */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', opacity: 0.18, filter: 'blur(1px)' }}>
                {cat.emoji}
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 inset-x-0 h-2/3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }} />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 w-fit">
                  {cat.emoji}
                </div>
                <h3 className="font-serif font-bold text-white text-xl md:text-2xl leading-tight">
                  {cat.label}
                </h3>
                <p className="text-white/70 text-xs md:text-sm mt-1 mb-2 hidden md:block">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1 text-white/80 text-xs font-semibold group-hover:gap-2 transition-all">
                  <span>Ver todo</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
