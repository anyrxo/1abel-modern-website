'use client'

import { motion } from 'framer-motion'
import { Home, ShoppingBag, Layers, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/lib/cartContext'

export function MobileBottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [arcMenuOpen, setArcMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Arc Menu Overlay */}
      {arcMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setArcMenuOpen(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-20 left-4 right-4 glass-card backdrop-blur-xl rounded-premium-xl p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold tracking-wider uppercase mb-3 text-gray-900">Select Arc</p>
            <Link
              href="/arc-2/collections"
              className="block mb-2 p-4 glass-card-dark rounded-premium hover-elevate"
              onClick={() => setArcMenuOpen(false)}
            >
              <p className="font-bold text-white text-sm">ARC 2 SHADOW</p>
              <p className="text-xs text-gray-400">Depth and intention</p>
            </Link>
            <Link
              href="/arc-3/collections"
              className="block p-4 glass-card rounded-premium hover-elevate"
              onClick={() => setArcMenuOpen(false)}
            >
              <p className="font-bold text-black text-sm">ARC 3 LIGHT</p>
              <p className="text-xs text-gray-600">Clarity and ease</p>
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass-card backdrop-blur-2xl border-t border-black/10 shadow-2xl">
        <div className="grid grid-cols-4 h-16">
          {/* Home */}
          <Link href="/" className="flex flex-col items-center justify-center">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center ${
                isActive('/') ? 'text-black' : 'text-gray-500'
              }`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium tracking-wide uppercase">Home</span>
            </motion.div>
          </Link>

          {/* Arc Selector */}
          <button
            onClick={() => setArcMenuOpen(!arcMenuOpen)}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center ${
                arcMenuOpen ? 'text-black' : 'text-gray-500'
              }`}
            >
              <Layers className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium tracking-wide uppercase">Arcs</span>
            </motion.div>
          </button>

          {/* Cart */}
          <Link href="/cart" className="flex flex-col items-center justify-center relative">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center ${
                isActive('/cart') ? 'text-black' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 mb-1" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Cart</span>
            </motion.div>
          </Link>

          {/* Contact */}
          <Link href="/contact" className="flex flex-col items-center justify-center">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center ${
                isActive('/contact') ? 'text-black' : 'text-gray-500'
              }`}
            >
              <Mail className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium tracking-wide uppercase">Contact</span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Spacer for content to not be hidden behind nav */}
      <div className="md:hidden h-16" />
    </>
  )
}
