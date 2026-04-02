'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingBag, Calendar, Clock, User, MessageSquare,
  CheckCircle, ArrowRight, ArrowLeft, ChevronRight, CreditCard
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, generateOrderNumber, buildWhatsAppOrderMessage, WHATSAPP_NUMBER, PICKUP_HOURS } from '@/lib/utils'
import toast from 'react-hot-toast'

const STEPS = ['Resumen', 'Datos', 'Pickup', 'Pagar']

function getAvailableDates(): Array<{ date: string; label: string; dayLabel: string }> {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    dates.push({
      date: d.toISOString().split('T')[0],
      label: `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]}`,
      dayLabel: dayNames[d.getDay()],
    })
  }
  return dates
}

export default function CheckoutClient() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const total = getTotalPrice()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  })
  const [pickup, setPickup] = useState({
    date: '',
    time: '',
  })

  const dates = getAvailableDates()

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const canProceed = () => {
    if (step === 0) return items.length > 0
    if (step === 1) return form.name.trim() && form.phone.trim()
    if (step === 2) return pickup.date && pickup.time
    return true
  }

  const handlePagarOnline = async () => {
    setIsSubmitting(true)
    const number = generateOrderNumber()
    setOrderNumber(number)

    try {
      const res = await fetch('/api/pagos/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: number,
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            notes: form.notes,
          },
          pickup: {
            date: dates.find((d) => d.date === pickup.date)?.label ?? pickup.date,
            time: pickup.time,
          },
          items: items.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            category: item.product.category,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.init_point) {
        throw new Error(data.error || 'Error al crear el pago')
      }

      clearCart()
      window.location.href = data.init_point
    } catch (err) {
      console.error(err)
      toast.error('Error al iniciar el pago. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePagarWhatsApp = () => {
    const number = generateOrderNumber()
    setOrderNumber(number)

    const orderItems = items.map((item) => ({
      product_name: item.product.name,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
    }))

    const selectedDate = dates.find((d) => d.date === pickup.date)
    const waMsg = buildWhatsAppOrderMessage({
      order_number: number,
      customer_name: form.name,
      items: orderItems,
      total,
      pickup_date: selectedDate?.label ?? pickup.date,
      pickup_time: pickup.time,
      notes: form.notes,
    })

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, '_blank')
    clearCart()
    setStep(4)
  }

  if (items.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={60} className="text-cream-300 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-damir-800 mb-2">Tu carrito está vacío</h2>
          <p className="text-damir-400 mb-6">Agrega productos antes de continuar al checkout</p>
          <Link href="/tienda" className="btn-primary">Ver Productos</Link>
        </div>
      </div>
    )
  }

  // Success screen
  if (step === 4) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-damir-900 mb-3">
            ¡Pedido Enviado!
          </h1>
          <p className="text-damir-600 mb-2">
            Tu pedido <strong className="text-damir-800">{orderNumber}</strong> fue enviado por WhatsApp.
          </p>
          <p className="text-damir-500 text-sm mb-8">
            Te contactaremos para confirmar tu pedido y horario de pickup.
          </p>
          <div className="bg-white rounded-2xl p-5 shadow-card border border-cream-200 mb-6 text-left">
            <p className="font-semibold text-damir-800 mb-1">Próximos pasos:</p>
            <ol className="text-sm text-damir-600 space-y-1 list-decimal list-inside">
              <li>Recibirás confirmación por WhatsApp</li>
              <li>Prepararemos tu pedido con tiempo</li>
              <li>Llega a la hora elegida a recoger</li>
            </ol>
          </div>
          <Link href="/" className="btn-primary w-full justify-center">
            Volver al Inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-damir-900 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-cream-400 text-sm mb-1">
            <Link href="/" className="hover:text-white">Inicio</Link> / Checkout
          </p>
          <h1 className="font-serif text-2xl font-bold text-white">Finalizar Compra</h1>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-damir-800 text-white' :
                  'bg-cream-200 text-damir-400'
                }`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${
                  i === step ? 'text-damir-800' : 'text-damir-400'
                }`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={16} className="text-cream-300 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* STEP 0: Order summary */}
            {step === 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card border border-cream-100">
                <h2 className="font-serif text-xl font-bold text-damir-900 mb-5 flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Resumen de Pedido
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 bg-cream-100 rounded-lg overflow-hidden shrink-0">
                        {item.product.images?.[0] && (
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-damir-800 text-sm truncate">{item.product.name}</p>
                        {(item.size || item.color) && (
                          <p className="text-xs text-damir-400">
                            {item.size && `Talla ${item.size}`}
                            {item.size && item.color && ' · '}
                            {item.color}
                          </p>
                        )}
                        <p className="text-xs text-damir-500">x{item.quantity}</p>
                      </div>
                      <p className="font-bold text-damir-800 text-sm shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: Customer info */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-card border border-cream-100">
                <h2 className="font-serif text-xl font-bold text-damir-900 mb-5 flex items-center gap-2">
                  <User size={20} />
                  Tus Datos
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-damir-700 mb-1.5">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Tu nombre"
                      className="input-damir"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-damir-700 mb-1.5">
                      WhatsApp / Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="662 123 4567"
                      className="input-damir"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-damir-700 mb-1.5">
                      Correo electrónico (opcional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="tucorreo@ejemplo.com"
                      className="input-damir"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-damir-700 mb-1.5">
                      Notas del pedido (opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleFormChange}
                      placeholder="¿Algún detalle especial?"
                      rows={3}
                      className="input-damir resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Pickup scheduling */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-card border border-cream-100">
                <h2 className="font-serif text-xl font-bold text-damir-900 mb-5 flex items-center gap-2">
                  <Calendar size={20} />
                  Selecciona tu Pickup
                </h2>

                {/* Date selector */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-damir-700 mb-3">Día para recoger</p>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.date}
                        onClick={() => setPickup((prev) => ({ ...prev, date: d.date }))}
                        className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                          pickup.date === d.date
                            ? 'border-damir-800 bg-damir-800 text-white'
                            : 'border-cream-200 hover:border-damir-400 text-damir-700'
                        }`}
                      >
                        <span className="text-xs font-medium">{d.dayLabel}</span>
                        <span className="text-lg font-bold leading-tight">
                          {new Date(d.date + 'T12:00:00').getDate()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time selector */}
                {pickup.date && (
                  <div>
                    <p className="text-sm font-semibold text-damir-700 mb-3">Hora de pickup</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {PICKUP_HOURS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setPickup((prev) => ({ ...prev, time }))}
                          className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                            pickup.time === time
                              ? 'border-damir-800 bg-damir-800 text-white'
                              : 'border-cream-200 hover:border-damir-400 text-damir-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 bg-cream-50 rounded-xl p-4 flex items-start gap-2 text-sm text-damir-600">
                  <Clock size={16} className="mt-0.5 shrink-0 text-sage-600" />
                  <span>Horario de atención: Lun–Sáb 9:00–18:00 · Dom 10:00–15:00</span>
                </div>
              </div>
            )}

            {/* STEP 3: Pagar */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Resumen del pedido */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-cream-100">
                  <h2 className="font-serif text-xl font-bold text-damir-900 mb-4 flex items-center gap-2">
                    <CheckCircle size={20} />
                    Resumen Final
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-cream-50 rounded-xl p-3">
                      <p className="text-xs font-bold text-damir-500 uppercase mb-1">Cliente</p>
                      <p className="font-semibold text-damir-800 text-sm">{form.name}</p>
                      <p className="text-damir-500 text-xs">{form.phone}</p>
                    </div>
                    <div className="bg-cream-50 rounded-xl p-3">
                      <p className="text-xs font-bold text-damir-500 uppercase mb-1">Pickup</p>
                      <p className="font-semibold text-damir-800 text-sm">
                        {dates.find((d) => d.date === pickup.date)?.label}
                      </p>
                      <p className="text-damir-500 text-xs">⏰ {pickup.time} · DAMIR Magdalena</p>
                    </div>
                  </div>
                  {form.notes && (
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                      <p className="text-xs font-bold text-amber-600 uppercase mb-1">Notas</p>
                      <p className="text-sm text-amber-800">{form.notes}</p>
                    </div>
                  )}
                </div>

                {/* Opciones de pago */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-cream-100">
                  <h2 className="font-serif text-xl font-bold text-damir-900 mb-5 flex items-center gap-2">
                    <CreditCard size={20} />
                    Elige cómo pagar
                  </h2>

                  {/* Pago online con MercadoPago */}
                  <button
                    onClick={handlePagarOnline}
                    disabled={isSubmitting}
                    className="w-full rounded-2xl p-5 mb-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] border-2 border-[#009ee3]/30 hover:border-[#009ee3]"
                    style={{ background: 'linear-gradient(135deg, #e8f4fd, #f0f9ff)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#009ee3] text-lg">MercadoPago</span>
                      <span className="text-xs bg-[#009ee3] text-white px-2 py-0.5 rounded-full font-semibold">Recomendado</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {['💳 Tarjeta', '🏪 OXXO', '🏦 Transferencia SPEI', '📱 PayPal'].map((m) => (
                        <span key={m} className="text-xs bg-white border border-[#009ee3]/20 text-[#009ee3] px-2 py-1 rounded-lg font-medium">{m}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Pago 100% seguro. El dinero se deposita directo a tu cuenta.</p>
                    {isSubmitting && (
                      <div className="flex items-center gap-2 mt-2 text-[#009ee3] text-sm font-semibold">
                        <div className="w-4 h-4 border-2 border-[#009ee3]/30 border-t-[#009ee3] rounded-full animate-spin" />
                        Preparando pago...
                      </div>
                    )}
                  </button>

                  {/* Separador */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-cream-200" />
                    <span className="text-xs text-damir-400 font-medium">o si prefieres</span>
                    <div className="flex-1 h-px bg-cream-200" />
                  </div>

                  {/* Pagar en WhatsApp */}
                  <button
                    onClick={handlePagarWhatsApp}
                    className="w-full rounded-2xl p-4 text-left transition-all hover:scale-[1.01] border border-green-200 hover:border-green-400"
                    style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare size={22} className="text-green-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-green-800 text-sm">Pagar en efectivo al recoger</p>
                        <p className="text-xs text-green-600">Enviar pedido por WhatsApp y pagar cuando vayas a la tienda</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 0 && step < 3 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary flex-none"
                >
                  <ArrowLeft size={16} />
                  Atrás
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-none"
                >
                  <ArrowLeft size={16} />
                  Atrás
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`btn-primary flex-1 justify-center ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continuar
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 shadow-card border border-cream-100 sticky top-24">
              <h3 className="font-semibold text-damir-800 mb-4">Tu Pedido</h3>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-damir-600 truncate mr-2">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-semibold text-damir-800 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-200 pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-damir-500 text-sm">📍 Modo</span>
                  <span className="text-sage-600 font-semibold text-sm">Pickup en tienda</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-damir-900">Total</span>
                  <span className="font-bold text-damir-900 text-xl">{formatPrice(total)}</span>
                </div>
              </div>
              {pickup.date && pickup.time && (
                <div className="mt-4 bg-sage-50 rounded-xl p-3 border border-sage-200">
                  <p className="text-xs font-bold text-sage-600 uppercase mb-1">Pickup</p>
                  <p className="text-sm font-semibold text-sage-800">
                    {dates.find((d) => d.date === pickup.date)?.label}
                  </p>
                  <p className="text-sm text-sage-600">⏰ {pickup.time}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
