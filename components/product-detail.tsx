'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useShop } from '../contexts/shop-context';
import { Product, getProduct } from '../services/product-service';


export function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { user, favorites, addToFavorites, removeFromFavorites, addToCart } = useShop();

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(id);
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const toggleFavorite = () => {
    if (!user) {
      alert('Please log in to add favorites!');
      return;
    }
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert('Please log in to add items to the cart!');
      return;
    }
    addToCart({ ...product, quantity });
    alert(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg object-cover w-full"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </Button>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-20"
          />
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Product Details</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Category: {product.category}</li>
            <li>Top notes: {product.topNotes.join(', ')}</li>
            <li>Heart notes: {product.heartNotes.join(', ')}</li>
            <li>Base notes: {product.baseNotes.join(', ')}</li>
            <li>Longevity: {product.longevity}</li>
            <li>Sillage: {product.sillage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
