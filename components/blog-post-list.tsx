'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { BlogPost, getBlogPosts } from '../services/blog-service';

export function BlogPostList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
    };
    fetchBlogPosts();
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <Card
          key={post.id}
          className="transition-transform transform hover:scale-105 hover:shadow-lg overflow-hidden"
        >
          {/* Görsel */}
          {post.image && (
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          )}
          {/* İçerik */}
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-black">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
            <p className="text-sm text-gray-600">{post.date}</p>
          </CardContent>
          {/* Buton */}
          <CardFooter className="p-4">
            <Link href={`/blog/${post.id}`} className="w-full">
              <Button className="w-full">
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
