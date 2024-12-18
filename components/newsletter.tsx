'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const app = getApp(); 
      const db = getFirestore(app); 
      const collectionRef = collection(db, 'newsletter'); 

      await addDoc(collectionRef, { email, timestamp: new Date() }); 

      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error: any) {
      console.error('Error saving email to Firestore:', error);
      setMessage('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-950 w-full py-12 md:py-24 lg:py-32 text-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Stay Updated
        </h2>
        <p className="max-w-[600px] text-lg mb-8">
          Subscribe to our newsletter for exclusive offers and the latest fragrance news.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-white text-black"
            disabled={isSubmitting}
          />
          <Button type="submit" variant="outline" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Subscribe'}
          </Button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </section>
  );
}
