"use server"

import { PRODUCTS } from "@/lib/products"
import { stripe } from "@/lib/stripe"

export async function startCheckoutSession(productId: string, quantity: number) {
  const product = PRODUCTS.find((item) => item.id === productId)
  if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    throw new Error("Invalid checkout request")
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    redirect_on_completion: "never",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: product.name, description: product.description },
        unit_amount: product.priceInCents,
      },
      quantity,
    }],
    mode: "payment",
  })

  return session.client_secret
}
