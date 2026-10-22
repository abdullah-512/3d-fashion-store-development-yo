import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

const ADMIN_EMAIL = "adminlog72@gmail.com"
const ADMIN_PASSWORD = "12345678954321"

export async function POST() {
  const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, ADMIN_EMAIL)).limit(1)
  if (existing[0]) {
    await db.update(user).set({ role: "ADMIN" }).where(eq(user.id, existing[0].id))
    return NextResponse.json({ ready: true })
  }
  const result = await auth.api.signUpEmail({ body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Atelier Admin" } })
  if (!result.user) return NextResponse.json({ error: "Unable to provision admin" }, { status: 500 })
  await db.update(user).set({ role: "ADMIN", emailVerified: true }).where(eq(user.id, result.user.id))
  return NextResponse.json({ ready: true })
}
