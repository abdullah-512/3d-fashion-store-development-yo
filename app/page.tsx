"use client"

import { useMemo, useState } from "react"
import {
  ArrowDownRight,
  ArrowRight,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react"

const products = [
  { name: "Form 01 / Bomber", category: "Outerwear", price: 290, image: "/atelier-hero.png", tone: "charcoal" },
  { name: "Essential / Tee", category: "Knitwear", price: 95, image: "/atelier-hero.png", tone: "ivory" },
  { name: "Object 03 / Trouser", category: "Tailoring", price: 180, image: "/atelier-hero.png", tone: "stone" },
]

const categories = ["Hoodies", "T-shirts", "Jackets", "Trousers", "Sneakers", "Accessories"]

export default function Page() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [liked, setLiked] = useState<number[]>([])
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState("")

  const cartLabel = useMemo(() => `Bag (${cartCount})`, [cartCount])

  function addToCart() {
    setCartCount((count) => count + 1)
    setCartOpen(true)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d0d0d] text-[#f2f0eb]">
      <div className="border-b border-white/10 bg-[#161616] px-5 py-2 text-center text-[10px] uppercase tracking-[0.24em] text-white/55">
        Complimentary shipping on orders over $250
      </div>

      <header className="relative z-20 flex items-center justify-between border-b border-white/10 px-5 py-5 md:px-10">
        <button className="md:hidden" aria-label="Open menu"><Menu /></button>
        <a href="#top" className="font-serif text-2xl tracking-[-0.06em]">ATELIER / 09</a>
        <nav className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.2em] text-white/60 md:flex">
          {[["Shop", "#shop"], ["Collections", "#collections"], ["Manifesto", "#manifesto"]].map(([label, href]) => <a key={label} href={href} className="transition-colors hover:text-white">{label}</a>)}
        </nav>
        <div className="flex items-center gap-4 text-white/70">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search className="size-4" /></button>
          <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]" aria-label="Open shopping bag"><ShoppingBag className="size-4" /><span className="hidden sm:inline">{cartLabel}</span></button>
        </div>
      </header>

      {searchOpen && <div className="border-b border-white/10 bg-[#151515] px-5 py-4 md:px-10"><input autoFocus placeholder="Search the collection" className="w-full bg-transparent text-sm outline-none placeholder:text-white/30" aria-label="Search collection" /></div>}

      <section id="top" className="relative min-h-[590px] border-b border-white/10 px-5 py-12 md:px-10 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(130,130,120,0.18),transparent_35%)]" />
        <div className="relative z-10 flex h-full min-h-[500px] flex-col justify-between">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Studio release 04 — 2026</p>
          <div className="grid items-end gap-8 md:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/55"><Sparkles className="size-3" /> Quiet objects for loud lives</p>
              <h1 className="max-w-3xl font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.82] tracking-[-0.075em]">Wear<br /><em>the</em> pause.</h1>
              <a href="#shop" className="mt-9 inline-flex items-center gap-4 border-b border-white/45 pb-2 text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-white">Explore the collection <ArrowRight className="size-3" /></a>
            </div>
            <div className="relative mx-auto w-full max-w-md md:mx-0 md:ml-auto">
              <img src="/atelier-hero.png" alt="Charcoal bomber jacket and ivory tee from Atelier 09" className="aspect-[4/3] w-full object-cover opacity-85 grayscale-[0.25]" />
              <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/60">Object study / 01</span>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="border-b border-white/10 px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr]">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">01 / The collection</p>
          <div><h2 className="max-w-2xl font-serif text-4xl leading-[0.95] tracking-[-0.055em] md:text-6xl">A considered uniform for a less hurried world.</h2><p className="mt-8 max-w-md text-sm leading-7 text-white/48">Form, function and feeling. Each piece is designed in our studio and made in limited runs from considered materials.</p></div>
        </div>
      </section>

      <section id="shop" className="px-5 py-20 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/45">02 / New arrivals</p><h2 className="font-serif text-4xl tracking-[-0.05em] md:text-5xl">Recent objects</h2></div><a href="#shop" className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/55 hover:text-white sm:flex">View all <ArrowDownRight className="size-3" /></a></div>
        <div className="grid gap-x-5 gap-y-12 md:grid-cols-3">
          {products.map((product, index) => <article key={product.name} className="group"><div className={`relative aspect-[0.82] overflow-hidden bg-[#${product.tone === "charcoal" ? "252525" : product.tone === "ivory" ? "d9d5cc" : "aaa79f"}]`}><img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-80 mix-blend-luminosity transition duration-700 group-hover:scale-105" /><button onClick={() => setLiked((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])} className="absolute right-4 top-4" aria-label={`Wishlist ${product.name}`}><Heart className={`size-4 ${liked.includes(index) ? "fill-white text-white" : "text-white/70"}`} /></button><span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.18em] text-white/60">Limited release</span></div><div className="flex items-start justify-between pt-4"><div><h3 className="text-sm">{product.name}</h3><p className="mt-1 text-xs text-white/40">{product.category}</p></div><p className="text-sm text-white/70">${product.price}</p></div><button onClick={addToCart} className="mt-4 w-full border border-white/20 py-3 text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black">Quick add</button></article>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#e5e1d8] px-5 py-20 text-[#121212] md:px-10 md:py-28"><div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-end"><p className="text-[10px] uppercase tracking-[0.22em] text-black/45">03 / Materials & intent</p><div><p className="font-serif text-4xl leading-[0.94] tracking-[-0.06em] md:text-7xl">Less, but better.<br /><em>Always.</em></p><a href="#manifesto" className="mt-9 inline-flex items-center gap-3 border-b border-black/30 pb-2 text-[10px] uppercase tracking-[0.18em]">Read our manifesto <ArrowRight className="size-3" /></a></div></div></section>

      <section id="manifesto" className="px-5 py-20 md:px-10 md:py-24"><div className="grid gap-10 border-b border-white/10 pb-20 md:grid-cols-[0.75fr_1.25fr]"><p className="text-[10px] uppercase tracking-[0.22em] text-white/45">04 / Stay close</p><div><h2 className="max-w-xl font-serif text-4xl tracking-[-0.05em] md:text-6xl">Notes from the studio, delivered sparingly.</h2><form onSubmit={(event) => { event.preventDefault(); if (email) setSubscribed(true) }} className="mt-8 flex max-w-md border-b border-white/30 pb-3">{subscribed ? <p className="text-sm text-white/60">You&apos;re on the list. Thank you.</p> : <><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35" aria-label="Email address" /><button aria-label="Subscribe"><ArrowRight className="size-4" /></button></>}</form></div></div></section>

      <footer className="flex flex-col gap-8 px-5 pb-10 text-[10px] uppercase tracking-[0.18em] text-white/40 md:flex-row md:items-end md:justify-between md:px-10"><p>© 2026 Atelier / 09</p><div className="flex gap-6"><a href="#top" className="hover:text-white">Instagram</a><a href="#top" className="hover:text-white">Shipping</a><a href="#top" className="hover:text-white">Contact</a></div></footer>

      {cartOpen && <div className="fixed inset-0 z-50"><button className="absolute inset-0 bg-black/70" onClick={() => setCartOpen(false)} aria-label="Close cart overlay" /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f2f0eb] p-6 text-[#111] shadow-2xl"><div className="flex items-center justify-between border-b border-black/15 pb-5"><h2 className="font-serif text-3xl tracking-[-0.05em]">Your bag</h2><button onClick={() => setCartOpen(false)} aria-label="Close bag"><X className="size-5" /></button></div>{cartCount === 0 ? <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center"><ShoppingBag className="size-8 stroke-1" /><p className="text-sm text-black/55">Your bag is currently empty.</p><button onClick={() => setCartOpen(false)} className="border-b border-black/40 pb-1 text-[10px] uppercase tracking-[0.18em]">Continue shopping</button></div> : <div className="flex flex-1 flex-col justify-between pt-6"><div className="flex items-center justify-between border-b border-black/10 pb-5"><div><p className="text-sm">Form 01 / Bomber</p><p className="mt-1 text-xs text-black/45">Charcoal / M</p></div><div className="flex items-center gap-3"><button onClick={() => setCartCount(Math.max(0, cartCount - 1))} aria-label="Decrease quantity"><Minus className="size-3" /></button><span className="text-sm">{cartCount}</span><button onClick={() => setCartCount(cartCount + 1)} aria-label="Increase quantity"><Plus className="size-3" /></button></div><p className="text-sm">${290 * cartCount}</p></div><div><div className="mb-5 flex justify-between text-sm"><span>Subtotal</span><span>${290 * cartCount}</span></div><button className="w-full bg-[#111] py-4 text-[10px] uppercase tracking-[0.2em] text-white hover:bg-black/80">Proceed to checkout</button><p className="mt-4 text-center text-[10px] text-black/40">Checkout is securely encrypted.</p></div></div>}</aside></div>}
    </main>
  )
}
