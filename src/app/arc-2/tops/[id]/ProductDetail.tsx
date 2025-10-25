'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': {
    name: "MIDNIGHT THERMAL",
    price: 120,
    category: "TOPS",
    collection: "SHADOW",
    description: "Heavyweight thermal constructed from brushed cotton-blend. Double-layered for depth. Designed for those who find clarity in darkness.",
    details: [
      "360 GSM heavyweight thermal cotton",
      "Reinforced ribbed collar and cuffs",
      "Oversized relaxed fit",
      "Pre-washed for minimal shrinkage"
    ],
    story: "Born from late nights in the studio. This thermal embodies the weight of creation—heavy, substantial, grounding. It's not what you wear when you're trying to impress. It's what you wear when you're focused on the work."
  },
  '2': {
    name: "VOID HOODIE",
    price: 145,
    category: "TOPS",
    collection: "SHADOW",
    description: "Premium heavyweight hoodie with architectural construction. Silence stitched into fabric. A hoodie that commands space without demanding attention.",
    details: [
      "450 GSM French terry cotton",
      "Triple-stitched paneling for structure",
      "Elongated drawstrings with metal aglets",
      "Kangaroo pocket with hidden internal pocket"
    ],
    story: "For those who understand that presence doesn't require volume. The Void Hoodie creates negative space around you—a field of calm in chaos. Wear it when you need to disappear into focus."
  },
  '3': {
    name: "OBSIDIAN ZIPUP",
    price: 155,
    category: "TOPS",
    collection: "SHADOW",
    description: "Technical zip-up with utilitarian details. Reflective elements catch light in darkness. Built for movement between worlds.",
    details: [
      "400 GSM cotton-poly blend",
      "YKK metal zipper with custom 1ABEL pull",
      "Reflective 3M detailing on sleeves",
      "Adjustable hem with hidden drawcord"
    ],
    story: "The piece you reach for when crossing thresholds. Studio to street. Day to night. The Obsidian Zipup bridges states—functional armor that looks intentional, not technical."
  },
  '4': {
    name: "ECLIPSE PUFFER",
    price: 280,
    category: "TOPS",
    collection: "SHADOW",
    description: "Oversized down puffer with matte finish. Heavy warmth, weightless feel. Statement outerwear that doesn't need to speak.",
    details: [
      "Water-resistant matte nylon shell",
      "700-fill responsibly sourced down",
      "Extreme oversized silhouette",
      "Internal storm flap and zipper garage"
    ],
    story: "When you need to block out the cold and the noise. The Eclipse Puffer creates a cocoon—your personal atmosphere. It's excessive by design. Unapologetic in its volume."
  },
  '5': {
    name: "NOCTURNAL THERMAL",
    price: 120,
    category: "TOPS",
    collection: "SHADOW",
    description: "Long-sleeve thermal with tonal details. Subtle texture variations create depth. For the hours when everyone else is asleep.",
    details: [
      "340 GSM waffle-knit thermal",
      "Slightly cropped length",
      "Slim athletic fit",
      "Contrast black-on-black branding"
    ],
    story: "3 AM energy. The Nocturnal Thermal is for late-night sessions, early morning drives, the in-between hours where you do your best thinking. Lighter than Midnight, but just as intentional."
  },
  '6': {
    name: "SHADOW CREWNECK",
    price: 135,
    category: "TOPS",
    collection: "SHADOW",
    description: "Essential heavyweight crewneck. No logos, no graphics:just weight and construction. The foundation piece.",
    details: [
      "420 GSM brushed fleece cotton",
      "Drop-shoulder construction",
      "Slightly oversized fit",
      "Ribbed collar, cuffs, and hem"
    ],
    story: "Sometimes the most powerful statement is silence. The Shadow Crewneck is the piece you build your wardrobe around. Timeless, unbranded, essential."
  },
  '7': {
    name: "ONYX LONGSLEEVE",
    price: 95,
    category: "TOPS",
    collection: "SHADOW",
    description: "Premium heavyweight long-sleeve tee. Reinforced construction. Designed to layer or stand alone.",
    details: [
      "260 GSM heavyweight cotton",
      "Slightly elongated body",
      "Tapered sleeves",
      "Double-needle stitching throughout"
    ],
    story: "The long-sleeve that actually fits. The Onyx isn't an afterthought:it's purpose-built. Layer it under hoodies or wear it solo. Either way, it holds its shape."
  },
  '8': {
    name: "PHANTOM TEE",
    price: 75,
    category: "TOPS",
    collection: "SHADOW",
    description: "Essential heavyweight tee. Slightly oversized. Built to last, designed to fade with character.",
    details: [
      "220 GSM ring-spun cotton",
      "Relaxed boxy fit",
      "Reinforced shoulder seams",
      "Pre-shrunk and garment dyed"
    ],
    story: "Your everyday foundational tee. The Phantom gets better with every wash:fabric softens, fit relaxes, character develops. This is the tee you'll still be wearing years from now."
  }
}

export function ProductDetail({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()
  const router = useRouter()
  const product = products[id as keyof typeof products]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <Link href="/arc-2/tops" className="text-sm text-gray-500 hover:text-white uppercase tracking-wider">
            ← Back to Arc 2 Tops
          </Link>
        </div>
      </div>
    )
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const handleAddToCart = () => {
    if (!selectedSize) {
      return
    }

    addItem({
      id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      arc: 'Arc 2 Shadow',
      category: product.category,
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

      {/* Add to Cart Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-24 right-8 z-50 bg-white text-black px-8 py-6 border border-black/10 backdrop-blur-sm max-w-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold uppercase tracking-wide text-sm mb-2">
                Added to cart
              </p>
              <p className="text-xs text-gray-600 mb-4">
                {product.name} Size {selectedSize}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/cart')}
                  className="text-xs uppercase tracking-wider underline hover:no-underline smooth-color glow-on-hover"
                >
                  View Cart
                </button>
                <button
                  onClick={() => router.push('/checkout')}
                  className="text-xs uppercase tracking-wider underline hover:no-underline smooth-color glow-on-hover"
                >
                  Checkout
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-xs text-gray-400 hover:text-black"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Link href="/arc-2/tops" className="group inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 2 Tops</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Images */}
            <motion.div
              style={{ y: imageY }}
              className="space-y-6"
            >
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/5 relative overflow-hidden group cursor-pointer"
                  onClick={() => setActiveImage(index - 1)}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700" />

                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}
                  />

                  {/* Product name watermark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl md:text-7xl font-bold tracking-tighter opacity-[0.03] text-white select-none">
                      {product.name.split(' ')[0]}
                    </span>
                  </div>

                  {/* Image indicator */}
                  <div className="absolute bottom-4 right-4 text-xs tracking-wider uppercase text-gray-600">
                    {index}/3
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Product Info - Sticky */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32 h-fit"
            >
              {/* Collection & Name */}
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 mb-6">
                  Arc 2 {product.collection}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-none">
                  {product.name}
                </h1>
                <p className="text-2xl font-light text-gray-400">
                  ${product.price}.00 <span className="text-sm">AUD</span>
                </p>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <p className="text-sm text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Story */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gray-600 mb-4">
                  The Story
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  "{product.story}"
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-semibold tracking-[0.2em] uppercase">
                    Select Size
                  </label>
                  <Link href="/shipping" className="text-[10px] tracking-wider uppercase text-gray-500 hover:text-white transition-colors">
                    Size Guide
                  </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-4 border transition-all text-sm font-medium ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-white/20 hover:border-white/40 text-gray-400'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-gray-600 mt-3">
                    Please select a size
                  </p>
                )}
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                whileTap={{ scale: selectedSize ? 0.98 : 1 }}
                className={`w-full py-5 mb-4 text-sm font-semibold tracking-[0.2em] uppercase transition-all ${
                  selectedSize
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-white/10 text-gray-600 cursor-not-allowed'
                }`}
              >
                {selectedSize ? 'Add to Cart' : 'Select Size'}
              </motion.button>

              {/* Product Details */}
              <div className="mb-8 space-y-4 text-xs text-gray-500">
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gray-600 mb-4">
                    Details
                  </h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-600 mt-1">:</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="space-y-3 text-xs border-t border-white/10 pt-6">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 uppercase tracking-wider">Shipping</span>
                  <span className="text-gray-500 text-right">1-3 weeks production<br/>+ 5-7 days delivery</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 uppercase tracking-wider">Returns</span>
                  <span className="text-gray-500">All sales final</span>
                </div>
              </div>

              {/* Scarcity Message */}
              <div className="mt-8 p-6 border border-white/10 bg-white/5">
                <p className="text-xs tracking-wide text-gray-400 leading-relaxed">
                  <span className="font-semibold text-white">Limited production.</span> Each piece is intentionally scarce. When this drops sells out, it's gone. We don't restock.
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
                  <Link href="/arc-2" className="hover:text-white transition-colors inline-block">Arc 2 Shadow</Link>
                </li>
                <li>
                  <Link href="/arc-3" className="hover:text-white transition-colors inline-block">Arc 3 Light</Link>
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
            <p>© 2025, 1ABEL All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
