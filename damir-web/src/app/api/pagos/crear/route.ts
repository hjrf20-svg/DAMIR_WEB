import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, pickup, orderNumber } = body

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://damir-web.vercel.app'

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        external_reference: orderNumber,
        items: items.map((item: { name: string; quantity: number; price: number; category: string }) => ({
          id: item.name,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'MXN',
          category_id: item.category,
        })),
        payer: {
          name: customer.name,
          phone: { number: customer.phone },
          email: customer.email || 'cliente@damir.mx',
        },
        metadata: {
          order_number: orderNumber,
          customer_name: customer.name,
          customer_phone: customer.phone,
          pickup_date: pickup.date,
          pickup_time: pickup.time,
          notes: customer.notes || '',
        },
        back_urls: {
          success: `${siteUrl}/pago/exitoso`,
          failure: `${siteUrl}/pago/fallido`,
          pending: `${siteUrl}/pago/pendiente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'DAMIR Magdalena',
        payment_methods: {
          excluded_payment_types: [],
          installments: 1,
        },
      },
    })

    return NextResponse.json({ init_point: result.init_point, id: result.id })
  } catch (error) {
    console.error('MercadoPago error:', error)
    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 })
  }
}
