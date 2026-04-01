import Link from 'next/link'
import { Clock, MessageCircle, UtensilsCrossed } from 'lucide-react'

export const metadata = {
  title: 'Restaurante — DAMIR',
  description: 'Próximamente: Restaurante DAMIR en Magdalena de Kino, Sonora.',
}

export default function RestaurantePage() {
  return (
    <main className="min-h-screen bg-damir-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center py-20">
        {/* Icon */}
        <div className="w-24 h-24 bg-damir-800/40 border border-damir-700/40 rounded-full flex items-center justify-center mx-auto mb-8">
          <UtensilsCrossed size={40} className="text-cream-300" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-sage-800/30 border border-sage-700/30 rounded-full px-4 py-1.5 mb-6 text-sage-300 text-sm">
          <Clock size={14} />
          <span>Próximamente</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
          Restaurante DAMIR
        </h1>
        <p className="text-cream-300 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Estamos preparando algo especial. Pronto podrás disfrutar de nuestra cocina y ordenar tu
          comida favorita desde aquí.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/526623159150?text=Hola%2C%20quiero%20saber%20cuándo%20abre%20el%20restaurante%20DAMIR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sage text-base px-6 py-3.5 justify-center"
          >
            <MessageCircle size={20} />
            Notifícame cuando abra
          </a>
          <Link href="/" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-base px-6 py-3.5 justify-center">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
