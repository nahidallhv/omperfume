'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { useShop } from '../contexts/shop-context'
import { Product, getProducts } from '../services/product-service'

export function BestSellers() {
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [visibleCount, setVisibleCount] = useState(8) // Başlangıçta 4 ürün gösterecek
  const { favorites, addToFavorites, removeFromFavorites, addToCart } = useShop()

  useEffect(() => {
    const fetchBestSellers = async () => {
      const allProducts = await getProducts()
      setBestSellers(allProducts)
    }
    fetchBestSellers()
  }, [])

  const toggleFavorite = (product: Product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4) 
  }

  return (
    <section id="best-sellers" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, visibleCount).map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="rounded-[8px] object-cover w-full h-48"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(item)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.some(fav => fav.id === item.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'
                      }`}
                    />
                  </Button>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">{item.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-700">${item.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Link href={`/product/${item.id}`} className="flex-1">
                  <Button className="w-full" variant="outline">View Details</Button>
                </Link>
                <Button className="flex-1" onClick={() => addToCart({ ...item, quantity: 1 })}>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {visibleCount < bestSellers.length && (
          <div className="mt-8 text-center">
            <Button onClick={handleSeeMore} className="w-48 mx-auto">See More</Button>
          </div>
        )}
      </div>
    </section>
  )
}









