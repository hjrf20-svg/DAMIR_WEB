'use client'

import { useState } from 'react'
import { Clock, Plus, Trash2, Save, ToggleLeft, ToggleRight, Info } from 'lucide-react'
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
  const previewSlots = selected
    ? generateSlots(selected.openTime, selected.closeTime, selected.slotInterval)
    : []

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Horarios de Pickup</h1>
          <p className="text-gray-500 text-sm mt-1">
            Configura los días y horas disponibles para recoger pedidos
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary text-sm"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </span>
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
              className={`bg-white rounded-2xl border-2 shadow-sm transition-all cursor-pointer ${
                selectedDay === day.day ? 'border-damir-500' : 'border-gray-100 hover:border-gray-300'
              }`}
              onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Toggle open/close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    updateDay(day.day, { open: !day.open })
                  }}
                  className={`shrink-0 transition-colors ${day.open ? 'text-green-500' : 'text-gray-300'}`}
                >
                  {day.open
                    ? <ToggleRight size={28} />
                    : <ToggleLeft size={28} />}
                </button>

                <div className="flex-1">
                  <p className={`font-bold ${day.open ? 'text-gray-800' : 'text-gray-400'}`}>
                    {day.day}
                  </p>
                  {day.open ? (
                    <p className="text-sm text-gray-500">
                      {day.openTime} – {day.closeTime} · {generateSlots(day.openTime, day.closeTime, day.slotInterval).length} slots · {day.maxPerSlot} pedidos/slot
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Cerrado · Sin pickup</p>
                  )}
                </div>

                <div className={`w-2.5 h-2.5 rounded-full ${day.open ? 'bg-green-400' : 'bg-gray-300'}`} />
              </div>

              {/* Expanded editor */}
              {selectedDay === day.day && day.open && (
                <div
                  className="border-t border-gray-100 p-5 bg-gray-50 space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hora de apertura</label>
                      <input
                        type="time"
                        value={day.openTime}
                        onChange={(e) => updateDay(day.day, { openTime: e.target.value })}
                        className="input-damir text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hora de cierre</label>
                      <input
                        type="time"
                        value={day.closeTime}
                        onChange={(e) => updateDay(day.day, { closeTime: e.target.value })}
                        className="input-damir text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Pedidos máx. por horario</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={day.maxPerSlot}
                        onChange={(e) => updateDay(day.day, { maxPerSlot: parseInt(e.target.value) || 1 })}
                        className="input-damir text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Intervalo entre slots (min)</label>
                      <select
                        value={day.slotInterval}
                        onChange={(e) => updateDay(day.day, { slotInterval: parseInt(e.target.value) })}
                        className="input-damir text-sm"
                      >
                        <option value={15}>Cada 15 min</option>
                        <option value={30}>Cada 30 min</option>
                        <option value={60}>Cada hora</option>
                      </select>
                    </div>
                  </div>

                  {/* Slots preview */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      Vista previa de horarios ({generateSlots(day.openTime, day.closeTime, day.slotInterval).length} slots):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {generateSlots(day.openTime, day.closeTime, day.slotInterval).map((slot) => (
                        <span
                          key={slot}
                          className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-600 font-medium"
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
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info size={18} className="text-blue-600" />
              <h3 className="font-semibold text-blue-800">¿Cómo funciona?</h3>
            </div>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                Los clientes ven estos horarios al hacer su pedido
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                Puedes limitar cuántos pedidos se pueden agendar por hora
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                Los días en rojo aparecen como no disponibles
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                Guarda los cambios para que se apliquen de inmediato
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Resumen actual</h3>
            <div className="space-y-2">
              {schedule.map((d) => (
                <div key={d.day} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{d.day.slice(0, 3)}</span>
                  {d.open ? (
                    <span className="text-green-700 font-medium text-xs">
                      {d.openTime}–{d.closeTime}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">Cerrado</span>
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
