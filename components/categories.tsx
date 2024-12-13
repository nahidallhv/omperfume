import Link from 'next/link'
import { Button } from './ui/button'
import Image, { StaticImageData } from 'next/image'

import womenImage from '../public/images/women.jpg'
import menImage from '../public/images/men.jpg'
import unisexImage from '../public/images/unisex.jpg'

interface Category {
  name: string
  href: string
  image: StaticImageData // Burada 'StaticImageData' türünü belirtiyoruz
}

export function Categories() {
  const categories: Category[] = [
    {
      name: 'Women',
      href: '/category/women',
      image: womenImage, // Kesin olarak atanmış bir StaticImageData
    },
    {
      name: 'Men',
      href: '/category/men',
      image: menImage,
    },
    {
      name: 'Unisex',
      href: '/category/unisex',
      image: unisexImage,
    },
  ]

  return (
    <section className="mt-4 w-full py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Discover Our Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="responsive"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors"></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {category.name}
                  </h3>
                  <Button
                  variant='outline'
                    className="text-sm text-black border-2 hover:bg-slate-100 "
                  >
                    Shop {category.name}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


