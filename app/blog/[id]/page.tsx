// import { Header } from '../../../components/header'
// import { Footer } from '../../../components/footer'
// import { BlogPost } from '../../../components/blog-post'

// export default function BlogPostPage({ params }: { params: { id: string } }) {
//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <Header />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <BlogPost id={params.id} />
//       </main>
//       <Footer />
//     </div>
//   )
// }



import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { BlogPost } from '../../../components/blog-post'

interface BlogPostPageProps {
  params: { id: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <BlogPost id={params.id} />
      </main>
      <Footer />
    </div>
  )
}

