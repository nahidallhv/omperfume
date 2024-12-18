'use client'

import { useEffect, useState } from 'react'
import { Product, getProducts, deleteProduct } from '../../../services/product-service'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/button'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { AdminRouteProtection } from '../../../components/admin-route-protection'
import { getNewsletterSubscribers, getMessages } from '../../../services/firestore-service'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [newsletterEmails, setNewsletterEmails] = useState<string[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts()
        setProducts(data)

        const emails = await getNewsletterSubscribers()
        setNewsletterEmails(emails)

        const msgs = await getMessages()
        setMessages(msgs)
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to fetch data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((product) => product.id !== id))
      toast.success('Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product.')
    }
  }

  return (
    <AdminRouteProtection>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Manage Products & Communication</h1>

        {/* Newsletter Subscribers */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center text-teal-600">Newsletter Subscribers</h2>
          {newsletterEmails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {newsletterEmails.map((email, index) => (
                <div key={index} className="bg-teal-100 p-6 rounded-lg shadow-lg hover:bg-teal-200 transition">
                  <p className="text-lg font-semibold text-teal-700">{email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No subscribers found</p>
          )}
        </section>

        {/* Messages Section */}
        <section className="mb-32">
          <h2 className="text-2xl font-semibold mb-4 text-center text-orange-600">Messages</h2>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="p-6 bg-orange-100 rounded-lg shadow-lg hover:bg-orange-200 transition">
                  <h3 className="text-xl font-semibold text-orange-700">{message.name} ({message.email})</h3>
                  <p className="mt-2">{message.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No messages found</p>
          )}
        </section>

        {/* Products Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center text-purple-600">Product List</h2>

          {/* "Add New Product" Button */}
          <Button
            onClick={() => router.push('/admin/add-product')}
            className="mb-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Add New Product
          </Button>

          {loading ? (
            <div className="flex justify-center py-4">
              <span className="loader"></span> {/* Custom loader */}
            </div>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border p-3 text-indigo-600">Name</th>
                  <th className="border p-3 text-indigo-600">Price</th>
                  <th className="border p-3 text-indigo-600">Category</th>
                  <th className="border p-3 text-indigo-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="border p-3 text-gray-800">{product.name}</td>
                    <td className="border p-3 text-gray-800">${product.price}</td>
                    <td className="border p-3 text-gray-800">{product.category}</td>
                    <td className="border p-3 space-x-2">
                      <Link href={`/admin/edit-product/${product.id}`}>
                        <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-800">
                          Edit
                        </Button>
                      </Link>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)} className="bg-red-600 hover:bg-red-800">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </AdminRouteProtection>
  )
}
