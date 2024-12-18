'use client'

import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { FavoritesList } from '../../components/favorites-list'

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 ml-4">Your Favorites</h1>
        <FavoritesList />
      </main>
      <Footer />
    </div>
  )
}

