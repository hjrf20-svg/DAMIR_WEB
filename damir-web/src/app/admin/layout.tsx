import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Panel Admin — DAMIR',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-area flex min-h-screen" style={{ background: '#120a02' }}>
      <AdminSidebar />
      <main className="flex-1 md:ml-64 min-h-screen overflow-x-hidden" style={{ background: '#120a02', color: '#e8dcc8' }}>
        {children}
      </main>
    </div>
  )
}
