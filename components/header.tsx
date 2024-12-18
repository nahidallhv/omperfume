'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Heart, Menu, User } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '../hooks/use-auth'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useShop } from '../contexts/shop-context'
import { ShoppingCart } from './shopping-cart'
import { ProfileDialog } from './profile-dialog'
import { SearchResult } from './search-results'
import { useRouter } from 'next/navigation'

export function Header() {
  const { user } = useAuth()
  const { favorites } = useShop()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  
  const handleAdminRedirect = () => {
    router.push('/admin/products')
  }

  
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL

  return (
    <header className="sticky top-0 z-50 w-full border-2 border-white/20 backdrop-blur-[30px] bg-white/50 shadow-custom">
      <div className="container flex h-14 items-center">
        
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/images/logo.png"
              alt="Liebe Perfume Logo"
              width={50}
              height={50}
              className="ml-4 rounded-full"
              priority
            />
            <span className="ml-5 hidden font-bold sm:inline-block text-black">Liebe Perfume</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-semibold text-black">
            <Link href="/category/women">Women</Link>
            <Link href="/category/men">Men</Link>
            <Link href="/category/unisex">Unisex</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

       
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-2 md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}  
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        
        <div className="flex-1 px-4">
          <SearchResult />
        </div>

        
        <div className="flex mr-5 flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            {user ? (
              <>
            
                {user.email === adminEmail && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAdminRedirect}
                    className="text-black"
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <User className="h-5 w-5 text-black" />
                  <span className="sr-only">User Profile</span>
                </Button>
                <Button variant="ghost" onClick={handleSignOut} className="text-black">
                  Sign Out
                </Button>
                {isProfileOpen && user && (
                  <ProfileDialog
                    user={user}
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                  />
                )}
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="font-bold text-black">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="ghost" className="font-bold text-black">Sign Up</Button>
                </Link>
              </>
            )}
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5 text-black" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            <ShoppingCart />
          </nav>
        </div>
      </div>

      {/* Mobil Menü İçeriği */}
      <div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white absolute top-0 left-0 w-full h-screen p-4 shadow-lg`}  // Menü görünürlüğünü kontrol etmek için sınıf ekleme
      >
        <nav className="space-y-4 text-center">
          <Link href="/category/women" className="block text-black">Women</Link>
          <Link href="/category/men" className="block text-black">Men</Link>
          <Link href="/category/unisex" className="block text-black">Unisex</Link>
          <Link href="/about" className="block text-black">About</Link>
          <Link href="/blog" className="block text-black">Blog</Link>
          <Link href="/contact" className="block text-black">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
