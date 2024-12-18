'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, getProducts } from '../services/product-service';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Search } from 'lucide-react';

export function SearchResult() {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Tüm ürünleri yükle
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  // Arama sorgusuna göre filtreleme (Sadece başlangıç harflerine göre)
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProducts([]);
    } else {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [query, allProducts]);

  return (
    <div className="relative w-62 ">
      {/* Arama Kutusu ve İkon */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Sonuçları Göster */}
      {filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-lg mt-1 z-50 max-h-60 overflow-auto">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block">
              <Card className="p-2 hover:bg-gray-100 cursor-pointer">
                <CardContent className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-black">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Eğer ürün bulunamazsa */}
      {query.trim() !== '' && filteredProducts.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-lg mt-1 p-2 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
}
