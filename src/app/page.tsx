'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div ref={containerRef} className="bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <motion.div
          style={{ opacity, scale }}
          className="text-center px-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
          >
            1ABEL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 tracking-wide uppercase mb-12"
          >
            Premium Streetwear
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              href="/tops"
              className="inline-flex items-center px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-wider uppercase font-medium"
            >
              Shop Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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

      {/* Featured Collections */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center"
          >
            Collections
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "TOPS",
                description: "Essential pieces for every wardrobe",
                href: "/tops",
                image: "/placeholder-tops.jpg"
              },
              {
                title: "BOTTOMS",
                description: "Comfort meets style",
                href: "/bottoms",
                image: "/placeholder-bottoms.jpg"
              },
              {
                title: "ACCESSORIES",
                description: "Complete your look",
                href: "/accessories",
                image: "/placeholder-accessories.jpg"
              }
            ].map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden"
              >
                <Link href={collection.href}>
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 bg-white"
                      initial={{ y: 0 }}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold tracking-tight mb-2">{collection.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{collection.description}</p>
                      <div className="flex items-center text-sm font-medium">
                        Shop Collection
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Minimalist. Timeless. Bold.
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12">
              1ABEL represents a new era of streetwear. We believe in simplicity, quality, and design that stands the test of time. Every piece is carefully crafted to become a staple in your wardrobe.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase font-medium"
            >
              Our Story
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-8 border-t border-black">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-600 mb-8">
              Be the first to know about new releases and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">1ABEL</h3>
              <p className="text-gray-400 text-sm">
                Premium streetwear for the modern individual.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wider uppercase">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tops" className="text-gray-400 hover:text-white transition-colors">Tops</Link></li>
                <li><Link href="/bottoms" className="text-gray-400 hover:text-white transition-colors">Bottoms</Link></li>
                <li><Link href="/accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wider uppercase">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wider uppercase">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 1ABEL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
