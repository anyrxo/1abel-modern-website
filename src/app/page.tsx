'use client'

import { GeniusHero } from '@/components/GeniusHero'
import { GeniusFeaturesSection } from '@/components/GeniusCard'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { TrendingUp, Award, Users, Mail, MessageCircle } from 'lucide-react'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Background parallax for content sections
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Genius Hero Section - Full Interactive Experience */}
      <GeniusHero />

      {/* Genius Features Section with 3D Cards */}
      <GeniusFeaturesSection />

      {/* Artist Success Stories Section */}
      <section className="min-h-screen bg-black py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-center mb-20"
          >
            YOUR SUCCESS IS <span className="text-red-600">OUR MISSION</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-red-600 mb-4">150M+</div>
              <div className="text-xl text-gray-400">Total Streams</div>
              <div className="text-sm text-gray-500 mt-2">Across all platforms</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-red-600 mb-4">34</div>
              <div className="text-xl text-gray-400">Global Artists</div>
              <div className="text-sm text-gray-500 mt-2">And growing</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-red-600 mb-4">2.5M+</div>
              <div className="text-xl text-gray-400">Social Following</div>
              <div className="text-sm text-gray-500 mt-2">Combined reach</div>
            </motion.div>
          </div>

          {/* Success Story Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4">From 0 to 100K Monthly Listeners</h3>
              <p className="text-gray-400 mb-6">
                "1ABEL understood TikTok's algorithm better than any label I talked to. 
                They got my track viral in 3 weeks and now I'm touring internationally."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Jordan Rivers</div>
                  <div className="text-sm text-gray-400">R&B Artist</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4">Brand Deals Worth $500K+</h3>
              <p className="text-gray-400 mb-6">
                "Their connections from fashion and streaming helped me land deals I never 
                thought possible. This isn't just a label, it's a career accelerator."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Maya Chen</div>
                  <div className="text-sm text-gray-400">Trap Artist</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Artists Choose 1ABEL */}
      <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-center mb-20"
          >
            WHY ARTISTS CHOOSE <span className="text-red-600">1ABEL</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Social Media Mastery",
                description: "Our team has managed accounts for top streamers and models with millions of followers. We know what converts.",
                icon: "📱"
              },
              {
                title: "Industry Connections",
                description: "Direct relationships with playlist curators, brand managers, and influencers across multiple industries.",
                icon: "🤝"
              },
              {
                title: "Data-Driven Strategy",
                description: "Every decision backed by analytics. We test, measure, and scale what works for your unique sound.",
                icon: "📊"
              },
              {
                title: "Creative Freedom",
                description: "You keep 80% of royalties and maintain creative control. We're partners, not owners.",
                icon: "🎨"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join 1ABEL CTA Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight">
              READY TO GO
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              GLOBAL?
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 34 artists who chose modern marketing over outdated methods
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-400">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✓</span>
                <span>Keep 80% royalties</span>
              </div>
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✓</span>
                <span>Creative control</span>
              </div>
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✓</span>
                <span>Global reach</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <motion.a 
              href="mailto:anyro@1abel.com" 
              className="group relative bg-white text-black hover:bg-gray-100 px-12 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              anyro@1abel.com
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-white font-semibold"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-6 h-6 mr-3" />
                anyro@1abel.com
              </motion.span>
            </motion.a>
            
            <motion.a 
              href="https://twitter.com/anyrxo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group border-2 border-white text-white hover:bg-white hover:text-black px-12 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              @anyrxo
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-red-600">1</span><span className="text-white">ABEL</span>
              </h3>
              <p className="text-gray-300 mb-4">
                The world's most advanced music label for RnB, trap, and rap artists.
              </p>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  anyro@1abel.com
                </p>
                <p className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  @anyrxo
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-red-400 transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-red-400 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-red-400 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-red-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-red-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-red-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-4">
                <motion.a 
                  href="mailto:anyro@1abel.com" 
                  className="block bg-white text-black hover:bg-red-500 hover:text-white px-4 py-2 rounded text-center font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Email Us
                </motion.a>
                <motion.a 
                  href="https://twitter.com/anyrxo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded text-center font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  @anyrxo
                </motion.a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 1ABEL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}