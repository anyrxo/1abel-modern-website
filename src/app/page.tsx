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
  
  useAnimationFrame((t, delta) => {
    let moveBy = velocityFactor.get() * (delta / 1000) * -200
    baseY.set(baseY.get() + moveBy)
    baseY2.set(baseY2.get() + moveBy * 0.5)
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

  const scrollProgress = useTransform(scrollY, [0, 5000], [0, 1])
  const logoScale = useTransform(scrollProgress, [0, 0.5], [1, 10])
  const logoOpacity = useTransform(scrollProgress, [0.4, 0.5], [1, 0])
  const labelOpacity = useTransform(scrollProgress, [0, 0.1], [0, 1])

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
      {/* Hero Section with Vertical 1ABEL */}
      <section className="fixed inset-0 flex items-center justify-center">
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative"
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
          
          {/* Vertical White ABEL on the 1 */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-[25%] left-[45%] flex flex-col text-[6vh] font-bold leading-[0.7] tracking-tighter text-white"
          >
            {['A', 'B', 'E', 'L'].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
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

        {/* Insane floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                background: `radial-gradient(circle, rgba(255,255,255,${Math.random() * 0.1}) 0%, transparent 70%)`,
                filter: 'blur(1px)',
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
                scale: [1, Math.random() + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
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
      <div className="h-[200vh]" />

      {/* Subtle Infinite Scrolling Symbols */}
      <section className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-0 left-[10%] flex flex-col gap-[20vh]"
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="text-[4vh] text-white/5"
            >
              {phrases[i % phrases.length]}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          style={{ y: y2 }}
          className="absolute top-0 right-[10%] flex flex-col gap-[30vh]"
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="text-[3vh] text-white/3"
            >
              {phrases[(i + 5) % phrases.length]}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Streaming Dominance */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-6xl mx-auto px-8"
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
          
          {/* Platform Logos */}
          <motion.div 
            className="flex justify-center items-center gap-8 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Spotify */}
            <svg className="w-12 h-12 fill-white/80 hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            
            {/* Apple Music */}
            <svg className="w-12 h-12 fill-white/80 hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.99c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.078 1.596-.31 2.295-.72a5.1 5.1 0 002.028-2.324c.155-.364.265-.743.336-1.13.087-.48.12-.968.148-1.457.002-.043.01-.086.012-.13V6.124zm-1.993 12.012c-.01.38-.052.758-.132 1.13-.186.87-.606 1.58-1.314 2.08-.496.35-1.074.54-1.69.61-.517.058-1.04.07-1.563.073H6.7c-.518-.003-1.036-.017-1.55-.072a3.996 3.996 0 01-1.69-.61c-.71-.5-1.13-1.21-1.315-2.08a5.523 5.523 0 01-.132-1.13V5.863c.007-.302.04-.603.088-.9.134-.836.49-1.546 1.15-2.047.493-.376 1.06-.597 1.68-.69.486-.073.98-.097 1.474-.104h11.194c.493.007.988.03 1.474.104.62.093 1.187.314 1.68.69.66.5 1.016 1.21 1.15 2.047.048.297.08.598.088.9v12.273zm-6.96-9.228a.856.856 0 00-.422-.096c-.312 0-.584.186-.72.468l-.002.006v7.477c0 .117.014.234.044.347a.806.806 0 00.763.573c.157 0 .307-.046.436-.13a.93.93 0 00.255-.216c.143-.17.225-.385.225-.614V9.77c0-.443-.19-.79-.579-.861zm-.023-2.295c0-.28-.227-.507-.507-.507H10.19a.507.507 0 100 1.014h3.818v8.03a.868.868 0 01-.173.537.887.887 0 01-.718.366.825.825 0 01-.73-.528 1.07 1.07 0 01-.05-.366v-5.63a.858.858 0 00-.422-.736.856.856 0 00-.85-.001.86.86 0 00-.426.738v5.695c0 .406.072.803.213 1.18.476 1.276 1.864 1.916 3.089 1.425.64-.257 1.096-.817 1.287-1.472.107-.366.16-.746.16-1.128V6.613z"/>
            </svg>
            
            {/* TikTok */}
            <svg className="w-12 h-12 fill-white/80 hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            
            {/* YouTube */}
            <svg className="w-12 h-12 fill-white/80 hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            
            {/* Instagram */}
            <svg className="w-12 h-12 fill-white/80 hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Organic Growth Revolution */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto px-8"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-12 text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ORGANIC REACH REVOLUTION
          </motion.h2>
          
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

      {/* Final Call to Action */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            JOIN THE MOVEMENT
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl mb-12 text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Where culture creators become legends
          </motion.p>
          
          <motion.button
            className="px-16 py-6 bg-red-600 text-white text-xl font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Start Your Legacy
          </motion.button>
          
          <motion.div
            className="mt-16 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a href="#" className="text-white/50 hover:text-white transition-colors">Contact</a>
            <span className="text-white/20">|</span>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Demo Submission</a>
            <span className="text-white/20">|</span>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Press</a>
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