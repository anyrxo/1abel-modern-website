'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Arc3AccessoriesPage() {
  const products = [
    {
      id: 1,
      name: "PEARL CHAIN",
      price: "$100.00 AUD"
    },
    {
      id: 2,
      name: "IVORY RING",
      price: "$80.00 AUD"
    },
    {
      id: 3,
      name: "CLOUD BEANIE",
      price: "$40.00 AUD"
    },
    {
      id: 4,
      name: "FROST GLOVES",
      price: "$60.00 AUD"
    },
    {
      id: 5,
      name: "CHALK BELT",
      price: "$120.00 AUD"
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
              ARC 3 — ACCESSORIES
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
                <Link href={`/arc-3/accessories/${product.id}`}>
                  <div className="aspect-[3/4] bg-gray-50 mb-4 relative overflow-hidden border border-gray-200">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1 uppercase tracking-wide">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.price}</p>
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
