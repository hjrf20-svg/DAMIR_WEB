import { NextRequest, NextResponse } from 'next/server'
import { readOrders, saveOrder, readProducts, writeProducts } from '@/lib/db'
import { generateOrderNumber } from '@/lib/utils'
import type { OrderStatus } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as OrderStatus | null

    let orders = readOrders()
    if (status && status !== ('todos' as OrderStatus)) {
      orders = orders.filter((o) => o.status === status)
    }

    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const now = new Date().toISOString()

    const order = saveOrder({
      id: crypto.randomUUID(),
      order_number: generateOrderNumber(),
      customer_name: body.customer_name ?? '',
      customer_phone: body.customer_phone ?? '',
      customer_email: body.customer_email ?? undefined,
      items: body.items ?? [],
      total: body.total ?? 0,
      status: 'pendiente',
      pickup_slot_id: body.pickup_slot_id ?? '',
      notes: body.notes ?? undefined,
      whatsapp_sent: false,
      created_at: now,
      updated_at: now,
    })

    // Decrement stock for each item ordered
    const products = readProducts()
    for (const item of body.items ?? []) {
      const idx = products.findIndex((p) => p.id === item.product_id)
      if (idx >= 0 && products[idx].stock >= item.quantity) {
        products[idx] = {
          ...products[idx],
          stock: products[idx].stock - item.quantity,
          updated_at: now,
        }
      }
    }
    writeProducts(products)

    return NextResponse.json({ order }, { status: 201 })
  } catch (err) {
    console.error('POST /api/ordenes:', err)
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}
