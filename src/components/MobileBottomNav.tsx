'use client'

import { motion } from 'framer-motion'
import { Home, ShoppingBag, Layers, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo } from 'react'
import { useCart } from '@/lib/cartContext'

export function MobileBottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [arcMenuOpen, setArcMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  // Generate page title based on current route
  const pageTitle = useMemo(() => {
    if (pathname === '/') return 'Home'
    if (pathname === '/cart') return 'Cart'
    if (pathname === '/contact') return 'Contact'
    if (pathname === '/about') return 'About'
    if (pathname === '/checkout') return 'Checkout'
    if (pathname.includes('/arc-2/collections')) return 'Arc 2 Shadow'
    if (pathname.includes('/arc-3/collections')) return 'Arc 3 Light'
    if (pathname.includes('/arc-2/shop-all')) return 'Arc 2 Shop All'
    if (pathname.includes('/arc-3/shop-all')) return 'Arc 3 Shop All'
    if (pathname.includes('/arc-2/tops')) return 'Arc 2 Tops'
    if (pathname.includes('/arc-3/tops')) return 'Arc 3 Tops'
    if (pathname.includes('/arc-2/bottoms')) return 'Arc 2 Bottoms'
    if (pathname.includes('/arc-3/bottoms')) return 'Arc 3 Bottoms'
    if (pathname.includes('/arc-2/accessories')) return 'Arc 2 Accessories'
    if (pathname.includes('/arc-3/accessories')) return 'Arc 3 Accessories'
    if (pathname.includes('/arc-2')) return 'Arc 2 Shadow'
    if (pathname.includes('/arc-3')) return 'Arc 3 Light'
    return '1ABEL'
  }, [pathname])

  return (
    <>
      {/* Mobile Page Title Bar - Glass overlay */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/5">
        <div className="h-12 flex items-center justify-center px-4">
          <motion.h1
            key={pageTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-bold tracking-[0.25em] uppercase text-black/80"
          >
            {pageTitle}
          </motion.h1>
        </div>
      </div>

      {/* Arc Menu Overlay */}
      {arcMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setArcMenuOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.2 }}
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
