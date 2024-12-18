'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import toast from 'react-hot-toast'

interface ProductData {
  name: string
  description: string
  price: number
  category: string
  topNotes: string[]   
  heartNotes: string[] 
  baseNotes: string[] 
  longevity: string
  sillage: string
  image?: string
  featured: boolean // Featured özelliği eklendi
}

interface AdminProductFormProps {
  initialData: ProductData
  onSubmit: (updatedData: ProductData) => Promise<void>
  submitText: string
}

export function AdminProductForm({ initialData, onSubmit, submitText }: AdminProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    topNotes: [],
    heartNotes: [],
    baseNotes: [],
    longevity: '',
    sillage: '',
    featured: false, 
  })

  useEffect(() => {
    if (initialData) {
      setProductData({
        ...initialData,
        topNotes: initialData.topNotes || [],
        heartNotes: initialData.heartNotes || [],
        baseNotes: initialData.baseNotes || [],
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
  
    if (type === 'checkbox') {
      setProductData(prev => ({ ...prev, [name]: checked }))
    } else if (name === 'price') {
      setProductData(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else if (name === 'topNotes' || name === 'heartNotes' || name === 'baseNotes') {
      setProductData(prev => ({
        ...prev,
        [name]: value.split(',').map(note => note.trim())
      }))
    } else {
      setProductData(prev => ({ ...prev, [name]: value }))
    }
  }
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  const handleSelectChange = (name: string, value: string) => {
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let imageUrl = productData.image || ''

      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('File upload failed')

        const data = await response.json()
        imageUrl = data.url
      }

      const productToAdd = {
        ...productData,
        price: productData.price,
        image: imageUrl,
      }

      await onSubmit(productToAdd)
      toast.success('Product added successfully!')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Failed to add product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!productData) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label htmlFor="name">Product Name</Label>
      <Input id="name" name="name" value={productData.name} onChange={handleChange} required />

      <Label htmlFor="description">Description</Label>
      <Textarea id="description" name="description" value={productData.description} onChange={handleChange} required />

      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        name="price"
        type="number"
        step="0.01"
        value={productData.price || ''}
        onChange={handleChange}
        required
      />

      <Label htmlFor="image">Product Image</Label>
      {productData.image && <p>Current Image: <a href={productData.image} target="_blank" rel="noopener noreferrer">View Image</a></p>}
      <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />

      <Label htmlFor="category">Category</Label>
      <Select name="category" onValueChange={(value) => handleSelectChange('category', value)} value={productData.category || ''} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="women">Women</SelectItem>
          <SelectItem value="men">Men</SelectItem>
          <SelectItem value="unisex">Unisex</SelectItem>
        </SelectContent>
      </Select>

      <Label htmlFor="topNotes">Top Notes</Label>
      <Input id="topNotes" name="topNotes" value={productData.topNotes.join(', ')} onChange={handleChange} required />

      <Label htmlFor="heartNotes">Heart Notes</Label>
      <Input id="heartNotes" name="heartNotes" value={productData.heartNotes.join(', ')} onChange={handleChange} required />

      <Label htmlFor="baseNotes">Base Notes</Label>
      <Input id="baseNotes" name="baseNotes" value={productData.baseNotes.join(', ')} onChange={handleChange} required />

      <Label htmlFor="longevity">Longevity</Label>
      <Input id="longevity" name="longevity" value={productData.longevity} onChange={handleChange} required />

      <Label htmlFor="sillage">Sillage</Label>
      <Input id="sillage" name="sillage" value={productData.sillage} onChange={handleChange} required />

      <Label htmlFor="featured">Featured</Label>
      <Input 
        id="featured" 
        name="featured" 
        type="checkbox" 
        checked={productData.featured} 
        onChange={handleChange} 
      />
      <span>{productData.featured ? 'Featured' : 'Not Featured'}</span>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding Product...' : submitText}
      </Button>
    </form>
  )
}
