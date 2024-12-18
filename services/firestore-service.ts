import { db } from '../lib/firebase';
import { collection, getDocs,setDoc, doc, getDoc, query, where } from 'firebase/firestore';

export async function getCollection(collectionName: string) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getDocument(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

export async function getDocumentsWhere(collectionName: string, field: string, operator: any, value: any) {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(field, operator, value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



export const getNewsletterSubscribers = async () => {
  const newsletterRef = collection(db, 'newsletter')
  const snapshot = await getDocs(newsletterRef)
  return snapshot.docs.map(doc => doc.data().email) 
}

export const getMessages = async () => {
  const messagesRef = collection(db, 'messages')
  const snapshot = await getDocs(messagesRef)
  return snapshot.docs.map(doc => doc.data())
}