'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Download, Mail, ExternalLink } from 'lucide-react'

export default function PressPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="h-[1px] w-32 bg-black mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Resources for journalists, bloggers, and content creators covering 1ABEL.
            </p>
          </motion.div>

          {/* Quick Facts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 p-8 bg-gray-50 border border-black/5"
          >
            <h2 className="text-2xl font-bold mb-6">About 1ABEL</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>What:</strong> Music-inspired minimalist fashion brand</p>
              <p><strong>Founded:</strong> 2024</p>
              <p><strong>Founder:</strong> Anyro (@anyrxo)</p>
              <p><strong>Tagline:</strong> Where Sound Becomes Style</p>
              <p><strong>Philosophy:</strong> Clothing that works like music—effortless mood shifts without thinking</p>
              <p><strong>Collections:</strong> Arc 2 Shadow (dark minimalism) & Arc 3 Light (bright minimalism)</p>
              <p><strong>Unique Angle:</strong> Only fashion brand with a music-based color philosophy and dual-arc system</p>
            </div>
          </motion.section>

          {/* Brand Story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">The Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                1ABEL was born from a simple realization: <strong>clothing should work like music</strong>. Just as you switch playlists to match your mood, you should be able to switch your wardrobe without thinking.
              </p>
              <p>
                Founder Anyro, a multi-business entrepreneur juggling multiple ventures, was tired of decision fatigue. Every morning meant wasting mental energy on "what should I wear?" The solution? <strong>A two-frequency wardrobe system.</strong>
              </p>
              <p>
                Arc 2 Shadow (VOID, STEEL, BLOOD, MOSS, EARTH) for deep work and intensity. Arc 3 Light (CLOUD, SAKURA, MIST, SAND, LILAC) for clarity and openness. Every piece in an arc pairs perfectly with every other piece. Zero thought required.
              </p>
              <p>
                What started as personal problem-solving became a brand for the 10% who move too fast to overthink their wardrobe. Musicians, entrepreneurs, creatives—people who need clothing that just works.
              </p>
            </div>
          </motion.section>

          {/* Download Assets */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Brand Assets</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-black/10 hover:border-black/30 transition-colors">
                <Download className="w-6 h-6 mb-4" />
                <h3 className="font-bold mb-2">Logo Pack</h3>
                <p className="text-sm text-gray-600 mb-4">PNG, SVG, Black/White versions</p>
                <button className="text-xs tracking-wider uppercase font-medium underline">Download ZIP</button>
              </div>
              <div className="p-6 border border-black/10 hover:border-black/30 transition-colors">
                <Download className="w-6 h-6 mb-4" />
                <h3 className="font-bold mb-2">Product Images</h3>
                <p className="text-sm text-gray-600 mb-4">High-res lifestyle & product shots</p>
                <button className="text-xs tracking-wider uppercase font-medium underline">Download ZIP</button>
              </div>
              <div className="p-6 border border-black/10 hover:border-black/30 transition-colors">
                <Download className="w-6 h-6 mb-4" />
                <h3 className="font-bold mb-2">Founder Photos</h3>
                <p className="text-sm text-gray-600 mb-4">Professional headshots of Anyro</p>
                <button className="text-xs tracking-wider uppercase font-medium underline">Download ZIP</button>
              </div>
              <div className="p-6 border border-black/10 hover:border-black/30 transition-colors">
                <Download className="w-6 h-6 mb-4" />
                <h3 className="font-bold mb-2">Brand Guidelines</h3>
                <p className="text-sm text-gray-600 mb-4">Colors, fonts, usage rules (PDF)</p>
                <button className="text-xs tracking-wider uppercase font-medium underline">Download PDF</button>
              </div>
            </div>
          </motion.section>

          {/* Key Stats */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">2</div>
                <div className="text-sm text-gray-600">Core Collections</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10</div>
                <div className="text-sm text-gray-600">Color Frequencies</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">68+</div>
                <div className="text-sm text-gray-600">Published Articles</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">600</div>
                <div className="text-sm text-gray-600">Max GSM Fabric</div>
              </div>
            </div>
          </motion.section>

          {/* Press Mentions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Featured In</h2>
            <div className="space-y-4">
              <div className="p-6 border border-black/10">
                <p className="text-sm text-gray-500 mb-2">Coming Soon</p>
                <p className="text-gray-700">
                  Press mentions will appear here. Email <a href="mailto:anyro@1abel.com" className="underline">anyro@1abel.com</a> for coverage opportunities.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Interview Anyro */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Interview Requests</h2>
            <div className="p-8 bg-black text-white">
              <p className="mb-6 leading-relaxed">
                Anyro is available for podcast interviews, written Q&As, and editorial features on topics including:
              </p>
              <ul className="space-y-2 mb-8">
                <li>• Music × Fashion intersection</li>
                <li>• Minimalist wardrobe philosophy</li>
                <li>• Decision fatigue & cognitive science</li>
                <li>• Building a fashion brand as a solo founder</li>
                <li>• Sustainable fashion & slow fashion movement</li>
                <li>• Entrepreneurship & multi-business juggling</li>
              </ul>
              <a
                href="mailto:anyro@1abel.com?subject=Interview Request: 1ABEL"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Request Interview
              </a>
            </div>
          </motion.section>

          {/* Quick Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Quick Links</h2>
            <div className="space-y-3">
              <Link href="/about" className="flex items-center justify-between p-4 border border-black/10 hover:border-black/30 transition-colors group">
                <span>Full Brand Story</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/blog" className="flex items-center justify-between p-4 border border-black/10 hover:border-black/30 transition-colors group">
                <span>1ABEL Blog (68+ Articles)</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a href="https://instagram.com/anyrxo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-black/10 hover:border-black/30 transition-colors group">
                <span>Founder Instagram (@anyrxo)</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="p-8 border-t border-black">
              <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
              <p className="text-gray-700 mb-4">
                For all press inquiries, interview requests, and media partnerships:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:anyro@1abel.com" className="underline">anyro@1abel.com</a></p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
                <p><strong>Best For:</strong> Podcasts, written features, collaborations, event coverage</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

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
                  <Link href="/blog" className="hover:text-black transition-colors inline-block">Blog</Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-black transition-colors inline-block">Press</Link>
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
