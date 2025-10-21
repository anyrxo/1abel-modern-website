'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

const products = {
  '1': {
    name: "MIDNIGHT CARGO",
    price: 165,
    category: "Cargo Pants",
    description: "Military-grade utility meets streetwear sensibility. Heavy canvas construction with reinforced stitching at stress points. Six functional pockets for everything you need:nothing you don't.",
    details: [
      "12oz cotton canvas with mechanical stretch",
      "Reinforced bartack stitching at all stress points",
      "Six functional utility pockets with hidden snap closures",
      "Adjustable drawstring waist with internal elastic",
      "Tapered fit with articulated knees for movement",
      "Pre-washed for broken-in feel"
    ],
    story: "Born from the idea that function doesn't have to sacrifice form. These cargos were designed for those who carry more than just their phone and wallet:creatives, builders, thinkers who need their clothes to work as hard as they do. The silhouette is intentionally relaxed but never sloppy. Wear them to the studio, the street, the job site."
  },
  '2': {
    name: "SHADOW SWEATS",
    price: 135,
    category: "Sweatpants",
    description: "The heavyweight sweatpants you've been searching for. 400 GSM French terry that gets softer with every wash. Baggy where it matters, tapered where it doesn't.",
    details: [
      "400 GSM heavyweight French terry",
      "Brushed interior for warmth without bulk",
      "Elastic waist with thick drawcord",
      "Relaxed through thigh, tapered at ankle",
      "Reinforced elastic cuffs",
      "Hidden zippered pocket"
    ],
    story: "These aren't your run-to-the-store sweats. These are the sweats you wear when you're locked in:working, creating, thinking. Heavy enough to feel substantial, soft enough to forget you're wearing them. The kind of sweats that become an extension of you."
  },
  '3': {
    name: "ONYX DENIM",
    price: 180,
    category: "Jeans",
    description: "Raw Japanese selvedge denim in deep black. 14oz weight that breaks in beautifully over time. Wide-leg silhouette with straight hem. Built to last decades, not seasons.",
    details: [
      "14oz raw Japanese selvedge denim",
      "Natural indigo dye that fades uniquely to your wear",
      "Wide leg cut with high rise",
      "Button fly with reinforced buttonholes",
      "Selvedge detailing at outseam",
      "Unwashed:will shrink approximately 1 inch in inseam"
    ],
    story: "There's something honest about raw denim. It molds to your body, tells your story through its fades. These jeans aren't meant to look perfect out of the box:they're meant to become perfect over months and years of wear. An investment piece in the truest sense."
  },
  '4': {
    name: "VOID JOGGERS",
    price: 145,
    category: "Joggers",
    description: "Technical joggers with luxury fabrication. Four-way stretch with water-resistant finish. Designed for movement:whether that's through the city or through your process.",
    details: [
      "Polyester-spandex blend with four-way stretch",
      "DWR (Durable Water Repellent) finish",
      "Zippered side pockets with internal mesh bags",
      "Articulated knees and diamond gusset for mobility",
      "Elastic cuffs with toggles",
      "Reflective detailing at side seams"
    ],
    story: "For those who refuse to slow down. Whether you're running from one thing to the next or just need clothes that can keep up with your pace, these joggers move with you. Technical without being gym-bro. Refined without being restrictive."
  },
  '5': {
    name: "OBSIDIAN JEANS",
    price: 175,
    category: "Jeans",
    description: "Slim-straight denim in pitch black. 12oz stretch denim that holds its shape. The jeans you reach for when you need to look put-together without trying too hard.",
    details: [
      "12oz stretch denim (98% cotton, 2% elastane)",
      "Slim-straight fit with mid-rise",
      "Zip fly with button closure",
      "Five-pocket styling with tonal stitching",
      "Pre-washed for immediate comfort",
      "Slight taper from knee to ankle"
    ],
    story: "Sometimes you need jeans that just work. No breaking in, no overthinking. These are those jeans. Slim enough to look intentional, comfortable enough to wear every day. Black enough to go with everything, quality enough to last."
  },
  '6': {
    name: "NOCTURNAL SWEATS",
    price: 130,
    category: "Sweatpants",
    description: "Oversized heavyweight sweats with vintage wash. The kind of sweats that look like you've had them forever:because you will.",
    details: [
      "380 GSM heavyweight cotton fleece",
      "Garment-dyed for vintage look and feel",
      "Elastic waist with flat drawcord",
      "Oversized relaxed fit throughout",
      "Single back patch pocket",
      "Pre-shrunk"
    ],
    story: "Designed to be your default. The sweats you throw on for early mornings, late nights, and everything in between. Oversized enough to feel like freedom, heavy enough to feel grounded. These get better with age:softer, more broken-in, more you."
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
          <Link href="/arc-2/bottoms" className="text-gray-400 hover:text-white underline">
            Back to Arc 2 Bottoms
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
      arc: 'Arc 2 Shadow',
      category: 'BOTTOMS',
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
              Size {selectedSize} : ${product.price}.00 AUD
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
            <Link href="/arc-2/bottoms" className="group inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 2 Bottoms</span>
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
                  ARC 2 SHADOW / {product.category}
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
                      <span className="text-gray-700 mt-1">:</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.2em] uppercase text-gray-400">
                    Select Size (Waist)
                  </label>
                  <button className="text-[10px] tracking-[0.2em] uppercase text-gray-600 hover:text-white transition-colors">
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
                {selectedSize ? `Add to cart : $${product.price}.00 AUD` : 'Select a size'}
              </motion.button>

              {/* Limited Production Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="p-6 border border-white/10 bg-white/5"
              >
                <p className="text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-white">Limited production.</span> When this drop sells out, it's gone. We don't restock. Every piece is intentionally limited:designed to transcend seasons, not chase trends.
                </p>
              </motion.div>

              {/* Shipping Info */}
              <div className="space-y-3 text-xs text-gray-600">
                <p className="flex items-start gap-3">
                  <span className="text-gray-700">:</span>
                  <span>Ships in 1-3 weeks</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gray-700">:</span>
                  <span>All sales are final</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gray-700">:</span>
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
