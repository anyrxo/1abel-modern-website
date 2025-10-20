'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function HomePage() {
  return (
    <div className="bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl"
        >
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8">
            1ABEL
          </h1>
          <p className="text-lg md:text-xl text-gray-600 tracking-wide mb-16 max-w-2xl mx-auto">
            Where sound becomes style. Each Arc is a complete collection inspired by music,
            designed to embody a distinct energy.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs tracking-widest uppercase text-gray-400 mb-8"
          >
            Explore Collections
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-px h-16 bg-black/20 relative">
            <motion.div
              className="absolute top-0 left-0 w-full h-8 bg-black"
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Arc Collections - Split Screen */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* ARC 2 - SHADOW (Black) */}
        <Link
          href="/arc-2"
          className="relative flex-1 group overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-screen bg-black flex items-center justify-center"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700 z-10" />

            {/* Content */}
            <div className="relative z-20 text-center px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-8xl md:text-9xl font-bold tracking-tighter text-white mb-4">
                  02
                </h2>
                <div className="h-px w-24 bg-gray-600 mx-auto mb-6" />
                <p className="text-2xl md:text-3xl text-gray-400 tracking-widest uppercase mb-2">
                  Shadow
                </p>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
                  Born from darkness. Heavy textures, midnight palettes, and commanding presence.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block text-xs tracking-wider uppercase text-white border-b border-white pb-1"
                >
                  Explore Arc 2 →
                </motion.div>
              </motion.div>
            </div>

            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <span className="text-[20vw] font-bold tracking-tighter text-white">
                SHADOW
              </span>
            </div>
          </motion.div>
        </Link>

        {/* ARC 3 - LIGHT (White) */}
        <Link
          href="/arc-3"
          className="relative flex-1 group overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-screen bg-white flex items-center justify-center border-l border-gray-200"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700 z-10" />

            {/* Content */}
            <div className="relative z-20 text-center px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-8xl md:text-9xl font-bold tracking-tighter text-black mb-4">
                  03
                </h2>
                <div className="h-px w-24 bg-gray-300 mx-auto mb-6" />
                <p className="text-2xl md:text-3xl text-gray-600 tracking-widest uppercase mb-2">
                  Light
                </p>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
                  Clarity in form. Ethereal minimalism with luminous tones and refined aesthetics.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block text-xs tracking-wider uppercase text-black border-b border-black pb-1"
                >
                  Explore Arc 3 →
                </motion.div>
              </motion.div>
            </div>

            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <span className="text-[20vw] font-bold tracking-tighter text-black">
                LIGHT
              </span>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">1ABEL</h3>
              <p className="text-sm text-gray-600">
                Premium streetwear collections inspired by sound.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-4 tracking-wider uppercase">Collections</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/arc-2" className="hover:underline">Arc 2 — Shadow</Link></li>
                <li><Link href="/arc-3" className="hover:underline">Arc 3 — Light</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-4 tracking-wider uppercase">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
                <li><Link href="/refund" className="hover:underline">Refund Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-4 tracking-wider uppercase">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
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
