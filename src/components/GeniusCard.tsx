'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useSound } from '@/lib/soundManager'

interface GeniusCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function GeniusCard({ children, className = '', glowColor = '#dc2626' }: GeniusCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { 
    playEnter, 
    playLeave, 
    playHover,
    playMystical,
    playHarmonicProgression,
    setAmbience
  } = useSound()

  // Motion values for 3D rotation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), springConfig)

  // Glow effect position
  const glowX = useTransform(mouseX, [-1, 1], [10, 90])
  const glowY = useTransform(mouseY, [-1, 1], [10, 90])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Normalize mouse position to -1 to 1
    const normalizedX = ((e.clientX - centerX) / (rect.width / 2))
    const normalizedY = ((e.clientY - centerY) / (rect.height / 2))

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    // 🌊 Smooth entrance with gentle flow
    playEnter()
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    // 🌊 Graceful departure 
    playLeave()
  }

  const handleClick = () => {
    // 🎵 Smooth mystical progression
    playMystical()
    setTimeout(() => playHarmonicProgression('ascending'), 300)
    setTimeout(() => setAmbience('creative'), 800)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2 } }}
    >
      {/* Dynamic glow effect following cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}40 0%, transparent 70%)`,
          filter: 'blur(30px)',
          transform: 'translateZ(-50px)',
          opacity: isHovered ? 0.6 : 0
        }}
      />

      {/* Main card content */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 group">
        
        {/* Holographic shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(105deg, 
                transparent 35%, 
                rgba(255, 255, 255, 0.15) 45%, 
                rgba(255, 255, 255, 0.1) 50%, 
                transparent 60%
              )`,
            transform: 'translateZ(1px)'
          }}
          animate={isHovered ? {
            x: ['-100%', '100%'],
            transition: { duration: 1.5, ease: 'easeInOut' }
          } : {}}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${glowColor}, ${glowColor}80, ${glowColor}40, ${glowColor})`,
            backgroundSize: '300% 300%',
            padding: '1px',
            transform: 'translateZ(0px)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div className="absolute inset-[1px] bg-gradient-to-b from-gray-900/80 to-gray-900/40 rounded-2xl" />
        </motion.div>

        {/* Content with depth */}
        <div className="relative z-10 p-8" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>

        {/* Floating music particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-400/60 text-sm"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0
                }}
                animate={{
                  y: '-20%',
                  opacity: [0, 1, 0],
                  rotate: [0, 360, 720]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
              >
                {['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic shadow that responds to tilt */}
      <motion.div
        className="absolute -bottom-6 left-4 right-4 h-8 rounded-full blur-xl"
        style={{
          background: `${glowColor}30`,
          transform: 'translateZ(-100px)',
          scaleX: useTransform(rotateY, [-15, 15], [0.8, 1.2]),
          scaleY: useTransform(rotateX, [-15, 15], [0.8, 1.2]),
          opacity: useTransform(rotateX, [-15, 15], [0.3, 0.8])
        }}
      />
    </motion.div>
  )
}

// Example usage for 1ABEL features
export function GeniusFeaturesSection() {
  const features = [
    {
      icon: '🎵',
      title: 'Algorithm Mastery',
      description: 'TikTok, Instagram, YouTube - we understand the algorithms that actually matter in 2025',
      color: '#dc2626'
    },
    {
      icon: '🎤',
      title: 'Artist First',
      description: 'Fair deals, no 360 contracts, you keep your masters. We\'re partners, not owners',
      color: '#dc2626'
    },
    {
      icon: '📈',
      title: 'Real Results',
      description: '50M+ streams, viral TikToks, actual career growth - not just empty promises',
      color: '#dc2626'
    }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            BUILDING THE FUTURE
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            OF MUSIC
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <GeniusCard glowColor={feature.color}>
                <div className="text-center">
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
              </GeniusCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CSS needed for 3D transforms - add to globals.css
export const genius3DStyles = `
  .preserve-3d {
    transform-style: preserve-3d;
  }
`