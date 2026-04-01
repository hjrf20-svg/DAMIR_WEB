import Link from 'next/link'
import { ShoppingBag, Clock, MapPin, CheckCircle, MessageCircle } from 'lucide-react'

export default function PickupBanner() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'rgba(12,6,1,0.70)' }}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-700/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-damir-600/15 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
          <div className="inline-flex items-center gap-2 bg-sage-700/30 border border-sage-600/40 rounded-full px-4 py-1.5 mb-6 text-sage-300 text-sm">
            <CheckCircle size={14} />
            <span>Solo Pickup · Recoger en tienda</span>
          </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Compra en línea,<br />
              <span className="text-sage-400">recoge en tienda</span>
            </h2>
            <p className="text-cream-300 text-lg leading-relaxed mb-8">
              Elige el día y hora que más te convenga. Preparamos tu pedido antes de que llegues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tienda" className="btn-primary text-base px-6 py-3.5">
                <ShoppingBag size={18} />
                Comprar Ahora
              </Link>
              <a
                href="https://wa.me/526623159150"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-white/30 text-white hover:bg-white/10 text-base px-6 py-3.5"
              >
                <MessageCircle size={18} />
                Consultar
              </a>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <ShoppingBag size={28} />,
                step: '01',
                title: 'Elige tus productos',
                desc: 'Navega el catálogo y agrega al carrito',
              },
              {
                icon: <Clock size={28} />,
                step: '02',
                title: 'Agenda tu pickup',
                desc: 'Selecciona día y hora para recoger',
              },
              {
                icon: <CheckCircle size={28} />,
                step: '03',
                title: 'Confirmamos',
                desc: 'Te notificamos por WhatsApp',
              },
              {
                icon: <MapPin size={28} />,
                step: '04',
                title: 'Recoge en tienda',
                desc: 'Tu pedido te espera listo',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="text-sage-400 mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-xs text-cream-500 font-bold tracking-wider mb-1">
                      PASO {item.step}
                    </p>
                    <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-cream-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
