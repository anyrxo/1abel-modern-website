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

      {/* Enhanced What We Do Section */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
        style={{ y: backgroundY }}
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
          {/* Moving background particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-500/20 rounded-full"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 20,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
          >
            WHAT WE DO DIFFERENTLY
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              {[
                {
                  title: "Modern Marketing",
                  description: "While other labels pitch radio DJs, we create viral TikTok moments. We understand how music actually gets discovered in 2025."
                },
                {
                  title: "Fast Releases", 
                  description: "2-week release cycles, not 2-year contracts. Strike while the iron is hot and capitalize on momentum when it matters."
                },
                {
                  title: "Technology First",
                  description: "Data-driven decisions, algorithm optimization, and cutting-edge tools give our artists unfair advantages."
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-red-500 pl-8 hover:border-red-400 transition-colors duration-300 group"
                >
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced metrics card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 hover:border-red-500/50 transition-all duration-300 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">By The Numbers</h3>
                <div className="space-y-8">
                  {[
                    { label: "Total Streams", value: "50M+", width: "85%" },
                    { label: "TikTok Views", value: "500M+", width: "100%" },
                    { label: "Release Time", value: "2 Weeks", width: "20%" },
                    { label: "Success Rate", value: "95%", width: "95%" }
                  ].map((metric, index) => (
                    <div key={metric.label} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-gray-400 text-sm uppercase tracking-wider">
                          {metric.label}
                        </span>
                        <span className="text-3xl font-bold text-white">
                          {metric.value}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: metric.width }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-red-600 to-red-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Contact Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight"
          >
            LET'S WORK
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
          >
            TOGETHER
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to revolutionize your music career? We're always looking for exceptional talent 
            and innovative partnerships.
          </motion.p>
          
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