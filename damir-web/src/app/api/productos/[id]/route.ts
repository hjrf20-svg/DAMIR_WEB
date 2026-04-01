import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProductById, saveProduct, deleteProduct } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = getProductById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ product })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const existing = getProductById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const body = await request.json()
    const updated = saveProduct({ ...existing, ...body, id })

    revalidatePath('/')
    revalidatePath('/tienda')
    revalidatePath(`/producto/${id}`)
    revalidatePath('/admin/productos')

    return NextResponse.json({ product: updated })
  } catch {
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    deleteProduct(id)

    revalidatePath('/')
    revalidatePath('/tienda')
    revalidatePath('/admin/productos')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
  }
}
