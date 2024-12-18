import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // Yeni eklenen loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false) // Kullanıcı durumu güncellendikten sonra loading biter
    })

    return () => unsubscribe()
  }, [])

  return { user, loading } // loading state'i döndürüyoruz
}
