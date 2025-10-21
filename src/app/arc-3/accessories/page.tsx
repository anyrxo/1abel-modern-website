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
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <Link href="/arc-3" className="text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wider inline-block">
                ← Back to Arc 3
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              ARC 3 — ACCESSORIES
            </motion.h1>
            <motion.div
              className="h-px w-32 bg-gray-300 mx-auto mb-4"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.p
              className="text-gray-500 text-sm tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              LIGHT COLLECTION
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/arc-3/accessories/${product.id}`}>
                  <motion.div
                    className="aspect-[3/4] bg-gray-50 mb-4 relative overflow-hidden border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-black/0"
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.div>
                  <motion.h3
                    className="text-sm font-semibold mb-1 uppercase tracking-wide"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {product.name}
                  </motion.h3>
                  <p className="text-sm text-gray-600">{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/arc-2" className="hover:text-black">Arc 2 — Shadow</Link></li>
                <li><Link href="/arc-3" className="hover:text-black">Arc 3 — Light</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-black">Shipping</Link></li>
                <li><Link href="/refund" className="hover:text-black">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-black">About</Link></li>
                <li><Link href="/terms" className="hover:text-black">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-black">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram</a></li>
                <li><a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
