'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': {
    name: "CLOUD CARGO",
    price: 162,
    category: "Cargo Pants",
    description: "Lightweight cargo in natural cotton. Utility pockets without the bulk. For those who carry their essentials lightly.",
    details: [
      "10oz organic cotton twill",
      "Six lightweight utility pockets",
      "Elastic waist with drawstring",
      "Tapered fit through leg",
      "Garment-dyed for soft hand-feel",
      "GOTS certified"
    ],
    story: "Cargos don't have to be heavy. The Cloud Cargo reimagines utility—keeping the function, losing the weight. Soft organic cotton that moves with you, pockets that hold what you need without adding bulk. Freedom and function in one."
  },
  '2': {
    name: "IVORY SWEATS",
    price: 132,
    category: "Sweatpants",
    description: "Essential sweatpants in natural ivory. 320 GSM French terry that's lived-in from day one. Your new go-to.",
    details: [
      "320 GSM French terry cotton",
      "Enzyme-washed for softness",
      "Relaxed fit with tapered leg",
      "Elastic waist with flat drawcord",
      "Single back pocket",
      "Preshrunk"
    ],
    story: "Some days you just need sweats. The Ivory Sweats are those sweats—soft enough to live in, clean enough to wear out. Pre-washed so they feel broken-in immediately. This is comfort without compromise."
  },
  '3': {
    name: "PEARL DENIM",
    price: 178,
    category: "Jeans",
    description: "Japanese denim in light wash. 11oz stretch denim with vintage fade. The jeans that go with everything.",
    details: [
      "11oz Japanese stretch denim",
      "Stone-washed for vintage look",
      "Straight-leg fit with mid-rise",
      "Zip fly with button closure",
      "Five-pocket styling",
      "Pre-faded for character"
    ],
    story: "Light denim done right. The Pearl Denim has that perfect vintage fade—not too distressed, not too clean. Just the right amount of character. Stretch denim that moves, Japanese quality that lasts."
  },
  '4': {
    name: "FROST JOGGERS",
    price: 142,
    category: "Joggers",
    description: "Technical joggers in light grey. Water-resistant with four-way stretch. Made for movement, designed for life.",
    details: [
      "Nylon-spandex blend with stretch",
      "DWR water-resistant finish",
      "Zippered pockets with mesh lining",
      "Articulated knees for mobility",
      "Elastic cuffs with adjusters",
      "Reflective details"
    ],
    story: "Movement shouldn't be complicated. The Frost Joggers keep up with your pace—whether you're running errands or actually running. Technical fabrics that perform, clean aesthetic that doesn't scream 'activewear.'"
  },
  '5': {
    name: "CHALK JEANS",
    price: 172,
    category: "Jeans",
    description: "Slim-fit denim in off-white. 12oz stretch denim that holds its shape. The light jeans you'll actually wear.",
    details: [
      "12oz stretch denim (98% cotton, 2% elastane)",
      "Slim fit with slight taper",
      "Mid-rise for comfort",
      "Button fly closure",
      "Tonal stitching",
      "Shape retention technology"
    ],
    story: "Light jeans can be tricky:too loose, they look sloppy. Too tight, they're uncomfortable. The Chalk Jeans hit that sweet spot— slim enough to look intentional, comfortable enough to wear all day. Quality denim that keeps its shape."
  },
  '6': {
    name: "LUNAR SWEATS",
    price: 128,
    category: "Sweatpants",
    description: "Lightweight sweats in soft grey. 300 GSM cotton fleece with relaxed fit. Designed for slow mornings and easy days.",
    details: [
      "300 GSM cotton fleece",
      "Relaxed fit throughout",
      "Elastic waist with drawstring",
      "Side pockets",
      "Ribbed cuffs",
      "Soft brushed interior"
    ],
    story: "For days when you need easy. The Lunar Sweats are soft, relaxed, uncomplicated. Lightweight fleece that's warm without being heavy. The kind of sweats you throw on and forget you're wearing:in the best way possible."
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
          <Link href="/arc-3/bottoms" className="text-gray-400 hover:text-black underline">
            Back to Arc 3 Bottoms
          </Link>
        </div>
      </div>
    )
  }

  const sizes = ["28", "30", "32", "34", "36", "38"]

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
      category: 'BOTTOMS',
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
                className="flex-1 py-4 border border-black/20 bg-white/50 backdrop-blur-sm text-black hover:bg-black/5 transition-all btn-liquid hover-elevate text-xs tracking-wider uppercase"
              >
                View Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/checkout')}
                className="flex-1 py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white hover:bg-black transition-all btn-liquid hover-elevate pulse-glow magnetic-button ripple text-xs tracking-wider uppercase font-semibold shadow-xl"
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
            <Link href="/arc-3/bottoms" className="group inline-flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em]">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 3 Bottoms</span>
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-8xl font-bold tracking-tighter opacity-5 select-none">
                        {product.name.split(' ')[0]}
                      </span>
                    </div>
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

              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-black/10">
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                  The Story
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 italic">
                  "{product.story}"
                </p>
              </div>

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

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.2em] uppercase text-gray-600">
                    Select Size (Waist)
                  </label>
                  <button className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="p-6 border border-black/10 bg-black/5"
              >
                <p className="text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-black">Limited production.</span> When this drop sells out, it's gone. We don't restock. Every piece is intentionally limited—designed to transcend seasons, not chase trends.
                </p>
              </motion.div>

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
