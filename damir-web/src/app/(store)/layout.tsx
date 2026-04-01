import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  )
}
