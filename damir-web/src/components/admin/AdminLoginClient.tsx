'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Lock, Loader2, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/admin'

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [shake, setShake] = useState(false)

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        toast.success('¡Bienvenido a DAMIR Admin! 🎉', {
          style: { background: '#111318', color: 'white', borderRadius: '14px', border: '1px solid rgba(200,150,60,0.3)' },
          duration: 2000,
        })
        router.push(from)
        router.refresh()
      } else {
        setAttempts((a) => a + 1)
        setPassword('')
        triggerShake()
        toast.error(
          attempts >= 2
            ? '¿Olvidaste la clave? Contacta al desarrollador.'
            : 'Contraseña incorrecta.',
          { style: { borderRadius: '12px' } }
        )
      }
    } catch {
      toast.error('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0b0d11]">

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-damir-600/8 rounded-full blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-damir-800/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-damir-900/5 rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,150,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,60,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-sm mx-4 transition-all ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={{ animation: shake ? 'shake 0.5s ease-in-out' : undefined }}
      >
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            15% { transform: translateX(-8px); }
            30% { transform: translateX(8px); }
            45% { transform: translateX(-6px); }
            60% { transform: translateX(6px); }
            75% { transform: translateX(-3px); }
            90% { transform: translateX(3px); }
          }
        `}</style>

        {/* Glassmorphism card */}
        <div
          className="rounded-3xl p-8 backdrop-blur-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div
              className="mb-4 px-5 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(200,150,60,0.12), rgba(200,150,60,0.04))',
                border: '1px solid rgba(200,150,60,0.2)',
                boxShadow: '0 0 40px rgba(200,150,60,0.15)',
              }}
            >
              <span
                className="font-serif font-black tracking-widest"
                style={{
                  fontSize: '2rem',
                  background: 'linear-gradient(135deg, #f5e6c8, #d4a55a, #c8963c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                DAMIR
              </span>
            </div>
            <p className="text-gray-500 text-xs tracking-widest uppercase">Administración</p>
          </div>

          {/* Security badge */}
          <div
            className="flex items-center gap-2 justify-center mb-6 px-4 py-2.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Shield size={14} className="text-damir-400" />
            <span className="text-gray-400 text-xs font-medium tracking-wide">Acceso Restringido</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock size={15} className="text-gray-600" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full py-3.5 pl-11 pr-12 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(200,150,60,0.4)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,150,60,0.08)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: loading || !password.trim()
                  ? 'rgba(200,150,60,0.2)'
                  : 'linear-gradient(135deg, #e8c97a, #c8963c, #a87230)',
                color: loading || !password.trim() ? 'rgba(200,150,60,0.4)' : '#1a0f00',
                boxShadow: !loading && password.trim() ? '0 4px 24px rgba(200,150,60,0.25)' : 'none',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Verificando...
                </span>
              ) : (
                'Ingresar al Panel'
              )}
            </button>
          </form>

          {attempts >= 3 && (
            <div
              className="mt-4 p-3 rounded-xl text-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
            >
              <p className="text-red-400 text-xs">
                ¿Olvidaste la clave?{' '}
                <a
                  href="https://wa.me/526623159150?text=Necesito%20recuperar%20la%20contraseña%20del%20panel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 font-semibold hover:underline"
                >
                  WhatsApp soporte
                </a>
              </p>
            </div>
          )}

          <p className="text-center text-gray-700 text-[10px] mt-5 tracking-widest uppercase">
            Solo personal autorizado
          </p>
        </div>

        <p className="text-center mt-4">
          <a href="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors tracking-wide">
            ← Volver a la tienda
          </a>
        </p>
      </div>
    </div>
  )
}
