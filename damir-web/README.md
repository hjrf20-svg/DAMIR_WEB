# DAMIR — E-commerce Local con Pickup

Tienda en línea completa para **DAMIR** en Magdalena de Kino, Sonora, México.  
Ropa · Calzado · Muebles · Accesorios · Futuro Restaurante

## 🚀 Stack Tecnológico (Nivel Dios)

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16 + React 19 + TypeScript |
| Estilos | Tailwind CSS (colores DAMIR personalizados) |
| Base de datos | Supabase (PostgreSQL) |
| Imágenes | Cloudinary |
| Estado (carrito) | Zustand (persiste en localStorage) |
| Animaciones | Framer Motion |
| Notificaciones | React Hot Toast |
| Iconos | Lucide React |

## 📦 Funcionalidades

### 🛍️ Tienda
- Catálogo con grid responsivo (Shein-style)
- Filtros por categoría (Ropa, Calzado, Muebles, Accesorios)
- Búsqueda de productos
- Ordenamiento (precio, nombre, más nuevos)
- Estado en tiempo real: Disponible / Últimas piezas / Agotado

### 🛒 Carrito
- Drawer lateral animado
- Selección de tallas y colores
- Control de cantidad con validación de stock
- Persiste entre sesiones (localStorage)

### 🗓️ Checkout con Pickup Programado
- Flujo de 4 pasos (resumen → datos → pickup → confirmar)
- Selector de día (próximos 7 días)
- Selector de horario (9:00 – 18:00)
- Envío automático por **WhatsApp** con todos los detalles del pedido

### 📱 WhatsApp Integration
- Pedido se envía automáticamente al número: **662 315 9150**
- Mensaje formateado con todos los detalles
- Notificaciones al cliente desde el panel admin

### 🔐 Panel Admin
- Dashboard con estadísticas en tiempo real
- Gestión de productos (CRUD completo)
- Gestión de pedidos con cambio de estados
- Alertas de bajo stock
- Envío de notificaciones por WhatsApp a clientes

## 🛠️ Instalación

\`\`\`bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 3. Correr en desarrollo
npm run dev
\`\`\`

## 🗄️ Configuración de Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Copia tus keys en `.env.local`
3. Ejecuta el schema SQL en el editor de Supabase:

\`\`\`
database/schema.sql
\`\`\`

Esto crea:
- Tabla `products` con RLS (seguridad a nivel fila)
- Tabla `orders` 
- Tabla `pickup_slots`
- Función `decrement_stock()` para bajar inventario automáticamente
- Datos de ejemplo

## ☁️ Configuración de Cloudinary

1. Crea cuenta en [cloudinary.com](https://cloudinary.com)
2. Agrega tus keys en `.env.local`
3. Sube el logo DAMIR y las fotos de productos
4. Copia las URLs en el panel admin o en `src/lib/products.ts`

## 🚀 Deploy

### Frontend (Vercel — recomendado)
\`\`\`bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`
Agrega las variables de entorno en el dashboard de Vercel.

## 📁 Estructura del Proyecto

\`\`\`
damir-web/
├── src/
│   ├── app/
│   │   ├── (store)/          # Páginas públicas con navbar/footer
│   │   │   ├── page.tsx      # Página de inicio
│   │   │   ├── tienda/       # Catálogo
│   │   │   ├── producto/[id] # Detalle de producto
│   │   │   ├── checkout/     # Checkout con pickup
│   │   │   └── restaurante/  # Coming soon
│   │   ├── admin/            # Panel administrativo
│   │   │   ├── page.tsx      # Dashboard
│   │   │   ├── productos/    # CRUD productos
│   │   │   └── ordenes/      # Gestión de pedidos
│   │   └── api/              # API Routes
│   │       ├── productos/    # REST: GET, POST, PATCH, DELETE
│   │       └── ordenes/      # REST: GET, POST, PATCH
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── home/             # Hero, CategoryGrid, FeaturedProducts
│   │   ├── catalog/          # ProductCard, CatalogClient, ProductDetailClient
│   │   ├── cart/             # CartDrawer, CheckoutClient
│   │   └── admin/            # AdminSidebar, ProductForm
│   ├── lib/
│   │   ├── utils.ts          # Helpers, formatPrice, WhatsApp builder
│   │   ├── supabase.ts       # Cliente Supabase
│   │   └── products.ts       # Data layer (mock → Supabase)
│   ├── store/
│   │   └── cart.ts           # Zustand cart store
│   └── types/
│       └── index.ts          # TypeScript types
├── database/
│   └── schema.sql            # Schema completo de PostgreSQL
├── public/
│   └── logo.png              # Logo DAMIR
└── .env.example              # Variables de entorno necesarias
\`\`\`

## 📱 Contacto DAMIR

- 📍 Magdalena de Kino, Sonora, México
- 📱 WhatsApp: [662 315 9150](https://wa.me/526623159150)

## 🔮 Fases Futuras

- **Fase 2**: Login de usuarios + historial de pedidos
- **Fase 3**: Pagos online con Stripe
- **Fase 4**: Restaurante — menú y pedidos de comida
