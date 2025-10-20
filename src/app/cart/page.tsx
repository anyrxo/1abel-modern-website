'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { ShoppingBag, X, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="pt-28 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex justify-between items-center"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">CART</h1>
              <p className="text-gray-600 text-lg">
                {items.length === 0 ? 'Your shopping cart' : `${items.length} item${items.length !== 1 ? 's' : ''} in cart`}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wider"
              >
                Clear Cart
              </button>
            )}
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-24"
            >
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/arc-2"
                  className="inline-flex items-center justify-center px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"
                >
                  Arc 2 — Shadow
                </Link>
                <Link
                  href="/arc-3"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider uppercase font-medium"
                >
                  Arc 3 — Light
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border-2 border-black p-6 relative"
                  >
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-400 uppercase">Image</span>
                      </div>

                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          {item.arc} — {item.category}
                        </p>
                        <h3 className="text-xl font-bold tracking-wide uppercase mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Size: <span className="font-semibold">{item.size}</span>
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-black">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="px-3 py-2 hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold border-x-2 border-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-gray-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xl font-bold">
                            ${(item.price * item.quantity).toFixed(2)} AUD
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="border-2 border-black p-8 h-fit sticky top-28"
              >
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)} AUD</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t-2 border-black pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)} AUD</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium mb-4"
                >
                  Proceed to Checkout
                </motion.button>
                <p className="text-xs text-gray-500 text-center">
                  Taxes and shipping calculated at checkout
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
