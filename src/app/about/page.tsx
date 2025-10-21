'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-8 uppercase">
              About 1ABEL
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Where sound becomes style. Premium streetwear inspired by music, designed for those who live at the intersection of culture and creativity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-tight">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                1ABEL was born from a simple belief: clothing should be more than fabric. It should embody an energy, a mood, a moment in time.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Each Arc represents a complete collection inspired by specific sounds and atmospheres. Arc 2 — Shadow draws from dark, heavy textures and midnight palettes. Arc 3 — Light embodies ethereal minimalism with luminous tones.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We don't follow trends. We create timeless pieces that speak to individuals who understand that style is a form of self-expression.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-black border-2 border-black flex items-center justify-center">
                <span className="text-white text-6xl md:text-8xl font-bold tracking-tighter opacity-20">
                  1ABEL
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 uppercase tracking-tight"
          >
            Our Philosophy
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Premium materials and meticulous craftsmanship in every piece. We don't compromise on quality."
              },
              {
                title: "Minimalist Design",
                description: "Clean lines, purposeful details, and timeless aesthetics. Less is more, always."
              },
              {
                title: "Music-Inspired",
                description: "Each collection is born from sound. Music sets the mood, we translate it into style."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-black p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Arc System */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 uppercase tracking-tight"
          >
            The Arc System
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-black text-white p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Arc 2 — Shadow</h3>
                <div className="h-px w-24 bg-gray-600 mb-6" />
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Born from darkness. Heavy textures, midnight palettes, and commanding presence.
                  This collection embodies raw energy and atmospheric depth.
                </p>
                <Link href="/arc-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white hover:bg-white hover:text-black transition-colors px-6 py-3 text-sm uppercase tracking-wider font-medium"
                  >
                    Explore Arc 2
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border-2 border-black text-black p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Arc 3 — Light</h3>
                <div className="h-px w-24 bg-gray-300 mb-6" />
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Clarity in form. Ethereal minimalism with luminous tones and refined aesthetics.
                  This collection speaks softly but powerfully.
                </p>
                <Link href="/arc-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-black text-black hover:bg-black hover:text-white transition-colors px-6 py-3 text-sm uppercase tracking-wider font-medium"
                  >
                    Explore Arc 3
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-tight">
              Our Commitment
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Every piece is crafted with attention to detail and a commitment to quality.
              We believe in slow fashion — creating timeless pieces that last, not trends that fade.
            </p>
            <p className="text-gray-600 leading-relaxed">
              1ABEL is for those who appreciate the intersection of music, art, and fashion.
              For those who understand that what you wear is an extension of who you are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/arc-2" className="hover:text-black">Arc 2 — Shadow</Link></li>
                <li><Link href="/arc-3" className="hover:text-black">Arc 3 — Light</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-black">Shipping</Link></li>
                <li><Link href="/refund" className="hover:text-black">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-black">About</Link></li>
                <li><Link href="/terms" className="hover:text-black">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-black">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram</a></li>
                <li><a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black">Twitter</a></li>
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
