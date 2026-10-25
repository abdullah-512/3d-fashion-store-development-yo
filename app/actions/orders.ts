"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { orderItems, orders } from "@/lib/db/schema"
import { headers } from "next/headers"

export async function placeCodOrder(input: {
  productId: string
  productName: string
  quantity: number
  priceInCents: number
  fullName: string
  phone: string
  email?: string
  city: string
  province: string
  address: string
  notes?: string
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Please sign in before placing an order.")
  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 10) throw new Error("Invalid quantity")
  if (!/^\+?92\d{10}$/.test(input.phone.replace(/[\s-]/g, ""))) throw new Error("Enter a valid Pakistani mobile number.")
  if (!input.fullName.trim() || !input.city.trim() || !input.province.trim() || !input.address.trim()) throw new Error("Complete all required delivery fields.")

  const id = crypto.randomUUID()
  const subtotal = input.priceInCents * input.quantity
  await db.insert(orders).values({
    id,
    userId: session.user.id,
    status: "PENDING",
    paymentMethod: "COD",
    subtotalInCents: subtotal,
    discountInCents: 0,
    totalInCents: subtotal,
    addressSnapshot: { fullName: input.fullName.trim(), phone: input.phone.trim(), email: input.email?.trim() || null, city: input.city.trim(), province: input.province.trim(), address: input.address.trim(), notes: input.notes?.trim() || null },
  })
  await db.insert(orderItems).values({ id: crypto.randomUUID(), orderId: id, productId: input.productId, productName: input.productName, quantity: input.quantity, priceInCents: input.priceInCents })
  return { orderId: id }
}
