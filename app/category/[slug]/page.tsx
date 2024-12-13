import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { ProductGrid } from '../../../components/product-grid'

const categories = {
  women: { name: "Women's Fragrances", description: "Discover our collection of elegant and captivating fragrances for women." },
  men: { name: "Men's Fragrances", description: "Explore our range of sophisticated and masculine scents for men." },
  unisex: { name: "Unisex Fragrances", description: "Experience our versatile and unique fragrances suitable for all." }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{category.description}</p>
        <ProductGrid category={params.slug} />
      </main>
      <Footer />
    </div>
  )
}

