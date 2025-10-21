'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'

export function ProductDetail({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState('')

  const product = {
    name: "RELAXED JEANS",
    price: 95,
    description: "PREMIUM MATERIAL: MADE WITH TOP-QUALITY DENIM",
    fit: "BAGGY FIT",
    note: "MODEL IS 5'9 WEARING SIZE SMALL (SIZE CHART LAST PICTURE)",
    shipping: "PRODUCTION ON THE WAY SHIPPED IN 1-3 WEEKS",
    policy: "ALL SALES ARE FINAL",
    images: ["/placeholder-product-1.jpg", "/placeholder-product-2.jpg", "/placeholder-product-3.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"]
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              {product.images.map((image, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="aspect-[3/4] bg-gray-100" />
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:sticky lg:top-32 h-fit">
              <h1 className="text-4xl font-bold tracking-tight mb-6">{product.name}</h1>
              <div className="space-y-4 mb-8 text-sm">
                <p className="font-semibold">{product.description}</p>
                <p>{product.fit}</p>
                <p>{product.note}</p>
                <p className="pt-4 border-t border-gray-200">{product.shipping}</p>
                <p className="font-semibold">{product.policy}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold tracking-wider uppercase">Size</label>
                  <Link href="#" className="text-xs underline">Size Guide</Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 border-2 transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-black hover:bg-gray-100'}`}>{size}</button>
                  ))}
                </div>
              </div>
              <button className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium mb-4">Add to cart : ${product.price}.00</button>
              <button className="w-full py-4 border-2 border-black hover:bg-gray-100 transition-colors text-sm tracking-wider uppercase font-medium">Buy with Shop Pay</button>
              <p className="text-xs text-center mt-4 text-gray-600">More payment options</p>
            </motion.div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div><h3 className="text-2xl font-bold mb-6">1ABEL</h3><p className="text-sm text-gray-600">Premium streetwear for the modern individual.</p></div>
            <div><h4 className="text-xs font-semibold mb-4 tracking-wider uppercase">Shop</h4><ul className="space-y-2 text-sm"><li><Link href="/tops" className="hover:underline">Tops</Link></li><li><Link href="/bottoms" className="hover:underline">Bottoms</Link></li><li><Link href="/accessories" className="hover:underline">Accessories</Link></li></ul></div>
            <div><h4 className="text-xs font-semibold mb-4 tracking-wider uppercase">Support</h4><ul className="space-y-2 text-sm"><li><Link href="/contact" className="hover:underline">Contact Us</Link></li><li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li><li><Link href="/refund" className="hover:underline">Refund Policy</Link></li></ul></div>
            <div><h4 className="text-xs font-semibold mb-4 tracking-wider uppercase">Legal</h4><ul className="space-y-2 text-sm"><li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li><li><Link href="/terms" className="hover:underline">Terms of Service</Link></li></ul></div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600"><p>© 2025, 1ABEL</p><p className="mt-4 md:mt-0">SITE BY IIMAGINED</p></div>
        </div>
      </footer>
    </div>
  )
}
