import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { ProductDetail } from '../../../components/product-detail'

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProductDetail id={params.id} />
      </main>
      <Footer />
    </div>
  )
}

