import { Analytics } from '@vercel/analytics/next'
import type { CSSProperties } from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Atelier / 09 — Considered Objects',
  description: 'A considered uniform for a less hurried world. Shop Atelier / 09.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = (await db.select().from(siteSettings).limit(1))[0]
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: settings?.backgroundColor ?? '#f2f0eb', '--store-accent': settings?.accentColor ?? '#111111' } as CSSProperties}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
