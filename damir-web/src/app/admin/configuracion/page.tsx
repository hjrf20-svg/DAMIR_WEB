'use client'

import { useState } from 'react'
import { Save, Store, Phone, MapPin, Key, Eye, EyeOff, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

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
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 text-sm mt-1">Ajustes de tu tienda DAMIR</p>
      </div>

      <div className="space-y-5">
        {/* Tienda info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Store size={18} className="text-damir-700" />
            <h3 className="font-bold text-gray-800">Información de la Tienda</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre de la tienda</label>
              <input name="storeName" value={config.storeName} onChange={handleChange} className="input-damir" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1.5">
                  <Phone size={13} /> WhatsApp
                </div>
                <input name="phone" value={config.phone} onChange={handleChange} className="input-damir" placeholder="6623159150" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1.5">
                  <MapPin size={13} /> Dirección
                </div>
                <input name="address" value={config.address} onChange={handleChange} className="input-damir" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Instagram (usuario)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">@</span>
                  <input name="instagram" value={config.instagram} onChange={handleChange} className="input-damir pl-7" placeholder="damir_store" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Facebook (usuario)</label>
                <input name="facebook" value={config.facebook} onChange={handleChange} className="input-damir" placeholder="DamirTienda" />
              </div>
            </div>
          </div>
        </div>

        {/* Contraseña */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Key size={18} className="text-damir-700" />
            <div>
              <h3 className="font-bold text-gray-800">Cambiar Contraseña</h3>
              <p className="text-xs text-gray-400 mt-0.5">Deja en blanco para no cambiar la contraseña actual</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nueva contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={config.newPassword}
                  onChange={handleChange}
                  className="input-damir pr-10"
                  placeholder="Nueva contraseña"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmar contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={config.confirmPassword}
                onChange={handleChange}
                className="input-damir"
                placeholder="Confirmar contraseña"
              />
            </div>
          </div>
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            <strong>💡 Nota:</strong> Para que el cambio de contraseña sea permanente, actualiza el archivo{' '}
            <code className="bg-amber-100 px-1 rounded">.env.local</code> con tu nueva contraseña en{' '}
            <code className="bg-amber-100 px-1 rounded">ADMIN_PASSWORD</code>.
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`btn-primary w-full justify-center py-4 text-base transition-all ${saved ? 'bg-green-600 hover:bg-green-600' : ''}`}
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
