import { getCollection, getDocument } from './firestore-service';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getCollection('blogPosts') as Promise<BlogPost[]>;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  return getDocument('blogPosts', id) as Promise<BlogPost | null>;
}

