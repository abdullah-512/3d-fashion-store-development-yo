import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { products, user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const current = await db.select({ role: user.role }).from(user).where(eq(user.id, session.user.id)).limit(1)
  return current[0]?.role === "ADMIN" ? session : null
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const body = await request.json().catch(() => null)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  const description = typeof body?.description === "string" ? body.description.trim() : ""
  const category = typeof body?.category === "string" ? body.category.trim() : ""
  const image = typeof body?.image === "string" ? body.image.trim() : ""
  const priceInCents = Number(body?.priceInCents)
  const stock = Number(body?.stock)
  if (!name || !description || !category || !image || !Number.isInteger(priceInCents) || priceInCents <= 0 || !Number.isInteger(stock) || stock < 0) {
    return NextResponse.json({ error: "Please provide valid product details." }, { status: 400 })
  }
  const [product] = await db.insert(products).values({ id: crypto.randomUUID(), name, description, category, image, priceInCents, stock, active: true }).returning()
  return NextResponse.json({ product }, { status: 201 })
}
