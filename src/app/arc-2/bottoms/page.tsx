'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useRef, useState, useMemo } from 'react'
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react'

export default function Arc2BottomsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'none'>('none')
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const products = [
    {
      slug: "cargo",
      name: "CARGO PANTS",
      price: 165.00,
      category: "Utility",
      soldOut: false
    },
    {
      slug: "sweats",
      name: "SWEATPANTS",
      price: 135.00,
      category: "Comfort",
      soldOut: false
    },
    {
      slug: "denim",
      name: "DENIM",
      price: 185.00,
      category: "Selvedge",
      soldOut: false
    },
    {
      slug: "joggers",
      name: "JOGGERS",
      price: 145.00,
      category: "Technical",
      soldOut: false
    },
    {
      slug: "shorts",
      name: "SHORTS",
      price: 95.00,
      category: "Summer",
      soldOut: false
    },
    {
      slug: "wide-pants",
      name: "WIDE PANTS",
      price: 155.00,
      category: "Relaxed",
      soldOut: false
    }
  ]

  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Size filter (skip for accessories that are ONE SIZE)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => {
        // If product has sizes and any selected size matches
        return selectedSizes.some(size => size === 'ONE SIZE' || p.category !== 'Accessories')
      })
    }

    // Price sort
    if (priceSort === 'asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (priceSort === 'desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [searchQuery, selectedColors, selectedSizes, priceSort])

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href="/arc-2" className="group inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 2</span>
            </Link>
          </motion.div>

          {/* Page Header with Parallax */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="mb-20 text-center relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-6">
                Shadow Collection
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 uppercase">
                Bottoms
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-8"
              />
              <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                Refined construction meets uncompromising comfort. Every cut
                designed to move with you, built to outlast trends.
              </p>
            </motion.div>
          </motion.div>

      {/* Products Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.slug}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 300, damping: 25 }}
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/arc-2/bottoms/${product.slug}`} className="group block">
                  {/* Product Image */}
                  <div className="relative overflow-hidden mb-6 rounded-premium-xl">
                    <motion.div
                      className="aspect-[3/4] rounded-premium-xl bg-gradient-to-br from-gray-900 to-black border border-white/5 relative"
                      whileHover={{ scale: 1.03, rotateZ: 0.5 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700" />

                      {/* Grid overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }}
                      />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 bg-black/50 backdrop-blur-sm px-3 py-1 border border-white/10">
                          {product.category}
                        </span>
                      </div>

                      {/* Sold out overlay */}
                      {product.soldOut && (
                        <motion.div
                          className="absolute inset-0 bg-black/90 flex items-center justify-center z-20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="text-center">
                            <p className="text-sm font-semibold tracking-[0.2em] uppercase">Sold Out</p>
                            <p className="text-xs text-gray-500 mt-1">Limited Edition</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <motion.h3
                      className="text-sm font-bold uppercase tracking-wide group-hover:text-gray-300 transition-colors"
                      animate={{ x: hoveredProduct === index ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.name}
                    </motion.h3>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)} AUD
                      {product.soldOut && <span className="ml-2 text-gray-600">: Sold Out</span>}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">5 colors available</p>
                  </div>

                  {/* View Product CTA */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-600 group-hover:text-gray-400 transition-colors"
                    animate={{ x: hoveredProduct === index ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Explore Colors
                    <motion.span
                      animate={{ x: hoveredProduct === index ? [0, 4, 0] : 0 }}
                      transition={{ duration: 1.5, repeat: hoveredProduct === index ? Infinity : 0, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Collection Note */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">
              Limited Production
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Each piece is intentionally limited. We don't chase trends—we create
              archetypes designed to transcend seasons. When it's gone, it's gone.
            </p>
          </motion.div>
        </div>
      </main>
{/* Filter Menu Popup */}
      {filterMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden fixed inset-0 bg-black/50 z-45"
            onClick={() => setFilterMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black rounded-t-premium-xl p-6 pb-8 max-h-[70vh] overflow-y-auto"
          >
            <h3 className="text-lg font-bold tracking-wider uppercase mb-6 text-white">Filters</h3>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-gray-500 mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
                {['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'].map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => {
                      setSelectedColors(prev =>
                        prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                      )
                    }}
                    className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                      selectedColors.includes(color)
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-gray-500 mb-3">Sizes</p>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => {
                      setSelectedSizes(prev =>
                        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                      )
                    }}
                    className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                      selectedSizes.includes(size)
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4 bg-white text-black text-sm font-bold tracking-wider uppercase rounded-premium"
              whileTap={{ scale: 0.98 }}
            >
              Apply Filters
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Sort Menu Popup */}
      {sortMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden fixed inset-0 bg-black/50 z-45"
            onClick={() => setSortMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black rounded-t-premium-xl p-6 pb-8"
          >
            <h3 className="text-lg font-bold tracking-wider uppercase mb-6 text-white">Sort By</h3>
            <div className="space-y-3">
              {[
                { label: 'Price: Low to High', value: 'asc' as const },
                { label: 'Price: High to Low', value: 'desc' as const },
                { label: 'Default', value: 'none' as const }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setPriceSort(option.value)
                    setSortMenuOpen(false)
                  }}
                  className={`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                    priceSort === option.value
                      ? 'border-white bg-white text-black'
                      : 'border-white/20 text-white hover:border-white/40'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}



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

      {/* Floating Filter & Sort Buttons - Bottom Center */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-40 flex gap-3">
        <motion.button
          onClick={() => {
            setFilterMenuOpen(!filterMenuOpen)
            setSortMenuOpen(false)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold tracking-wide uppercase rounded-premium shadow-2xl backdrop-blur-md"
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </motion.button>
        <motion.button
          onClick={() => {
            setSortMenuOpen(!sortMenuOpen)
            setFilterMenuOpen(false)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold tracking-wide uppercase rounded-premium shadow-2xl backdrop-blur-md"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </motion.button>
      </div>

      {/* Filter Popup */}
      {filterMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setFilterMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-premium-xl p-6 pb-8 max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-wider uppercase text-black">Filters</h3>
              <motion.button
                onClick={() => setFilterMenuOpen(false)}
                className="text-black hover:opacity-70"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-gray-600 mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
            <motion.button
              key="VOID"
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes('VOID') ? prev.filter(c => c !== 'VOID') : [...prev, 'VOID']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedColors.includes('VOID')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              VOID
            </motion.button>
            <motion.button
              key="STEEL"
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes('STEEL') ? prev.filter(c => c !== 'STEEL') : [...prev, 'STEEL']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedColors.includes('STEEL')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              STEEL
            </motion.button>
            <motion.button
              key="BLOOD"
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes('BLOOD') ? prev.filter(c => c !== 'BLOOD') : [...prev, 'BLOOD']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedColors.includes('BLOOD')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              BLOOD
            </motion.button>
            <motion.button
              key="MOSS"
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes('MOSS') ? prev.filter(c => c !== 'MOSS') : [...prev, 'MOSS']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedColors.includes('MOSS')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              MOSS
            </motion.button>
            <motion.button
              key="EARTH"
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes('EARTH') ? prev.filter(c => c !== 'EARTH') : [...prev, 'EARTH']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedColors.includes('EARTH')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              EARTH
            </motion.button>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-gray-600 mb-3">Sizes</p>
              <div className="flex flex-wrap gap-2">
            <motion.button
              key="XS"
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes('XS') ? prev.filter(s => s !== 'XS') : [...prev, 'XS']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedSizes.includes('XS')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              XS
            </motion.button>
            <motion.button
              key="S"
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes('S') ? prev.filter(s => s !== 'S') : [...prev, 'S']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedSizes.includes('S')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              S
            </motion.button>
            <motion.button
              key="M"
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes('M') ? prev.filter(s => s !== 'M') : [...prev, 'M']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedSizes.includes('M')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              M
            </motion.button>
            <motion.button
              key="L"
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes('L') ? prev.filter(s => s !== 'L') : [...prev, 'L']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedSizes.includes('L')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              L
            </motion.button>
            <motion.button
              key="XL"
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes('XL') ? prev.filter(s => s !== 'XL') : [...prev, 'XL']
                )
              }}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                selectedSizes.includes('XL')
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 text-black hover:border-black/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              XL
            </motion.button>
              </div>
            </div>

            <motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4 bg-white text-black text-sm font-bold tracking-wider uppercase rounded-premium"
              whileTap={{ scale: 0.98 }}
            >
              Apply Filters
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Sort Popup */}
      {sortMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setSortMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-premium-xl p-6 pb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-wider uppercase text-black">Sort By</h3>
              <motion.button
                onClick={() => setSortMenuOpen(false)}
                className="text-black hover:opacity-70"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={() => {
                  setPriceSort('asc')
                  setSortMenuOpen(false)
                }}
                className={`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                  priceSort === 'asc'
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 text-black hover:border-black/40'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                Price: Low to High
              </motion.button>
              <motion.button
                onClick={() => {
                  setPriceSort('desc')
                  setSortMenuOpen(false)
                }}
                className={`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                  priceSort === 'desc'
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 text-black hover:border-black/40'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                Price: High to Low
              </motion.button>
              <motion.button
                onClick={() => {
                  setPriceSort('none')
                  setSortMenuOpen(false)
                }}
                className={`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                  priceSort === 'none'
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 text-black hover:border-black/40'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                Default
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </div>
    )
}
