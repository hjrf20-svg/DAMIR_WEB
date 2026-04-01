import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readProducts, saveProduct } from '@/lib/db'
import type { ProductCategory } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as ProductCategory | null
    const search = searchParams.get('q')
    const featured = searchParams.get('featured')
    const inStock = searchParams.get('in_stock')
    const all = searchParams.get('all') // admin: include inactive

    let products = all === 'true' ? readProducts() : readProducts().filter((p) => p.active)

    if (category) products = products.filter((p) => p.category === category)
    if (featured === 'true') products = products.filter((p) => p.featured)
    if (inStock === 'true') products = products.filter((p) => p.stock > 0)
    if (search) {
      const q = search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('GET /api/productos:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const now = new Date().toISOString()

    const product = saveProduct({
      id: crypto.randomUUID(),
      name: body.name ?? '',
      description: body.description ?? '',
      price: Number(body.price) || 0,
      category: body.category ?? 'ropa',
      stock: Number(body.stock) || 0,
      images: body.images ?? [],
      sizes: body.sizes ?? [],
      colors: body.colors ?? [],
      featured: Boolean(body.featured),
      active: body.active !== false,
      created_at: now,
      updated_at: now,
    })

    revalidatePath('/')
    revalidatePath('/tienda')
    revalidatePath('/admin/productos')

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('POST /api/productos:', error)
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
  }
}
