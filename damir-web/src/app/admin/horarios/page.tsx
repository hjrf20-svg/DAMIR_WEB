'use client'

import { useState } from 'react'
import { Clock, Save, ToggleLeft, ToggleRight, Info } from 'lucide-react'
import toast from 'react-hot-toast'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

interface DaySchedule {
  day: string
  open: boolean
  openTime: string
  closeTime: string
  maxPerSlot: number
  slotInterval: number
}

const defaultSchedule: DaySchedule[] = [
  { day: 'Lunes',     open: true,  openTime: '09:00', closeTime: '18:00', maxPerSlot: 3, slotInterval: 30 },
  { day: 'Martes',    open: true,  openTime: '09:00', closeTime: '18:00', maxPerSlot: 3, slotInterval: 30 },
  { day: 'Miércoles', open: true,  openTime: '09:00', closeTime: '18:00', maxPerSlot: 3, slotInterval: 30 },
  { day: 'Jueves',    open: true,  openTime: '09:00', closeTime: '18:00', maxPerSlot: 3, slotInterval: 30 },
  { day: 'Viernes',   open: true,  openTime: '09:00', closeTime: '18:00', maxPerSlot: 3, slotInterval: 30 },
  { day: 'Sábado',    open: true,  openTime: '09:00', closeTime: '18:00', maxPerSlot: 3, slotInterval: 30 },
  { day: 'Domingo',   open: true,  openTime: '10:00', closeTime: '15:00', maxPerSlot: 2, slotInterval: 30 },
]

function generateSlots(openTime: string, closeTime: string, interval: number): string[] {
  const slots: string[] = []
  const [oh, om] = openTime.split(':').map(Number)
  const [ch, cm] = closeTime.split(':').map(Number)
  let current = oh * 60 + om
  const end = ch * 60 + cm
  while (current < end) {
    const h = Math.floor(current / 60)
    const m = current % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    current += interval
  }
  return slots
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.85)',
  borderRadius: '12px',
  padding: '8px 12px',
  fontSize: '0.875rem',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '6px',
}

export default function HorariosPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(defaultSchedule)
  const [saving, setSaving] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const updateDay = (day: string, updates: Partial<DaySchedule>) => {
    setSchedule((prev) =>
      prev.map((d) => (d.day === day ? { ...d, ...updates } : d))
    )
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Horarios guardados correctamente')
    setSaving(false)
  }

  const selected = schedule.find((d) => d.day === selectedDay)

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Horarios de Pickup</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Configura los días y horas disponibles para recoger pedidos
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
          style={{ background: '#c8963c', opacity: saving ? 0.7 : 1 }}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save size={16} />
              Guardar cambios
            </>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schedule list */}
        <div className="lg:col-span-2 space-y-3">
          {schedule.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl cursor-pointer transition-all overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${selectedDay === day.day ? '#c8963c' : 'rgba(255,255,255,0.08)'}`,
              }}
              onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
            >
              <div className="flex items-center gap-4 p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    updateDay(day.day, { open: !day.open })
                  }}
                  className="shrink-0 transition-colors"
                  style={{ color: day.open ? '#4ade80' : 'rgba(255,255,255,0.25)' }}
                >
                  {day.open ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>

                <div className="flex-1">
                  <p className="font-bold" style={{ color: day.open ? 'white' : 'rgba(255,255,255,0.4)' }}>
                    {day.day}
                  </p>
                  {day.open ? (
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {day.openTime} – {day.closeTime} · {generateSlots(day.openTime, day.closeTime, day.slotInterval).length} slots · {day.maxPerSlot} pedidos/slot
                    </p>
                  ) : (
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Cerrado · Sin pickup</p>
                  )}
                </div>

                <div className="w-2.5 h-2.5 rounded-full" style={{ background: day.open ? '#4ade80' : 'rgba(255,255,255,0.2)' }} />
              </div>

              {selectedDay === day.day && day.open && (
                <div
                  className="p-5 space-y-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Hora de apertura</label>
                      <input type="time" value={day.openTime} onChange={(e) => updateDay(day.day, { openTime: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Hora de cierre</label>
                      <input type="time" value={day.closeTime} onChange={(e) => updateDay(day.day, { closeTime: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Pedidos máx. por horario</label>
                      <input type="number" min={1} max={20} value={day.maxPerSlot} onChange={(e) => updateDay(day.day, { maxPerSlot: parseInt(e.target.value) || 1 })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Intervalo entre slots (min)</label>
                      <select value={day.slotInterval} onChange={(e) => updateDay(day.day, { slotInterval: parseInt(e.target.value) })} style={inputStyle}>
                        <option value={15} style={{ background: '#1a1008' }}>Cada 15 min</option>
                        <option value={30} style={{ background: '#1a1008' }}>Cada 30 min</option>
                        <option value={60} style={{ background: '#1a1008' }}>Cada hora</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Vista previa de horarios ({generateSlots(day.openTime, day.closeTime, day.slotInterval).length} slots):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {generateSlots(day.openTime, day.closeTime, day.slotInterval).map((slot) => (
                        <span
                          key={slot}
                          className="text-xs rounded-lg px-2 py-1 font-medium"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Info size={18} className="text-blue-400" />
              <h3 className="font-semibold text-blue-300">¿Cómo funciona?</h3>
            </div>
            <ul className="text-sm text-blue-200 space-y-2">
              <li className="flex items-start gap-2"><span className="mt-0.5">✓</span>Los clientes ven estos horarios al hacer su pedido</li>
              <li className="flex items-start gap-2"><span className="mt-0.5">✓</span>Puedes limitar cuántos pedidos se pueden agendar por hora</li>
              <li className="flex items-start gap-2"><span className="mt-0.5">✓</span>Los días en rojo aparecen como no disponibles</li>
              <li className="flex items-start gap-2"><span className="mt-0.5">✓</span>Guarda los cambios para que se apliquen de inmediato</li>
            </ul>
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-semibold text-white mb-3">Resumen actual</h3>
            <div className="space-y-2">
              {schedule.map((d) => (
                <div key={d.day} className="flex items-center justify-between text-sm">
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>{d.day.slice(0, 3)}</span>
                  {d.open ? (
                    <span className="text-green-400 font-medium text-xs">
                      {d.openTime}–{d.closeTime}
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Cerrado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
