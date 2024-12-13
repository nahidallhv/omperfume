'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { useShop } from '../contexts/shop-context'
import { Product, getProductsByCategory } from '../services/product-service'

export function ProductGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const { favorites, addToFavorites, removeFromFavorites, addToCart } = useShop()

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProductsByCategory(category)
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [category])

  const toggleFavorite = (product: Product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(product)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.some(fav => fav.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'
                  }`}
                />
              </Button>
            </div>
            <h3 className="mt-4 text-lg text-black font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button className="w-full" variant="outline">View Details</Button>
            </Link>
            <Button className="flex-1" onClick={() => addToCart({ ...product, quantity: 1 })}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

