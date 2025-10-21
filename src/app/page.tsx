'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { useState, useRef } from 'react'

// Magnetic cursor component for Arc cards
function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.1, y: y * 0.1 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroY = useTransform(scrollY, [0, 300], [0, -50])

  // Parallax effects for Arc sections
  const arc2Y = useTransform(scrollY, [0, 1000], [0, -100])
  const arc3Y = useTransform(scrollY, [0, 1000], [0, -100])

  return (
    <div className="bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 px-8 overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl relative z-10"
        >
          <motion.h1
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            1ABEL
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 tracking-wide mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Where sound becomes style. Each Arc is a complete collection inspired by music,
            designed to embody a distinct energy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs tracking-widest uppercase text-gray-400 mb-8"
          >
            Explore Collections
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Enhanced with Pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-black/40 to-transparent relative">
              <motion.div
                className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Arc Collections - Split Screen */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* ARC 2 - SHADOW (Black) */}
        <MagneticCard className="relative flex-1 overflow-hidden">
          <Link href="/arc-2" className="block h-full">
            <motion.div
              style={{ y: arc2Y }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-screen bg-black flex items-center justify-center group"
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-white/0 z-10"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                transition={{ duration: 0.6 }}
              />

              {/* Content */}
              <div className="relative z-20 text-center px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-8xl md:text-9xl font-bold tracking-tighter text-white mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    02
                  </motion.h2>
                  <motion.div
                    className="h-px w-24 bg-gray-600 mx-auto mb-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  />
                  <p className="text-2xl md:text-3xl text-gray-400 tracking-widest uppercase mb-2">
                    Shadow
                  </p>
                  <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
                    Born from darkness. Heavy textures, midnight palettes, and commanding presence.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-xs tracking-wider uppercase text-white border-b border-white pb-1"
                  >
                    Explore Arc 2 →
                  </motion.div>
                </motion.div>
              </div>

              {/* Background Text - Enhanced with Gradient */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <motion.span
                  className="text-[20vw] font-bold tracking-tighter bg-gradient-to-br from-white to-gray-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.05, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  SHADOW
                </motion.span>
              </div>
            </motion.div>
          </Link>
        </MagneticCard>

        {/* ARC 3 - LIGHT (White) */}
        <MagneticCard className="relative flex-1 overflow-hidden">
          <Link href="/arc-3" className="block h-full">
            <motion.div
              style={{ y: arc3Y }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-screen bg-white flex items-center justify-center border-l border-gray-200 group"
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0 z-10"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.6 }}
              />

              {/* Content */}
              <div className="relative z-20 text-center px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-8xl md:text-9xl font-bold tracking-tighter text-black mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    03
                  </motion.h2>
                  <motion.div
                    className="h-px w-24 bg-gray-300 mx-auto mb-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  />
                  <p className="text-2xl md:text-3xl text-gray-600 tracking-widest uppercase mb-2">
                    Light
                  </p>
                  <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
                    Clarity in form. Ethereal minimalism with luminous tones and refined aesthetics.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-xs tracking-wider uppercase text-black border-b border-black pb-1"
                  >
                    Explore Arc 3 →
                  </motion.div>
                </motion.div>
              </div>

              {/* Background Text - Enhanced with Gradient */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <motion.span
                  className="text-[20vw] font-bold tracking-tighter bg-gradient-to-br from-black to-gray-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.05, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  LIGHT
                </motion.span>
              </div>
            </motion.div>
          </Link>
        </MagneticCard>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/arc-2" className="hover:text-black transition-colors inline-block">Arc 2 — Shadow</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/arc-3" className="hover:text-black transition-colors inline-block">Arc 3 — Light</Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/contact" className="hover:text-black transition-colors inline-block">Contact Us</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/shipping" className="hover:text-black transition-colors inline-block">Shipping</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/refund" className="hover:text-black transition-colors inline-block">Returns</Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/about" className="hover:text-black transition-colors inline-block">About</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/terms" className="hover:text-black transition-colors inline-block">Terms</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/privacy" className="hover:text-black transition-colors inline-block">Privacy</Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <a href="#" className="hover:text-black transition-colors inline-block">Instagram</a>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <a href="#" className="hover:text-black transition-colors inline-block">Twitter</a>
                  </motion.div>
                </li>
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
