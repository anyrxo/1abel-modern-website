'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': {
    name: "SHADOW CHAIN",
    price: 145,
    category: "Jewelry",
    description: "Heavyweight sterling silver chain with matte black finish. 6mm width, 24-inch length. Substantial without being loud. Designed to be worn daily.",
    details: [
      "925 sterling silver with PVD black coating",
      "6mm curb chain link",
      "24-inch length",
      "Lobster clasp closure",
      "Hypoallergenic and tarnish-resistant",
      "Comes with premium gift box"
    ],
    story: "Good jewelry should feel like armor. This chain is heavy enough to remind you it's there—grounding, centering. It's the piece you put on every morning and don't take off. Sterling silver that won't fade or tarnish. Built for the long haul."
  },
  '2': {
    name: "OBSIDIAN RING",
    price: 95,
    category: "Jewelry",
    description: "Minimalist signet ring in brushed black steel. Wide band with subtle curved profile. Understated statement piece.",
    details: [
      "316L stainless steel with black PVD coating",
      "10mm wide band",
      "Available in sizes 7-12",
      "Brushed matte finish",
      "Water and scratch resistant",
      "Lifetime warranty against fading"
    ],
    story: "Sometimes the most powerful statements are the quietest. This ring is for those who don't need flash—just substance. Heavy enough to feel substantial, minimal enough to go with everything. The kind of ring you wear for years, that becomes part of you."
  },
  '3': {
    name: "MIDNIGHT BEANIE",
    price: 55,
    category: "Headwear",
    description: "Heavyweight merino wool beanie with deep fold. Oversized fit that can be worn cuffed or slouchy. The only beanie you'll need.",
    details: [
      "100% merino wool (220 GSM)",
      "Oversized fit with 3-inch fold",
      "One size fits most",
      "Ribbed knit construction",
      "Woven label detail",
      "Made in Portugal"
    ],
    story: "A good beanie is hard to find. Most are too thin, too tight, or too trendy. This one is none of those things. Heavy merino wool that keeps you warm without overheating. Oversized so you can wear it how you want. It's the beanie you reach for every time."
  },
  '4': {
    name: "VOID GLOVES",
    price: 85,
    category: "Accessories",
    description: "Technical touchscreen-compatible gloves in water-resistant nylon. Minimal branding, maximum function. For those who don't stop when it gets cold.",
    details: [
      "DWR-treated ripstop nylon shell",
      "PrimaLoft Gold insulation (60g)",
      "Touchscreen-compatible fingertips",
      "Elastic wrist cuffs",
      "Silicon grip palms",
      "Packable into own pocket"
    ],
    story: "Winter doesn't have to slow you down. These gloves were built for movement—warm enough for the cold, light enough to forget you're wearing them. Touchscreen compatible so you don't have to choose between warmth and function. Technical without looking technical."
  },
  '5': {
    name: "ONYX BELT",
    price: 125,
    category: "Accessories",
    description: "Full-grain leather belt with minimal matte black buckle. 38mm width. Built to last decades, designed to age beautifully.",
    details: [
      "Italian full-grain vegetable-tanned leather",
      "38mm (1.5 inch) width",
      "Matte black steel buckle",
      "Available in waist sizes 28-42",
      "Hand-finished edges",
      "Will develop unique patina over time"
    ],
    story: "A belt should be something you buy once and wear forever. This is that belt. Full-grain Italian leather that gets better with age, developing a patina unique to your wear. Minimal buckle that won't scratch or tarnish. The kind of quality you can feel."
  }
}

export function ProductDetail({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [currentImage, setCurrentImage] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const product = products[id as keyof typeof products]

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <Link href="/arc-2/accessories" className="text-gray-400 hover:text-white underline">
            Back to Arc 2 Accessories
          </Link>
        </div>
      </div>
    )
  }

  // Different size options based on product
  const getSizes = () => {
    if (id === '2') return ["7", "8", "9", "10", "11", "12"] // Ring sizes
    if (id === '5') return ["28", "30", "32", "34", "36", "38", "40", "42"] // Belt sizes
    return ["ONE SIZE"] // Beanie, chain, gloves
  }

  const sizes = getSizes()

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
      category: 'ACCESSORIES',
    })

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 4000)
  }

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Enhanced Add to Cart Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-24 right-8 z-50 bg-white text-black px-8 py-6 shadow-2xl border border-gray-200 max-w-sm"
        >
          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
              Added to cart
            </p>
            <p className="font-bold text-lg tracking-tight">
              {product.name}
            </p>
            <p className="text-sm text-gray-600">
              Size {selectedSize} — ${product.price}.00 AUD
            </p>
            <div className="flex gap-3 pt-3 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/cart')}
                className="flex-1 py-2 border border-black hover:bg-black hover:text-white transition-colors text-xs tracking-wider uppercase"
              >
                View Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/checkout')}
                className="flex-1 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-xs tracking-wider uppercase"
              >
                Checkout
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/arc-2/accessories" className="group inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 2 Accessories</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Images */}
            <div className="space-y-6">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ y: imageY }}
                  className="relative group"
                  onMouseEnter={() => setCurrentImage(index)}
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/5 relative overflow-hidden">
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700" />

                    {/* Grid overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Product name watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-8xl font-bold tracking-tighter opacity-5 select-none">
                        {product.name.split(' ')[0]}
                      </span>
                    </div>

                    {/* Image indicator */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600">
                        {index}/3
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32 h-fit space-y-8"
            >
              {/* Header */}
              <div className="space-y-4 pb-8 border-b border-white/10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600">
                  ARC 2 — SHADOW / {product.category}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase">
                  {product.name}
                </h1>
                <p className="text-2xl font-light text-gray-400">
                  ${product.price}.00 AUD
                </p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-gray-400">
                  {product.description}
                </p>
              </div>

              {/* The Story */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">
                  The Story
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 italic">
                  "{product.story}"
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-3 pb-8 border-b border-white/10">
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">
                  Specifications
                </h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-start gap-3">
                      <span className="text-gray-700 mt-1">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.2em] uppercase text-gray-400">
                    {sizes.length === 1 ? 'Size' : id === '2' ? 'Ring Size' : id === '5' ? 'Waist Size' : 'Size'}
                  </label>
                  {sizes.length > 1 && (
                    <button className="text-[10px] tracking-[0.2em] uppercase text-gray-600 hover:text-white transition-colors">
                      Size Guide
                    </button>
                  )}
                </div>
                <div className={`grid gap-2 ${sizes.length === 1 ? 'grid-cols-1' : sizes.length <= 6 ? 'grid-cols-6' : 'grid-cols-8'}`}>
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: sizes.length === 1 ? 1 : 1.05 }}
                      whileTap={{ scale: sizes.length === 1 ? 1 : 0.95 }}
                      className={`py-3 border transition-all text-sm ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-white/20 hover:border-white/50'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                whileTap={{ scale: selectedSize ? 0.98 : 1 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-5 transition-all text-xs tracking-[0.2em] uppercase font-semibold ${
                  selectedSize
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-white/10 text-gray-600 cursor-not-allowed border border-white/5'
                }`}
              >
                {selectedSize ? `Add to cart — $${product.price}.00 AUD` : 'Select a size'}
              </motion.button>

              {/* Limited Production Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="p-6 border border-white/10 bg-white/5"
              >
                <p className="text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-white">Limited production.</span> When this drop sells out, it's gone. We don't restock. Every piece is intentionally limited—designed to transcend seasons, not chase trends.
                </p>
              </motion.div>

              {/* Shipping Info */}
              <div className="space-y-3 text-xs text-gray-600">
                <p className="flex items-start gap-3">
                  <span className="text-gray-700">—</span>
                  <span>Ships in 1-3 weeks</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gray-700">—</span>
                  <span>All sales are final</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gray-700">—</span>
                  <span>Free shipping on orders over $200 AUD</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Shop</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/arc-2" className="hover:text-white transition-colors inline-block">Arc 2 — Shadow</Link>
                </li>
                <li>
                  <Link href="/arc-3" className="hover:text-white transition-colors inline-block">Arc 3 — Light</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Support</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors inline-block">Contact</Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors inline-block">Shipping</Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white transition-colors inline-block">Returns</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Company</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors inline-block">About</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors inline-block">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors inline-block">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Connect</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-block">Instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-block">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>© 2025, 1ABEL — All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
