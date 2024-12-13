import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ShoppingCart } from '../components/shopping-cart'
import { ShopProvider } from '../contexts/shop-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Essence Boutique',
  description: 'Discover your signature scent at Essence Boutique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopProvider>
          {children}
          <ShoppingCart />
        </ShopProvider>
      </body>
    </html>
  )
}

