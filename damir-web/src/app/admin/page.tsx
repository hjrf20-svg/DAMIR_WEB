import {
  ShoppingBag, Package, TrendingUp, AlertTriangle,
  Clock, RefreshCw, ArrowRight, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { readProducts, readOrders } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard — Admin DAMIR' }

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  pendiente:  { label: 'Pendiente',  color: 'text-amber-300',  bg: 'bg-amber-900/30',   dot: 'bg-amber-400'  },
  confirmado: { label: 'Confirmado', color: 'text-blue-300',   bg: 'bg-blue-900/30',    dot: 'bg-blue-400'   },
  preparando: { label: 'Preparando', color: 'text-purple-300', bg: 'bg-purple-900/30',  dot: 'bg-purple-400' },
  listo:      { label: 'Listo ✓',   color: 'text-green-300',  bg: 'bg-green-900/30',   dot: 'bg-green-400'  },
  entregado:  { label: 'Entregado',  color: 'text-white/50',   bg: 'bg-white/5',        dot: 'bg-white/30'   },
  cancelado:  { label: 'Cancelado',  color: 'text-red-300',    bg: 'bg-red-900/30',     dot: 'bg-red-400'    },
}

export default function AdminDashboard() {
  const allProducts = readProducts()
  const allOrders = readOrders()

  const today = new Date().toDateString()
  const todayOrders = allOrders.filter((o) => new Date(o.created_at).toDateString() === today)
  const pendingOrders = allOrders.filter((o) => o.status === 'pendiente')
  const revenueToday = todayOrders.reduce((s, o) => s + o.total, 0)
  const revenueMonth = allOrders.reduce((s, o) => s + o.total, 0)
  const lowStockProducts = allProducts.filter((p) => p.stock <= 3 && p.stock > 0 && p.active).length
  const outOfStockProducts = allProducts.filter((p) => p.stock === 0 && p.active).length

  const recentOrders = allOrders.slice(0, 4).map((o) => ({
    ...o,
    avatar: o.customer_name.split(' ').map((n: string) => n[0] ?? '').join('').slice(0, 2).toUpperCase(),
    time: new Date(o.created_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
  }))

  // Weekly bar heights — simple placeholder (equal bars until real data)
  const weekData = [
    { day: 'L', pct: 5 }, { day: 'M', pct: 5 }, { day: 'X', pct: 5 },
    { day: 'J', pct: 5 }, { day: 'V', pct: 5 }, { day: 'S', pct: 5 }, { day: 'D', pct: 5 },
  ]

  return (
    <div className="p-5 md:p-8 max-w-7xl">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} style={{ color: '#c8963c' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#c8963c' }}>Panel de Control</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Resumen de operaciones · DAMIR</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-damir-700 hover:bg-damir-800 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <Package size={15} />
          Nuevo Producto
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">

        <div className="rounded-2xl p-5 transition-all hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Pedidos hoy</p>
            <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <ShoppingBag size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{todayOrders.length}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <p className="text-xs text-amber-400 font-medium">{pendingOrders.length} pendientes</p>
          </div>
        </div>

        <div className="rounded-2xl p-5 transition-all hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Ingresos hoy</p>
            <div className="w-9 h-9 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">${revenueToday.toLocaleString()}</p>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>MXN</p>
        </div>

        <div className="rounded-2xl p-5 transition-all hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Total acumulado</p>
            <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            {revenueMonth >= 1000 ? `$${(revenueMonth / 1000).toFixed(1)}k` : `$${revenueMonth}`}
          </p>
          <p className="text-xs text-purple-300 font-medium mt-2">{allOrders.length} pedidos totales</p>
        </div>

        <div className="rounded-2xl p-5 transition-all hover:scale-[1.02]" style={{
          background: outOfStockProducts > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)',
          border: outOfStockProducts > 0 ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.08)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>Inventario</p>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              outOfStockProducts > 0 ? 'bg-linear-to-br from-red-500 to-rose-600' : 'bg-linear-to-br from-orange-500 to-amber-600'
            }`}>
              <Package size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{allProducts.length}</p>
          {lowStockProducts > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <AlertTriangle size={11} className="text-orange-400" />
              <p className="text-xs text-orange-400 font-medium">{lowStockProducts} bajo stock</p>
            </div>
          )}
          {allProducts.length === 0 && (
            <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Sin productos aún</p>
          )}
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Recent orders */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <h2 className="font-bold text-white text-base">Pedidos Recientes</h2>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Últimas transacciones</p>
            </div>
            <Link
              href="/admin/ordenes"
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: '#c8963c', background: 'rgba(200,150,60,0.1)' }}
            >
              Ver todos
              <ArrowRight size={12} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12 px-6">
              <ShoppingBag size={32} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>Aún no hay pedidos</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Los pedidos de tus clientes aparecerán aquí</p>
            </div>
          ) : (
            <div style={{ borderTop: '1px solid transparent' }}>
              {recentOrders.map((order) => {
                const s = statusConfig[order.status] ?? statusConfig.pendiente
                return (
                  <div key={order.id} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(200,150,60,0.2)' }}>
                      <span className="text-[11px] font-bold" style={{ color: '#c8963c' }}>{order.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white text-sm truncate">{order.customer_name}</p>
                      <p className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{order.order_number}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-white text-sm">${order.total.toLocaleString()}</p>
                      <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{order.time}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${s.bg} ${s.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Mini chart */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-sm">Actividad Semanal</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Pedidos por día</p>
              </div>
              <TrendingUp size={15} className="text-emerald-400" />
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {weekData.map(({ day, pct }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-linear-to-t from-damir-600 to-damir-400 transition-all"
                    style={{ height: `${Math.max(pct, 8)}%` }}
                  />
                  <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-bold text-white text-sm mb-3">Acciones Rápidas</h3>
            <div className="space-y-2">
              <Link href="/admin/productos/nuevo"
                className="flex items-center gap-3 p-3 rounded-xl transition-colors font-semibold text-sm group hover:bg-white/8"
                style={{ color: '#c8963c' }}>
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-damir-500 to-amber-600 flex items-center justify-center">
                  <Package size={13} className="text-white" />
                </div>
                <span className="flex-1">Agregar Producto</span>
                <ArrowRight size={13} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/admin/ordenes"
                className="flex items-center gap-3 p-3 rounded-xl transition-colors text-amber-300 font-semibold text-sm group hover:bg-white/8">
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Clock size={13} className="text-white" />
                </div>
                <span className="flex-1">Ver Pedidos ({pendingOrders.length})</span>
                <ArrowRight size={13} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/admin/horarios"
                className="flex items-center gap-3 p-3 rounded-xl transition-colors text-blue-300 font-semibold text-sm group hover:bg-white/8">
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <RefreshCw size={13} className="text-white" />
                </div>
                <span className="flex-1">Gestionar Horarios</span>
                <ArrowRight size={13} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Stock alert */}
          {(lowStockProducts > 0 || outOfStockProducts > 0) && (
            <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <h3 className="font-bold text-red-300 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle size={15} />
                Alertas de Inventario
              </h3>
              {outOfStockProducts > 0 && (
                <div className="flex items-center gap-2 text-sm text-red-300 font-semibold mb-1.5">
                  <span className="w-2 h-2 bg-red-400 rounded-full" />
                  {outOfStockProducts} producto(s) agotado(s)
                </div>
              )}
              {lowStockProducts > 0 && (
                <div className="flex items-center gap-2 text-sm text-orange-300 font-medium mb-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  {lowStockProducts} con poco stock
                </div>
              )}
              <Link href="/admin/productos" className="flex items-center gap-1 text-xs text-orange-300 font-bold hover:text-orange-200">
                Revisar productos <ArrowRight size={11} />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
