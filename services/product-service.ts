import { getCollection, getDocument, getDocumentsWhere } from './firestore-service';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export async function getProducts(): Promise<Product[]> {
  return getCollection('products') as Promise<Product[]>;
}

export async function getProduct(id: string): Promise<Product | null> {
  return getDocument('products', id) as Promise<Product | null>;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return getDocumentsWhere('products', 'category', '==', category) as Promise<Product[]>;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getCollection('products') as Product[];
  const featuredProducts = allProducts.filter(product => product.featured === true);
  
  // If no featured products, return the first 3 products (or all if less than 3)
  if (featuredProducts.length === 0) {
    return allProducts.slice(0, 8);
  }
  
  return featuredProducts;
}