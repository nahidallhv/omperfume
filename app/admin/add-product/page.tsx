'use client'

import { AdminProductForm } from '../../../components/admin-product-form'
import { AdminRouteProtection } from '../../../components/admin-route-protection'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { addProduct } from '../../../services/product-service'

export default function AddProductPage() {
  const router = useRouter()

  const handleSubmit = async (productData: any) => {
    try {
      await addProduct(productData)  // `addProduct` fonksiyonu ürün ekler
      toast.success('Product added successfully!')
      router.push('/admin/products')  // Ürün eklendikten sonra yönlendirme
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Failed to add product. Please try again.')
    }
  }

  const initialData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    topNotes: [],
    heartNotes: [],
    baseNotes: [],
    longevity: '',
    sillage: '',
    featured: false
  }

  return (
    <AdminRouteProtection>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
        <AdminProductForm
          initialData={initialData}  // Boş başlangıç verisi
          onSubmit={handleSubmit}     // submit işlemi
          submitText="Add Product"    // Buton metni
        />
      </div>
    </AdminRouteProtection>
  )
}
