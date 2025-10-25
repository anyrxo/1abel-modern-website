'use client'

import { motion, useScroll, useTransform, PanInfo } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'
import { BASE_PRODUCTS, COLORS, PREMIUM_ACCESSORY_COLORS, PREMIUM_ACCESSORIES } from '@/data/products'
import { ArrowLeft, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const sizeSelectRef = useRef<HTMLDivElement>(null)
  const product = BASE_PRODUCTS[productId]
  const colors = PREMIUM_ACCESSORIES.includes(productId)
    ? (arc === 'ARC_2' ? PREMIUM_ACCESSORY_COLORS.ARC_2 : PREMIUM_ACCESSORY_COLORS.ARC_3)
    : (arc === 'ARC_2' ? COLORS.ARC_2 : COLORS.ARC_3)
  const price = arc === 'ARC_2' ? product.arc2Price : product.arc3Price
  const arcName = arc === 'ARC_2' ? 'Arc 2' : 'Arc 3'
  const arcSlug = arc === 'ARC_2' ? 'arc-2' : 'arc-3'
  const categorySlug = product.category.toLowerCase()

  const [selectedColor, setSelectedColor] = useState<string>(Object.keys(colors)[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '')
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState<any>(null)
  const [showSizeError, setShowSizeError] = useState(false)
  const [showCartConfirmation, setShowCartConfirmation] = useState(false)
  const [sizeCarouselIndex, setSizeCarouselIndex] = useState(0)
  const { addItem } = useCart()
  const router = useRouter()

  // Determine how many sizes to show at once based on screen size
  const sizesToShow = 5 // Show 5 sizes at a time
  const canScrollLeft = sizeCarouselIndex > 0
  const canScrollRight = sizeCarouselIndex + sizesToShow < product.sizes.length

  const scrollSizesLeft = () => {
    setSizeCarouselIndex(Math.max(0, sizeCarouselIndex - 1))
  }

  const scrollSizesRight = () => {
    setSizeCarouselIndex(Math.min(product.sizes.length - sizesToShow, sizeCarouselIndex + 1))
  }

  const handleSizeDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      scrollSizesLeft()
    } else if (info.offset.x < -50) {
      scrollSizesRight()
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} - ${arcName}`,
          text: `Check out this ${product.name} from 1ABEL`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Clear size error when user selects a size
  useEffect(() => {
    if (selectedSize) {
      setShowSizeError(false)
    }
  }, [selectedSize])

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
      // Show error and scroll to size selector
      setShowSizeError(true)
      sizeSelectRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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

    // Show cart confirmation animation
    setShowCartConfirmation(true)
    setTimeout(() => setShowCartConfirmation(false), 2000)
  }

  return (
    <div ref={containerRef} className={`${bgColor} ${textColor} min-h-screen relative`}>
      <Header />

      {/* Mobile Top Bar - Back & Share */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        <motion.button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md"
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className={`w-5 h-5 ${arc === 'ARC_2' ? 'text-white' : 'text-black'}`} />
        </motion.button>
        <h1 className={`text-sm font-bold tracking-wider uppercase ${arc === 'ARC_2' ? 'text-white' : 'text-black'}`}>
          {product.name}
        </h1>
        <motion.button
          onClick={handleShare}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md"
          whileTap={{ scale: 0.9 }}
        >
          <Share2 className={`w-5 h-5 ${arc === 'ARC_2' ? 'text-white' : 'text-black'}`} />
        </motion.button>
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Floating Add to Cart Button - Mobile Only */}
      <motion.div
        className="md:hidden fixed bottom-[72px] left-0 right-0 z-40 px-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={handleAddToCart}
          className={`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium-xl shadow-2xl ${
            arc === 'ARC_2'
              ? 'bg-white text-black'
              : 'bg-black text-white'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          ADD TO CART
        </motion.button>
      </motion.div>

      {/* Cart Confirmation Animation */}
      {showCartConfirmation && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-premium-xl shadow-2xl backdrop-blur-xl"
          style={{
            backgroundColor: arc === 'ARC_2' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)'
          }}
        >
          <p className={`text-sm font-bold tracking-wider uppercase ${arc === 'ARC_2' ? 'text-black' : 'text-white'}`}>
            Added to cart ✓
          </p>
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
              className="relative aspect-[3/4] overflow-hidden rounded-premium-xl"
              style={{ y: imageY }}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center ${arc === 'ARC_2' ? 'text-white/10' : 'text-black/10'} border ${borderColor} rounded-premium-xl`}
                style={{ backgroundColor: (colors[selectedColor as keyof typeof colors] as any)?.hex }}
              >
                <span className="text-6xl md:text-7xl font-bold tracking-tighter text-center px-4">
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
                      className={`relative w-12 h-12 rounded-premium transition-all hover-elevate magnetic-button ${
                        selectedColor === key
                          ? (arc === 'ARC_2' ? 'border-2 border-white scale-110' : 'border-2 border-black scale-110')
                          : 'border-2 border-transparent'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ backgroundColor: color.hex }}
                    >
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selector - Only show for multi-size products */}
              {product.sizes.length > 1 && (
                <div ref={sizeSelectRef} className="mb-8">
                  <p className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                    Size
                  </p>
                  <div className="relative flex items-center gap-2">
                    {/* Left Arrow - Transparent */}
                    {canScrollLeft && (
                      <motion.button
                        onClick={scrollSizesLeft}
                        className={`absolute -left-3 z-10 p-1 ${
                          arc === 'ARC_2' ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70'
                        } transition-colors`}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>
                    )}

                    {/* Size Buttons Container with Swipe Support */}
                    <motion.div
                      className="flex-1 overflow-hidden"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.1}
                      onDragEnd={handleSizeDrag}
                    >
                      <div className="flex gap-2">
                        {product.sizes.slice(sizeCarouselIndex, sizeCarouselIndex + sizesToShow).map((size) => (
                          <motion.button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`flex-1 py-3 border text-sm btn-liquid hover-elevate magnetic-button ${
                              selectedSize === size
                                ? (arc === 'ARC_2' ? 'border-white bg-white text-black' : 'border-black bg-black text-white')
                                : (arc === 'ARC_2' ? 'border-white/20 hover:border-white/40' : 'border-black/20 hover:border-black/40')
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Right Arrow - Transparent */}
                    {canScrollRight && (
                      <motion.button
                        onClick={scrollSizesRight}
                        className={`absolute -right-3 z-10 p-1 ${
                          arc === 'ARC_2' ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70'
                        } transition-colors`}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                  {/* Error message when no size selected */}
                  {showSizeError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs mt-3 tracking-wide"
                    >
                      Please select a size first
                    </motion.p>
                  )}
                </div>
              )}

              {/* One Size Indicator */}
              {product.sizes.length === 1 && (
                <div className="mb-8">
                  <p className={`text-xs tracking-[0.2em] uppercase ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>
                    Size
                  </p>
                  <p className={`text-sm ${arc === 'ARC_2' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {product.sizes[0]}
                  </p>
                </div>
              )}

              {/* Add to Cart Button - Desktop Only */}
              <div className="hidden md:block mb-8">
                <motion.button
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium-xl shadow-lg ${
                    arc === 'ARC_2'
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-900'
                  } transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ADD TO CART
                </motion.button>
              </div>

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
                  {pairsWith[selectedColor]?.map((pairing, index) => {
                    const pairingProductId = pairing.product.replace(/ /g, '_').toUpperCase()
                    const pairingProduct = BASE_PRODUCTS[pairingProductId]
                    const pairingArcSlug = pairing.arc === 'Arc 2' ? 'arc-2' : 'arc-3'
                    const pairingArc = pairing.arc === 'Arc 2' ? 'ARC_2' : 'ARC_3'
                    const pairingColors = pairingArc === 'ARC_2' ? COLORS.ARC_2 : COLORS.ARC_3
                    const pairingColorKey = pairing.color.toUpperCase()
                    const pairingColorHex = (pairingColors[pairingColorKey as keyof typeof pairingColors] as any)?.hex || '#000000'

                    if (!pairingProduct) return null

                    return (
                      <motion.div
                        key={index}
                        className={`border ${borderColor} p-4 transition-all rounded-premium-lg hover:shadow-lg`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex gap-4 mb-3">
                          {/* Product Image */}
                          <div
                            className={`w-20 h-24 flex-shrink-0 border ${borderColor} flex items-center justify-center text-xs font-bold`}
                            style={{ backgroundColor: pairingColorHex }}
                          >
                            <span className={`${pairingArc === 'ARC_2' ? 'text-white/20' : 'text-black/20'}`}>
                              {pairingProduct.name}
                            </span>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className={`text-sm font-semibold uppercase tracking-wide`}>
                                  {pairing.product} — {pairing.color}
                                </p>
                                <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-500'} uppercase tracking-wider mt-1`}>
                                  {pairing.arc}
                                </p>
                              </div>
                              <span className="text-sm">${pairing.price}</span>
                            </div>
                            <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-500'} italic mb-3`}>
                              {pairing.reason}
                            </p>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => {
                            if (pairingProduct.sizes.length === 1) {
                              addItem({
                                id: `${pairingProductId.toLowerCase()}-${pairing.color.toLowerCase()}`,
                                name: `${pairing.product} — ${pairing.color}`,
                                price: pairing.price,
                                size: pairingProduct.sizes[0],
                                arc: pairing.arc,
                                category: pairingProduct.category
                              })
                              // Show cart confirmation
                              setShowCartConfirmation(true)
                              setTimeout(() => setShowCartConfirmation(false), 2000)
                            } else {
                              setModalProduct({
                                productId: pairingProductId,
                                name: pairing.product,
                                color: pairing.color,
                                colorKey: pairingColorKey,
                                arc: pairing.arc,
                                price: pairing.price,
                                sizes: pairingProduct.sizes,
                                category: pairingProduct.category
                              })
                              setSizeModalOpen(true)
                            }
                          }}
                          className={`w-full py-2 text-xs tracking-wider uppercase ${
                            arc === 'ARC_2'
                              ? 'border border-white/20 hover:border-white/40 hover:bg-white/5'
                              : 'border border-black/20 hover:border-black/40 hover:bg-black/5'
                          } transition-all`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {pairingProduct.sizes.length === 1 ? 'Add to Cart' : 'Select Size & Add to Cart'}
                        </motion.button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Selection Modal */}
      {sizeModalOpen && modalProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSizeModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative ${arc === 'ARC_2' ? 'bg-white text-black' : 'bg-black text-white'} p-8 max-w-md w-full rounded-premium-xl shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSizeModalOpen(false)}
              className={`absolute top-4 right-4 text-2xl ${arc === 'ARC_2' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-400'}`}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold uppercase mb-2">{modalProduct.name}</h2>
            <p className={`text-sm ${arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-400'} uppercase tracking-wider mb-6`}>
              {modalProduct.color} — {modalProduct.arc}
            </p>

            <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-600' : 'text-gray-400'} uppercase tracking-[0.2em] mb-4`}>
              Select Size
            </p>

            <div className={`grid ${modalProduct.sizes.length <= 6 ? 'grid-cols-6' : 'grid-cols-8'} gap-2 mb-6`}>
              {modalProduct.sizes.map((size: string) => (
                <motion.button
                  key={size}
                  onClick={() => {
                    addItem({
                      id: `${modalProduct.productId.toLowerCase()}-${modalProduct.colorKey.toLowerCase()}`,
                      name: `${modalProduct.name} — ${modalProduct.color}`,
                      price: modalProduct.price,
                      size: size,
                      arc: modalProduct.arc,
                      category: modalProduct.category
                    })
                    setSizeModalOpen(false)
                    // Show cart confirmation
                    setShowCartConfirmation(true)
                    setTimeout(() => setShowCartConfirmation(false), 2000)
                  }}
                  className={`py-3 border text-sm btn-liquid hover-elevate magnetic-button ${
                    arc === 'ARC_2'
                      ? 'border-black hover:bg-black hover:text-white'
                      : 'border-white hover:bg-white hover:text-black'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>

            <p className={`text-xs ${arc === 'ARC_2' ? 'text-gray-500' : 'text-gray-500'} text-center`}>
              Price: ${modalProduct.price}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  )
}
