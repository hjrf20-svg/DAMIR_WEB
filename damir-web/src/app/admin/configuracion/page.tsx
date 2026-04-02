'use client'

import { useState } from 'react'
import { Save, Store, Phone, MapPin, Key, Eye, EyeOff, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '16px',
  padding: '24px',
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.85)',
  borderRadius: '12px',
  padding: '10px 14px',
  fontSize: '0.9rem',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.55)',
  marginBottom: '6px',
}

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [config, setConfig] = useState({
    storeName: 'DAMIR',
    phone: '6623159150',
    address: 'Magdalena de Kino, Sonora, México',
    instagram: '',
    facebook: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {
    if (config.newPassword && config.newPassword !== config.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    setSaved(true)
    toast.success('Configuración guardada ✓')
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Ajustes de tu tienda DAMIR</p>
      </div>

      <div className="space-y-5">
        {/* Tienda info */}
        <div style={cardStyle}>
          <div className="flex items-center gap-2 mb-5">
            <Store size={18} style={{ color: '#c8963c' }} />
            <h3 className="font-bold text-white">Información de la Tienda</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label style={labelStyle}>Nombre de la tienda</label>
              <input name="storeName" value={config.storeName} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1 mb-1.5" style={labelStyle}>
                  <Phone size={13} /> WhatsApp
                </div>
                <input name="phone" value={config.phone} onChange={handleChange} style={inputStyle} placeholder="6623159150" />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1.5" style={labelStyle}>
                  <MapPin size={13} /> Dirección
                </div>
                <input name="address" value={config.address} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Instagram (usuario)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>@</span>
                  <input name="instagram" value={config.instagram} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="damir_store" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Facebook (usuario)</label>
                <input name="facebook" value={config.facebook} onChange={handleChange} style={inputStyle} placeholder="DamirTienda" />
              </div>
            </div>
          </div>
        </div>

        {/* Contraseña */}
        <div style={cardStyle}>
          <div className="flex items-center gap-2 mb-5">
            <Key size={18} style={{ color: '#c8963c' }} />
            <div>
              <h3 className="font-bold text-white">Cambiar Contraseña</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>Deja en blanco para no cambiar la contraseña actual</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Nueva contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={config.newPassword}
                  onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: '40px' }}
                  placeholder="Nueva contraseña"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Confirmar contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={config.confirmPassword}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Confirmar contraseña"
              />
            </div>
          </div>
          <div className="mt-3 rounded-xl p-3 text-xs text-amber-300" style={{ background: 'rgba(200,150,60,0.12)', border: '1px solid rgba(200,150,60,0.25)' }}>
            <strong>💡 Nota:</strong> Para que el cambio de contraseña sea permanente, actualiza el archivo{' '}
            <code className="px-1 rounded" style={{ background: 'rgba(200,150,60,0.2)' }}>.env.local</code> con tu nueva contraseña en{' '}
            <code className="px-1 rounded" style={{ background: 'rgba(200,150,60,0.2)' }}>ADMIN_PASSWORD</code>.
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold text-white rounded-2xl transition-all"
          style={{ background: saved ? '#16a34a' : '#c8963c' }}
        >
          {saved ? (
            <>
              <CheckCircle size={20} />
              ¡Guardado correctamente!
            </>
          ) : (
            <>
              <Save size={20} />
              Guardar Configuración
            </>
          )}
        </button>
      </div>
    </div>
  )
}
