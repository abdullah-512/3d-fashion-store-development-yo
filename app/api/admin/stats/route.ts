import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { loginEvents, orders, products, user } from "@/lib/db/schema"
import { count, desc, eq, gt } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const current = await db.select({ role: user.role }).from(user).where(eq(user.id, session.user.id)).limit(1)
  if (current[0]?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const [users, orderCount, productCount, activeLogins, recentOrders] = await Promise.all([
    db.select({ value: count() }).from(user),
    db.select({ value: count() }).from(orders),
    db.select({ value: count() }).from(products).where(eq(products.active, true)),
    db.select({ value: count() }).from(loginEvents).where(gt(loginEvents.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))),
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(8),
  ])
  return NextResponse.json({ users: users[0]?.value ?? 0, orders: orderCount[0]?.value ?? 0, products: productCount[0]?.value ?? 0, activeLogins: activeLogins[0]?.value ?? 0, recentOrders })
}
