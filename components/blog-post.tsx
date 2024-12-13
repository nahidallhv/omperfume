'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { BlogPost as BlogPostType, getBlogPost } from '../services/blog-service'

export function BlogPost({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPostType | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getBlogPost(id)
      setPost(fetchedPost)
    }
    fetchPost()
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-8">
        <Link href="/blog">
          <Button variant="outline">Back to Blog</Button>
        </Link>
      </div>
    </article>
  )
}

