'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { BlogPost as BlogPostType, getBlogPost } from '../services/blog-service';

interface BlogPostProps {
  id: string;
}

export function BlogPost({ id }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getBlogPost(id);
        setPost(fetchedPost);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to fetch the blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-8">Blog post not found.</div>;
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Görsel */}
      {post.image && (
        <div className="relative h-96 w-full mb-6">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      {/* İçerik */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-8">
        <Link href="/blog">
          <Button variant="outline">Back to Blog</Button>
        </Link>
      </div>
    </article>
  );
}
