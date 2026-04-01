'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingBag, Calendar,
  Settings, ExternalLink, Menu, X, ChevronRight,
  LogOut, Loader2, BookOpen, Sparkles,
} from 'lucide-react'
import toast from 'react-hot-toast'

const menuItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    href: '/admin/productos',
    label: 'Productos',
    icon: Package,
    accent: 'from-damir-500 to-amber-600',
  },
  {
    href: '/admin/ordenes',
    label: 'Pedidos',
    icon: ShoppingBag,
    accent: 'from-green-500 to-emerald-600',
  },
  {
    href: '/admin/horarios',
    label: 'Horarios',
    icon: Calendar,
    accent: 'from-purple-500 to-violet-600',
  },
  {
    href: '/admin/configuracion',
    label: 'Configuración',
    icon: Settings,
    accent: 'from-gray-400 to-gray-600',
  },
  {
    href: '/admin/guia',
    label: 'Guía de Uso',
    icon: BookOpen,
    accent: 'from-rose-500 to-pink-600',
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      toast.success('Sesión cerrada')
      router.push('/admin/login')
      router.refresh()
    } catch {
      toast.error('Error al cerrar sesión')
    } finally {
      setLoggingOut(false)
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Brand header */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 shrink-0 drop-shadow-[0_0_18px_rgba(200,150,60,0.45)]">
            <Image src="/logo.png" alt="DAMIR" fill className="object-contain" priority />
          </div>
          <div>
            <p className="font-serif font-bold text-white text-xl leading-none tracking-wide">DAMIR</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
              <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase">Panel Admin</p>
            </div>
          </div>
        </div>
        {/* Divider with glow */}
        <div className="h-px bg-linear-to-r from-transparent via-damir-600/60 to-transparent" />
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              {/* Icon with gradient background when active */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                  active
                    ? `bg-linear-to-br ${item.accent} shadow-lg`
                    : 'bg-gray-800 group-hover:bg-gray-700'
                }`}
              >
                <Icon
                  size={15}
                  className={active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}
                />
              </div>
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={13} className="text-gray-400 shrink-0" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pt-2 pb-4">
        <div className="h-px bg-linear-to-r from-transparent via-gray-700/60 to-transparent mb-3" />

        <Link
          href="/"
          target="_blank"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-xl transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center shrink-0 transition-colors">
            <ExternalLink size={14} className="text-gray-500 group-hover:text-gray-300" />
          </div>
          <span>Ver Tienda</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="group w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400/80 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 mt-0.5"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-red-500/20 flex items-center justify-center shrink-0 transition-colors">
            {loggingOut
              ? <Loader2 size={14} className="animate-spin text-red-400" />
              : <LogOut size={14} className="text-red-400/60 group-hover:text-red-300" />
            }
          </div>
          Cerrar Sesión
        </button>

        {/* Version */}
        <div className="mt-3 flex items-center gap-1.5 px-3">
          <Sparkles size={10} className="text-damir-600/60" />
          <p className="text-[10px] text-gray-700 font-medium">DAMIR v1.0 · Magdalena de Kino</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-gray-900/90 backdrop-blur text-white rounded-xl shadow-xl border border-gray-700/80"
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, #0f1117 0%, #111318 60%, #0d0f14 100%)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '4px 0 40px rgba(0,0,0,0.4)',
        }}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
