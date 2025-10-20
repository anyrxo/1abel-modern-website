'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, ShoppingCart, ChevronDown } from 'lucide-react'
import { useSound } from '@/lib/soundManager'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const { playClick, playLogo } = useSound()
  const pathname = usePathname()
  const [arcsOpen, setArcsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  // Determine theme based on current path
  const isArc2 = pathname.startsWith('/arc-2')
  const isArc3 = pathname.startsWith('/arc-3')
  const isDark = isArc2
  const isLight = isArc3

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isDark
          ? 'bg-black border-b border-gray-800'
          : 'bg-white border-b border-black'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left Menu */}
          <div className="flex items-center space-x-8">
            {/* ARCS Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setArcsOpen(true)}
                onMouseLeave={() => setArcsOpen(false)}
                className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => { playClick(); setArcsOpen(!arcsOpen); }}
              >
                ARCS
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>

              {arcsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setArcsOpen(true)}
                  onMouseLeave={() => setArcsOpen(false)}
                  className={`absolute top-full left-0 mt-2 shadow-lg min-w-[200px] ${
                    isDark
                      ? 'bg-gray-900 border border-gray-700'
                      : 'bg-white border border-black'
                  }`}
                >
                  <Link
                    href="/arc-2"
                    className={`block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors ${
                      isDark
                        ? 'text-white hover:bg-gray-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => { playClick(); setArcsOpen(false); }}
                  >
                    ARC 2 — SHADOW
                  </Link>
                  <Link
                    href="/arc-3"
                    className={`block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors ${
                      isDark
                        ? 'text-white hover:bg-gray-800 border-t border-gray-700'
                        : 'hover:bg-gray-100 border-t border-gray-200'
                    }`}
                    onClick={() => { playClick(); setArcsOpen(false); }}
                  >
                    ARC 3 — LIGHT
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-3xl font-bold cursor-pointer tracking-tighter"
                onClick={() => playLogo()}
              >
                <span className={isDark ? 'text-white' : 'text-black'}>1ABEL</span>
              </motion.div>
            </Link>
          </div>

          {/* Right Menu */}
          <div className="flex items-center justify-end space-x-8">
            <Link
              href="/account"
              className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center ${
                isDark
                  ? isActive('/account') ? 'text-white' : 'text-gray-400 hover:text-white'
                  : isActive('/account') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              <User className="w-4 h-4 mr-1" />
              ACCOUNT
            </Link>
            <Link
              href="/contact"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                isDark
                  ? isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'
                  : isActive('/contact') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              CONTACT US
            </Link>
            <Link
              href="/cart"
              className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center ${
                isDark
                  ? isActive('/cart') ? 'text-white' : 'text-gray-400 hover:text-white'
                  : isActive('/cart') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              CART
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}