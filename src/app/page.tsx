'use client'

import { GeniusHero } from '@/components/GeniusHero'
import { GeniusFeaturesSection } from '@/components/GeniusCard'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { TrendingUp, Award, Users, Mail, MessageCircle, Star, Sparkles, Music, Globe, Heart, ArrowRight } from 'lucide-react'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import ShimmerButton from '@/components/magicui/shimmer-button'
import NumberTicker from '@/components/magicui/number-ticker'
import WordRotate from '@/components/magicui/word-rotate'
import BlurIn from '@/components/magicui/blur-in'

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

      {/* A Beautiful Heaven for Artists Section */}
      <section className="bg-black py-16 px-8 relative overflow-hidden">
        {/* Magical background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-red-600/5 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <AnimatedGradientText className="mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              The Future of Music Labels
              <Sparkles className="w-4 h-4 ml-2" />
            </AnimatedGradientText>
            
            <BlurIn
              word="A BEAUTIFUL HEAVEN FOR ARTISTS"
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-red-200 to-red-600 bg-clip-text text-transparent"
              duration={1}
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Where <WordRotate words={["RnB artists", "trap producers", "rap legends", "music creators"]} className="text-red-600 font-bold" /> 
              find their path to global stardom through modern marketing and genuine partnerships
            </motion.p>
          </motion.div>
          
          {/* Why Artists Choose 1ABEL */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Reach",
                description: "From bedroom to billboard in weeks, not years",
                stat: "150M+",
                statLabel: "Total Streams"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Modern Marketing",
                description: "TikTok viral strategies that actually work",
                stat: "500M+",
                statLabel: "Social Views"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Fair Deals",
                description: "Keep 80% royalties & own your masters",
                stat: "80%",
                statLabel: "Artist Share"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Real Partnership",
                description: "We're invested in your success, not just profit",
                stat: "34",
                statLabel: "Happy Artists"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-600/50 transition-all duration-300">
                  <div className="text-red-600 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-3xl font-bold text-red-600">
                      {item.stat.includes('M') || item.stat.includes('%') ? item.stat : <NumberTicker value={parseInt(item.stat)} />}
                    </div>
                    <div className="text-sm text-gray-500">{item.statLabel}</div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  <div className="font-semibold">1ABEL Artist</div>
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
                  <div className="font-semibold">1ABEL Artist</div>
                  <div className="text-sm text-gray-400">Trap Artist</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Artists Choose 1ABEL */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-16 px-8">
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

      {/* The Revolution Starts Here */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-16 px-8 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-600/30 rounded-full"
              initial={{ 
                x: Math.random() * 1200,
                y: Math.random() * 800
              }}
              animate={{
                x: Math.random() * 1200,
                y: Math.random() * 800
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              THE <span className="text-red-600">REVOLUTION</span> STARTS HERE
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join artists who refused to accept the old way. Who knew their music deserved 
              better than radio pitches and 360 deals. Who chose modern marketing over ancient methods.
            </p>
          </motion.div>
          
          {/* Artist testimonials with magical cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "1ABEL turned my bedroom recordings into 50M streams in 6 months. They understand algorithms like no traditional label.",
                artist: "1ABEL Artist",
                genre: "R&B Artist",
                achievement: "From 0 to 100K monthly listeners"
              },
              {
                quote: "They got me brand deals worth $500K because they actually have connections outside music. This is the future.",
                artist: "1ABEL Artist",
                genre: "Trap Producer",
                achievement: "Major brand partnerships"
              },
              {
                quote: "No 360 deal BS. I keep my masters, get 80% royalties, and they still promote harder than any major label.",
                artist: "1ABEL Artist",
                genre: "Rap Artist",
                achievement: "Independent chart success"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.artist}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gray-900/90 backdrop-blur p-8 rounded-2xl border border-gray-700 hover:border-red-600/50 transition-all duration-300">
                  <div className="text-red-600 text-6xl mb-4">"</div>
                  <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{testimonial.artist}</div>
                      <div className="text-sm text-gray-400">{testimonial.genre}</div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-sm text-red-600">{testimonial.achievement}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join 1ABEL CTA Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Magical aurora background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent animate-pulse" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <AnimatedGradientText className="mb-8">
              <Music className="w-4 h-4 mr-2" />
              Limited Spots Available
              <Music className="w-4 h-4 ml-2" />
            </AnimatedGradientText>
            
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
            <ShimmerButton className="shadow-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <a 
                href="mailto:anyro@1abel.com" 
                className="inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white hover:text-white focus:text-white"
              >
                <Mail className="w-6 h-6 mr-3 text-white" />
                anyro@1abel.com
                <ArrowRight className="w-5 h-5 ml-3 text-white" />
              </a>
            </ShimmerButton>
            
            <motion.a 
              href="https://twitter.com/anyrxo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group border-2 border-white text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:border-red-600 px-12 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:shadow-2xl hover:shadow-red-600/20"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              @anyrxo
            </motion.a>
          </motion.div>
          
          {/* Final stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: 150, suffix: "M+", label: "Streams" },
              { value: 34, label: "Artists" },
              { value: 2, suffix: "M+", label: "$Brand Deals" },
              { value: 80, suffix: "%", label: "Royalties" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  <NumberTicker value={stat.value} />{stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
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
          {/* Join the revolution banner */}
          <div className="text-center mb-12 pb-12 border-b border-gray-800">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-red-600">Revolution</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Be part of the movement that's changing how music careers are built. 
              Modern marketing. Fair deals. Real success.
            </p>
          </div>
          
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