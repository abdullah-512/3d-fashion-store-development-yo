"use client"

import { FormEvent, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

const initial = { users: 0, orders: 0, products: 0, activeLogins: 0, recentOrders: [] as Array<{ id: string; status: string; totalInCents: number; createdAt: string }> }

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const [stats, setStats] = useState(initial)
  async function login(event: FormEvent) {
    event.preventDefault(); setError("")
    await fetch("/api/admin/bootstrap", { method: "POST" })
    const result = await authClient.signIn.email({ email, password })
    if (result.error) { setError("Invalid admin credentials."); return }
    const response = await fetch("/api/admin/stats")
    if (!response.ok) { setError("This account is not an admin."); return }
    setStats(await response.json()); setLoggedIn(true)
  }
  useEffect(() => { authClient.getSession().then(async ({ data }) => { if (data?.user) { const response = await fetch("/api/admin/stats"); if (response.ok) { setStats(await response.json()); setLoggedIn(true) } } }) }, [])
  if (!loggedIn) return <main className="flex min-h-screen items-center justify-center bg-[#111] p-5 text-[#f2f0eb]"><form onSubmit={login} className="w-full max-w-md border border-white/15 bg-[#f2f0eb] p-8 text-[#111] md:p-10"><p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-black/45">Atelier / 09</p><h1 className="font-serif text-4xl tracking-[-0.06em]">Admin login</h1><p className="mt-3 text-sm text-black/55">Manage products, orders, discounts and customer activity.</p><div className="mt-9 flex flex-col gap-5"><label className="text-[10px] uppercase tracking-[0.16em]">Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-2 w-full border-b border-black/25 bg-transparent py-3 text-sm normal-case tracking-normal outline-none" /></label><label className="text-[10px] uppercase tracking-[0.16em]">Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-2 w-full border-b border-black/25 bg-transparent py-3 text-sm normal-case tracking-normal outline-none" /></label>{error && <p className="text-sm text-red-700">{error}</p>}<button className="bg-[#111] py-4 text-[10px] uppercase tracking-[0.2em] text-white">Sign in</button></div></form></main>
  return <main className="min-h-screen bg-[#f2f0eb] p-5 text-[#111] md:p-10"><div className="mx-auto max-w-6xl"><header className="flex items-end justify-between border-b border-black/15 pb-8"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Atelier / 09</p><h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Control room</h1></div><button onClick={() => authClient.signOut().then(() => setLoggedIn(false))} className="text-[10px] uppercase tracking-[0.16em] underline">Sign out</button></header><div className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">{[["Total users", stats.users], ["Orders", stats.orders], ["Active products", stats.products], ["Logins / 24h", stats.activeLogins]].map(([label, value]) => <div key={label} className="border border-black/10 bg-white/40 p-6"><p className="text-[10px] uppercase tracking-[0.16em] text-black/45">{label}</p><p className="mt-5 font-serif text-4xl">{value}</p></div>)}</div><section className="border border-black/10 bg-white/30 p-6"><div className="flex items-center justify-between"><h2 className="font-serif text-3xl">Recent orders</h2><button className="bg-[#111] px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-white">Add product</button></div><div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-black/10 text-[10px] uppercase tracking-[0.16em] text-black/45"><tr><th className="pb-3">Order</th><th className="pb-3">Status</th><th className="pb-3">Total</th><th className="pb-3">Date</th></tr></thead><tbody>{stats.recentOrders.map((order) => <tr key={order.id} className="border-b border-black/10"><td className="py-4 font-mono text-xs">{order.id.slice(0, 8)}</td><td className="py-4">{order.status}</td><td className="py-4">${(order.totalInCents / 100).toFixed(2)}</td><td className="py-4">{new Date(order.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table>{stats.recentOrders.length === 0 && <p className="py-10 text-center text-sm text-black/45">No orders yet.</p>}</div></section></div></main>
}
