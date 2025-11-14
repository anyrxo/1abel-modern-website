'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { BookOpen, ShoppingCart, ChevronDown, Menu, X, FileText } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cartContext'

export function Header() {
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [arcsOpen, setArcsOpen] = useState(false)
  const [arc2Open, setArc2Open] = useState(false)
  const [arc3Open, setArc3Open] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileArcsOpen, setMobileArcsOpen] = useState(false)
  const [mobileArc2Open, setMobileArc2Open] = useState(false)
  const [mobileArc3Open, setMobileArc3Open] = useState(false)
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
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
              {/* ARC 2 Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setArc2Open(true)}
                onMouseLeave={() => setArc2Open(false)}
              >
                <Link
                  href="/arc-2"
                  className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center py-2 ${
                    isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => {}}
                >
                  ARC 2
                </Link>

                {arc2Open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-0 backdrop-blur-xl shadow-2xl min-w-[180px] z-50 border border-gray-800 bg-black/98"
                  >
                    <Link
                      href="/arc-2/shop-all"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color text-white hover:bg-white/5"
                      onClick={() => { setArc2Open(false); }}
                    >
                      Shop All
                    </Link>
                    <Link
                      href="/arc-2/tops"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color border-t text-gray-300 hover:text-white hover:bg-white/5 border-gray-700"
                      onClick={() => { setArc2Open(false); }}
                    >
                      Tops
                    </Link>
                    <Link
                      href="/arc-2/bottoms"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color border-t text-gray-300 hover:text-white hover:bg-white/5 border-gray-700"
                      onClick={() => { setArc2Open(false); }}
                    >
                      Bottoms
                    </Link>
                    <Link
                      href="/arc-2/accessories"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color border-t text-gray-300 hover:text-white hover:bg-white/5 border-gray-700"
                      onClick={() => { setArc2Open(false); }}
                    >
                      Accessories
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* ARC 3 Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setArc3Open(true)}
                onMouseLeave={() => setArc3Open(false)}
              >
                <Link
                  href="/arc-3"
                  className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center py-2 ${
                    isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => {}}
                >
                  ARC 3
                </Link>

                {arc3Open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-0 backdrop-blur-xl shadow-2xl min-w-[180px] z-50 border border-black/10 bg-white/95"
                  >
                    <Link
                      href="/arc-3/shop-all"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color text-black hover:bg-black/5"
                      onClick={() => { setArc3Open(false); }}
                    >
                      Shop All
                    </Link>
                    <Link
                      href="/arc-3/tops"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color border-t text-gray-600 hover:text-black hover:bg-black/5 border-black/10"
                      onClick={() => { setArc3Open(false); }}
                    >
                      Tops
                    </Link>
                    <Link
                      href="/arc-3/bottoms"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color border-t text-gray-600 hover:text-black hover:bg-black/5 border-black/10"
                      onClick={() => { setArc3Open(false); }}
                    >
                      Bottoms
                    </Link>
                    <Link
                      href="/arc-3/accessories"
                      className="block px-4 py-3 text-xs font-medium tracking-wider uppercase transition-all hover-elevate smooth-color border-t text-gray-600 hover:text-black hover:bg-black/5 border-black/10"
                      onClick={() => { setArc3Open(false); }}
                    >
                      Accessories
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Left - Mobile (Empty for symmetry) */}
            <div className="flex md:hidden">
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-bold cursor-pointer tracking-tighter"
                  onClick={() => {}}
                >
                  <span className={isDark ? 'text-white' : 'text-black'}>1ABEL</span>
                </motion.div>
              </Link>
            </div>

            {/* Right Menu - Desktop */}
            <div className="hidden md:flex items-center justify-end space-x-8">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/about"
                  className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center relative ${
                    isDark
                      ? isActive('/about') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : isActive('/about') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => {}}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  ABOUT
                  {isActive('/about') && (
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
                  href="/blog"
                  className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center relative ${
                    isDark
                      ? pathname.startsWith('/blog') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : pathname.startsWith('/blog') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => {}}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  BLOG
                  {pathname.startsWith('/blog') && (
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
                  onClick={() => {}}
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
                  onClick={() => {}}
                >
                  <div className="relative mr-1">
                    <ShoppingCart className="w-4 h-4" />
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full ${
                          isDark ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                      >
                        {totalItems > 9 ? '9+' : totalItems}
                      </motion.span>
                    )}
                  </div>
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

            {/* Right - Mobile (Empty for symmetry) */}
            <div className="flex md:hidden items-center justify-end">
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
                onClick={() => { setMobileMenuOpen(false); }}
                className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Mobile Menu Content */}
            <nav className="flex-1 p-6 overflow-y-auto">
              <div className="flex flex-col space-y-6">
                {/* ARC 2 Dropdown in Mobile */}
                <div>
                  <motion.button
                    className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center justify-between w-full py-3 ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-black'
                    }`}
                    onClick={() => { setMobileArc2Open(!mobileArc2Open); }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ARC 2
                    <motion.div
                      animate={{ rotate: mobileArc2Open ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {mobileArc2Open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`flex flex-col space-y-1 pl-4 pt-3 border-l-2 ${
                          isDark ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                          <Link
                            href="/arc-2/shop-all"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-white hover:text-gray-300'
                                : 'text-black hover:text-gray-600'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc2Open(false); }}
                          >
                            Shop All
                          </Link>
                          <Link
                            href="/arc-2/tops"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc2Open(false); }}
                          >
                            Tops
                          </Link>
                          <Link
                            href="/arc-2/bottoms"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc2Open(false); }}
                          >
                            Bottoms
                          </Link>
                          <Link
                            href="/arc-2/accessories"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc2Open(false); }}
                          >
                            Accessories
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ARC 3 Dropdown in Mobile */}
                <div>
                  <motion.button
                    className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center justify-between w-full py-3 ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-black'
                    }`}
                    onClick={() => { setMobileArc3Open(!mobileArc3Open); }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ARC 3
                    <motion.div
                      animate={{ rotate: mobileArc3Open ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {mobileArc3Open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`flex flex-col space-y-1 pl-4 pt-3 border-l-2 ${
                          isDark ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                          <Link
                            href="/arc-3/shop-all"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-white hover:text-gray-300'
                                : 'text-black hover:text-gray-600'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc3Open(false); }}
                          >
                            Shop All
                          </Link>
                          <Link
                            href="/arc-3/tops"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc3Open(false); }}
                          >
                            Tops
                          </Link>
                          <Link
                            href="/arc-3/bottoms"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc3Open(false); }}
                          >
                            Bottoms
                          </Link>
                          <Link
                            href="/arc-3/accessories"
                            className={`text-sm font-medium tracking-wider uppercase transition-colors py-2 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            onClick={() => { setMobileMenuOpen(false); setMobileArc3Open(false); }}
                          >
                            Accessories
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Link */}
                <Link
                  href="/about"
                  className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center py-3 ${
                    isDark
                      ? isActive('/about') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : isActive('/about') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => { setMobileMenuOpen(false); }}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  ABOUT
                </Link>

                {/* Blog Link */}
                <Link
                  href="/blog"
                  className={`text-lg font-medium tracking-wider uppercase transition-colors flex items-center py-3 ${
                    isDark
                      ? pathname.startsWith('/blog') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : pathname.startsWith('/blog') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => { setMobileMenuOpen(false); }}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  BLOG
                </Link>

                {/* Contact Link */}
                <Link
                  href="/contact"
                  className={`text-lg font-medium tracking-wider uppercase transition-colors py-3 ${
                    isDark
                      ? isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'
                      : isActive('/contact') ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => { setMobileMenuOpen(false); }}
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
                  onClick={() => { setMobileMenuOpen(false); }}
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