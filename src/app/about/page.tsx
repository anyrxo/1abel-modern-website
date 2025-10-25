'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-5xl px-4 md:px-8 relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
              About
            </p>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-[-0.02em] mb-12 leading-none">
              1ABEL
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-12"
            />

            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              Where sound becomes style. Premium minimalist essentials for those who live
              at the intersection of music, art, and culture.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-gray-400">
                Our Story
              </span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-4 md:px-8 relative border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
                Origin
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Designed and envisioned by Anyro
              </h3>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  It started with a frustration. The constant mental drain of figuring out what to wear
                  every morning. The endless combinations that never quite felt right. The realization
                  that modern life demanded a wardrobe that just <em>worked</em>—pieces that could be
                  thrown together without thought, yet always looked intentional.
                </p>
                <p>
                  Anyro (<a href="https://instagram.com/anyrxo" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">@anyrxo</a>)
                  was deep in the music world—producing, curating playlists, living between studio sessions
                  and late-night creative bursts. Music wasn't just sound; it was a mood, a frequency, an
                  entire atmosphere that shifted throughout the day. Dark, introspective tracks for focused
                  work. Bright, energetic beats when clarity was needed. Each song carried its own energy,
                  its own identity.
                </p>
                <p>
                  One night, staring at a wardrobe full of mismatched pieces that required constant curation,
                  the concept crystallized: <strong>What if clothing worked like music?</strong> What if you
                  could build a wardrobe of essential "tracks" that always paired perfectly—dark pieces that
                  carried weight and presence, light pieces that brought balance and clarity. A system where
                  any combination felt cohesive, where getting dressed was as effortless as hitting play.
                </p>
                <p>
                  The name came from this duality. <strong>1ABEL</strong>—one label, one unified system.
                  Not scattered collections chasing trends, but a singular vision expressed through carefully
                  crafted archetypes. The "1" representing unity and essentialism. "ABEL" suggesting capability
                  and empowerment—you're <em>able</em> to move through your day without friction, without noise,
                  just pure intention materialized in fabric.
                </p>
                <p>
                  This is clothing for those who understand that what you wear should enhance your life, not
                  complicate it. For the creatives, the builders, the ones moving too fast to overthink their
                  wardrobe but too intentional to wear just anything. Where sound becomes style. Where every
                  piece is a frequency you can wear.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-black to-gray-800 border border-black/10 flex items-center justify-center relative overflow-hidden">
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />
                <span className="text-white text-7xl md:text-9xl font-bold tracking-tighter opacity-10 relative z-10">
                  1ABEL
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-4 md:px-8 bg-black text-white relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-8">
              Philosophy
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Slow fashion.<br />Timeless pieces.
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We don't chase trends. We create archetypes. Pieces designed to transcend
              seasons and remain relevant as your personal style evolves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Limited Production",
                description: "Each drop is intentionally small. We prioritize quality over quantity, craftsmanship over speed. When it's gone, it's gone."
              },
              {
                title: "Music-Driven Design",
                description: "Every Arc begins with sound. A track, an atmosphere, a frequency. Music guides the aesthetic, the mood, the energy of each collection."
              },
              {
                title: "Community, Not Consumers",
                description: "You're not just buying clothes. You're joining a movement of individuals who value artistry, intention, and authentic self-expression."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/10 p-8"
              >
                <h4 className="text-sm font-semibold tracking-wide mb-4 uppercase">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Arc System */}
      <section className="py-32 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
              The System
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Two frequencies.<br />
              <span className="text-gray-500">Infinite expression.</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Each Arc represents a complete collection—a world unto itself. Dark and light.
              Yin and yang. The duality of self, materialized in fabric and form.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Arc 2 - Shadow */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/arc-2" className="group block">
                <div className="bg-black text-white p-12 border border-black/10 hover:border-black/20 transition-all duration-500 relative overflow-hidden">
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700" />

                  <div className="relative z-10">
                    <h4 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-6">
                      Arc 2
                    </h4>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
                      Shadow
                    </h3>
                    <div className="h-[1px] w-24 bg-gray-700 mb-8" />
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Born from darkness. Heavy textures, midnight palettes, and commanding
                      presence. For those who move through the world with quiet intensity.
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-400 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Explore Arc 2
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Arc 3 - Light */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/arc-3" className="group block">
                <div className="bg-white text-black p-12 border border-black/10 hover:border-black/20 transition-all duration-500 relative overflow-hidden">
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />

                  <div className="relative z-10">
                    <h4 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
                      Arc 3
                    </h4>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
                      Light
                    </h3>
                    <div className="h-[1px] w-24 bg-gray-300 mb-8" />
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Clarity in form. Ethereal minimalism with luminous tones and refined
                      aesthetics. For those who seek balance in a chaotic world.
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-600 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Explore Arc 3
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-32 px-4 md:px-8 bg-black text-white relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-8">
            Our Commitment
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Quality over quantity.<br />
            Intention over impulse.
          </h3>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Every piece is crafted with meticulous attention to detail. We believe in
            slow fashion. Creating timeless pieces that last, not trends that fade.
          </p>
          <p className="text-gray-500 leading-relaxed">
            1ABEL is for those who appreciate the intersection of music, art, and fashion.
            For those who understand that what you wear is an extension of who you are.
          </p>
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
