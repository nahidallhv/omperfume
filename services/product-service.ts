import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getCollection, getDocument, getDocumentsWhere } from './firestore-service';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string;
  sillage: string;
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
  
  if (featuredProducts.length === 0) {
    return allProducts.slice(0, 6);
  }
  
  return featuredProducts;
}


export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
}

export async function deleteProduct(id: string): Promise<void> {
  const productRef = doc(db, 'products', id)
  await deleteDoc(productRef)
}

export async function updateProduct(id: string, updatedProduct: Partial<Product>): Promise<void> {
  const productRef = doc(db, 'products', id)
  await updateDoc(productRef, updatedProduct)
}