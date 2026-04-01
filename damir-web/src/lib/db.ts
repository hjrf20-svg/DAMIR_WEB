/**
 * File-based JSON data store.
 * Persists products and orders in /data/*.json so changes made
 * in the admin panel are immediately reflected in the store front.
 * Drop-in replacement until a real DB (Supabase) is configured.
 */

import fs from 'fs'
import path from 'path'
import type { Product, Order } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

// ── Products ─────────────────────────────────────────────────────────────────

export function readProducts(): Product[] {
  ensureDir()
  if (!fs.existsSync(PRODUCTS_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8')) as Product[]
  } catch {
    return []
  }
}

export function writeProducts(products: Product[]): void {
  ensureDir()
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8')
}

export function getProductById(id: string): Product | null {
  return readProducts().find((p) => p.id === id) ?? null
}

export function saveProduct(product: Product): Product {
  const all = readProducts()
  const idx = all.findIndex((p) => p.id === product.id)
  if (idx >= 0) {
    all[idx] = { ...product, updated_at: new Date().toISOString() }
  } else {
    all.unshift({ ...product, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  }
  writeProducts(all)
  return idx >= 0 ? all[idx] : all[0]
}

export function deleteProduct(id: string): void {
  const all = readProducts()
  writeProducts(all.filter((p) => p.id !== id))
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function readOrders(): Order[] {
  ensureDir()
  if (!fs.existsSync(ORDERS_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8')) as Order[]
  } catch {
    return []
  }
}

export function writeOrders(orders: Order[]): void {
  ensureDir()
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8')
}

export function saveOrder(order: Order): Order {
  const all = readOrders()
  const idx = all.findIndex((o) => o.id === order.id)
  if (idx >= 0) {
    all[idx] = { ...order, updated_at: new Date().toISOString() }
  } else {
    all.unshift({ ...order, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  }
  writeOrders(all)
  return idx >= 0 ? all[idx] : all[0]
}
