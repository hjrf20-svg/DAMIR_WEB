import Link from 'next/link'
import { XCircle, MessageCircle, RotateCcw } from 'lucide-react'

export const metadata = { title: 'Pago fallido — DAMIR' }

export default function PagoFallidoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1a0e05 0%, #0a1208 100%)' }}>
      <div className="max-w-md w-full text-center">

        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.4)' }}>
          <XCircle size={48} className="text-red-400" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-white mb-3">
          Pago no completado
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          Hubo un problema al procesar tu pago. No se realizó ningún cargo. Puedes intentarlo de nuevo o contactarnos por WhatsApp.
        </p>

        <Link
          href="/checkout"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold mb-3 transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #c8963c, #a07230)', color: 'white' }}
        >
          <RotateCcw size={18} />
          Intentar de nuevo
        </Link>

        <a
          href="https://wa.me/526623159150?text=Hola%20DAMIR%2C%20tuve%20un%20problema%20al%20pagar%20en%20línea%2C%20¿pueden%20ayudarme?"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={18} />
          Pedir ayuda por WhatsApp
        </a>
      </div>
    </main>
  )
}
