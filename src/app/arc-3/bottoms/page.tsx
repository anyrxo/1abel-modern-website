'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Arc3BottomsPage() {
  const products = [
    {
      id: 1,
      name: "CLOUD CARGO",
      price: "$120.00 AUD",
      soldOut: false
    },
    {
      id: 2,
      name: "IVORY SWEATS",
      price: "$120.00 AUD",
      soldOut: false
    },
    {
      id: 3,
      name: "PEARL DENIM",
      price: "$150.00 AUD",
      soldOut: false
    },
    {
      id: 4,
      name: "FROST JOGGERS",
      price: "$120.00 AUD",
      soldOut: false
    },
    {
      id: 5,
      name: "CHALK JEANS",
      price: "$150.00 AUD",
      soldOut: false
    },
    {
      id: 6,
      name: "LUNAR SWEATS",
      price: "$120.00 AUD",
      soldOut: false
    }
  ]

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <Link href="/arc-3" className="text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wider">
              ← Back to Arc 3
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              ARC 3 — BOTTOMS
            </h1>
            <p className="text-gray-500 text-sm tracking-wide">
              LIGHT COLLECTION
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/arc-3/bottoms/${product.id}`}>
                  <div className="aspect-[3/4] bg-gray-50 mb-4 relative overflow-hidden border border-gray-200">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                    {product.soldOut && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-sm font-semibold">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 uppercase tracking-wide">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.price}
                    {product.soldOut && <span className="ml-2 text-gray-400">— Sold Out</span>}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
