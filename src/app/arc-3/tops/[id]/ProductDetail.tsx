'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': {
    name: "CLOUD THERMAL",
    price: 118,
    category: "Thermal",
    description: "Lightweight thermal with airy construction. 280 GSM cotton-modal blend that breathes. For those who find clarity in simplicity.",
    details: [
      "280 GSM cotton-modal thermal blend",
      "Soft-touch finish with natural drape",
      "Relaxed oversized fit",
      "Ribbed collar and cuffs",
      "Pre-washed for softness",
      "Made in Portugal"
    ],
    story: "Morning light through windows. The Cloud Thermal embodies that feeling of waking up slowly, with nowhere urgent to be. Light enough to layer, soft enough to sleep in. It's the piece you wear when you need breathing room."
  },
  '2': {
    name: "ETERNAL HOODIE",
    price: 142,
    category: "Hoodie",
    description: "Premium midweight hoodie in ivory. Timeless construction with modern proportions. The hoodie that transcends seasons.",
    details: [
      "350 GSM French terry cotton",
      "Relaxed fit with dropped shoulders",
      "Lined hood with tonal drawcords",
      "Kangaroo pocket with hidden phone sleeve",
      "Ribbed cuffs and hem",
      "Garment-washed for lived-in feel"
    ],
    story: "Some pieces exist outside of time. The Eternal Hoodie is designed to be worn for years:softening with each wash, becoming more yours. It's not about trends. It's about finding something that works and never needing to replace it."
  },
  '3': {
    name: "FROST ZIPUP",
    price: 152,
    category: "Jacket",
    description: "Technical zip-up in light grey. Minimalist silhouette with functional details. Transitions seamlessly from studio to street.",
    details: [
      "340 GSM bonded jersey",
      "YKK metal zipper with leather pull",
      "Two-way zip for movement",
      "Zippered side pockets",
      "Athletic fit with stretch",
      "Water-resistant finish"
    ],
    story: "Designed for transition. The Frost Zipup is what you reach for when you're moving between spaces:the studio and the street, work and rest. Refined enough to wear anywhere, functional enough to actually use."
  },
  '4': {
    name: "IVORY HOODIE",
    price: 138,
    category: "Hoodie",
    description: "Essential hoodie in natural ivory. Heavyweight construction with vintage wash. Designed to feel like you've owned it forever.",
    details: [
      "380 GSM heavyweight fleece",
      "Enzyme-washed for vintage softness",
      "Oversized boxy fit",
      "Double-layered hood",
      "Wide ribbed waistband",
      "Slight fading for lived-in aesthetic"
    ],
    story: "There's comfort in familiarity. The Ivory Hoodie is pre-faded, pre-softened, pre-loved. It's the hoodie you throw on without thinking:because thinking is overrated when you're trying to create."
  },
  '5': {
    name: "ARCTIC PUFFER",
    price: 275,
    category: "Outerwear",
    description: "Lightweight puffer in chalk white. High-warmth, low-bulk insulation. For cold days that demand clarity, not weight.",
    details: [
      "Recycled ripstop nylon shell",
      "PrimaLoft Gold insulation (100g)",
      "Stowable hood in collar",
      "YKK AquaGuard zippers",
      "Interior media pocket",
      "Packs into own pocket"
    ],
    story: "Winter doesn't have to be heavy. The Arctic Puffer keeps you warm without the bulk:letting you move freely, think clearly. It's technical without looking like outdoor gear. Just clean lines and quiet warmth."
  },
  '6': {
    name: "PEARL THERMAL",
    price: 115,
    category: "Thermal",
    description: "Essential thermal in soft pearl. The foundational layer that goes with everything. Minimal branding, maximum versatility.",
    details: [
      "260 GSM organic cotton thermal",
      "GOTS certified organic",
      "Slim-relaxed fit",
      "Flatlock seams for comfort",
      "Longer back hem for coverage",
      "Natural stretch for movement"
    ],
    story: "Some pieces just work. The Pearl Thermal is that piece:the one you reach for when you want comfort without compromise. Soft organic cotton that feels good on your skin, looks good under anything."
  },
  '7': {
    name: "CHALK SWEATER",
    price: 155,
    category: "Knitwear",
    description: "Merino wool crewneck in chalk. Italian-milled yarn with refined finish. The sweater you'll wear 100 times a year.",
    details: [
      "100% Italian merino wool (18.5 micron)",
      "12-gauge knit construction",
      "Raglan sleeves for movement",
      "Ribbed collar, cuffs, and hem",
      "Fully fashioned (no side seams)",
      "Hand-washable, won't pill"
    ],
    story: "A good sweater is an investment. The Chalk Sweater is Italian merino:soft enough to wear against skin, refined enough to wear to dinner. It's the kind of quality that lasts decades if you treat it right."
  },
  '8': {
    name: "LUNAR TEE",
    price: 72,
    category: "T-Shirt",
    description: "Essential tee in moon grey. 220 GSM heavyweight cotton with reinforced construction. Your new everyday.",
    details: [
      "220 GSM heavyweight ring-spun cotton",
      "Tubular construction (no side seams)",
      "Reinforced shoulder-to-shoulder tape",
      "Ribbed collar with stretch retention",
      "Preshrunk",
      "Durable yet soft hand-feel"
    ],
    story: "Everyone needs a perfect tee. The Lunar Tee is that tee:heavy enough to feel substantial, soft enough to forget you're wearing it. It's the foundation of a good wardrobe. Buy three."
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
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <Link href="/arc-3/tops" className="text-gray-400 hover:text-black underline">
            Back to Arc 3 Tops
          </Link>
        </div>
      </div>
    )
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
      arc: 'Arc 3 Light',
      category: 'TOPS',
    })

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 4000)
  }

  return (
    <div ref={containerRef} className="bg-white text-black min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.008] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Enhanced Add to Cart Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-24 right-8 z-50 bg-black text-white px-8 py-6 shadow-2xl border border-gray-800 max-w-sm"
        >
          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
              Added to cart
            </p>
            <p className="font-bold text-lg tracking-tight">
              {product.name}
            </p>
            <p className="text-sm text-gray-300">
              Size {selectedSize} : ${product.price}.00 AUD
            </p>
            <div className="flex gap-3 pt-3 border-t border-gray-800">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/cart')}
                className="flex-1 py-2 border border-white hover:bg-white hover:text-black transition-colors text-xs tracking-wider uppercase"
              >
                View Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/checkout')}
                className="flex-1 py-2 bg-white text-black hover:bg-gray-200 transition-colors text-xs tracking-wider uppercase"
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
            <Link href="/arc-3/tops" className="group inline-flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em]">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 3 Tops</span>
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
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-white border border-black/5 relative overflow-hidden">
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />

                    {/* Grid overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
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
                      <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300">
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
              <div className="space-y-4 pb-8 border-b border-black/10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
                  ARC 3 LIGHT / {product.category}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase">
                  {product.name}
                </h1>
                <p className="text-2xl font-light text-gray-600">
                  ${product.price}.00 AUD
                </p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* The Story */}
              <div className="mb-8 pb-8 border-b border-black/10">
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                  The Story
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 italic">
                  "{product.story}"
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-3 pb-8 border-b border-black/10">
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                  Specifications
                </h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-start gap-3">
                      <span className="text-gray-300 mt-1">:</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.2em] uppercase text-gray-600">
                    Select Size
                  </label>
                  <button className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-3 border transition-all text-sm ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-black/20 hover:border-black/50'
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
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-black/10 text-gray-400 cursor-not-allowed border border-black/5'
                }`}
              >
                {selectedSize ? `Add to cart : $${product.price}.00 AUD` : 'Select a size'}
              </motion.button>

              {/* Limited Production Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="p-6 border border-black/10 bg-black/5"
              >
                <p className="text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-black">Limited production.</span> When this drop sells out, it's gone. We don't restock. Every piece is intentionally limited:designed to transcend seasons, not chase trends.
                </p>
              </motion.div>

              {/* Shipping Info */}
              <div className="space-y-3 text-xs text-gray-400">
                <p className="flex items-start gap-3">
                  <span className="text-gray-300">:</span>
                  <span>Ships in 1-3 weeks</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gray-300">:</span>
                  <span>All sales are final</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gray-300">:</span>
                  <span>Free shipping on orders over $200 AUD</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Shop</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/arc-2" className="hover:text-black transition-colors inline-block">Arc 2 Shadow</Link>
                </li>
                <li>
                  <Link href="/arc-3" className="hover:text-black transition-colors inline-block">Arc 3 Light</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Support</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors inline-block">Contact</Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-black transition-colors inline-block">Shipping</Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-black transition-colors inline-block">Returns</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Company</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-black transition-colors inline-block">About</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-black transition-colors inline-block">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-black transition-colors inline-block">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Connect</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2025, 1ABEL All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
