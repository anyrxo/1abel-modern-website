'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { useState, useRef, useEffect } from 'react'

export default function HomePage() {
  const { scrollYProgress, scrollY } = useScroll()
  const [currentArc, setCurrentArc] = useState<null | 2 | 3>(null)

  // Smooth parallax transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])
  const heroBlur = useTransform(scrollY, [0, 400], [0, 10])

  // Advanced parallax for Arc sections
  const arc2Y = useTransform(smoothProgress, [0, 0.5, 1], [0, -150, -300])
  const arc3Y = useTransform(smoothProgress, [0, 0.5, 1], [0, -150, -300])
  const arc2Opacity = useTransform(scrollY, [600, 900], [0.6, 1])
  const arc3Opacity = useTransform(scrollY, [600, 900], [0.6, 1])

  return (
    <div className="bg-black text-white relative">
      <Header />

      {/* Hero Section - Immersive Introduction */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`)
          }}
          className="text-center max-w-6xl px-4 md:px-8 relative z-10"
        >
          {/* SEO H1 - visually hidden but accessible */}
          <h1 className="sr-only">1ABEL - Music-Inspired Minimalist Fashion Brand</h1>

          {/* Main Title with Staggered Animation */}
          <motion.div className="mb-12">
            <motion.div
              className="text-6xl sm:text-8xl md:text-[12rem] font-bold tracking-[-0.02em] mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              1ABEL
            </motion.div>

            {/* Subtle brand mark */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"
            />
          </motion.div>

          {/* Minimal Hook */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed mb-6">
              Where sound becomes style. Premium minimalist essentials designed for those who move too fast to overthink their wardrobe.
            </p>
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
              Discover Arc 2 Shadow (dark essentials) and Arc 3 Light (bright essentials). Music-driven design meets effortless style. Created by Anyro, a brand of IImagined Company. Every piece is crafted with intention, designed to work like music - pieces that always pair perfectly. Our collections simplify your wardrobe decisions while maintaining sophisticated style. Experience premium quality fabrics, timeless designs, and a wardrobe system that actually works.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-gray-600">
                Scroll to explore
              </span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-gray-600 to-transparent mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        </div>
      </section>

      {/* Transition Statement - Problem/Solution */}
      <section className="py-32 px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-center">
            Built like a playlist.<br />
            <span className="text-gray-500">Wears like a system.</span>
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Two Arcs. Dark for depth and focus. Light for clarity and balance.
            Mix them endlessly. Every piece pairs perfectly. No thinking. No friction.
            Just the frequency you need, when you need it.
          </p>
        </motion.div>
      </section>

      {/* Arc Collections - Enhanced Split Experience */}
      <section className="relative">
        {/* Arc 2 - Shadow */}
        <motion.div
          style={{ y: arc2Y, opacity: arc2Opacity }}
          className="relative min-h-screen"
        >
          <Link
            href="/arc-2"
            className="block relative h-full group"
            onMouseEnter={() => setCurrentArc(2)}
            onMouseLeave={() => setCurrentArc(null)}
          >
            <motion.div className="min-h-screen bg-black border-y border-white/10 flex items-center justify-center relative overflow-hidden">
              {/* Animated gradient on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03) 0%, transparent 50%)'
                }}
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '100px 100px'
                }}
              />

              <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
                {/* Arc Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8"
                >
                  <motion.span
                    className="text-[15rem] md:text-[20rem] font-bold leading-none tracking-tighter opacity-10 block"
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.6 }}
                  >
                    02
                  </motion.span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-[-12rem] md:mt-[-16rem]"
                >
                  <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase">
                    Shadow
                  </h3>

                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-8" />

                  <p className="text-gray-500 max-w-lg mx-auto mb-4 text-sm md:text-base leading-relaxed">
                    For studio sessions. Late-night creation. Deep focus.
                    When you need weight, presence, and command. VOID. STEEL. BLOOD. MOSS. EARTH.
                    Pieces that ground you in intensity.
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors duration-500 mt-8"
                    whileHover={{ x: 4 }}
                  >
                    Choose Shadow
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Background text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                <span className="text-[25vw] font-bold tracking-tighter">
                  SHADOW
                </span>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Arc 3 - Light */}
        <motion.div
          style={{ y: arc3Y, opacity: arc3Opacity }}
          className="relative min-h-screen"
        >
          <Link
            href="/arc-3"
            className="block relative h-full group"
            onMouseEnter={() => setCurrentArc(3)}
            onMouseLeave={() => setCurrentArc(null)}
          >
            <motion.div className="min-h-screen bg-white text-black border-y border-black/10 flex items-center justify-center relative overflow-hidden">
              {/* Animated gradient on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03) 0%, transparent 50%)'
                }}
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '100px 100px'
                }}
              />

              <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
                {/* Arc Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8"
                >
                  <motion.span
                    className="text-[15rem] md:text-[20rem] font-bold leading-none tracking-tighter opacity-10 block"
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.6 }}
                  >
                    03
                  </motion.span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-[-12rem] md:mt-[-16rem]"
                >
                  <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase">
                    Light
                  </h3>

                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8" />

                  <p className="text-gray-600 max-w-lg mx-auto mb-4 text-sm md:text-base leading-relaxed">
                    For daytime moves. Social energy. Mental clarity.
                    When you need lightness, breath, and balance. CLOUD. SAKURA. MIST. SAND. LILAC.
                    Pieces that lift you into flow.
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 group-hover:text-black transition-colors duration-500 mt-8"
                    whileHover={{ x: 4 }}
                  >
                    Choose Light
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Background text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                <span className="text-[25vw] font-bold tracking-tighter">
                  LIGHT
                </span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-4 md:px-8 bg-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-6">Philosophy</h3>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                Slow fashion.<br />
                Timeless pieces.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                We don't chase trends. We create archetypes. Pieces designed to transcend
                seasons and remain relevant as your personal style evolves. Quality over
                quantity. Intention over impulse.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold tracking-wide mb-2">Limited Production</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Each drop is intentionally small. When it's gone, it's gone.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide mb-2">Music-Driven Design</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Every Arc is inspired by a sonic identity, a frequency that guides its aesthetic.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide mb-2">Community, Not Consumers</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You're not just buying clothes. You're joining a movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Shop</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/arc-2" className="hover:text-white transition-colors inline-block">Arc 2 Shadow</Link>
                </li>
                <li>
                  <Link href="/arc-3" className="hover:text-white transition-colors inline-block">Arc 3 Light</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Support</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors inline-block">Contact</Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors inline-block">Shipping</Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white transition-colors inline-block">Returns</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Company</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors inline-block">About</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors inline-block">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors inline-block">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-600">Connect</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-block">Instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-block">Twitter</a>
                </li>
              </ul>
            </div>

            {/* Honeypot links - invisible to humans, bots will follow */}
            <div className="hidden" aria-hidden="true">
              <a href="/admin">Admin Panel</a>
              <a href="/wp-admin">WordPress Admin</a>
              <a href="/.env">Environment Config</a>
              <a href="/backup">Backup Files</a>
              <a href="/config">Configuration</a>
              <a href="/database">Database Access</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>© 2025, 1ABEL All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
