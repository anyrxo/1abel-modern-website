'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Arc2TopsPage() {
  const products = [
    {
      id: 1,
      name: "MIDNIGHT THERMAL",
      price: "$100.00 AUD",
      image: "/placeholder-thermal.jpg",
      soldOut: false
    },
    {
      id: 2,
      name: "SHADOW HOODIE",
      price: "$130.00 AUD",
      image: "/placeholder-hoodie.jpg",
      soldOut: false
    },
    {
      id: 3,
      name: "OBSIDIAN ZIPUP",
      price: "$130.00 AUD",
      image: "/placeholder-zipup.jpg",
      soldOut: false
    },
    {
      id: 4,
      name: "VOID HOODIE",
      price: "$130.00 AUD",
      image: "/placeholder-hoodie2.jpg",
      soldOut: false
    },
    {
      id: 5,
      name: "ECLIPSE PUFFER",
      price: "$200.00 AUD",
      image: "/placeholder-puffer.jpg",
      soldOut: false
    },
    {
      id: 6,
      name: "NOCTURNAL THERMAL",
      price: "$100.00 AUD",
      image: "/placeholder-thermal2.jpg",
      soldOut: false
    },
    {
      id: 7,
      name: "ONYX SWEATER",
      price: "$130.00 AUD",
      image: "/placeholder-sweater-black.jpg",
      soldOut: false
    },
    {
      id: 8,
      name: "PHANTOM TEE",
      price: "$65.00 AUD",
      image: "/placeholder-tee.jpg",
      soldOut: false
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
          <div className="mb-12">
            <Link href="/arc-2" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider">
              ← Back to Arc 2
            </Link>
          </div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              ARC 2 — TOPS
            </h1>
            <p className="text-gray-500 text-sm tracking-wide">
              SHADOW COLLECTION
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/arc-2/tops/${product.id}`}>
                  <div className="aspect-[3/4] bg-gray-900 mb-4 relative overflow-hidden border border-gray-800">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                    {product.soldOut && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 uppercase tracking-wide">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {product.price}
                    {product.soldOut && <span className="ml-2 text-gray-600">— Sold Out</span>}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
