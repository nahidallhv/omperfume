'use client'

import { db, addDoc, collection } from '../../lib/firebase'; 
import { useState } from 'react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Form verilerini Firestore’a gönderme
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date(),
    });
    console.log('Message sent with ID: ', docRef.id);

   
    alert('Thank you for your message. We\'ll get back to you soon!');
    
    
    setFormData({ name: '', email: '', message: '' });
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('Something went wrong. Please try again later.');
  }
};


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">We'd love to hear from you. Please fill out the form below or use our contact information to get in touch.</p>
            <div className="space-y-2">
              <p><strong>Address:</strong> 123 Perfume Lane, Fragrance City, FC 12345</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Email:</strong> info@essenceboutique.com</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

