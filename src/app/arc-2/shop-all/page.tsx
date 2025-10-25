'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useRef, useState, useMemo } from 'react'
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react'

export default function Arc2ShopAllPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
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
        "slug": "thermal",
        "name": "THERMAL",
        "price": 185,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "hoodie",
        "name": "HOODIE",
        "price": 195,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "coach-jacket",
        "name": "COACH JACKET",
        "price": 205,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "crewneck",
        "name": "CREWNECK",
        "price": 175,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "longsleeve",
        "name": "LONG-SLEEVE TEE",
        "price": 95,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "tee",
        "name": "TEE",
        "price": 75,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "overshirt",
        "name": "OVERSHIRT",
        "price": 165,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "puffer",
        "name": "PUFFER",
        "price": 285,
        "category": "Tops",
        "soldOut": false
    },
    {
        "slug": "cargo",
        "name": "CARGO PANTS",
        "price": 165,
        "category": "Bottoms",
        "soldOut": false
    },
    {
        "slug": "sweats",
        "name": "SWEATS",
        "price": 155,
        "category": "Bottoms",
        "soldOut": false
    },
    {
        "slug": "denim",
        "name": "DENIM",
        "price": 185,
        "category": "Bottoms",
        "soldOut": false
    },
    {
        "slug": "wide-pants",
        "name": "WIDE PANTS",
        "price": 175,
        "category": "Bottoms",
        "soldOut": false
    },
    {
        "slug": "joggers",
        "name": "JOGGERS",
        "price": 145,
        "category": "Bottoms",
        "soldOut": false
    },
    {
        "slug": "shorts",
        "name": "SHORTS",
        "price": 95,
        "category": "Bottoms",
        "soldOut": false
    },
    {
        "slug": "chain",
        "name": "CHAIN",
        "price": 125,
        "category": "Accessories",
        "soldOut": false
    },
    {
        "slug": "ring",
        "name": "RING",
        "price": 85,
        "category": "Accessories",
        "soldOut": false
    },
    {
        "slug": "belt",
        "name": "BELT",
        "price": 95,
        "category": "Accessories",
        "soldOut": false
    },
    {
        "slug": "beanie",
        "name": "BEANIE",
        "price": 52,
        "category": "Accessories",
        "soldOut": false
    },
    {
        "slug": "cap",
        "name": "CAP",
        "price": 58,
        "category": "Accessories",
        "soldOut": false
    },
    {
        "slug": "socks",
        "name": "SOCKS",
        "price": 22,
        "category": "Accessories",
        "soldOut": false
    },
    {
        "slug": "tote",
        "name": "TOTE",
        "price": 68,
        "category": "Accessories",
        "soldOut": false
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

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p =>
        selectedCategories.includes(p.category)
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
  }, [searchQuery, selectedColors, selectedSizes, selectedCategories, priceSort])

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Page Header */}
      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="max-w-7xl mx-auto"
        >
          {/* Breadcrumb */}
          <nav className="mb-12">
            <Link href="/" className="group inline-flex items-center gap-2 text-xs smooth-color uppercase tracking-[0.2em] hover:text-white transition-all duration-300 text-gray-500">
              <span>HOME</span>
              <span className="text-gray-700">/</span>
            </Link>
            <Link href="/arc-2" className="group inline-flex items-center gap-2 text-xs smooth-color uppercase tracking-[0.2em] hover:text-white transition-all duration-300 text-gray-500 ml-2">
              <span>ARC 2 SHADOW</span>
              <span className="text-gray-700">/</span>
            </Link>
            <span className="text-xs tracking-[0.2em] uppercase text-white ml-2">
              SHOP ALL
            </span>
          </nav>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              SHOP ALL
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl tracking-wide">
              All products from Arc 2 Shadow. {filteredProducts.length} items.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="relative pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/arc-2/${product.category.toLowerCase()}/${product.slug}`} className="group block">
                  {/* Product Image */}
                  <div className="relative overflow-hidden mb-6 rounded-premium-xl">
                    <motion.div
                      className="aspect-[3/4] rounded-premium-xl glass-card-dark hover-elevate shimmer-on-hover relative overflow-hidden"
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
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 bg-black/50 backdrop-blur-sm px-3 py-1 border border-white/10">
                          {product.category}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <motion.h3
                      className="text-lg font-bold tracking-wider"
                      animate={{ x: hoveredProduct === index ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.name}
                    </motion.h3>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)} AUD
                      {product.soldOut && <span className="ml-2 text-gray-400">: Sold Out</span>}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">5 colors available</p>
                  </div>

                  {/* View Product CTA */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-600 smooth-color glow-on-hover"
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
          </div>
        </div>
      </section>

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
            {/* Category/Product Type */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-gray-600 mb-3">Product Type</p>
              <div className="flex flex-wrap gap-2">
                {['Tops', 'Bottoms', 'Accessories'].map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setSelectedCategories(prev =>
                        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                      )
                    }}
                    className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all ${
                      selectedCategories.includes(category)
                        ? 'border-black bg-black text-white'
                        : 'border-black/20 text-black hover:border-black/40'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
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
