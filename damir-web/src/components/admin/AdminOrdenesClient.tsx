'use client'

import { useState } from 'react'
import { MessageCircle, CheckCircle, Clock, Package, XCircle, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Order, OrderStatus } from '@/types'

interface Props {
  initialOrders: Order[]
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pendiente:  { label: 'Pendiente',  color: 'text-yellow-700', bg: 'bg-yellow-100', icon: <Clock size={14} /> },
  confirmado: { label: 'Confirmado', color: 'text-blue-700',   bg: 'bg-blue-100',   icon: <CheckCircle size={14} /> },
  preparando: { label: 'Preparando', color: 'text-purple-700', bg: 'bg-purple-100', icon: <Package size={14} /> },
  listo:      { label: '¡Listo!',    color: 'text-green-700',  bg: 'bg-green-100',  icon: <CheckCircle size={14} /> },
  entregado:  { label: 'Entregado',  color: 'text-gray-600',   bg: 'bg-gray-100',   icon: <CheckCircle size={14} /> },
  cancelado:  { label: 'Cancelado',  color: 'text-red-700',    bg: 'bg-red-100',    icon: <XCircle size={14} /> },
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
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-500 text-sm mt-1">{orders.length} pedidos totales</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        <button
          onClick={() => setFilterStatus('todos')}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'todos'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
          }`}
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
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
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
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.bg} ${s.color}`}>
                  {s.icon}
                  {s.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{order.customer_name}</p>
                  <p className="text-xs text-gray-400">{order.order_number}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                  <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('es-MX')}</p>
                </div>
                <span className="text-gray-400 text-lg">{isExpanded ? '▲' : '▼'}</span>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-4">
                  {/* Items */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Productos</p>
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.product_name} x{item.quantity}</span>
                          <span className="font-semibold text-gray-800">{formatPrice(item.subtotal)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Teléfono</p>
                      <p className="text-gray-700">{order.customer_phone}</p>
                    </div>
                    {order.notes && (
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Notas</p>
                        <p className="text-gray-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">{order.notes}</p>
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
                        className="text-xs font-semibold px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        📦 Entregado
                      </button>
                    )}
                    {!['entregado', 'cancelado'].includes(order.status) && (
                      <button onClick={() => updateStatus(order.id, 'cancelado')}
                        className="text-xs font-semibold px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                        Cancelar
                      </button>
                    )}
                    <button
                      onClick={() => sendWhatsApp(order)}
                      className="text-xs font-semibold px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1.5"
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
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-semibold">
              {orders.length === 0 ? 'Aún no hay pedidos' : 'No hay pedidos con este estado'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
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
