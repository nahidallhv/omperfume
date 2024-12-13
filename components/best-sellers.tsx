'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Product, getFeaturedProducts } from '../services/product-service'
import { Loader2 } from 'lucide-react'

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(8) 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getFeaturedProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-12 text-center text-red-500">
        {error}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        No products available at the moment.
      </div>
    )
  }

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 2) 
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-[8px] object-cover w-full h-48"
                />
                <h3 className="mt-4 text-lg font-semibold text-black">{product.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-700">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/product/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {visibleCount < products.length && (
          <div className="mt-8 text-center">
            <Button onClick={handleSeeMore} className="w-48 mx-auto">See More</Button>
          </div>
        )}
      </div>
    </section>
  )
}
