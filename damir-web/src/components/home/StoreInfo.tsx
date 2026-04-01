import Link from 'next/link'
import { MapPin, Clock, Phone, ShoppingBag, Calendar, CheckCircle } from 'lucide-react'

export default function StoreInfo() {
  return (
    <section className="py-16" style={{ background: 'rgba(26,14,5,0.62)' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* HOW IT WORKS */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#a07840' }}>Simple y fácil</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            ¿Cómo funciona DAMIR?
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            {
              step: '01',
              icon: '🛍️',
              title: 'Elige tus productos',
              desc: 'Navega el catálogo y agrega lo que te guste al carrito. Ropa, calzado, muebles y más.',
            },
            {
              step: '02',
              icon: '📋',
              title: 'Llena tus datos',
              desc: 'Solo necesitas tu nombre y número de WhatsApp. Sin registro, sin complicaciones.',
            },
            {
              step: '03',
              icon: '📅',
              title: 'Elige horario',
              desc: 'Selecciona el día y la hora que más te convenga para pasar a recoger.',
            },
            {
              step: '04',
              icon: '✅',
              title: 'Recoge en tienda',
              desc: 'Llega a la hora elegida y tu pedido estará listo. Sin esperas sorpresa.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,150,60,0.15)',
              }}
            >
              <span className="absolute top-4 right-4 text-xs font-bold tracking-widest" style={{ color: 'rgba(200,150,60,0.3)' }}>
                {item.step}
              </span>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Store details card */}
        <div className="bg-damir-900 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: info */}
            <div className="p-8 md:p-10">
              <p className="text-sage-400 text-sm font-semibold uppercase tracking-widest mb-3">Visítanos</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                Encuéntranos en<br />Magdalena de Kino
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-cream-300">
                  <MapPin size={18} className="text-sage-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Ubicación</p>
                    <p className="text-sm">Magdalena de Kino, Sonora, México</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-cream-300">
                  <Clock size={18} className="text-sage-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Horarios</p>
                    <p className="text-sm">Lun – Sáb: 9:00 – 18:00</p>
                    <p className="text-sm">Dom: 10:00 – 15:00</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-cream-300">
                  <Phone size={18} className="text-sage-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">WhatsApp</p>
                    <a
                      href="https://wa.me/526623159150"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors underline"
                    >
                      662 315 9150
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/tienda" className="btn-primary text-sm px-5 py-3 justify-center">
                  <ShoppingBag size={16} />
                  Ver Catálogo
                </Link>
                <a
                  href="https://wa.me/526623159150?text=Hola%20DAMIR%2C%20tengo%20una%20pregunta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary border-white/20 text-white hover:bg-white/10 text-sm px-5 py-3 justify-center"
                >
                  Enviar mensaje
                </a>
              </div>
            </div>

            {/* Right: features */}
            <div className="bg-damir-800/50 p-8 md:p-10 flex flex-col justify-center">
              <p className="text-cream-400 text-sm font-semibold uppercase tracking-widest mb-5">
                ¿Por qué DAMIR?
              </p>
              <ul className="space-y-4">
                {[
                  { icon: '🏡', text: 'Tienda local — apoya a tu comunidad' },
                  { icon: '✨', text: 'Productos de calidad seleccionados' },
                  { icon: '📱', text: 'Pide por WhatsApp o en línea' },
                  { icon: '⏰', text: 'Pickup programado — tú decides cuándo' },
                  { icon: '💬', text: 'Atención personalizada y directa' },
                  { icon: '🔄', text: 'Inventario actualizado en tiempo real' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-cream-200">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
