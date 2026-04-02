import Link from 'next/link'
import { CheckCircle, MessageCircle, MapPin, Clock } from 'lucide-react'

export const metadata = { title: 'Pago exitoso — DAMIR' }

export default function PagoExitosoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1a0e05 0%, #0a1208 100%)' }}>
      <div className="max-w-md w-full text-center">

        {/* Icono de éxito */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(74,222,128,0.15)', border: '2px solid rgba(74,222,128,0.4)' }}>
          <CheckCircle size={48} className="text-green-400" />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
          ¡Pago Recibido!
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          Tu pago fue procesado con éxito. Prepararemos tu pedido y te contactaremos por WhatsApp para confirmar tu pickup.
        </p>

        {/* Info card */}
        <div className="rounded-2xl p-5 mb-6 text-left space-y-3"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-semibold text-white mb-3">Próximos pasos:</p>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <MessageCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
            <span>Te contactaremos por WhatsApp para confirmar tu pedido</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <Clock size={16} className="text-[#c8963c] mt-0.5 shrink-0" />
            <span>Prepararemos tu pedido antes de tu horario de pickup</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <MapPin size={16} className="text-[#c8963c] mt-0.5 shrink-0" />
            <span>Recoge en DAMIR · Magdalena de Kino, Sonora</span>
          </div>
        </div>

        {/* WhatsApp botón */}
        <a
          href="https://wa.me/526623159150?text=Hola%20DAMIR%2C%20acabo%20de%20pagar%20mi%20pedido%20en%20línea%20✅"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-white mb-3 transition-all hover:opacity-90"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={18} />
          Confirmar por WhatsApp
        </a>

        <Link
          href="/"
          className="flex items-center justify-center w-full py-3.5 rounded-full font-semibold transition-all hover:opacity-80"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
