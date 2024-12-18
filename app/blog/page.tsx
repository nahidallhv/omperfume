import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { BlogPostList } from '../../components/blog-post-list'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 ml-4">Our Blog</h1>
        <BlogPostList />
      </main>
      <Footer />
    </div>
  )
}

