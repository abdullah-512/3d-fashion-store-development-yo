"use client"

import { useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { X } from "lucide-react"
import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function Checkout({ quantity, onClose }: { quantity: number; onClose: () => void }) {
  const [clientSecret, setClientSecret] = useState<string>()
  const [error, setError] = useState(false)

  useEffect(() => {
    startCheckoutSession("form-01-bomber", quantity).then(setClientSecret).catch(() => setError(true))
  }, [quantity])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-black/80" onClick={onClose} aria-label="Close checkout" />
      <section className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden bg-[#f2f0eb] text-[#111] shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 id="checkout-title" className="font-serif text-3xl tracking-[-0.05em]">Secure checkout</h2>
          <button onClick={onClose} aria-label="Close checkout"><X className="size-5" /></button>
        </div>
        <div className="min-h-[420px] overflow-auto p-4 sm:p-6">
          {error && <p className="py-12 text-center text-sm text-black/60">Checkout could not be started. Please try again.</p>}
          {clientSecret && <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}><EmbeddedCheckout /></EmbeddedCheckoutProvider>}
          {!clientSecret && !error && <p className="py-12 text-center text-sm text-black/50">Preparing secure checkout…</p>}
        </div>
      </section>
    </div>
  )
}
