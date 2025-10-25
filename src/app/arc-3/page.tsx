'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useRef } from 'react'

export default function Arc3Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const arcNumberScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const arcNumberOpacity = useTransform(scrollYProgress, [0, 0.5], [0.08, 0.01])

  return (
    <div ref={containerRef} className="bg-white text-black min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Arc Number */}
        <motion.div
          style={{ scale: arcNumberScale, opacity: arcNumberOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-[30vw] font-bold leading-none tracking-tighter text-black">
            03
          </span>
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-5xl px-4 md:px-8 relative z-20"
        >
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-light">
              Arc 3 Collection
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-bold tracking-[-0.02em] mb-8 uppercase leading-none">
              Light
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-12"
            />
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              Clarity in form. Ethereal minimalism, luminous tones,
              and the weightlessness of dawn.
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-loose max-w-2xl mx-auto">
              For those who seek balance in a chaotic world. This collection speaks
              softly but powerfully—pieces crafted for individuals who understand that
              true strength lies in restraint.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-gray-400">
                Explore Collection
              </span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Color Palette Section */}
      <section className="py-32 px-4 md:px-8 relative border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
                The Light Palette
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-3xl mx-auto">
                Five colors. Each a different shade of lightness.
                Each piece in the collection exists across this ethereal spectrum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { name: 'SAKURA', hex: '#ffd4e5', desc: 'Light pink. Ethereal softness.' },
                { name: 'MIST', hex: '#d4e5ff', desc: 'Soft blue. Morning calm.' },
                { name: 'CLOUD', hex: '#ffffff', desc: 'Pure white. The canvas.' },
                { name: 'SAND', hex: '#f5f0e8', desc: 'Cream warmth. The bridge.' },
                { name: 'LILAC', hex: '#e8d4ff', desc: 'Soft lavender. Twilight.' }
              ].map((color, index) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square mb-4 border border-black/10 relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-black/40 group-hover:text-black/60 transition-colors">
                        {color.hex}
                      </p>
                    </div>
                  </motion.div>
                  <h3 className="text-sm font-bold tracking-wider mb-2 uppercase">
                    {color.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {color.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-8">
              <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Every base product is available in all five colorways.
                Mix them. Layer them. Build your own light.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-32 px-4 md:px-8 relative border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
                The Light Philosophy
              </h2>
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-600">
                "In lightness, we find freedom. In simplicity, we find truth.
                In space, we find peace."
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mt-20">
              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3 uppercase">Weightless Feel</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Fabrics that breathe and move with you. Each piece feels
                  barely there, yet makes its presence known.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3 uppercase">Five Light Colors</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  From pure CLOUD white to ethereal SAKURA pink. Every piece exists
                  across the complete spectrum of light.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3 uppercase">Refined Silhouettes</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Clean lines that celebrate negative space. Every cut is
                  intentional, every seam purposeful.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection Categories */}
      <section className="py-32 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Browse by Category
            </h2>
            <p className="text-sm text-gray-500">
              Each piece meticulously crafted to embody the Light aesthetic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Tops',
                href: '/arc-3/tops',
                description: 'Hoodies, thermals, and outerwear',
                delay: 0
              },
              {
                title: 'Bottoms',
                href: '/arc-3/bottoms',
                description: 'Denim, cargo, and sweats',
                delay: 0.1
              },
              {
                title: 'Accessories',
                href: '/arc-3/accessories',
                description: 'Chains, rings, and essentials',
                delay: 0.2
              }
            ].map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: category.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative overflow-hidden mb-6">
                    {/* Image placeholder with hover effect */}
                    <motion.div
                      className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-white border border-black/5 relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />

                      {/* Category text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-6xl md:text-7xl font-bold tracking-tighter opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-700 uppercase"
                          whileHover={{ scale: 1.05 }}
                        >
                          {category.title}
                        </motion.span>
                      </div>

                      {/* Grid overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.015] transition-opacity duration-700"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Category info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold tracking-tight uppercase mb-2 group-hover:text-gray-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {category.description}
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-600 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      View All
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound Inspiration */}
      <section className="py-32 px-4 md:px-8 border-t border-black/5 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
            The Sound Behind The Light
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Every Arc begins with sound. This track embodies the frequency that shaped
            the Light collection: ethereal, floating, luminous.
          </p>
          <a
            href="https://spotify.link/qEQY5uDYDXb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-black/10 hover:border-black/20 hover:bg-black/5 transition-all duration-300 text-sm tracking-wide"
          >
            <span className="text-gray-600 hover:text-black transition-colors">
              Listen on Spotify →
            </span>
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Shop</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/arc-2" className="hover:text-black transition-colors inline-block">Arc 2 Shadow</Link>
                </li>
                <li>
                  <Link href="/arc-3" className="hover:text-black transition-colors inline-block">Arc 3 Light</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Support</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors inline-block">Contact</Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-black transition-colors inline-block">Shipping</Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-black transition-colors inline-block">Returns</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Company</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-black transition-colors inline-block">About</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-black transition-colors inline-block">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-black transition-colors inline-block">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Connect</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2025, 1ABEL All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
