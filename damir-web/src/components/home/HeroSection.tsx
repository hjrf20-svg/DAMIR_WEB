'use client'

import Link from 'next/link'
import { ShoppingBag, MapPin, ChevronDown, MessageCircle } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a0e05]/70 via-[#2d1a06]/55 to-[#0a1208]/70" />
        <div className="absolute top-0 inset-x-0 h-1/3 bg-linear-to-b from-[#8B4513]/22 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t from-[#1a0e05]/78 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.50)_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[700px] rounded-full bg-[#8B4513]/9 blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-4 pt-6 pb-16">

        {/* Location badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6
                        border border-white/15 bg-white/6 backdrop-blur-sm
                        text-cream-300 text-sm font-medium">
          <MapPin size={13} className="text-[#7fb87f]" />
          Magdalena de Kino, Sonora · México
        </div>

        <div className="relative mx-auto w-full max-w-4xl text-center px-4">
          {/* Title glow */}
          <h1
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif font-black select-none pointer-events-none"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6.2rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(180deg,#c8963c,#8B4513)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'blur(22px)',
              opacity: 0.45,
            }}
          >DAMIR</h1>

          {/* Title */}
          <h1
            className="relative font-serif font-black select-none mb-3"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6.2rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(180deg,#ffffff 0%,#f5e6c8 30%,#d4a55a 68%,#8B4513 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >DAMIR</h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 md:w-12 bg-linear-to-r from-transparent to-[#c8963c]/65" />
            <p className="text-[#d4b07a] text-[10px] md:text-xs tracking-[0.35em] uppercase font-medium whitespace-nowrap">
              Ropa · Calzado · Muebles · Accesorios
            </p>
            <div className="h-px w-8 md:w-12 bg-linear-to-l from-transparent to-[#c8963c]/65" />
          </div>

          {/* Welcome text */}
          <p className="mx-auto text-white/68 text-xs md:text-sm leading-relaxed max-w-[320px] md:max-w-lg">
            Bienvenido a{' '}
            <span className="text-[#d4b07a] font-semibold">DAMIR</span> — tu tienda local en
            Magdalena de Kino. Compra en línea y recoge cuando quieras.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-12">
          <Link
            href="/tienda"
            className="group relative overflow-hidden flex items-center justify-center gap-3
                       px-8 py-4 rounded-full font-bold text-base text-damir-900
                       shadow-[0_4px_40px_rgba(200,150,60,0.40)] transition-all duration-300
                       hover:shadow-[0_6px_60px_rgba(200,150,60,0.60)] hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#f5e6c8,#d4a55a,#c8963c)' }}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShoppingBag size={19} />
            Ver Productos
          </Link>
          <a
            href="https://wa.me/526623159150?text=Hola%20DAMIR!%20Me%20gustaría%20ver%20sus%20productos%20🛍️"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold
                       text-base text-white border border-white/20 bg-white/8 backdrop-blur-sm
                       hover:bg-white/15 hover:border-white/35 transition-all duration-300"
          >
            <MessageCircle size={18} className="text-[#4ade80]" />
            WhatsApp
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-px rounded-2xl overflow-hidden
                        border border-white/10 bg-white/5 backdrop-blur-sm">
          {[
            { icon: '🛍️', val: '200+',    label: 'Productos' },
            { icon: '📅', val: 'Hoy',      label: 'Pickup disponible' },
            { icon: '📍', val: 'Pickup',   label: 'Recoger en tienda' },
            { icon: '💬', val: 'WhatsApp', label: 'Atención directa' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center px-5 md:px-7 py-3.5 hover:bg-white/8 transition-colors"
            >
              <span className="text-base mb-0.5">{s.icon}</span>
              <span className="text-white font-bold text-sm leading-none">{s.val}</span>
              <span className="text-white/40 text-[10px] mt-0.5 hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-1.5 text-white/30 text-xs animate-bounce">
        <span className="tracking-widest uppercase">Explorar</span>
        <ChevronDown size={14} />
      </div>
    </section>
  )
}
