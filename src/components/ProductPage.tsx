'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'
import { BASE_PRODUCTS, COLORS } from '@/data/products'

type Arc = 'ARC_2' | 'ARC_3'
type ColorKey = string

interface ProductPageProps {
  productId: string
  arc: Arc
  colorStories: Record<string, string>
  pairsWith: Record<string, Array<{
    product: string
    color: string
    arc: string
    reason: string
    price: number
  }>>
}

export function ProductPage({ productId, arc, colorStories, pairsWith }: ProductPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const product = BASE_PRODUCTS[productId]
  const colors = arc === 'ARC_2' ? COLORS.ARC_2 : COLORS.ARC_3
  const price = arc === 'ARC_2' ? product.arc2Price : product.arc3Price
  const arcName = arc === 'ARC_2' ? 'Arc 2' : 'Arc 3'
  const arcSlug = arc === 'ARC_2' ? 'arc-2' : 'arc-3'
  const categorySlug = product.category.toLowerCase()

  const [selectedColor, setSelectedColor] = useState<string>(Object.keys(colors)[0])
  const [selectedSize, setSelectedSize] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const bgColor = arc === 'ARC_2' ? 'bg-black' : 'bg-white'
  const textColor = arc === 'ARC_2' ? 'text-white' : 'text-black'
  const borderColor = arc === 'ARC_2' ? 'border-white/10' : 'border-black/10'

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    const currentColor: any = colors[selectedColor as keyof typeof colors]
    if (!currentColor) return

    addItem({
      id: `${productId.toLowerCase()}-${selectedColor.toLowerCase()}`,
      name: `${product.name} — ${currentColor.name}`,
      price: price,
      size: selectedSize,
      arc: `${arcName}`,
      category: product.category
    })

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 4000)
  }

  return (
    <div ref={containerRef} className={`${bgColor} ${textColor} min-h-screen relative`}>
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
          className={`fixed top-24 right-8 z-50 ${arc === 'ARC_2' ? 'bg-white text-black' : 'bg-black text-white'} px-8 py-6 max-w-sm`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">ADDED TO CART</p>
              <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-400'} mb-1`}>
                {product.name} — {(colors[selectedColor as keyof typeof colors] as any)?.name || selectedColor}
              </p>
              <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-500'}`}>Size {selectedSize}</p>
            </div>
          </div>
          <div className={`flex gap-3 pt-3 mt-3 border-t ${arc === 'ARC_2' ? 'border-gray-200' : 'border-gray-800'}`}>
            <motion.button
              onClick={() => router.push('/cart')}
              className={`flex-1 py-2 text-xs tracking-wider border ${
                arc === 'ARC_2'
                  ? 'border-black hover:bg-black hover:text-white'
                  : 'border-white hover:bg-white hover:text-black'
              } transition-colors`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW CART
            </motion.button>
            <motion.button
              onClick={() => router.push('/checkout')}
              className={`flex-1 py-2 text-xs tracking-wider ${
                arc === 'ARC_2'
                  ? 'bg-black text-white hover:bg-gray-900'
                  : 'bg-white text-black hover:bg-gray-100'
              } transition-colors`}
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
            <Link href={`/${arcSlug}`} className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'} transition-colors uppercase tracking-wider`}>
              {arcName}
            </Link>
            <span className={arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-400'} mx-2>/</span>
            <Link href={`/${arcSlug}/${categorySlug}`} className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'} transition-colors uppercase tracking-wider`}>
              {product.category}
            </Link>
            <span className={arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-400'} mx-2>/</span>
            <span className={`text-xs uppercase tracking-wider`}>
              {product.name}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Product Image */}
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ y: imageY }}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center ${arc === 'ARC_2' ? 'text-white/10' : 'text-black/10'} border ${borderColor}`}
                style={{ backgroundColor: (colors[selectedColor as keyof typeof colors] as any)?.hex }}
              >
                <span className="text-8xl font-bold tracking-tighter">
                  {product.name}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Product Title & Price */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
                    {product.name}
                  </h1>
                  <span className="text-2xl font-light">${price}</span>
                </div>
                <p className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {arcName} {(colors[selectedColor as keyof typeof colors] as any)?.name || selectedColor}
                </p>
              </div>

              {/* Color Selector */}
              <div className={`mb-8 pb-8 border-b ${borderColor}`}>
                <p className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                  Color — {(colors[selectedColor as keyof typeof colors] as any)?.name || selectedColor}
                </p>
                <div className="flex gap-3">
                  {Object.entries(colors).map(([key, color]) => (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedColor(key)}
                      className={`relative w-12 h-12 border-2 transition-all ${
                        selectedColor === key
                          ? (arc === 'ARC_2' ? 'border-white scale-110' : 'border-black scale-110')
                          : (arc === 'ARC_2' ? 'border-white/20' : 'border-black/20')
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === key && (
                        <motion.div
                          layoutId={`colorSelector-${arc}`}
                          className={`absolute inset-0 border-2 ${arc === 'ARC_2' ? 'border-white' : 'border-black'}`}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-500'} mt-2`}>
                  {(colors[selectedColor as keyof typeof colors] as any)?.description || ''}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <p className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                  Size
                </p>
                <div className={`grid ${product.sizes.length === 1 ? 'grid-cols-1' : product.sizes.length <= 6 ? 'grid-cols-6' : 'grid-cols-8'} gap-2`}>
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-sm ${
                        selectedSize === size
                          ? (arc === 'ARC_2' ? 'border-white bg-white text-black' : 'border-black bg-black text-white')
                          : (arc === 'ARC_2' ? 'border-white/20 hover:border-white/40' : 'border-black/20 hover:border-black/40')
                      }`}
                      whileHover={{ scale: product.sizes.length === 1 ? 1 : 1.05 }}
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
                className={`w-full py-4 ${arc === 'ARC_2' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} text-sm tracking-[0.2em] uppercase font-semibold transition-colors mb-8`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>

              {/* Description */}
              <div className="mb-8">
                <p className={`text-sm ${arc === 'ARC_2' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className={`mb-8 pb-8 border-b ${borderColor}`}>
                <h3 className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                  Details
                </h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className={`text-sm ${arc === 'ARC_2' ? 'text-gray-400' : 'text-gray-600'} flex items-start`}>
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Story */}
              <div className="mb-8">
                <h3 className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                  The Story
                </h3>
                <p className={`text-sm ${arc === 'ARC_2' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed italic`}>
                  "{colorStories[selectedColor]}"
                </p>
              </div>

              {/* Pairs With */}
              <div>
                <h3 className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-6`}>
                  Pairs With
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {pairsWith[selectedColor]?.map((pairing, index) => (
                    <motion.div
                      key={index}
                      className={`border ${borderColor} p-4 hover:${arc === 'ARC_2' ? 'border-white/20' : 'border-black/20'} transition-colors cursor-pointer group`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className={`text-sm font-semibold uppercase tracking-wide group-hover:${arc === 'ARC_2' ? 'text-gray-300' : 'text-gray-700'} transition-colors`}>
                            {pairing.product} — {pairing.color}
                          </p>
                          <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-500'} uppercase tracking-wider mt-1`}>
                            {pairing.arc}
                          </p>
                        </div>
                        <span className="text-sm">${pairing.price}</span>
                      </div>
                      <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-500'} italic`}>
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
