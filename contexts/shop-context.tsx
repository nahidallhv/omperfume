'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../lib/firebase';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  user: User | null;
  favorites: Product[];
  cartItems: CartItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  logout: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Kullanıcı oturumunu dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.uid);
      } else {
        setFavorites([]);
        setCartItems([]);
      }
    });
    return unsubscribe;
  }, []);

  const loadUserData = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      setFavorites(data.favorites || []);
      setCartItems(data.cartItems || []);
    }
  };

  const saveUserData = async (updates: Partial<{ favorites: Product[]; cartItems: CartItem[] }>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, updates, { merge: true });
  };

  const addToFavorites = (product: Product) => {
    if (!user) return alert('Please log in to add favorites!');
    const updatedFavorites = [...favorites, product];
    setFavorites(updatedFavorites);
    saveUserData({ favorites: updatedFavorites });
  };

  const removeFromFavorites = (productId: string) => {
    if (!user) return alert('Please log in to remove favorites!');
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    setFavorites(updatedFavorites);
    saveUserData({ favorites: updatedFavorites });
  };

  const addToCart = (product: Product) => {
    if (!user) return alert('Please log in to add items to the cart!');
    const updatedCart = cartItems.some((item) => item.id === product.id)
      ? cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCart);
    saveUserData({ cartItems: updatedCart });
  };

  const removeFromCart = (productId: string) => {
    if (!user) return alert('Please log in to remove items from the cart!');
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    saveUserData({ cartItems: updatedCart });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (!user) return alert('Please log in to update the cart!');
    const updatedCart = cartItems
      .map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    saveUserData({ cartItems: updatedCart });
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        favorites,
        cartItems,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
