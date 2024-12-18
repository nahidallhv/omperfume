import { Header } from '../../../components/header';
import { Footer } from '../../../components/footer';
import { BlogPost } from '../../../components/blog-post';
import { getBlogPosts } from '../../../services/blog-service';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ id: post.id }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <BlogPost id={params.id} />
      </main>
      <Footer />
    </div>
  );
}

