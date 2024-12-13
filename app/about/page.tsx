import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About Essence Boutique</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">Welcome to Essence Boutique, where passion for perfumery meets exquisite craftsmanship. Founded in 2010, we've dedicated ourselves to bringing the world's finest fragrances to discerning customers like you.</p>
          <p className="mb-4">Our journey began with a simple idea: to create a haven for fragrance enthusiasts, a place where every scent tells a story and every bottle holds a world of possibilities. Today, we're proud to offer a curated collection of premium perfumes from renowned brands and niche perfumers alike.</p>
          <p className="mb-4">At Essence Boutique, we believe that the right fragrance can elevate your mood, boost your confidence, and become an integral part of your personal style. That's why we're committed to helping you find your perfect scent, whether you're looking for a signature fragrance or exploring new olfactory territories.</p>
          <p>Our team of fragrance experts is always on hand to guide you through our collection, offer personalized recommendations, and share their knowledge about the art and science of perfumery. We invite you to explore our boutique, indulge your senses, and discover the transformative power of fragrance.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

