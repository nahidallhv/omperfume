'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { useShop } from '../contexts/shop-context'

export function FavoritesList() {
  const { favorites, removeFromFavorites } = useShop()

  if (favorites.length === 0) {
    return <p>You haven't added any favorites yet.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((product) => (
        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => removeFromFavorites(product.id)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">${product.price.toFixed(2)}</p>
            <Link href={`/product/${product.id}`}>
              <Button className="w-full">View Details</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

