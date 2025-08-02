'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { wrap } from '@motionone/utils'
import Link from 'next/link'
import ShimmerButton from '@/components/magicui/shimmer-button'
import AnimatedCard from '@/components/AnimatedCard'
import NumberTicker from '@/components/magicui/number-ticker'
import { Play, Users, TrendingUp, Award, Instagram, Music, Headphones, Mic } from 'lucide-react'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 4000], [0, 1])
  
  // Logo animations - quick transitions
  const logoScale = useTransform(scrollProgress, [0, 0.1, 0.2], [1, 1, 0])
  const logoOpacity = useTransform(scrollProgress, [0, 0.08, 0.2], [1, 1, 0])
  const labelOpacity = useTransform(scrollProgress, [0, 0.05, 0.18], [0, 1, 0])
  
  // Section animations - appear quickly one after another
  const heroOpacity = useTransform(scrollProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0])
  const statsOpacity = useTransform(scrollProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0])
  const servicesOpacity = useTransform(scrollProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0])
  const artistsOpacity = useTransform(scrollProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0])
  const ctaOpacity = useTransform(scrollProgress, [0.55, 0.65, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-red-600">
            1ABEL
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <Link href="/blog">
              <ShimmerButton
                className="bg-transparent border-red-600 text-red-400 hover:text-white px-6 py-2 text-sm"
                shimmerColor="#ef4444"
                background="rgba(0, 0, 0, 0.3)"
                borderRadius="8px"
              >
                Blog & Insights
              </ShimmerButton>
            </Link>
            <motion.button className="text-white/70 hover:text-white transition-colors text-sm">
              Artists
            </motion.button>
            <motion.button className="text-white/70 hover:text-white transition-colors text-sm">
              Services
            </motion.button>
            <ShimmerButton
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm"
              shimmerColor="#ef4444"
            >
              Submit Demo
            </ShimmerButton>
          </div>
        </div>
      </motion.nav>

      {/* Logo Section */}
      <section className="fixed inset-0 flex items-center justify-center">        
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[50vh] font-bold leading-none text-red-600 relative"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                  '0 0 120px rgba(220, 38, 38, 0.8), 0 0 240px rgba(220, 38, 38, 0.5)',
                  '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              1
            </motion.span>
          </motion.div>
          
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-[12%] left-[58%] flex flex-col text-[5vh] font-black leading-[1.1] tracking-wide text-white z-20 h-[38vh] justify-between items-center"
          >
            {['A', 'B', 'E', 'L'].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                className="cursor-pointer"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Shorter spacer */}
      <div className="h-[400vh]" />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          className="max-w-6xl mx-auto px-8 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            WHILE OTHER LABELS
          </motion.h1>
          <motion.h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            STILL PITCH RADIO DJs...
          </motion.h2>
          <motion.div className="text-center mb-8">
            <motion.p className="text-3xl md:text-5xl font-bold text-red-400 mb-4">
              WE BUILD VIRAL MOMENTS
            </motion.p>
            <motion.p className="text-xl text-gray-300 mb-8">
              Australia's most advanced RnB/trap/rap label • We speak TikTok, not Triple J
            </motion.p>
            <motion.p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto">
              <span className="line-through text-gray-600">360 deals that steal your publishing ❌</span><br/>
              <span className="line-through text-gray-600">Radio campaigns for songs nobody hears ❌</span><br/>
              <span className="line-through text-gray-600">Waiting 18 months for A&R approval ❌</span><br/><br/>
              <span className="text-red-400">✅ Algorithm optimization that actually works</span><br/>
              <span className="text-red-400">✅ TikTok campaigns that hit millions of views</span><br/>
              <span className="text-red-400">✅ Release your music in 2 weeks, not 2 years</span>
            </motion.p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ShimmerButton
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg"
              shimmerColor="#ef4444"
            >
              <Play className="w-5 h-5 mr-2" />
              Submit Your Demo
            </ShimmerButton>
            <ShimmerButton
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 text-lg"
              shimmerColor="#ffffff"
              background="rgba(0, 0, 0, 0.3)"
            >
              <Music className="w-5 h-5 mr-2" />
              Hear Our Artists
            </ShimmerButton>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900/20 to-black">
        <motion.div
          className="max-w-6xl mx-auto px-8"
          style={{ opacity: statsOpacity }}
        >
          <motion.h2 className="text-5xl font-bold text-center mb-16 text-white">
            THE NUMBERS DON'T LIE
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimatedCard hoverEffect="glow" glowColor="red" className="text-center p-8 bg-gray-900/50 rounded-xl">
              <NumberTicker value={50} className="text-6xl font-bold text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Million+ Streams</h3>
              <p className="text-gray-400">Combined artist catalog 2024</p>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="lift" className="text-center p-8 bg-gray-900/50 rounded-xl">
              <NumberTicker value={24} className="text-6xl font-bold text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Artists</h3>
              <p className="text-gray-400">Curated roster of talent</p>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="scale" className="text-center p-8 bg-gray-900/50 rounded-xl">
              <NumberTicker value={500} className="text-6xl font-bold text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Million+ Views</h3>
              <p className="text-gray-400">TikTok & YouTube Shorts</p>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="tilt" className="text-center p-8 bg-gray-900/50 rounded-xl">
              <NumberTicker value={2} className="text-6xl font-bold text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Week Releases</h3>
              <p className="text-gray-400">Average time to market</p>
            </AnimatedCard>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          className="max-w-7xl mx-auto px-8"
          style={{ opacity: servicesOpacity }}
        >
          <motion.h2 className="text-5xl font-bold text-center mb-8 text-white">
            WHY OTHER LABELS FAIL
          </motion.h2>
          <motion.p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            While they're stuck in 2015, we're building the future of music marketing
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard hoverEffect="glow" glowColor="red" className="p-8 bg-gray-900/50 rounded-xl">
              <TrendingUp className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Algorithm Mastery</h3>
              <div className="mb-6">
                <p className="text-red-200 font-semibold mb-2">❌ Old Labels:</p>
                <p className="text-gray-400 text-sm mb-4">"Let's pitch this to Triple J and hope for the best"</p>
                <p className="text-green-200 font-semibold mb-2">✅ 1ABEL:</p>
                <p className="text-gray-300 text-sm">TikTok algorithm optimization, Spotify playlist placement strategy, Instagram Reels viral formulas</p>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• 15-second hook optimization</li>
                <li>• Peak posting time analysis</li>
                <li>• Trending audio hijacking</li>
                <li>• Cross-platform content strategy</li>
              </ul>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="lift" className="p-8 bg-gray-900/50 rounded-xl">
              <Instagram className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Real Social Media</h3>
              <div className="mb-6">
                <p className="text-red-200 font-semibold mb-2">❌ Old Labels:</p>
                <p className="text-gray-400 text-sm mb-4">One Instagram post per week, radio interviews nobody watches</p>
                <p className="text-green-200 font-semibold mb-2">✅ 1ABEL:</p>
                <p className="text-gray-300 text-sm">Daily content creation, viral moment creation, influencer network access</p>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• 500M+ combined TikTok views</li>
                <li>• Viral moment engineering</li>
                <li>• Creator collaboration network</li>
                <li>• Real-time trend adaptation</li>
              </ul>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="scale" className="p-8 bg-gray-900/50 rounded-xl">
              <Award className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Artist First</h3>
              <div className="mb-6">
                <p className="text-red-200 font-semibold mb-2">❌ Old Labels:</p>
                <p className="text-gray-400 text-sm mb-4">360 deals, own your masters, take 80% of everything</p>
                <p className="text-green-200 font-semibold mb-2">✅ 1ABEL:</p>
                <p className="text-gray-300 text-sm">Fair splits, artist development, real career building</p>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• You keep your masters</li>
                <li>• Fair revenue splits</li>
                <li>• 2-week release cycles</li>
                <li>• No bullshit contracts</li>
              </ul>
            </AnimatedCard>
          </div>
        </motion.div>
      </section>

      {/* Featured Artists Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-red-900/20">
        <motion.div
          className="max-w-7xl mx-auto px-8"
          style={{ opacity: artistsOpacity }}
        >
          <motion.h2 className="text-5xl font-bold text-center mb-16 text-white">
            OUR SUPERSTARS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard hoverEffect="magnetic" className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-600 to-purple-800 p-8 h-80">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2">KOFI</h3>
                <p className="text-red-200 mb-4">RnB Sensation • 45M+ Streams</p>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="tilt" className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-blue-800 p-8 h-80">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2">LUNA TRAP</h3>
                <p className="text-purple-200 mb-4">Trap Queen • 32M+ Streams</p>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard hoverEffect="glow" glowColor="red" className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-600 to-red-800 p-8 h-80">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2">PHOENIX</h3>
                <p className="text-orange-200 mb-4">Hip-Hop Artist • 28M+ Streams</p>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900/30 to-black">
        <motion.div
          className="max-w-4xl mx-auto px-8 text-center"
          style={{ opacity: ctaOpacity }}
        >
          <motion.h2 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            READY TO BLOW UP?
          </motion.h2>
          
          <motion.p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the roster that's redefining Australian music. From your first track to your first gold plaque - we make stars, not just artists.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <ShimmerButton
              className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 text-xl"
              shimmerColor="#ef4444"
            >
              <Mic className="w-6 h-6 mr-3" />
              Submit Demo Now
            </ShimmerButton>
            <ShimmerButton
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-16 py-6 text-xl"
              shimmerColor="#ffffff"
              background="rgba(0, 0, 0, 0.3)"
            >
              <Headphones className="w-6 h-6 mr-3" />
              Book Meeting
            </ShimmerButton>
          </div>
          
          <div className="flex justify-center space-x-8">
            {/* Spotify */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
            >
              <Music className="w-8 h-8 text-white" />
            </motion.a>
            
            {/* Apple Music */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center"
            >
              <Play className="w-8 h-8 text-white" />
            </motion.a>
            
            {/* YouTube */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
            >
              <Play className="w-8 h-8 text-white" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Background Stars */}
      <section className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-white text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.2, 0.5],
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
      </section>
    </div>
  )
}