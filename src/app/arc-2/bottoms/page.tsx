'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Arc2BottomsPage() {
  const products = [
    {
      id: 1,
      name: "MIDNIGHT CARGO",
      price: "$120.00 AUD",
      soldOut: false
    },
    {
      id: 2,
      name: "SHADOW SWEATS",
      price: "$120.00 AUD",
      soldOut: false
    },
    {
      id: 3,
      name: "ONYX DENIM",
      price: "$150.00 AUD",
      soldOut: false
    },
    {
      id: 4,
      name: "VOID JOGGERS",
      price: "$120.00 AUD",
      soldOut: false
    },
    {
      id: 5,
      name: "OBSIDIAN JEANS",
      price: "$150.00 AUD",
      soldOut: false
    },
    {
      id: 6,
      name: "NOCTURNAL SWEATS",
      price: "$120.00 AUD",
      soldOut: false
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <Link href="/arc-2" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider">
              ← Back to Arc 2
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              ARC 2 — BOTTOMS
            </h1>
            <p className="text-gray-500 text-sm tracking-wide">
              SHADOW COLLECTION
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
                <Link href={`/arc-2/bottoms/${product.id}`}>
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

      <footer className="bg-black border-t border-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/arc-2" className="hover:text-white">Arc 2 — Shadow</Link></li>
                <li><Link href="/arc-3" className="hover:text-white">Arc 3 — Light</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
                <li><Link href="/refund" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-white">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
