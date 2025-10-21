'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { User, ShoppingCart, ChevronDown } from 'lucide-react'
import { useSound } from '@/lib/soundManager'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Header() {
  const { playClick, playLogo } = useSound()
  const pathname = usePathname()
  const [arcsOpen, setArcsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Track scroll position for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  // Determine theme based on current path
  const isArc2 = pathname.startsWith('/arc-2')
  const isArc3 = pathname.startsWith('/arc-3')
  const isDark = isArc2
  const isLight = isArc3

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md shadow-lg' : ''
      } ${
        isDark
          ? `border-b border-gray-800 ${scrolled ? 'bg-black/80' : 'bg-black'}`
          : `border-b border-black ${scrolled ? 'bg-white/80' : 'bg-white'}`
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left Menu */}
          <div className="flex items-center space-x-8">
            {/* ARCS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setArcsOpen(true)}
              onMouseLeave={() => setArcsOpen(false)}
            >
              <motion.button
                className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center py-2 ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => { playClick(); setArcsOpen(!arcsOpen); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ARCS
                <motion.div
                  animate={{ rotate: arcsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ChevronDown className="w-3 h-3 ml-1" />
                </motion.div>
              </motion.button>

              {arcsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`absolute top-full left-0 mt-0 shadow-lg min-w-[200px] z-50 ${
                    isDark
                      ? 'bg-gray-900 border border-gray-700'
                      : 'bg-white border border-black'
                  }`}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
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
                </motion.div>
              )}
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-3xl font-bold cursor-pointer tracking-tighter"
                onClick={() => playLogo()}
              >
                <span className={isDark ? 'text-white' : 'text-black'}>1ABEL</span>
              </motion.div>
            </Link>
          </div>

          {/* Right Menu */}
          <div className="flex items-center justify-end space-x-8">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Link
                href="/account"
                className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center relative ${
                  isDark
                    ? isActive('/account') ? 'text-white' : 'text-gray-400 hover:text-white'
                    : isActive('/account') ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => playClick()}
              >
                <User className="w-4 h-4 mr-1" />
                ACCOUNT
                {isActive('/account') && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${isDark ? 'bg-white' : 'bg-black'}`}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Link
                href="/contact"
                className={`text-xs font-medium tracking-wider uppercase transition-colors relative ${
                  isDark
                    ? isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'
                    : isActive('/contact') ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => playClick()}
              >
                CONTACT US
                {isActive('/contact') && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${isDark ? 'bg-white' : 'bg-black'}`}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Link
                href="/cart"
                className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center relative ${
                  isDark
                    ? isActive('/cart') ? 'text-white' : 'text-gray-400 hover:text-white'
                    : isActive('/cart') ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => playClick()}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                CART
                {isActive('/cart') && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${isDark ? 'bg-white' : 'bg-black'}`}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}