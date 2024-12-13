'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
    setEmail('')
    alert('Thank you for subscribing!')
  }

  return (
    <section className=" bg-slate-950 w-full py-12 md:py-24 lg:py-32 text-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Stay Updated</h2>
        <p className="max-w-[600px] text-lg mb-8">Subscribe to our newsletter for exclusive offers and the latest fragrance news.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-white text-black"
          />
          <Button type="submit" variant='outline'>Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

