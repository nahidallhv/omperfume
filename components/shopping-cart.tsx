'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag, X } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { useShop } from '../contexts/shop-context'

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, removeFromCart, updateCartItemQuantity } = useShop()

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  
  const ownerPhoneNumber = '+994708831029' 

  const generateWhatsAppMessage = () => {
    let message = "Hi, I'd like to order the following items:\n\n"
    cartItems.forEach(item => {
      message += `${item.name} - ${item.quantity} x $${item.price}\n`
    })
    message += `\nTotal: $${totalPrice.toFixed(2)}`
    return encodeURIComponent(message)  
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md mr-4" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="ml-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <p className="font-semibold">Total:</p>
                  <p className="font-semibold">${totalPrice.toFixed(2)}</p>
                </div>
                {/* WhatsApp siparişi verme butonu */}
                <a
                  href={`https://wa.me/${ownerPhoneNumber}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full mt-4 bg-green-500 hover:bg-green-700">Order via WhatsApp</Button>
                </a>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
