'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': { name: "MIDNIGHT THERMAL", price: 100, category: "TOPS", collection: "SHADOW" },
  '2': { name: "SHADOW HOODIE", price: 130, category: "TOPS", collection: "SHADOW" },
  '3': { name: "OBSIDIAN ZIPUP", price: 130, category: "TOPS", collection: "SHADOW" },
  '4': { name: "VOID HOODIE", price: 130, category: "TOPS", collection: "SHADOW" },
  '5': { name: "ECLIPSE PUFFER", price: 200, category: "TOPS", collection: "SHADOW" },
  '6': { name: "NOCTURNAL THERMAL", price: 100, category: "TOPS", collection: "SHADOW" },
  '7': { name: "ONYX SWEATER", price: 130, category: "TOPS", collection: "SHADOW" },
  '8': { name: "PHANTOM TEE", price: 65, category: "TOPS", collection: "SHADOW" }
}

export function ProductDetail({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()
  const product = products[id as keyof typeof products]

  if (!product) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">Product not found</div>
  }

  const sizes = ["XS", "S", "M", "L", "XL"]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addItem({
      id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      arc: 'Arc 2 — Shadow',
      category: product.category,
    })

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Add to Cart Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-8 z-50 bg-white text-black px-6 py-4 shadow-lg border-2 border-black"
        >
          <p className="font-semibold uppercase tracking-wide text-sm">
            Added to cart!
          </p>
          <button
            onClick={() => router.push('/cart')}
            className="text-xs underline mt-2 hover:no-underline"
          >
            View cart
          </button>
        </motion.div>
      )}

      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
          <div className="mb-12">
            <Link href="/arc-2/tops" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider">
              ← Back to Arc 2 Tops
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="aspect-[3/4] bg-gray-900 border border-gray-800 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold tracking-tighter opacity-10">
                      {product.name.split(' ')[0]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="mb-4">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">
                  ARC 2 — {product.collection}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
                <p className="text-2xl font-light">${product.price}.00 AUD</p>
              </div>

              <div className="space-y-4 mb-8 text-sm text-gray-400 border-t border-gray-800 pt-6">
                <p className="font-semibold text-white">PREMIUM MATERIAL: CRAFTED WITH TOP-QUALITY FABRIC</p>
                <p>RELAXED FIT</p>
                <p>MODEL IS 5'9 WEARING SIZE SMALL</p>
                <p className="pt-4 border-t border-gray-800">SHIPS IN 1-3 WEEKS</p>
                <p className="font-semibold text-white">ALL SALES ARE FINAL</p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold tracking-wider uppercase">Size</label>
                  <Link href="#" className="text-xs underline text-gray-400 hover:text-white">Size Guide</Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 transition-all ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-gray-700 hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 transition-colors text-sm tracking-wider uppercase font-medium mb-4 ${
                  selectedSize
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to cart — ${product.price}.00 AUD
              </motion.button>

              <p className="text-xs text-center text-gray-500 mb-4">
                Shop Pay checkout available at cart
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/arc-2" className="hover:text-white">Arc 2 — Shadow</Link></li>
                <li><Link href="/arc-3" className="hover:text-white">Arc 3 — Light</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
                <li><Link href="/refund" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
                <li><a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
