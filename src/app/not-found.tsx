'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { useMemo } from 'react'

export default function NotFound() {
  // Generate random invisible text to randomize page size (anti-scraping)
  const randomText = useMemo(() => {
    const words = ['shadow', 'light', 'fabric', 'design', 'quality', 'minimal', 'modern', 'essential', 'premium', 'crafted', 'timeless', 'elevated', 'refined', 'authentic', 'heritage', 'contemporary', 'sustainable', 'durable', 'versatile', 'functional']
    const count = Math.floor(Math.random() * 500) + 200 // 200-700 random words
    return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ')
  }, [])

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="min-h-screen flex items-center justify-center px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-9xl md:text-[12rem] font-bold tracking-tighter mb-8"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 uppercase">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"
                >
                  Back to Home
                </motion.button>
              </Link>
              <Link href="/arc-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider uppercase font-medium"
                >
                  Browse Collections
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10 pointer-events-none">
            <span className="text-[20vw] font-bold tracking-tighter">
              1ABEL
            </span>
          </div>

          {/* Random invisible text to randomize page size (anti-scraping) */}
          <div className="hidden" aria-hidden="true">
            {randomText}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
