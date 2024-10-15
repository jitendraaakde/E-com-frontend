'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag, Truck, CreditCard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const cartItems = [
  { id: 1, name: "Premium Leather Jacket", brand: "LuxeWear", price: 299.99, image: "/placeholder.svg?height=100&width=100", size: "M", quantity: 1, availableSizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "Wireless Noise-Cancelling Headphones", brand: "SoundMaster", price: 199.99, image: "/placeholder.svg?height=100&width=100", size: "One Size", quantity: 1, availableSizes: ["One Size"] },
  { id: 3, name: "Smart Fitness Watch", brand: "TechFit", price: 149.99, image: "/placeholder.svg?height=100&width=100", size: "One Size", quantity: 1, availableSizes: ["One Size"] },
]

export default function Cart() {
  const [items, setItems] = useState(cartItems)

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const updateSize = (id: number, newSize: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, size: newSize } : item
    ))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6 mb-4 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform -skew-y-12 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out"></div>
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <p className="text-lg font-medium text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Size:</span>
                            <Select
                              value={item.size}
                              onValueChange={(value) => updateSize(item.id, value)}
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                {item.availableSizes.map((size) => (
                                  <SelectItem key={size} value={size}>
                                    {size}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-2">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                Proceed to Checkout
              </Button>
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Truck className="h-5 w-5 mr-2" />
                  Free shipping on orders over $100
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Secure payment processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}