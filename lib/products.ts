export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: "form-01-bomber",
    name: "Form 01 / Bomber",
    description: "A structured charcoal bomber jacket from the Studio release 04.",
    priceInCents: 29000,
  },
]
