import Link from 'next/link'
import {
  BookOpen, Package, ShoppingBag, Clock, Settings,
  Plus, Edit, Trash2, Eye, EyeOff, Star, Image,
  CheckCircle, AlertCircle, ArrowRight, LogIn, LogOut
} from 'lucide-react'

export const metadata = { title: 'Guía de Uso — Admin DAMIR' }

const sections = [
  {
    id: 'acceso',
    icon: <LogIn size={22} />,
    color: 'bg-blue-100 text-blue-700',
    title: '1. Cómo entrar al panel',
    steps: [
      { icon: '🌐', text: 'Abre tu navegador (Chrome, Safari, Firefox)' },
      { icon: '📝', text: 'Escribe la dirección de tu tienda: damir.com/admin' },
      { icon: '🔑', text: 'Ingresa tu contraseña de administrador' },
      { icon: '✅', text: '¡Listo! Ya estás dentro del panel' },
    ],
    note: 'La contraseña predeterminada es damir2026. Puedes cambiarla en Configuración.',
    noteColor: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  {
    id: 'agregar',
    icon: <Plus size={22} />,
    color: 'bg-green-100 text-green-700',
    title: '2. Cómo agregar un producto',
    steps: [
      { icon: '📦', text: 'Haz clic en "Productos" en el menú de la izquierda' },
      { icon: '➕', text: 'Haz clic en el botón azul "Nuevo Producto" (arriba a la derecha)' },
      { icon: '📸', text: 'PRIMERO sube las fotos del producto (arrastra las imágenes o haz clic en "Agregar fotos")' },
      { icon: '✍️', text: 'Escribe el nombre del producto (ej: "Camisa de lino blanca")' },
      { icon: '📝', text: 'Agrega una descripción detallada: material, para quién es, características' },
      { icon: '🏷️', text: 'Selecciona la categoría: Ropa, Calzado, Muebles o Accesorios' },
      { icon: '💰', text: 'Escribe el precio en pesos mexicanos (sin el símbolo $)' },
      { icon: '🔢', text: 'Escribe cuántas piezas tienes disponibles (stock)' },
      { icon: '📐', text: 'Si aplica, escribe las tallas separadas por coma: S, M, L, XL' },
      { icon: '🎨', text: 'Si aplica, escribe los colores separados por coma: Negro, Blanco, Café' },
      { icon: '⭐', text: 'Marca "Producto destacado" si quieres que aparezca en la página de inicio' },
      { icon: '💾', text: 'Haz clic en "Guardar Producto"' },
    ],
    note: '💡 TIP: Las fotos son lo más importante. Un producto sin foto vende mucho menos. Sube mínimo 1 foto clara.',
    noteColor: 'bg-green-50 border-green-200 text-green-800',
  },
  {
    id: 'editar',
    icon: <Edit size={22} />,
    color: 'bg-amber-100 text-amber-700',
    title: '3. Cómo editar un producto (cambiar precio, stock, etc.)',
    steps: [
      { icon: '📦', text: 'Ve a "Productos" en el menú' },
      { icon: '🔍', text: 'Busca el producto que quieres cambiar (puedes escribir en el buscador)' },
      { icon: '✏️', text: 'Haz clic en el ícono de lápiz (✏️) del producto' },
      { icon: '💰', text: 'Cambia lo que necesites: precio, descripción, fotos, stock' },
      { icon: '💾', text: 'Haz clic en "Guardar Producto" para aplicar los cambios' },
    ],
    extra: {
      title: 'Actualizar stock rápido (sin entrar a editar)',
      desc: 'En la tabla de productos, puedes hacer clic en los botones + y − para subir o bajar el stock directamente, sin necesidad de abrir el editor.',
    },
    note: '⚡ Cambio rápido: Si solo quieres actualizar el número de piezas disponibles, usa los botones + y − directamente en la lista.',
    noteColor: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    id: 'ocultar',
    icon: <EyeOff size={22} />,
    color: 'bg-purple-100 text-purple-700',
    title: '4. Cómo ocultar o mostrar un producto',
    steps: [
      { icon: '📦', text: 'Ve a "Productos" en el menú' },
      { icon: '👁️', text: 'Busca el producto en la tabla' },
      { icon: '🔘', text: 'Haz clic en el ícono de ojo (👁️) en la columna "Visible"' },
      { icon: '✅', text: 'Si el ojo está verde → el producto SÍ aparece en la tienda' },
      { icon: '🔒', text: 'Si el ojo está gris → el producto está oculto (tú lo ves en el panel, los clientes no)' },
    ],
    note: 'Usa esto cuando un producto se agota temporalmente o no quieres que aparezca sin eliminarlo.',
    noteColor: 'bg-purple-50 border-purple-200 text-purple-800',
  },
  {
    id: 'eliminar',
    icon: <Trash2 size={22} />,
    color: 'bg-red-100 text-red-700',
    title: '5. Cómo eliminar un producto',
    steps: [
      { icon: '📦', text: 'Ve a "Productos" en el menú' },
      { icon: '🗑️', text: 'Haz clic en el ícono de basura (🗑️) del producto' },
      { icon: '⚠️', text: 'Aparecerá una ventana de confirmación — lee bien antes de confirmar' },
      { icon: '❌', text: 'Haz clic en "Sí, eliminar" para borrar permanentemente' },
    ],
    note: '⚠️ IMPORTANTE: Eliminar un producto es permanente. Si solo quieres que no se vea por un tiempo, usa la opción de ocultar (ojo) en vez de eliminar.',
    noteColor: 'bg-red-50 border-red-200 text-red-800',
  },
  {
    id: 'pedidos',
    icon: <ShoppingBag size={22} />,
    color: 'bg-indigo-100 text-indigo-700',
    title: '6. Cómo gestionar los pedidos',
    steps: [
      { icon: '📋', text: 'Haz clic en "Pedidos" en el menú de la izquierda' },
      { icon: '🔔', text: 'Verás todos los pedidos ordenados por fecha (los más nuevos arriba)' },
      { icon: '👆', text: 'Haz clic en cualquier pedido para ver los detalles completos' },
      { icon: '🔄', text: 'Cambia el estado del pedido según avances: Pendiente → Confirmado → Preparando → Listo → Entregado' },
      { icon: '💬', text: 'Haz clic en el botón verde "WhatsApp" para notificar al cliente' },
    ],
    extra: {
      title: 'Estados de los pedidos',
      desc: '🟡 Pendiente → Nuevo pedido recibido\n🔵 Confirmado → Pedido verificado\n🟣 Preparando → Estás preparando el pedido\n🟢 Listo → Listo para recoger (notifica al cliente)\n⚫ Entregado → Cliente recogió el pedido',
    },
    note: '💬 Cuando el pedido esté listo, usa el botón de WhatsApp para avisar al cliente. Así sabe que puede pasar.',
    noteColor: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  },
  {
    id: 'horarios',
    icon: <Clock size={22} />,
    color: 'bg-teal-100 text-teal-700',
    title: '7. Cómo configurar los horarios de pickup',
    steps: [
      { icon: '🕐', text: 'Haz clic en "Horarios" en el menú' },
      { icon: '📅', text: 'Verás los 7 días de la semana' },
      { icon: '🔘', text: 'Usa el switch para abrir o cerrar un día (verde = abierto, gris = cerrado)' },
      { icon: '⏰', text: 'Haz clic en un día para editarlo: cambia la hora de apertura, cierre y cuántos pedidos por hora' },
      { icon: '💾', text: 'Haz clic en "Guardar cambios" para aplicar' },
    ],
    note: '⏰ Si vas a cerrar por vacaciones o días festivos, pon esos días como "Cerrado" para que los clientes no puedan agendar en esas fechas.',
    noteColor: 'bg-teal-50 border-teal-200 text-teal-800',
  },
  {
    id: 'salir',
    icon: <LogOut size={22} />,
    color: 'bg-gray-100 text-gray-700',
    title: '8. Cómo cerrar sesión',
    steps: [
      { icon: '🚪', text: 'Ve al final del menú de la izquierda' },
      { icon: '🔴', text: 'Haz clic en "Cerrar Sesión"' },
      { icon: '✅', text: 'Tu sesión se cierra automáticamente' },
    ],
    note: 'La sesión se cierra sola después de 8 horas de inactividad por seguridad.',
    noteColor: 'bg-gray-50 border-gray-200 text-gray-700',
  },
]

export default function GuiaPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-damir-100 rounded-2xl flex items-center justify-center shrink-0">
          <BookOpen size={24} className="text-damir-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guía de Uso del Panel</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Todo lo que necesitas saber para administrar tu tienda DAMIR
          </p>
        </div>
      </div>

      {/* Quick navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">Ir a sección:</p>
        <div className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-damir-100 hover:text-damir-800 text-gray-600 rounded-full transition-colors font-medium"
            >
              {s.title.split('. ')[1]}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-8"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                {section.icon}
              </div>
              <h2 className="font-bold text-gray-900 text-lg">{section.title}</h2>
            </div>

            {/* Steps */}
            <div className="px-6 py-5">
              <ol className="space-y-3">
                {section.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="w-6 h-6 bg-gray-100 rounded-full text-xs font-bold text-gray-500 flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-lg leading-none">{step.icon}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{step.text}</p>
                  </li>
                ))}
              </ol>

              {/* Extra info box */}
              {section.extra && (
                <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="font-semibold text-gray-700 text-sm mb-1.5">{section.extra.title}</p>
                  <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{section.extra.desc}</p>
                </div>
              )}

              {/* Note/tip */}
              <div className={`mt-4 rounded-xl p-3 border text-sm ${section.noteColor}`}>
                {section.note}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-8 bg-damir-900 rounded-2xl p-6 text-center text-white">
        <p className="font-serif text-xl font-bold mb-2">¿Tienes dudas?</p>
        <p className="text-cream-300 text-sm mb-4">
          Si algo no queda claro, escribe por WhatsApp y te ayudamos de inmediato.
        </p>
        <a
          href="https://wa.me/526623159150?text=Hola%2C%20tengo%20una%20duda%20sobre%20el%20panel%20admin%20de%20DAMIR"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.857L0 24l6.335-1.502A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.518-5.166-1.42l-.37-.22-3.763.892.923-3.67-.242-.382A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  )
}
