'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { initInteractiveSounds, useSound } from '@/lib/soundManager'

export function GeniusHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true })
  const { playSuccess } = useSound()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Smooth spring animations for parallax
  const springConfig = { damping: 15, stiffness: 100 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig)
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig)

  // Mouse tracking for interactive gradient orbs
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced text scramble effect for the "1" 
  const scrambleTitle = (element: HTMLElement, finalText: string, duration: number = 2000) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*'
    let currentIndex = 0
    
    const interval = setInterval(() => {
      const scrambled = finalText
        .split('')
        .map((char, index) => {
          if (index < currentIndex) return finalText[index]
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      
      element.textContent = scrambled
      
      currentIndex++
      if (currentIndex > finalText.length) {
        clearInterval(interval)
        element.textContent = finalText
      }
    }, duration / finalText.length)
  }

  useEffect(() => {
    if (isInView && titleRef.current) {
      setTimeout(() => {
        scrambleTitle(titleRef.current!, '1ABEL', 1500)
        // Play success sound when text is revealed
        setTimeout(() => playSuccess(), 1500)
      }, 1000)
    }
  }, [isInView, playSuccess])

  useEffect(() => {
    // Initialize interactive sounds for the entire page
    const cleanup = initInteractiveSounds()
    return cleanup
  }, [])

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
      style={{ y, opacity, scale }}
    >
      {/* Interactive gradient orbs that follow mouse */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-600/30 to-red-400/20 blur-3xl"
          animate={{
            x: mousePosition.x * 150,
            y: mousePosition.y * 150,
          }}
          transition={{ type: "spring", damping: 30 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-red-500/20 to-orange-600/15 blur-3xl"
          animate={{
            x: mousePosition.x * -120,
            y: mousePosition.y * -120,
          }}
          transition={{ type: "spring", damping: 25 }}
          style={{ right: '15%', bottom: '15%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-red-700/25 to-red-500/20 blur-3xl"
          animate={{
            x: mousePosition.x * 80,
            y: mousePosition.y * -80,
          }}
          transition={{ type: "spring", damping: 35 }}
          style={{ left: '60%', top: '60%' }}
        />
      </div>

      {/* Noise texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />

      {/* Grid pattern background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Main logo section - enhanced */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative text-center"
        >
          {/* The iconic "1" with enhanced effects */}
          <motion.h1
            ref={titleRef}
            className="text-[50vh] font-bold leading-none text-red-600 relative"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(220, 38, 38, 0.5))',
              textShadow: '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)'
            }}
            animate={{
              textShadow: [
                '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                '0 0 120px rgba(220, 38, 38, 0.8), 0 0 240px rgba(220, 38, 38, 0.5)',
                '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            1ABEL
          </motion.h1>

          {/* Tagline with typing effect */}
          <motion.p 
            className="mt-8 text-2xl md:text-3xl font-light tracking-wide text-white/80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            BUILDING THE FUTURE OF MUSIC
          </motion.p>

          {/* Enhanced call-to-action buttons */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <motion.a 
              href="mailto:anyro@1abel.com" 
              className="group relative px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden border-2 border-transparent hover:border-red-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-white font-medium"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </motion.span>
            </motion.a>

            <Link href="/blog">
              <motion.button
                className="px-8 py-4 border-2 border-white/20 text-white font-medium rounded-full backdrop-blur-sm hover:bg-white/5 hover:border-red-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Our Story
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 p-1 backdrop-blur-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-red-500 rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating musical particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-xl"
            initial={{
              x: `${Math.random() * 100}%`,
              y: '110%',
            }}
            animate={{
              y: '-10%',
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15,
            }}
          >
            {['♪', '♫', '♬', '♩', '♭', '♯'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Navigation overlay */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-50 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="text-2xl font-bold cursor-pointer"
            >
              <span className="text-red-600">1</span><span className="text-white">ABEL</span>
            </motion.div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              About
            </Link>
          </div>
        </div>
      </motion.nav>
    </motion.section>
  )
}