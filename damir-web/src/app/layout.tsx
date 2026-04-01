import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'DAMIR — Ropa, Calzado y Muebles en Magdalena de Kino',
    template: '%s — DAMIR',
  },
  description:
    'Tienda local DAMIR en Magdalena de Kino, Sonora. Ropa, calzado, muebles y accesorios. Compra en línea y recoge en tienda.',
  keywords: ['DAMIR', 'Magdalena de Kino', 'ropa', 'calzado', 'muebles', 'Sonora', 'México'],
  openGraph: {
    title: 'DAMIR — Tienda Local Magdalena de Kino',
    description: 'Ropa, calzado, muebles y accesorios. Compra en línea y recoge en tienda.',
    locale: 'es_MX',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
}

function isAdminRoute(pathname: string) {
  return pathname.startsWith('/admin')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  )
}
