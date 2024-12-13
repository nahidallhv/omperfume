import Image from 'next/image'
import { Card, CardContent } from './ui/card'

export function Favorites() {
  const favorites = [
    { name: "Floral Bliss", image: "/placeholder.svg?height=100&width=100" },
    { name: "Ocean Breeze", image: "/placeholder.svg?height=100&width=100" },
    { name: "Citrus Spark", image: "/placeholder.svg?height=100&width=100" },
    { name: "Woody Elegance", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Favorites</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {favorites.map((item) => (
            <Card key={item.name}>
              <CardContent className="flex flex-col items-center p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

