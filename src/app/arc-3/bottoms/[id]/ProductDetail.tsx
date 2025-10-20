'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': { name: "CLOUD CARGO", price: 120 },
  '2': { name: "IVORY SWEATS", price: 120 },
  '3': { name: "PEARL DENIM", price: 150 },
  '4': { name: "FROST JOGGERS", price: 120 },
  '5': { name: "CHALK JEANS", price: 150 },
  '6': { name: "LUNAR SWEATS", price: 120 }
}

export function ProductDetail({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()
  const product = products[id as keyof typeof products]

  if (!product) {
    return <div className="bg-white text-black min-h-screen flex items-center justify-center">Product not found</div>
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
      arc: 'Arc 3 — Light',
      category: 'BOTTOMS',
    })

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      {/* Add to Cart Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-8 z-50 bg-black text-white px-6 py-4 shadow-lg border-2 border-black"
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
          <div className="mb-12">
            <Link href="/arc-3/bottoms" className="text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wider">
              ← Back to Arc 3 Bottoms
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="aspect-[3/4] bg-gray-50 border border-gray-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold tracking-tighter opacity-10">{product.name.split(' ')[0]}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:sticky lg:top-32 h-fit">
              <div className="mb-4">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">ARC 3 — LIGHT</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
                <p className="text-2xl font-light">${product.price}.00 AUD</p>
              </div>
              <div className="space-y-4 mb-8 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <p className="font-semibold text-black">PREMIUM MATERIAL: CRAFTED WITH TOP-QUALITY FABRIC</p>
                <p>RELAXED FIT</p>
                <p>MODEL IS 5'9 WEARING SIZE SMALL</p>
                <p className="pt-4 border-t border-gray-200">SHIPS IN 1-3 WEEKS</p>
                <p className="font-semibold text-black">ALL SALES ARE FINAL</p>
              </div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold tracking-wider uppercase">Size</label>
                  <Link href="#" className="text-xs underline text-gray-600 hover:text-black">Size Guide</Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 border-2 transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}>{size}</button>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 transition-colors text-sm tracking-wider uppercase font-medium mb-4 ${
                  selectedSize
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
