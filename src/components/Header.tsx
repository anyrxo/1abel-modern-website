'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { User, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react'
import { useSound } from '@/lib/soundManager'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Header() {
  const { playClick, playLogo } = useSound()
  const pathname = usePathname()
  const [arcsOpen, setArcsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileArcsOpen, setMobileArcsOpen] = useState(false)
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const isActive = (path: string) => pathname === path

  // Determine theme based on current path
  const isArc2 = pathname.startsWith('/arc-2')
  const isArc3 = pathname.startsWith('/arc-3')
  const isDark = isArc2
  const isLight = isArc3

  return (
    <>
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="grid grid-cols-3 items-center">
            {/* Left Menu - Desktop Only */}
            <div className="hidden md:flex items-center space-x-8">
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

            {/* Hamburger Menu - Mobile Only */}
            <div className="flex md:hidden">
              <motion.button
                onClick={() => { playClick(); setMobileMenuOpen(true); }}
                className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-bold cursor-pointer tracking-tighter"
                  onClick={() => playLogo()}
                >
                  <span className={isDark ? 'text-white' : 'text-black'}>1ABEL</span>
                </motion.div>
              </Link>
            </div>

            {/* Right Menu - Desktop */}
            <div className="hidden md:flex items-center justify-end space-x-8">
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

            {/* Right Menu - Mobile (Cart Icon Only) */}
            <div className="flex md:hidden items-center justify-end">
              <Link
                href="/cart"
                className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
                onClick={() => playClick()}
              >
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed inset-0 z-50 flex flex-col ${
              isDark ? 'bg-black' : 'bg-white'
            }`}
          >
            {/* Mobile Menu Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'border-gray-800' : 'border-black'
            }`}>
              <h2 className={`text-2xl font-bold tracking-tighter ${
                isDark ? 'text-white' : 'text-black'
              }`}>1ABEL</h2>
              <motion.button
                onClick={() => { playClick(); setMobileMenuOpen(false); }}
                className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Mobile Menu Content */}
            <nav className="flex-1 p-6 overflow-y-auto">
              <div className="flex flex-col space-y-6">
                {/* ARCS Dropdown in Mobile */}
                <div>
                  <motion.button
                    className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center justify-between w-full py-3 ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-black'
                    }`}
                    onClick={() => { playClick(); setMobileArcsOpen(!mobileArcsOpen); }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ARCS
                    <motion.div
                      animate={{ rotate: mobileArcsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {mobileArcsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`flex flex-col space-y-2 pl-4 pt-3 border-l-2 ${
                          isDark ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                          <Link
                            href="/arc-2"
                            className={`text-base font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-white hover:text-gray-300'
                                : 'text-black hover:text-gray-600'
                            }`}
                            onClick={() => { playClick(); setMobileMenuOpen(false); setMobileArcsOpen(false); }}
                          >
                            ARC 2 — SHADOW
                          </Link>
                          <Link
                            href="/arc-3"
                            className={`text-base font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-white hover:text-gray-300'
                                : 'text-black hover:text-gray-600'
                            }`}
                            onClick={() => { playClick(); setMobileMenuOpen(false); setMobileArcsOpen(false); }}
                          >
                            ARC 3 — LIGHT
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Account Link */}
                <Link
                  href="/account"
                  className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center py-3 ${
                    isDark
                      ? isActive('/account') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : isActive('/account') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => { playClick(); setMobileMenuOpen(false); }}
                >
                  <User className="w-5 h-5 mr-2" />
                  ACCOUNT
                </Link>

                {/* Contact Link */}
                <Link
                  href="/contact"
                  className={`text-lg font-medium tracking-wider uppercase transition-colors py-3 ${
                    isDark
                      ? isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : isActive('/contact') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => { playClick(); setMobileMenuOpen(false); }}
                >
                  CONTACT US
                </Link>

                {/* Cart Link */}
                <Link
                  href="/cart"
                  className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center py-3 ${
                    isDark
                      ? isActive('/cart') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : isActive('/cart') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => { playClick(); setMobileMenuOpen(false); }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  CART
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}