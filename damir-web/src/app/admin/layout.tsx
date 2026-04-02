import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Panel Admin — DAMIR',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Nuclear CSS override — anula cualquier fondo blanco en el admin */}
      <style>{`
        body {
          background-image: none !important;
          background-color: #120a02 !important;
        }
        body::before {
          display: none !important;
        }
        .admin-root,
        .admin-root * {
          scrollbar-color: #5c3a1e #1a0e05;
        }
        .admin-main {
          background: #120a02 !important;
          min-height: 100vh;
          color: #e8dcc8;
        }
        /* Clases Tailwind blancas → oscuras en admin */
        .admin-root .bg-white { background: rgba(255,255,255,0.06) !important; }
        .admin-root .bg-gray-50 { background: rgba(255,255,255,0.04) !important; }
        .admin-root .bg-gray-100 { background: rgba(255,255,255,0.07) !important; }
        .admin-root .text-gray-900,
        .admin-root .text-gray-800 { color: rgba(255,255,255,0.92) !important; }
        .admin-root .text-gray-700 { color: rgba(255,255,255,0.75) !important; }
        .admin-root .text-gray-600 { color: rgba(255,255,255,0.60) !important; }
        .admin-root .text-gray-500 { color: rgba(255,255,255,0.50) !important; }
        .admin-root .text-gray-400 { color: rgba(255,255,255,0.38) !important; }
        .admin-root .border-gray-100,
        .admin-root .border-gray-200 { border-color: rgba(255,255,255,0.09) !important; }
        .admin-root input,
        .admin-root textarea,
        .admin-root select {
          background: rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.88) !important;
          border-color: rgba(200,150,60,0.25) !important;
        }
        .admin-root input::placeholder,
        .admin-root textarea::placeholder {
          color: rgba(255,255,255,0.28) !important;
        }
        .admin-root thead tr {
          background: rgba(255,255,255,0.05) !important;
        }
        .admin-root tbody tr:hover {
          background: rgba(255,255,255,0.04) !important;
        }
      `}</style>

      <div className="admin-root admin-area flex min-h-screen" style={{ background: '#120a02' }}>
        <AdminSidebar />
        <main className="admin-main flex-1 md:ml-64 overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  )
}
