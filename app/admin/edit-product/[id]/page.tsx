'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProduct, updateProduct } from '../../../../services/product-service'
import { AdminProductForm } from '../../../../components/admin-product-form'
import { toast } from 'react-hot-toast'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id !== 'string') return
      try {
        const data = await getProduct(id)
        if (data) {
          setProduct(data)
        } else {
          toast.error('Product not found.')
          router.push('/admin/products')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to fetch product.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, router])

  const handleSubmit = async (updatedData: any) => {
    if (!product || !id) return
    try {
      await updateProduct(id as string, updatedData)
      toast.success('Product updated successfully!')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Failed to update product.')
    }
  }

  const initialData = {
    name: '',
    description: '',
    price: '',
    category: '',
    topNotes: [],        
    heartNotes: [],
    baseNotes: [],
    longevity: '',
    sillage: '',
    featured: false,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminProductForm
          initialData={product}
          onSubmit={handleSubmit}
          submitText="Update Product"
        />
      )}
    </div>
  )
}
