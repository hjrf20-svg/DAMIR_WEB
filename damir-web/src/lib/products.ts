import type { Product, ProductCategory } from '@/types'
import { readProducts } from '@/lib/db'

export async function getFeaturedProducts(): Promise<Product[]> {
  return readProducts().filter((p) => p.featured && p.active)
}

export async function getProducts(filters?: {
  category?: ProductCategory
  search?: string
  inStock?: boolean
}): Promise<Product[]> {
  let products = readProducts().filter((p) => p.active)

  if (filters?.category) {
    products = products.filter((p) => p.category === filters.category)
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }
  if (filters?.inStock) {
    products = products.filter((p) => p.stock > 0)
  }

  return products
}

export async function getProductById(id: string): Promise<Product | null> {
  return readProducts().find((p) => p.id === id) ?? null
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  return readProducts()
    .filter((p) => p.category === product.category && p.id !== product.id && p.active)
    .slice(0, 4)
}

export async function getAllProductsForAdmin(): Promise<Product[]> {
  return readProducts()
}
