'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useShop } from '../contexts/shop-context';

export function FavoritesList() {
  const { favorites, removeFromFavorites } = useShop();

  if (favorites.length === 0) {
    return (
      <p className=" text-gray-600 dark:text-gray-400 text-lg mt-6">
        You haven't added any favorites yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4">
      {favorites.map((product) => (
        <div
          key={product.id}
          className="bg-slate-100 dark:bg-gray-800 p-4 rounded-[8px] shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
        >
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full rounded-[8px] h-40 object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-md"
              onClick={() => removeFromFavorites(product.id)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              ${product.price}
            </p>
            <Link href={`/product/${product.id}`}>
              <Button className="w-full">View Details</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
