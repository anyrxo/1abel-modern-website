'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { wrap } from '@motionone/utils'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollY } = useScroll()
  const scrollVelocity = useMotionValue(0)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  
  const baseY = useMotionValue(0)
  const baseY2 = useMotionValue(0)
  const rotationValue = useMotionValue(0)
  
  useAnimationFrame((t, delta) => {
    let moveBy = velocityFactor.get() * (delta / 1000) * -200
    baseY.set(baseY.get() + moveBy)
    baseY2.set(baseY2.get() + moveBy * 0.5)
    rotationValue.set(rotationValue.get() + velocityFactor.get() * 0.5)
  })

  const y = useTransform(baseY, (v) => `${wrap(-100, 0, v)}%`)
  const y2 = useTransform(baseY2, (v) => `${wrap(-100, 0, v)}%`)

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious() ?? 0
      scrollVelocity.set(Math.abs(latest - previous))
    })

    setTimeout(() => setIsLoaded(true), 100)

    return () => unsubscribe()
  }, [scrollY, scrollVelocity])

  // Scroll progress mapping
  const scrollProgress = useTransform(scrollY, [0, 10000], [0, 1])
  
  // Logo (1) - visible on page load, stays until scroll
  const logoScale = useTransform(scrollProgress, [0, 0.05, 0.7, 0.8], [1, 1, 1, 0])
  const logoOpacity = useTransform(scrollProgress, [0, 0.05, 0.7, 0.8], [1, 1, 1, 0])
  
  // ABEL appearance - writes on the 1 after page load
  const labelOpacity = useTransform(scrollProgress, [0, 0.1, 0.6, 0.7], [0, 1, 1, 0])
  
  // White smoke effect at the end
  const smokeOpacity = useTransform(scrollProgress, [0.9, 0.95, 0.98, 1], [0, 1, 1, 0])
  
  // Content transformations - start earlier
  const contentRotate = useTransform(scrollProgress, [0.1, 0.3, 0.5, 0.7], [0, 90, -90, 0])
  const contentScale = useTransform(scrollProgress, [0.1, 0.4, 0.7], [1, 1.5, 1])
  const contentOpacity = useTransform(scrollProgress, [0.08, 0.15, 0.85, 0.95], [0, 1, 1, 0])
  
  // Loop back to beginning
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll - 10) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const phrases = [
    "∞",
    "•",
    "◦",
    "○",
    "●",
    "◯",
    "⬤",
    "✦",
    "✧",
    "⬥"
  ]

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* White Smoke Effect at End */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: smokeOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent" />
      </motion.div>
      {/* Hero Section with Red 1 and ABEL */}
      <section className="fixed inset-0 flex items-center justify-center">        
        <motion.div
          style={{ 
            scale: logoScale, 
            opacity: logoOpacity
          }}
          className="relative z-10"
        >
          {/* Big Red 1 with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 0.8,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[50vh] font-bold leading-none text-red-600 relative"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                  '0 0 120px rgba(220, 38, 38, 0.8), 0 0 240px rgba(220, 38, 38, 0.5)',
                  '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              1
            </motion.span>
          </motion.div>
          
          {/* Vertical White ABEL perfectly fitted on the 1 - Writes on beautifully */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-[12%] left-[58%] flex flex-col text-[6vh] font-black leading-[1.2] tracking-wide text-white z-20 h-[35vh] justify-between"
          >
            {['A', 'B', 'E', 'L'].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1 + index * 0.15,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                style={{
                  opacity: useTransform(scrollProgress, 
                    [0, 0.05 + index * 0.01, 0.6, 0.7], [0, 1, 1, 0]
                  )
                }}
                whileHover={{ 
                  scale: 1.1, 
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        
        {/* Glitch effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
        >
          <div className="absolute inset-0 bg-red-600/10 mix-blend-screen" />
        </motion.div>
      </section>

      {/* Spacer for scroll */}
      <div className="h-[1000vh]" />

      {/* Beautiful Flashing Stars Background */}
      <section className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 4}px`,
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
        
        {/* Medium Stars */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`star-med-${i}`}
            className="absolute text-white/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 6 + 2}px`,
            }}
            animate={{
              opacity: [0.05, 0.6, 0.05],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            ★
          </motion.div>
        ))}
        
        {/* Small Twinkling Stars */}
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={`star-small-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.02, 0.4, 0.02],
              scale: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
        
        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={{
              x: [0, 1000],
              y: [0, 300],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 10 + 5
            }}
          />
        ))}
      </section>

      {/* Streaming Dominance */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-6xl mx-auto px-8"
          style={{
            rotate: contentRotate,
            scale: contentScale,
            opacity: contentOpacity
          }}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-bold mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            NEW AGE DOMINANCE
          </motion.h2>
          
          {/* Streaming Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { platform: "SPOTIFY", number: "847M", label: "STREAMS" },
              { platform: "APPLE MUSIC", number: "392M", label: "PLAYS" },
              { platform: "TIKTOK", number: "2.4B", label: "VIEWS" },
              { platform: "YOUTUBE", number: "1.8B", label: "PLAYS" }
            ].map((stat, index) => (
              <motion.div
                key={stat.platform}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-7xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-white/50 mb-1">{stat.label}</div>
                <div className="text-xs text-white/30">{stat.platform}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            These numbers represent real impact. Our artists dominate streaming platforms, 
            viral social content, and digital music discovery. We don't chase trends—we create them.
          </motion.p>
          
          {/* Social Media & Platform Logos */}
          <motion.div 
            className="flex justify-center items-center gap-8 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Spotify */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#1DB954] transition-colors" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </motion.div>
            
            {/* Apple Music */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#FA233B] transition-colors" viewBox="0 0 24 24">
                <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.99c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.078 1.596-.31 2.295-.72a5.1 5.1 0 002.028-2.324c.155-.364.265-.743.336-1.13.087-.48.12-.968.148-1.457.002-.043.01-.086.012-.13V6.124zm-1.993 12.012c-.01.38-.052.758-.132 1.13-.186.87-.606 1.58-1.314 2.08-.496.35-1.074.54-1.69.61-.517.058-1.04.07-1.563.073H6.7c-.518-.003-1.036-.017-1.55-.072a3.996 3.996 0 01-1.69-.61c-.71-.5-1.13-1.21-1.315-2.08a5.523 5.523 0 01-.132-1.13V5.863c.007-.302.04-.603.088-.9.134-.836.49-1.546 1.15-2.047.493-.376 1.06-.597 1.68-.69.486-.073.98-.097 1.474-.104h11.194c.493.007.988.03 1.474.104.62.093 1.187.314 1.68.69.66.5 1.016 1.21 1.15 2.047.048.297.08.598.088.9v12.273zm-6.96-9.228a.856.856 0 00-.422-.096c-.312 0-.584.186-.72.468l-.002.006v7.477c0 .117.014.234.044.347a.806.806 0 00.763.573c.157 0 .307-.046.436-.13a.93.93 0 00.255-.216c.143-.17.225-.385.225-.614V9.77c0-.443-.19-.79-.579-.861zm-.023-2.295c0-.28-.227-.507-.507-.507H10.19a.507.507 0 100 1.014h3.818v8.03a.868.868 0 01-.173.537.887.887 0 01-.718.366.825.825 0 01-.73-.528 1.07 1.07 0 01-.05-.366v-5.63a.858.858 0 00-.422-.736.856.856 0 00-.85-.001.86.86 0 00-.426.738v5.695c0 .406.072.803.213 1.18.476 1.276 1.864 1.916 3.089 1.425.64-.257 1.096-.817 1.287-1.472.107-.366.16-.746.16-1.128V6.613z"/>
              </svg>
            </motion.div>
            
            {/* YouTube */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#FF0000] transition-colors" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </motion.div>
            
            {/* TikTok */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#FE2C55] transition-colors" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </motion.div>
            
            {/* Instagram */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#E4405F] transition-colors" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
            </motion.div>

            {/* Twitter/X */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-white transition-colors" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.div>

            {/* Twitch */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#9146FF] transition-colors" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </motion.div>

            {/* SoundCloud */}
            <motion.div
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-12 h-12 fill-white/80 hover:fill-[#FF5500] transition-colors" viewBox="0 0 24 24">
                <path d="M1.175 13.37c-.055 0-.094.039-.094.094v2.203c0 .055.04.094.094.094s.095-.04.095-.094v-2.203c0-.055-.04-.094-.095-.094zm-.938.281c-.055 0-.086.032-.086.086v1.64c0 .055.031.086.086.086s.087-.031.087-.086v-1.64c0-.054-.032-.086-.087-.086zm1.969-.187c-.063 0-.11.047-.11.11v2.015c0 .063.047.11.11.11s.11-.047.11-.11v-2.015c0-.063-.047-.11-.11-.11zm.985-.282c-.07 0-.125.055-.125.125v2.578c0 .07.055.125.125.125s.125-.055.125-.125v-2.578c0-.07-.055-.125-.125-.125zm.985-.281c-.078 0-.141.063-.141.14v3.141c0 .078.063.14.14.14.079 0 .142-.062.142-.14v-3.14c0-.078-.063-.141-.14-.141zm.984-.297c-.086 0-.156.07-.156.156v3.734c0 .086.07.156.156.156s.157-.07.157-.156v-3.734c0-.086-.07-.156-.157-.156zm.985-.312c-.094 0-.172.078-.172.172v4.359c0 .094.078.171.172.171s.171-.077.171-.171v-4.36c0-.093-.077-.171-.171-.171zm.984-.329c-.101 0-.187.086-.187.187v5.016c0 .102.086.188.187.188s.188-.086.188-.188v-5.016c0-.101-.087-.187-.188-.187zm.985-.343c-.109 0-.203.094-.203.203v5.703c0 .109.094.203.203.203s.203-.094.203-.203v-5.703c0-.109-.094-.203-.203-.203zm.984-.36c-.117 0-.218.102-.218.219v6.422c0 .117.101.218.218.218s.219-.101.219-.218v-6.422c0-.117-.102-.219-.219-.219zm.985-.375c-.125 0-.234.109-.234.234v7.172c0 .125.109.234.234.234s.234-.109.234-.234v-7.172c0-.125-.109-.234-.234-.234zm.984-.399c-.133 0-.25.117-.25.25v7.969c0 .133.117.25.25.25s.25-.117.25-.25v-7.969c0-.133-.117-.25-.25-.25zm1 .102c-.14 0-.266.125-.266.265v7.562c0 .141.125.266.266.266.14 0 .265-.125.265-.266v-7.562c0-.14-.125-.265-.265-.265zm-1.25-3.453c-.148 0-.281.133-.281.281v11.25c0 .148.133.281.281.281h9.766c1.898 0 3.445-1.547 3.445-3.445 0-1.898-1.547-3.445-3.445-3.445-.758 0-1.492.25-2.117.695-.938-2.461-3.328-4.117-6.023-4.117-1.055 0-2.055.258-2.93.719-.383-.594-.836-1.055-1.336-1.375-.508-.32-1.07-.484-1.64-.484-.055 0-.11.008-.164.016v10.125c0 .148.133.281.281.281z"/>
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Social Media CTA */}
          <motion.p
            className="text-center text-lg mt-8 text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Follow our artists across all platforms • Brand partnerships • Live shows • Exclusive content
          </motion.p>
        </motion.div>
      </section>

      {/* Organic Growth Revolution */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          className="max-w-5xl mx-auto px-8"
          style={{
            opacity: contentOpacity,
            rotate: contentRotate
          }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ORGANIC REACH REVOLUTION
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            While others rely on outdated industry gatekeepers, we harness the power of 
            direct fan connection. Our approach bypasses traditional barriers and builds 
            authentic communities around our artists.
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* What We Do */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-red-600">NEW AGE</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">→</span>
                  <span>Viral TikTok campaigns that reach millions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">→</span>
                  <span>Instagram Reels & YouTube Shorts dominance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">→</span>
                  <span>Direct-to-fan engagement on all platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">→</span>
                  <span>Real-time analytics & trend adaptation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">→</span>
                  <span>Playlist algorithmic optimization</span>
                </li>
              </ul>
            </motion.div>
            
            {/* What We Don't Do */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-white/30">OLD SCHOOL</h3>
              <ul className="space-y-4 text-lg text-white/40 line-through">
                <li>Radio payola schemes</li>
                <li>Billboard chart manipulation</li>
                <li>Traditional PR campaigns</li>
                <li>Physical album distribution</li>
                <li>Outdated industry gatekeepers</li>
              </ul>
            </motion.div>
          </div>
          
          <motion.p
            className="text-center text-2xl mt-16 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            We leverage the fastest path to global reach
          </motion.p>
        </motion.div>
      </section>

      {/* Final Call to Action with Epic Concert Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Epic Concert Background */}
        <div className="absolute inset-0">
          {/* Base red concert atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-red-700 to-black" />
          
          {/* Animated red smoke/stage lighting */}
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={{
              background: [
                'radial-gradient(ellipse at 30% 30%, rgba(220, 38, 38, 0.6) 0%, transparent 70%)',
                'radial-gradient(ellipse at 70% 40%, rgba(220, 38, 38, 0.8) 0%, transparent 70%)',
                'radial-gradient(ellipse at 50% 60%, rgba(220, 38, 38, 0.6) 0%, transparent 70%)',
                'radial-gradient(ellipse at 30% 30%, rgba(220, 38, 38, 0.6) 0%, transparent 70%)'
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Concert crowd silhouettes overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-64">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-black/80"
                style={{
                  left: `${i * 5}%`,
                  width: `${Math.random() * 8 + 2}%`,
                  height: `${Math.random() * 40 + 20}%`,
                  clipPath: 'polygon(20% 100%, 80% 100%, 90% 80%, 70% 60%, 60% 40%, 40% 60%, 10% 80%)'
                }}
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          {/* Stage lights effect */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute top-0 w-32 h-32 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)'
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        
        {/* Animated Red Smoke Effect */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at ${30 + i * 30}% ${40 + i * 20}%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
            />
          ))}
        </div>
        
        {/* Concert Crowd Silhouettes */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-8"
          style={{
            opacity: contentOpacity,
            scale: contentScale
          }}
        >
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              textShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.4)'
            }}
          >
            JOIN THE MOVEMENT
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl mb-4 text-white/90 drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Where culture creators become legends
          </motion.p>
          
          <motion.p
            className="text-lg mb-12 text-red-300/80 drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Live shows • Festival headliners • Sold-out venues
          </motion.p>
          
          <motion.button
            className="px-16 py-6 bg-red-600 text-white text-xl font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 shadow-2xl border-2 border-red-500 hover:border-red-400"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(220, 38, 38, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Start Your Legacy
          </motion.button>
          
          <motion.div
            className="mt-16 flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a href="#" className="text-white/70 hover:text-white transition-colors drop-shadow-lg">Contact</a>
            <span className="text-white/30">|</span>
            <a href="#" className="text-white/70 hover:text-white transition-colors drop-shadow-lg">Demo Submission</a>
            <span className="text-white/30">|</span>
            <a href="#" className="text-white/70 hover:text-white transition-colors drop-shadow-lg">Press</a>
            <span className="text-white/30">|</span>
            <a href="#" className="text-white/70 hover:text-white transition-colors drop-shadow-lg">Book Shows</a>
          </motion.div>
        </motion.div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-white/20 text-sm tracking-widest">© 2024</p>
        </motion.div>
      </footer>
    </div>
  )
}