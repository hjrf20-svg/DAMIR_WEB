import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import PickupBanner from '@/components/home/PickupBanner'
import StoreInfo from '@/components/home/StoreInfo'
import { getFeaturedProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <main>
      {/* 1 — Hero with DAMIR logo + name */}
      <HeroSection />

      {/* 2 — Categories grid */}
      <CategoryGrid />

      {/* 3 — Featured products */}
      <FeaturedProducts products={products} />

      {/* 4 — Pickup process banner */}
      <PickupBanner />

      {/* 5 — How it works + store info */}
      <StoreInfo />

      {/* 6 — Restaurant coming soon */}
      <section className="py-16 bg-damir-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-sage-700 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-damir-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🍽️</span>
          <p className="text-sage-400 text-sm font-semibold uppercase tracking-widest mb-3">Próximamente</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Restaurante DAMIR
          </h2>
          <p className="text-cream-400 text-lg leading-relaxed mb-8">
            Pronto podrás ordenar tu comida favorita y recogerla en nuestro restaurante.
            Una experiencia gastronómica única en Magdalena de Kino.
          </p>
          <a
            href="https://wa.me/526623159150?text=Hola%2C%20quiero%20saber%20cuándo%20abre%20el%20restaurante%20DAMIR%20🍽️"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.857L0 24l6.335-1.502A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.518-5.166-1.42l-.37-.22-3.763.892.923-3.67-.242-.382A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Avísame cuando abra
          </a>
        </div>
      </section>
    </main>
  )
}
