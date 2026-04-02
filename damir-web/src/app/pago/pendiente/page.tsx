import Link from 'next/link'
import { Clock, MessageCircle } from 'lucide-react'

export const metadata = { title: 'Pago pendiente — DAMIR' }

export default function PagoPendientePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1a0e05 0%, #0a1208 100%)' }}>
      <div className="max-w-md w-full text-center">

        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(200,150,60,0.15)', border: '2px solid rgba(200,150,60,0.4)' }}>
          <Clock size={48} style={{ color: '#c8963c' }} />
        </div>

        <h1 className="font-serif text-3xl font-bold text-white mb-3">
          Pago en proceso
        </h1>
        <p className="text-white/60 mb-4 leading-relaxed">
          Tu pago está siendo procesado. Esto puede tomar unos minutos (especialmente si pagaste en OXXO o por transferencia bancaria).
        </p>
        <p className="text-white/40 text-sm mb-8">
          Te notificaremos por WhatsApp en cuanto se confirme tu pago.
        </p>

        <a
          href="https://wa.me/526623159150?text=Hola%20DAMIR%2C%20hice%20un%20pago%20y%20está%20pendiente%20de%20confirmación"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-white mb-3 transition-all hover:opacity-90"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={18} />
          Notificar a DAMIR por WhatsApp
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
