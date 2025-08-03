'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { initInteractiveSounds, useSound } from '@/lib/soundManager'
import { SoundControl } from './SoundControl'

export function GeniusHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true })
  const { 
    // 🌊 Smooth Musical Experience
    playGentleFlow,
    playHover,
    playClick,
    playEnter, 
    playLeave,
    playLogo,
    playMystical,
    playHarmonicProgression,
    setAmbience,
    playWelcomeSymphony
  } = useSound()
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 1500], [0, 1])
  
  // Logo animations - from PERFECT IMPLEMENTATION
  const logoScale = useTransform(scrollProgress, [0, 0.05, 0.1], [1, 1, 0])
  const logoOpacity = useTransform(scrollProgress, [0, 0.04, 0.1], [1, 1, 0])
  const labelOpacity = useTransform(scrollProgress, [0, 0.02, 0.08], [0, 1, 0])
  
  // Content animations
  const contentOpacity = useTransform(scrollProgress, [0.1, 0.3], [0, 1])

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
    setTimeout(() => {
      setIsLoaded(true)
      
      // 🎼 Store the welcome symphony for SoundControl
      ;(window as any).playWelcomeSymphony = playWelcomeSymphony
    }, 100)
    
    // Initialize interactive sounds for the entire page
    const cleanup = initInteractiveSounds()
    return cleanup
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="text-2xl font-bold cursor-pointer"
              onMouseEnter={() => playGentleFlow()}
              onClick={() => playLogo()}
            >
              <span className="text-red-600">1</span><span className="text-white">ABEL</span>
            </motion.div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
              onMouseEnter={() => playHover()}
              onClick={() => setAmbience('focused')}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
              onMouseEnter={() => playHover()}
              onClick={() => setAmbience('mystical')}
            >
              About
            </Link>
            <a 
              href="mailto:anyro@1abel.com" 
              className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              onMouseEnter={() => playEnter()}
              onMouseLeave={() => playLeave()}
              onClick={() => setAmbience('creative')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </a>
          </div>
        </div>
      </motion.nav>

      {/* PERFECT LOGO IMPLEMENTATION - DO NOT MODIFY */}
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
              className="cursor-pointer"
              onMouseEnter={() => playMystical()}
              onClick={() => {
                playLogo()
                // Smooth harmonic progression
                setTimeout(() => playHarmonicProgression('ascending'), 500)
                setTimeout(() => setAmbience('creative'), 2000)
              }}
            >
              1
            </motion.span>
          </motion.div>
          
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-[12%] left-[58%] flex flex-col text-[5vh] font-black leading-[1.1] tracking-wide text-white z-20 h-[38vh] justify-between items-center"
          >
            {['A', 'B', 'E', 'L'].map((letter, index) => {
              const progressions = ['ascending', 'descending', 'circular', 'ascending'] as const
              const ambiences = ['mystical', 'creative', 'focused', 'calm'] as const
              
              return (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    // Each letter triggers a smooth progression
                    playHarmonicProgression(progressions[index])
                  }}
                  onClick={() => {
                    // Set contextual ambience for each letter
                    setAmbience(ambiences[index])
                    setTimeout(() => playGentleFlow(), 300)
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {letter}
                </motion.span>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* 🌟 Divine Gradient Orbs - Each a musical sphere of power */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 🔴 Orb of Circles - The Heart of Rhythm */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-600/30 to-red-400/20 blur-3xl cursor-pointer"
          animate={{
            x: mousePosition.x * 150,
            y: mousePosition.y * 150,
          }}
          transition={{ type: "spring", damping: 30 }}
          style={{ left: '10%', top: '20%' }}
          onClick={() => setAmbience('mystical')}
          onMouseEnter={() => playHover()}
        />
        
        {/* 🟠 Orb of Particles - The Soul of Magic */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-red-500/20 to-orange-600/15 blur-3xl cursor-pointer"
          animate={{
            x: mousePosition.x * -120,
            y: mousePosition.y * -120,
          }}
          transition={{ type: "spring", damping: 25 }}
          style={{ right: '15%', bottom: '15%' }}
          onClick={() => setAmbience('creative')}
          onMouseEnter={() => playMystical()}
        />
        
        {/* 🔺 Orb of Manifestation - The Voice of Creation */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-red-700/25 to-red-500/20 blur-3xl cursor-pointer"
          animate={{
            x: mousePosition.x * 80,
            y: mousePosition.y * -80,
          }}
          transition={{ type: "spring", damping: 35 }}
          style={{ left: '60%', top: '60%' }}
          onClick={() => setAmbience('focused')}
          onMouseEnter={() => playHarmonicProgression('circular')}
        />
      </div>

      {/* Background Stars - Mouse Following */}
      <section className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => {
          const baseX = Math.random() * 100
          const baseY = Math.random() * 100
          const speed = 0.1 + Math.random() * 0.2 // Random speed for each star
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute text-white text-xs"
              style={{
                left: `${baseX}%`,
                top: `${baseY}%`,
              }}
              animate={{
                x: mousePosition.x * (speed * 100),
                y: mousePosition.y * (speed * 100),
                opacity: [0.1, 0.8, 0.1],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                x: { type: "spring", damping: 20, stiffness: 100 },
                y: { type: "spring", damping: 20, stiffness: 100 },
                opacity: {
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                },
                scale: {
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }
              }}
            >
              ✦
            </motion.div>
          )
        })}
      </section>

      {/* Spacer for scroll content */}
      <div className="h-[150vh]" />
      
      {/* Sound Control */}
      <SoundControl />
    </div>
  )
}