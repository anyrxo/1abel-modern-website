'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'

const products = {
  '1': { name: "MIDNIGHT CARGO", price: 120 },
  '2': { name: "SHADOW SWEATS", price: 120 },
  '3': { name: "ONYX DENIM", price: 150 },
  '4': { name: "VOID JOGGERS", price: 120 },
  '5': { name: "OBSIDIAN JEANS", price: 150 },
  '6': { name: "NOCTURNAL SWEATS", price: 120 }
}

export function ProductDetail({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState('')
  const product = products[id as keyof typeof products]

  if (!product) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">Product not found</div>
  }

  const sizes = ["XS", "S", "M", "L", "XL"]

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <Link href="/arc-2/bottoms" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider">
              ← Back to Arc 2 Bottoms
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="aspect-[3/4] bg-gray-900 border border-gray-800 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold tracking-tighter opacity-10">{product.name.split(' ')[0]}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:sticky lg:top-32 h-fit">
              <div className="mb-4">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">ARC 2 — SHADOW</p>
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
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold tracking-wider uppercase">Size</label>
                  <Link href="#" className="text-xs underline text-gray-400 hover:text-white">Size Guide</Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 border-2 transition-all ${selectedSize === size ? 'border-white bg-white text-black' : 'border-gray-700 hover:border-white'}`}>{size}</button>
                  ))}
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-white text-black hover:bg-gray-200 transition-colors text-sm tracking-wider uppercase font-medium mb-4">Add to cart — ${product.price}.00 AUD</motion.button>
              <button className="w-full py-4 border-2 border-white hover:bg-white hover:text-black transition-colors text-sm tracking-wider uppercase font-medium">Buy with Shop Pay</button>
            </motion.div>
          </div>
        </div>
      </main>
      <footer className="bg-black border-t border-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
