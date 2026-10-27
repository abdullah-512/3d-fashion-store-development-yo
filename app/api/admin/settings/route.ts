import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { siteSettings, user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

async function admin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const rows = await db.select({ role: user.role }).from(user).where(eq(user.id, session.user.id)).limit(1)
  return rows[0]?.role === "ADMIN" ? session : null
}

export async function GET() {
  if (!await admin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, "default")).limit(1)
  return NextResponse.json(rows[0] ?? { id: "default", brandName: "Atelier / 09", accentColor: "#111111", backgroundColor: "#f2f0eb", faviconUrl: "/icon.svg" })
}

export async function PUT(request: Request) {
  if (!await admin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await request.json()
  const values = {
    brandName: String(body.brandName ?? "Atelier / 09").trim().slice(0, 80) || "Atelier / 09",
    accentColor: /^#[0-9a-f]{6}$/i.test(body.accentColor) ? body.accentColor : "#111111",
    backgroundColor: /^#[0-9a-f]{6}$/i.test(body.backgroundColor) ? body.backgroundColor : "#f2f0eb",
    faviconUrl: String(body.faviconUrl ?? "/icon.svg").trim().slice(0, 500) || "/icon.svg",
    updatedAt: new Date(),
  }
  const rows = await db.insert(siteSettings).values({ id: "default", ...values }).onConflictDoUpdate({ target: siteSettings.id, set: values }).returning()
  return NextResponse.json(rows[0])
}
