'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useRef, useState, useMemo } from 'react'
import { ProductFilters } from '@/components/ProductFilters'

export default function Arc3TopsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'none'>('none')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const products = [
    {
      slug: "thermal",
      name: "THERMAL",
      price: 182.00,
      category: "Heavyweight",
      soldOut: false
    },
    {
      slug: "hoodie",
      name: "HOODIE",
      price: 192.00,
      category: "Essential",
      soldOut: false
    },
    {
      slug: "coach-jacket",
      name: "COACH JACKET",
      price: 202.00,
      category: "Outerwear",
      soldOut: false
    },
    {
      slug: "crewneck",
      name: "CREWNECK",
      price: 172.00,
      category: "Essential",
      soldOut: false
    },
    {
      slug: "longsleeve",
      name: "LONG-SLEEVE TEE",
      price: 92.00,
      category: "Layering",
      soldOut: false
    },
    {
      slug: "tee",
      name: "TEE",
      price: 72.00,
      category: "Essential",
      soldOut: false
    },
    {
      slug: "overshirt",
      name: "OVERSHIRT",
      price: 162.00,
      category: "Hybrid",
      soldOut: false
    },
    {
      slug: "puffer",
      name: "PUFFER",
      price: 275.00,
      category: "Outerwear",
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
    <div ref={containerRef} className="bg-white text-black min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay z-10">
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
            <Link href="/arc-3" className="group inline-flex items-center gap-2 text-xs smooth-color uppercase tracking-[0.2em] hover:text-black transition-all duration-300">
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
              >
                ←
              </motion.span>
              <span>Back to Arc 3</span>
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
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
                Light Collection
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 uppercase">
                Tops
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8"
              />
              <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                Clean lines and effortless refinement. Each piece designed
                for those who understand that clarity doesn't require compromise.
              </p>
            </motion.div>
          </motion.div>

          
          {/* Filters */}
          <ProductFilters
            onSearchChange={setSearchQuery}
            onColorFilter={setSelectedColors}
            onSizeFilter={setSelectedSizes}
            onPriceSort={setPriceSort}
            availableColors={['SAKURA', 'MIST', 'CLOUD', 'SAND', 'LILAC']}
            availableSizes={['XS', 'S', 'M', 'L', 'XL', 'ONE SIZE']}
            isDark={false}
          />

      {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
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
                <Link href={`/arc-3/tops/${product.slug}`} className="group block">
                  {/* Product Image */}
                  <div className="relative overflow-hidden mb-6">
                    <motion.div
                      className="aspect-[3/4] glass-card hover-elevate shimmer-on-hover relative overflow-hidden"
                      whileHover={{ scale: 1.03, rotateZ: 0.5 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />

                      {/* Grid overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }}
                      />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 bg-white/50 backdrop-blur-sm px-3 py-1 border border-black/10">
                          {product.category}
                        </span>
                      </div>

                      {/* Sold out overlay */}
                      {product.soldOut && (
                        <motion.div
                          className="absolute inset-0 bg-white/90 flex items-center justify-center z-20"
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
                      className="text-sm font-bold uppercase tracking-wide group-hover:text-gray-700 transition-colors"
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
          </motion.div>

          {/* Collection Note */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Limited Production
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Each piece is intentionally limited. We don't chase trends—we create
              archetypes designed to transcend seasons. When it's gone, it's gone.
            </p>
          </motion.div>
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
          <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>© 2025, 1ABEL All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
