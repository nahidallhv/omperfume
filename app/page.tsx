import { Header } from '../components/header'
import { Hero } from '../components/hero'
import { Categories } from '../components/categories'
import { BestSellers } from '../components/featured-products'
import { FeaturedProducts } from '../components/best-sellers'
import { Newsletter } from '../components/newsletter'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <BestSellers />
        <FeaturedProducts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

