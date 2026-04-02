'use client'

import { useState } from 'react'
import { MessageCircle, CheckCircle, Clock, Package, XCircle, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Order, OrderStatus } from '@/types'

interface Props {
  initialOrders: Order[]
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pendiente:  { label: 'Pendiente',  color: 'text-amber-300',  bg: 'bg-amber-900/40',  icon: <Clock size={14} /> },
  confirmado: { label: 'Confirmado', color: 'text-blue-300',   bg: 'bg-blue-900/40',   icon: <CheckCircle size={14} /> },
  preparando: { label: 'Preparando', color: 'text-purple-300', bg: 'bg-purple-900/40', icon: <Package size={14} /> },
  listo:      { label: '¡Listo!',    color: 'text-green-300',  bg: 'bg-green-900/40',  icon: <CheckCircle size={14} /> },
  entregado:  { label: 'Entregado',  color: 'text-white/50',   bg: 'bg-white/10',      icon: <CheckCircle size={14} /> },
  cancelado:  { label: 'Cancelado',  color: 'text-red-300',    bg: 'bg-red-900/40',    icon: <XCircle size={14} /> },
}

const ALL_STATUSES = Object.keys(statusConfig) as OrderStatus[]

export default function AdminOrdenesClient({ initialOrders }: Props) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'todos'>('todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = filterStatus === 'todos'
    ? orders
    : orders.filter((o) => o.status === filterStatus)

  const updateStatus = async (id: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o))
    await fetch(`/api/ordenes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
  }

  const sendWhatsApp = (order: Order) => {
    const s = statusConfig[order.status]
    const msg = encodeURIComponent(
      `Hola ${order.customer_name}! 👋\n\n` +
      `Tu pedido *${order.order_number}* de DAMIR está ${
        order.status === 'listo' ? '*¡LISTO para recoger!* 🎉' : `en estado: *${s.label}*`
      }\n\n` +
      `📍 DAMIR · Magdalena de Kino, Sonora\n\n` +
      `¡Gracias por tu compra! 🛍️`
    )
    window.open(`https://wa.me/52${order.customer_phone}?text=${msg}`, '_blank')
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Pedidos</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{orders.length} pedidos totales</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        <button
          onClick={() => setFilterStatus('todos')}
          className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
          style={filterStatus === 'todos'
            ? { background: '#c8963c', color: 'white' }
            : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          Todos ({orders.length})
        </button>
        {ALL_STATUSES.map((s) => {
          const count = orders.filter((o) => o.status === s).length
          if (count === 0) return null
          const cfg = statusConfig[s]
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filterStatus === s
                  ? `${cfg.bg} ${cfg.color} border-2 border-current`
                  : ''
              }`}
              style={filterStatus !== s ? { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' } : {}}
            >
              {cfg.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const s = statusConfig[order.status]
          const isExpanded = expandedId === order.id
          return (
            <div key={order.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                style={{ '--hover-bg': 'rgba(255,255,255,0.04)' } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = ''}
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.bg} ${s.color}`}>
                  {s.icon}
                  {s.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white">{order.customer_name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{order.order_number}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-white">{formatPrice(order.total)}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{new Date(order.created_at).toLocaleDateString('es-MX')}</p>
                </div>
                <span className="text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>{isExpanded ? '▲' : '▼'}</span>
              </div>

              {isExpanded && (
                <div className="px-5 py-4 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
                  {/* Items */}
                  <div>
                    <p className="text-xs font-bold uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Productos</p>
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span style={{ color: 'rgba(255,255,255,0.75)' }}>{item.product_name} x{item.quantity}</span>
                          <span className="font-semibold text-white">{formatPrice(item.subtotal)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-bold uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Teléfono</p>
                      <p style={{ color: 'rgba(255,255,255,0.75)' }}>{order.customer_phone}</p>
                    </div>
                    {order.notes && (
                      <div>
                        <p className="text-xs font-bold uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Notas</p>
                        <p className="px-2 py-1 rounded text-amber-200" style={{ background: 'rgba(200,150,60,0.15)', border: '1px solid rgba(200,150,60,0.3)' }}>{order.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {order.status === 'pendiente' && (
                      <button onClick={() => updateStatus(order.id, 'confirmado')}
                        className="text-xs font-semibold px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        ✓ Confirmar
                      </button>
                    )}
                    {order.status === 'confirmado' && (
                      <button onClick={() => updateStatus(order.id, 'preparando')}
                        className="text-xs font-semibold px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        🔄 Preparando
                      </button>
                    )}
                    {order.status === 'preparando' && (
                      <button onClick={() => updateStatus(order.id, 'listo')}
                        className="text-xs font-semibold px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        ✅ Marcar Listo
                      </button>
                    )}
                    {order.status === 'listo' && (
                      <button onClick={() => updateStatus(order.id, 'entregado')}
                        className="text-xs font-semibold px-3 py-2 text-white rounded-lg transition-colors" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        📦 Entregado
                      </button>
                    )}
                    {!['entregado', 'cancelado'].includes(order.status) && (
                      <button onClick={() => updateStatus(order.id, 'cancelado')}
                        className="text-xs font-semibold px-3 py-2 rounded-lg text-red-300 transition-colors" style={{ background: 'rgba(239,68,68,0.15)' }}>
                        Cancelar
                      </button>
                    )}
                    <button
                      onClick={() => sendWhatsApp(order)}
                      className="text-xs font-semibold px-3 py-2 rounded-lg text-green-300 transition-colors flex items-center gap-1.5" style={{ background: 'rgba(34,197,94,0.15)' }}
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <ShoppingBag size={28} style={{ color: 'rgba(255,255,255,0.2)' }} />
            </div>
            <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {orders.length === 0 ? 'Aún no hay pedidos' : 'No hay pedidos con este estado'}
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {orders.length === 0
                ? 'Los pedidos de tus clientes aparecerán aquí'
                : 'Selecciona otro filtro para ver pedidos'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
