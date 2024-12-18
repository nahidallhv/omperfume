'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/use-auth'
import { Loader2 } from 'lucide-react'

export function AdminRouteProtection({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Burada admin kontrolü yapabilirsiniz
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || ''
        if (user.email && adminEmail.includes(user.email)) {
          setIsAdmin(true)
        } else {
          router.push('/') // Kullanıcı admin değilse signin sayfasına yönlendir
        }
      } else {
        router.push('/signin') // Kullanıcı oturum açmamışsa signin'e yönlendir
      }
    }
  }, [user, loading, router])

  if (loading) {
    // Kullanıcı durumu kontrol edilirken yükleme göstergesi
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return null // Admin değilse hiçbir şey göstermeyin
  }

  return <>{children}</> // Admin ise içerik göster
}
