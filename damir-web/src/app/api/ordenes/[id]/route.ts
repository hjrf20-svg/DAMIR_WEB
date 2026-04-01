import { NextRequest, NextResponse } from 'next/server'
import { readOrders, writeOrders } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const orders = readOrders()
    const idx = orders.findIndex((o) => o.id === id)
    if (idx < 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[idx] = { ...orders[idx], ...body, id, updated_at: new Date().toISOString() }
    writeOrders(orders)

    return NextResponse.json({ order: orders[idx] })
  } catch {
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 })
  }
}
