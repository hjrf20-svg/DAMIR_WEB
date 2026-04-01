'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, MapPin, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import CartDrawer from '@/components/cart/CartDrawer'

const navLinks = [
  { href: '/', label: 'Inicio' },
  {
    href: '/tienda',
    label: 'Tienda',
    children: [
      { href: '/tienda?cat=ropa',       label: '👔 Ropa' },
      { href: '/tienda?cat=calzado',    label: '👟 Calzado' },
      { href: '/tienda?cat=muebles',    label: '🪑 Muebles' },
      { href: '/tienda?cat=accesorios', label: '👜 Accesorios' },
    ],
  },
  { href: '/restaurante', label: 'Restaurante' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems, openCart }   = useCartStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Top info bar ── */}
      <div
        className="hidden md:block text-xs py-1.5 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(26,14,5,0.97)' : 'rgba(26,14,5,0.55)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(200,150,60,0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <a
            href="https://wa.me/526623159150"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#a0c08a] hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.857L0 24l6.335-1.502A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.518-5.166-1.42l-.37-.22-3.763.892.923-3.67-.242-.382A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            <span>662 315 9150 · WhatsApp disponible</span>
          </a>
          <div className="flex items-center gap-1 text-white/30">
            <MapPin size={11} />
            <span>Magdalena de Kino, Sonora · Recoger en tienda</span>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav
        className="sticky top-0 z-30 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(26,14,5,0.97)'
            : 'rgba(26,14,5,0.15)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(6px)',
          borderBottom: scrolled
            ? '1px solid rgba(200,150,60,0.15)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white/80 p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop nav (left) */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-white/75 hover:text-white transition-colors rounded-lg hover:bg-white/8"
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200 opacity-60" />
                    )}
                  </Link>
                  {link.children && (
                    <div
                      className="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      style={{
                        background: 'rgba(26,14,5,0.98)',
                        border: '1px solid rgba(200,150,60,0.15)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-white/65 hover:bg-white/8 hover:text-white font-medium transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── LOGO CENTER — text only (no duplicate with hero) ── */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 group"
            >
              <span
                className="font-serif font-black tracking-widest text-xl md:text-2xl transition-all duration-300 group-hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #f5e6c8, #d4a55a, #c8963c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 12px rgba(200,150,60,0.4))',
                }}
              >
                DAMIR
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {searchOpen ? (
                <div
                  className="flex items-center rounded-full px-3 py-1.5 gap-2"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <Search size={14} className="text-white/50 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim())
                        window.location.href = `/tienda?q=${encodeURIComponent(searchQuery)}`
                      if (e.key === 'Escape') setSearchOpen(false)
                    }}
                    className="bg-transparent outline-none text-sm text-white placeholder-white/30 w-32 md:w-40"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                    <X size={13} className="text-white/40 hover:text-white" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/8 rounded-xl transition-colors"
                >
                  <Search size={19} />
                </button>
              )}

              <button
                onClick={openCart}
                className="relative p-2 text-white/60 hover:text-white hover:bg-white/8 rounded-xl transition-colors"
              >
                <ShoppingCart size={21} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#c8963c] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-4 space-y-1"
            style={{
              background: 'rgba(26,14,5,0.98)',
              borderColor: 'rgba(200,150,60,0.12)',
            }}
          >
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-white/70 font-medium hover:bg-white/5 hover:text-white rounded-xl transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 space-y-0.5 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-white/45 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t pt-3 mt-2 flex items-center gap-2 px-4 py-2 text-white/30 text-xs"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <MapPin size={12} />
              Magdalena de Kino, Sonora
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  )
}
