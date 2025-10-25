'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Arc2CollectionsPage() {
  const collections = [
    {
      name: 'Tops',
      href: '/arc-2/tops',
      count: '8 pieces',
      description: 'Elevated essentials'
    },
    {
      name: 'Bottoms',
      href: '/arc-2/bottoms',
      count: '6 pieces',
      description: 'Foundation layers'
    },
    {
      name: 'Accessories',
      href: '/arc-2/accessories',
      count: '7 pieces',
      description: 'Finishing details'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/arc-2"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white smooth-color uppercase tracking-[0.2em] mb-8"
          >
            ← Arc 2 Shadow
          </Link>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              Collections
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-xl">
              Arc 2 Shadow — Depth and intention in every piece
            </p>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={collection.href} className="group block">
                  <div className="glass-card-dark rounded-premium-xl p-8 md:p-10 hover-elevate backdrop-blur-xl border border-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                          {collection.name}
                        </h2>
                        <p className="text-gray-400 text-sm mb-1">{collection.description}</p>
                        <p className="text-xs text-gray-600 uppercase tracking-wider">{collection.count}</p>
                      </div>
                      <motion.div
                        className="text-4xl text-gray-600 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
