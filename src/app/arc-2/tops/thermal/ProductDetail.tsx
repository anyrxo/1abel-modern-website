'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'

// Arc 2 Shadow Color Palette
const COLORS = {
  VOID: { name: 'VOID', hex: '#0a0a0a', description: 'Pure black' },
  STEEL: { name: 'STEEL', hex: '#3a3a3a', description: 'Dark grey' },
  BLOOD: { name: 'BLOOD', hex: '#4a1a1a', description: 'Deep burgundy' },
  MOSS: { name: 'MOSS', hex: '#1a2a1a', description: 'Dark forest green' },
  EARTH: { name: 'EARTH', hex: '#2a1a0a', description: 'Dark brown' }
}

type ColorKey = keyof typeof COLORS

// Base product info
const PRODUCT = {
  name: 'THERMAL',
  price: 185,
  category: 'TOPS',
  collection: 'SHADOW',
  description: 'Heavyweight thermal constructed from brushed cotton-blend. Double-layered for depth. The foundational layering piece.',
  details: [
    '400 GSM heavyweight thermal cotton',
    'Reinforced ribbed collar and cuffs',
    'Oversized relaxed fit',
    'Pre-washed for minimal shrinkage',
    'Garment-dyed for rich color depth'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}

// Color-specific stories
const COLOR_STORIES: Record<ColorKey, string> = {
  VOID: "Born from late nights in the studio. This thermal in VOID embodies the weight of creation—heavy, substantial, grounding. Pure black that absorbs light and attention. It's not what you wear when you're trying to impress. It's what you wear when you're focused on the work.",

  STEEL: "The STEEL colorway bridges darkness and light. Dark grey that shifts with the light—sometimes charcoal, sometimes smoke. This thermal grounds you without the severity of pure black. For those who move between worlds.",

  BLOOD: "BLOOD runs deep. This thermal in deep burgundy carries intensity without aggression. A color that commands presence—rich, layered, unapologetic. For those who understand that power doesn't need to shout.",

  MOSS: "The MOSS colorway connects you to earth. Dark forest green that darkens with wear, lightens with wash. This thermal grounds you in nature while maintaining the Shadow aesthetic. Heavy, organic, alive.",

  EARTH: "EARTH tone that anchors everything. Dark brown that develops character with time—creases, fades, patina. This thermal is the foundation. Neutral enough to pair with anything, substantial enough to stand alone."
}

// Pairing recommendations based on color theory
const PAIRS_WITH: Record<ColorKey, Array<{
  product: string
  color: string
  arc: string
  reason: string
  price: number
}>> = {
  VOID: [
    { product: 'CARGO PANTS', color: 'STEEL', arc: 'Arc 2', reason: 'Tonal dark layering', price: 165 },
    { product: 'CARGO PANTS', color: 'CLOUD', arc: 'Arc 3', reason: 'High contrast monochrome', price: 162 },
    { product: 'BEANIE', color: 'STEEL', arc: 'Arc 2', reason: 'Grounded grey accent', price: 55 }
  ],
  STEEL: [
    { product: 'CARGO PANTS', color: 'VOID', arc: 'Arc 2', reason: 'Classic dark tonal', price: 165 },
    { product: 'DENIM', color: 'MIST', arc: 'Arc 3', reason: 'Cool blue harmony', price: 178 },
    { product: 'BEANIE', color: 'CLOUD', arc: 'Arc 3', reason: 'Soft contrast', price: 52 }
  ],
  BLOOD: [
    { product: 'CARGO PANTS', color: 'VOID', arc: 'Arc 2', reason: 'Classic depth pairing', price: 165 },
    { product: 'DENIM', color: 'EARTH', arc: 'Arc 2', reason: 'Warm rich tones', price: 185 },
    { product: 'CARGO PANTS', color: 'SAND', arc: 'Arc 3', reason: 'Warm neutral balance', price: 162 }
  ],
  MOSS: [
    { product: 'CARGO PANTS', color: 'EARTH', arc: 'Arc 2', reason: 'Natural earth harmony', price: 165 },
    { product: 'SWEATS', color: 'SAND', arc: 'Arc 3', reason: 'Cross-arc earth tones', price: 132 },
    { product: 'BEANIE', color: 'VOID', arc: 'Arc 2', reason: 'Grounded black accent', price: 55 }
  ],
  EARTH: [
    { product: 'CARGO PANTS', color: 'MOSS', arc: 'Arc 2', reason: 'Organic green + brown', price: 165 },
    { product: 'DENIM', color: 'SAND', arc: 'Arc 3', reason: 'Full earth tone flow', price: 178 },
    { product: 'BEANIE', color: 'EARTH', arc: 'Arc 2', reason: 'Tonal warm layering', price: 55 }
  ]
}

export function ProductDetail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedColor, setSelectedColor] = useState<ColorKey>('VOID')
  const [selectedSize, setSelectedSize] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addItem({
      id: `thermal-${selectedColor.toLowerCase()}`,
      name: `${PRODUCT.name} — ${COLORS[selectedColor].name}`,
      price: PRODUCT.price,
      size: selectedSize,
      arc: `Arc 2 ${PRODUCT.collection}`,
      category: PRODUCT.category
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-8 z-50 bg-white text-black px-8 py-6 max-w-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">ADDED TO CART</p>
              <p className="text-xs text-gray-600 mb-1">
                {PRODUCT.name} — {COLORS[selectedColor].name}
              </p>
              <p className="text-xs text-gray-500">Size {selectedSize}</p>
            </div>
          </div>
          <div className="flex gap-3 pt-3 mt-3 border-t border-gray-200">
            <motion.button
              onClick={() => router.push('/cart')}
              className="flex-1 py-2 text-xs tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW CART
            </motion.button>
            <motion.button
              onClick={() => router.push('/checkout')}
              className="flex-1 py-2 text-xs tracking-wider bg-black text-white hover:bg-gray-900 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CHECKOUT
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="pt-24 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/arc-2" className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-wider">
              Arc 2
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link href="/arc-2/tops" className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-wider">
              Tops
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-xs text-white uppercase tracking-wider">
              {PRODUCT.name}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Product Image */}
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ y: imageY }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center text-white/10 border border-white/10"
                style={{ backgroundColor: COLORS[selectedColor].hex }}
              >
                <span className="text-8xl font-bold tracking-tighter">
                  {PRODUCT.name}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Product Title & Price */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
                    {PRODUCT.name}
                  </h1>
                  <span className="text-2xl font-light">${PRODUCT.price}</span>
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
                  Arc 2 {COLORS[selectedColor].name}
                </p>
              </div>

              {/* Color Selector */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                  Color — {COLORS[selectedColor].name}
                </p>
                <div className="flex gap-3">
                  {Object.entries(COLORS).map(([key, color]) => (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedColor(key as ColorKey)}
                      className={`relative w-12 h-12 border-2 transition-all ${
                        selectedColor === key ? 'border-white scale-110' : 'border-white/20'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === key && (
                        <motion.div
                          layoutId="colorSelector"
                          className="absolute inset-0 border-2 border-white"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {COLORS[selectedColor].description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                  Size
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {PRODUCT.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-sm ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black text-sm tracking-[0.2em] uppercase font-semibold hover:bg-gray-200 transition-colors mb-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>

              {/* Description */}
              <div className="mb-8">
                <p className="text-sm text-gray-400 leading-relaxed">
                  {PRODUCT.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                  Details
                </h3>
                <ul className="space-y-2">
                  {PRODUCT.details.map((detail, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start">
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Story */}
              <div className="mb-8">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                  The Story
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  "{COLOR_STORIES[selectedColor]}"
                </p>
              </div>

              {/* Pairs With */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-6">
                  Pairs With
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {PAIRS_WITH[selectedColor].map((pairing, index) => (
                    <motion.div
                      key={index}
                      className="border border-white/10 p-4 hover:border-white/20 transition-colors cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide group-hover:text-gray-300 transition-colors">
                            {pairing.product} — {pairing.color}
                          </p>
                          <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">
                            {pairing.arc}
                          </p>
                        </div>
                        <span className="text-sm">${pairing.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 italic">
                        {pairing.reason}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  )
}
