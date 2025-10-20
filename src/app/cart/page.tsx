'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  // For demo purposes, empty cart
  const cartItems: any[] = []

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="pt-28 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">CART</h1>
            <p className="text-gray-600 text-lg">Your shopping cart</p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-24"
            >
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
              <Link
                href="/tops"
                className="inline-flex items-center px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {/* Cart items would go here */}
              </div>

              <div className="bg-gray-50 p-8">
                <h2 className="text-2xl font-bold mb-6">Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <button className="w-full px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
