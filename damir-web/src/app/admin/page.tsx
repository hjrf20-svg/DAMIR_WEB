import {
  ShoppingBag, Package, TrendingUp, AlertTriangle,
  Clock, RefreshCw, ArrowRight, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { readProducts, readOrders } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard — Admin DAMIR' }

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  pendiente:  { label: 'Pendiente',  color: 'text-amber-700',  bg: 'bg-amber-50',   dot: 'bg-amber-400'  },
  confirmado: { label: 'Confirmado', color: 'text-blue-700',   bg: 'bg-blue-50',    dot: 'bg-blue-400'   },
  preparando: { label: 'Preparando', color: 'text-purple-700', bg: 'bg-purple-50',  dot: 'bg-purple-400' },
  listo:      { label: 'Listo ✓',   color: 'text-green-700',  bg: 'bg-green-50',   dot: 'bg-green-400'  },
  entregado:  { label: 'Entregado',  color: 'text-gray-600',   bg: 'bg-gray-100',   dot: 'bg-gray-400'   },
  cancelado:  { label: 'Cancelado',  color: 'text-red-700',    bg: 'bg-red-50',     dot: 'bg-red-400'    },
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
            <Zap size={16} className="text-damir-500" />
            <span className="text-xs font-semibold text-damir-600 uppercase tracking-widest">Panel de Control</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Resumen de operaciones · DAMIR</p>
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

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pedidos hoy</p>
            <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
              <ShoppingBag size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayOrders.length}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <p className="text-xs text-amber-600 font-medium">{pendingOrders.length} pendientes</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ingresos hoy</p>
            <div className="w-9 h-9 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-green-100">
              <TrendingUp size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">${revenueToday.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">MXN</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total acumulado</p>
            <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-100">
              <TrendingUp size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {revenueMonth >= 1000 ? `$${(revenueMonth / 1000).toFixed(1)}k` : `$${revenueMonth}`}
          </p>
          <p className="text-xs text-purple-600 font-medium mt-2">{allOrders.length} pedidos totales</p>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm border hover:shadow-md transition-shadow ${
          outOfStockProducts > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Inventario</p>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
              outOfStockProducts > 0
                ? 'bg-linear-to-br from-red-500 to-rose-600 shadow-red-100'
                : 'bg-linear-to-br from-orange-500 to-amber-600 shadow-orange-100'
            }`}>
              <Package size={15} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{allProducts.length}</p>
          {lowStockProducts > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <AlertTriangle size={11} className="text-orange-500" />
              <p className="text-xs text-orange-600 font-medium">{lowStockProducts} bajo stock</p>
            </div>
          )}
          {allProducts.length === 0 && (
            <p className="text-xs text-gray-400 mt-2">Sin productos aún</p>
          )}
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
              <h2 className="font-bold text-gray-900 text-base">Pedidos Recientes</h2>
              <p className="text-xs text-gray-400 mt-0.5">Últimas transacciones</p>
            </div>
            <Link
              href="/admin/ordenes"
              className="flex items-center gap-1 text-xs font-semibold text-damir-700 hover:text-damir-900 transition-colors bg-damir-50 hover:bg-damir-100 px-3 py-1.5 rounded-lg"
            >
              Ver todos
              <ArrowRight size={12} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12 px-6">
              <ShoppingBag size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-medium">Aún no hay pedidos</p>
              <p className="text-gray-300 text-xs mt-1">Los pedidos de tus clientes aparecerán aquí</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentOrders.map((order) => {
                const s = statusConfig[order.status] ?? statusConfig.pendiente
                return (
                  <div key={order.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/80 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-damir-100 to-damir-200 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-damir-700">{order.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 text-sm truncate">{order.customer_name}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{order.order_number}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-900 text-sm">${order.total.toLocaleString()}</p>
                      <p className="text-[11px] text-gray-400">{order.time}</p>
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Actividad Semanal</h3>
                <p className="text-xs text-gray-400">Pedidos por día</p>
              </div>
              <TrendingUp size={15} className="text-emerald-500" />
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {weekData.map(({ day, pct }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-linear-to-t from-damir-600 to-damir-400 transition-all"
                    style={{ height: `${Math.max(pct, 8)}%` }}
                  />
                  <span className="text-[10px] text-gray-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Acciones Rápidas</h3>
            <div className="space-y-2">
              <Link href="/admin/productos/nuevo"
                className="flex items-center gap-3 p-3 rounded-xl bg-damir-50 hover:bg-damir-100 transition-colors text-damir-800 font-semibold text-sm group">
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-damir-500 to-amber-600 flex items-center justify-center shadow-sm">
                  <Package size={13} className="text-white" />
                </div>
                <span className="flex-1">Agregar Producto</span>
                <ArrowRight size={13} className="text-damir-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/admin/ordenes"
                className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-amber-800 font-semibold text-sm group">
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                  <Clock size={13} className="text-white" />
                </div>
                <span className="flex-1">Ver Pedidos ({pendingOrders.length})</span>
                <ArrowRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/admin/horarios"
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-800 font-semibold text-sm group">
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <RefreshCw size={13} className="text-white" />
                </div>
                <span className="flex-1">Gestionar Horarios</span>
                <ArrowRight size={13} className="text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Stock alert */}
          {(lowStockProducts > 0 || outOfStockProducts > 0) && (
            <div className="bg-linear-to-br from-orange-50 to-red-50 border border-orange-200/60 rounded-2xl p-5">
              <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle size={15} />
                Alertas de Inventario
              </h3>
              {outOfStockProducts > 0 && (
                <div className="flex items-center gap-2 text-sm text-red-700 font-semibold mb-1.5">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  {outOfStockProducts} producto(s) agotado(s)
                </div>
              )}
              {lowStockProducts > 0 && (
                <div className="flex items-center gap-2 text-sm text-orange-700 font-medium mb-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  {lowStockProducts} con poco stock
                </div>
              )}
              <Link href="/admin/productos" className="flex items-center gap-1 text-xs text-orange-700 font-bold hover:text-orange-900">
                Revisar productos <ArrowRight size={11} />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
