'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useRef } from 'react'

export default function Arc2Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const arcNumberScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const arcNumberOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.02])

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
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
          <span className="text-[30vw] font-bold leading-none tracking-tighter">
            02
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
            <span className="text-xs tracking-[0.3em] uppercase text-gray-600 font-light">
              Arc 2 Collection
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
              Shadow
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-12"
            />
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Born from darkness. Heavy textures, commanding silhouettes,
              and the weight of midnight.
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-loose max-w-2xl mx-auto">
              For those who move through the world with quiet intensity. This collection
              embodies raw energy and atmospheric depth—pieces designed for individuals
              who understand that presence doesn't require volume.
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
              <span className="text-xs tracking-[0.2em] uppercase text-gray-600">
                Explore Collection
              </span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-gray-600 to-transparent mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Color Palette Section */}
      <section className="py-32 px-4 md:px-8 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-8">
                The Shadow Palette
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-400 max-w-3xl mx-auto">
                Five colors. Each a different shade of darkness.
                Each piece in the collection exists across this spectrum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { name: 'VOID', hex: '#0a0a0a', desc: 'Pure black intensity. The foundation.' },
                { name: 'STEEL', hex: '#3a3a3a', desc: 'Dark grey sophistication. The bridge.' },
                { name: 'BLOOD', hex: '#4a1a1a', desc: 'Deep burgundy. Quiet power.' },
                { name: 'MOSS', hex: '#1a2a1a', desc: 'Forest green. Earth connection.' },
                { name: 'EARTH', hex: '#2a1a0a', desc: 'Dark brown. Foundation patina.' }
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
                    className="aspect-square mb-4 border border-white/10 relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  </motion.div>
                  <h3 className="text-sm font-bold tracking-wider mb-2 uppercase">
                    {color.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {color.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-8">
              <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Every base product is available in all five colorways.
                Mix them. Layer them. Build your own shadow.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-32 px-4 md:px-8 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-8">
                The Shadow Philosophy
              </h2>
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-400">
                "In darkness, we find clarity. In weight, we find strength.
                In silence, we find power."
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mt-20">
              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3 uppercase">Heavy Construction</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Weighted fabrics that anchor you. Each piece carries substance,
                  both physical and metaphorical.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3 uppercase">Five Shadow Colors</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  From pure VOID black to earthy MOSS green. Every piece exists
                  across the complete spectrum of shadow.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3 uppercase">Commanding Presence</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Silhouettes designed to dominate space. You don't blend in—you
                  define the room.
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
            <h2 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">
              Browse by Category
            </h2>
            <p className="text-sm text-gray-500">
              Each piece meticulously crafted to embody the Shadow aesthetic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Tops',
                href: '/arc-2/tops',
                description: 'Hoodies, thermals, and outerwear',
                delay: 0
              },
              {
                title: 'Bottoms',
                href: '/arc-2/bottoms',
                description: 'Denim, cargo, and sweats',
                delay: 0.1
              },
              {
                title: 'Accessories',
                href: '/arc-2/accessories',
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
                  <div className="relative overflow-hidden mb-6 rounded-premium-xl">
                    {/* Image placeholder with hover effect */}
                    <motion.div
                      className="aspect-[3/4] rounded-premium-xl bg-gradient-to-br from-gray-900 to-black border border-white/5 relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700" />

                      {/* Category text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-6xl md:text-7xl font-bold tracking-tighter opacity-10 group-hover:opacity-20 transition-opacity duration-700 uppercase"
                          whileHover={{ scale: 1.05 }}
                        >
                          {category.title}
                        </motion.span>
                      </div>

                      {/* Grid overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Category info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold tracking-tight uppercase mb-2 group-hover:text-gray-300 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-400 transition-colors"
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
      <section className="py-32 px-4 md:px-8 border-t border-white/5 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-8">
            The Sound Behind The Shadow
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Every Arc begins with sound. This track embodies the frequency that shaped
            the Shadow collection: heavy, atmospheric, commanding.
          </p>
          <a
            href="https://spotify.link/w2kUeaFYDXb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-sm tracking-wide"
          >
            <span className="text-gray-400 hover:text-gray-300 transition-colors">
              Listen on Spotify →
            </span>
          </a>
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
