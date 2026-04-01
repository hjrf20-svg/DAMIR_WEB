import { Suspense } from 'react'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-damir-950">
      <Suspense>{children}</Suspense>
    </div>
  )
}
