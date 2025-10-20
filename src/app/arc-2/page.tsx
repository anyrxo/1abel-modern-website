'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Arc2Page() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24 pb-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6">
              ARC 2
            </h1>
            <p className="text-2xl md:text-3xl font-light tracking-wide text-gray-400 mb-4">
              SHADOW
            </p>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Born from darkness. Each piece in this collection channels the raw energy
              and atmospheric depth of the sound that inspired it. Heavy textures,
              midnight palettes, and silhouettes that command presence.
            </p>
          </motion.div>

          {/* Spotify Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="max-w-3xl mx-auto">
              <p className="text-center text-xs tracking-widest uppercase text-gray-400 mb-6">
                The Sound Behind The Collection
              </p>
              <div className="aspect-[16/9] md:aspect-[21/9] w-full">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/track/4jv6eilCCXb?utm_source=generator"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Collection Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <Link href="/arc-2/tops">
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-900 mb-4 relative overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold tracking-tighter opacity-20 group-hover:opacity-30 transition-opacity">
                      TOPS
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-wide uppercase text-center">Tops</h3>
                <p className="text-sm text-gray-500 text-center mt-2">Explore Collection →</p>
              </div>
            </Link>

            <Link href="/arc-2/bottoms">
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-900 mb-4 relative overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold tracking-tighter opacity-20 group-hover:opacity-30 transition-opacity">
                      BOTTOMS
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-wide uppercase text-center">Bottoms</h3>
                <p className="text-sm text-gray-500 text-center mt-2">Explore Collection →</p>
              </div>
            </Link>

            <Link href="/arc-2/accessories">
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-900 mb-4 relative overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold tracking-tighter opacity-20 group-hover:opacity-30 transition-opacity">
                      ACCESS
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-wide uppercase text-center">Accessories</h3>
                <p className="text-sm text-gray-500 text-center mt-2">Explore Collection →</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
