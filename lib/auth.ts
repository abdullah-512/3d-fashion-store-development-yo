import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { headers } from "next/headers"
import { db } from "./db"
import * as schema from "./db/schema"

const origins = ["http://localhost:3000", process.env.V0_RUNTIME_URL, process.env.V0_DEV_APP_URL, process.env.V0_BUILD_URL, process.env.V0_SANDBOX_URL, process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined, process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined].filter(Boolean) as string[]

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.V0_RUNTIME_URL),
  database: drizzleAdapter(db, { provider: "pg", schema: { user: schema.user, session: schema.session, account: schema.account, verification: schema.verification } }),
  emailAndPassword: { enabled: true },
  trustedOrigins: origins,
  ...(process.env.NODE_ENV === "development" ? { advanced: { defaultCookieAttributes: { sameSite: "none" as const, secure: true } } } : {}),
})

export async function getSession() { return auth.api.getSession({ headers: await headers() }) }
