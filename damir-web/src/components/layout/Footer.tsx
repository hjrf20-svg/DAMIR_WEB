import Link from 'next/link'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-damir-900 text-cream-200">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h3
                  className="font-serif text-3xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #f5e6c8, #d4a55a, #c8963c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 10px rgba(200,150,60,0.3))',
                  }}
                >
                  DAMIR
                </h3>
                <p className="text-xs text-cream-400">Magdalena de Kino, Son.</p>
              </div>
            </div>
            <p className="text-sm text-cream-400 leading-relaxed mb-4">
              Tu tienda local de ropa, calzado, muebles y accesorios. Calidad y estilo en cada pieza.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/526623159150"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-damir-700 hover:bg-damir-600 rounded-full flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-damir-700 hover:bg-damir-600 rounded-full flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
            </div>
          </div>

          {/* Catálogo */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Catálogo</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/tienda?cat=ropa', label: 'Ropa' },
                { href: '/tienda?cat=calzado', label: 'Calzado' },
                { href: '/tienda?cat=muebles', label: 'Muebles' },
                { href: '/tienda?cat=accesorios', label: 'Accesorios' },
                { href: '/restaurante', label: 'Restaurante' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-damir-500 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Información</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/tienda', label: 'Ver Catálogo' },
                { href: '/restaurante', label: 'Restaurante' },
                { href: '/checkout', label: 'Mi Pedido' },
                {
                  href: 'https://wa.me/526623159150?text=Hola%20DAMIR%2C%20tengo%20una%20pregunta',
                  label: 'Contacto',
                  external: true,
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={'external' in link && link.external ? '_blank' : undefined}
                    rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-cream-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-damir-500 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-damir-400 mt-0.5 shrink-0" />
                <span className="text-sm text-cream-400">
                  Magdalena de Kino<br />Sonora, México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-damir-400 shrink-0" />
                <a
                  href="https://wa.me/526623159150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream-400 hover:text-white transition-colors"
                >
                  662 315 9150
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-damir-400 mt-0.5 shrink-0" />
                <div className="text-sm text-cream-400">
                  <p>Lun – Sáb: 9:00 – 18:00</p>
                  <p>Dom: 10:00 – 15:00</p>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="https://wa.me/526623159150?text=Hola%20DAMIR%2C%20tengo%20una%20pregunta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sage text-sm w-full justify-center"
              >
                <MessageCircle size={16} />
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-damir-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-500 text-center">
            © 2026{' '}
            <Link
              href="/admin"
              className="opacity-0 hover:opacity-20 transition-opacity duration-500 cursor-default select-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              ·
            </Link>
            {' '}DAMIR · Todos los derechos reservados · Magdalena de Kino, Sonora
          </p>
          <p className="text-xs text-cream-600">
            Hecho con ❤️ en México
          </p>
        </div>
      </div>
    </footer>
  )
}
