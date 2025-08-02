'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Award, Users, Mail, MessageCircle } from 'lucide-react'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 2000], [0, 1])
  
  // Logo animations
  const logoScale = useTransform(scrollProgress, [0, 0.1], [1, 0.8])
  const logoOpacity = useTransform(scrollProgress, [0, 0.2], [1, 0])
  
  // Content animations
  const contentOpacity = useTransform(scrollProgress, [0.1, 0.3], [0, 1])

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold cursor-pointer">
              <span className="text-red-600">1</span><span className="text-white">ABEL</span>
            </motion.div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Blog & Insights
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Contact
            </Link>
            <a 
              href="mailto:contact@1abel.com" 
              className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Logo Section */}
      <section className="min-h-screen flex items-center justify-center relative">        
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="text-[40vh] font-bold leading-none relative">
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                    '0 0 120px rgba(220, 38, 38, 0.8), 0 0 240px rgba(220, 38, 38, 0.5)',
                    '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-red-600"
              >
                1
              </motion.span>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute top-[20%] right-[-10%] flex flex-col text-[8vh] font-black leading-[1.1] tracking-wide text-white"
            >
              {['A', 'B', 'E', 'L'].map((letter, index) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 2 + index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="mb-4"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-center"
          >
            <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The world's most advanced music label for RnB, trap, and rap artists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:contact@1abel.com" 
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
              <a 
                href="https://twitter.com/anyrxo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                @anyrxo
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Content appears as you scroll */}
      <motion.div style={{ opacity: contentOpacity }} className="relative z-10">
        
        {/* Main Content Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <motion.h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
              BUILDING THE FUTURE
            </motion.h1>
            <motion.h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
              OF MUSIC
            </motion.h2>
            <motion.p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              While other labels are stuck in 2015, we're revolutionizing how artists succeed in the modern music industry. 
              We speak TikTok, not Triple J. We build viral moments, not radio campaigns.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
                <TrendingUp className="w-12 h-12 text-white mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4 text-white">Algorithm Mastery</h3>
                <p className="text-gray-300">
                  TikTok, Instagram, YouTube - we understand the algorithms that actually matter in 2025
                </p>
              </div>
              
              <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
                <Award className="w-12 h-12 text-white mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4 text-white">Artist First</h3>
                <p className="text-gray-300">
                  Fair deals, no 360 contracts, you keep your masters. We're partners, not owners
                </p>
              </div>
              
              <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
                <Users className="w-12 h-12 text-white mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4 text-white">Real Results</h3>
                <p className="text-gray-300">
                  50M+ streams, viral TikToks, actual career growth - not just empty promises
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="max-w-6xl mx-auto px-8">
            <motion.h2 className="text-5xl font-bold text-center mb-16 text-white">
              WHAT WE DO DIFFERENTLY
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="border-l-4 border-white pl-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Modern Marketing</h3>
                  <p className="text-gray-300">
                    While other labels pitch radio DJs, we create viral TikTok moments. 
                    We understand how music actually gets discovered in 2025.
                  </p>
                </div>
                
                <div className="border-l-4 border-white pl-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Fast Releases</h3>
                  <p className="text-gray-300">
                    2-week release cycles, not 2-year contracts. Strike while the iron is hot 
                    and capitalize on momentum when it matters.
                  </p>
                </div>
                
                <div className="border-l-4 border-white pl-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Technology First</h3>
                  <p className="text-gray-300">
                    Data-driven decisions, algorithm optimization, and cutting-edge tools 
                    give our artists unfair advantages.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-3xl font-bold text-white mb-6">By The Numbers</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Streams</span>
                    <span className="text-2xl font-bold text-white">50M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">TikTok Views</span>
                    <span className="text-2xl font-bold text-white">500M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Release Time</span>
                    <span className="text-2xl font-bold text-white">2 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-2xl font-bold text-white">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex items-center justify-center bg-black">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.h2 className="text-6xl md:text-8xl font-bold mb-8 text-white">
              LET'S WORK
            </motion.h2>
            <motion.h3 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
              TOGETHER
            </motion.h3>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to revolutionize your music career? We're always looking for exceptional talent 
              and innovative partnerships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="mailto:contact@1abel.com" 
                className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-3" />
                contact@1abel.com
              </a>
              <a 
                href="https://twitter.com/anyrxo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                @anyrxo
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h4 className="text-xl font-bold text-white mb-4">For Artists</h4>
                <p className="text-gray-300">
                  Send us your music, vision, and goals. We'll discuss how 1ABEL can accelerate your career.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h4 className="text-xl font-bold text-white mb-4">For Partners</h4>
                <p className="text-gray-300">
                  Brands, venues, distributors, and industry professionals - let's explore collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <span className="text-red-600">1</span><span className="text-white">ABEL</span>
                </h3>
                <p className="text-gray-300 mb-4">
                  The world's most advanced music label for RnB, trap, and rap artists.
                </p>
                <div className="space-y-2 text-gray-300">
                  <p>📧 contact@1abel.com</p>
                  <p>🐦 @anyrxo</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
                <div className="space-y-4">
                  <a 
                    href="mailto:contact@1abel.com" 
                    className="block bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-center font-medium transition-colors"
                  >
                    Email Us
                  </a>
                  <a 
                    href="https://twitter.com/anyrxo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded text-center font-medium transition-colors"
                  >
                    @anyrxo
                  </a>
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

      </motion.div>

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-white text-xs opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </div>
  )
}