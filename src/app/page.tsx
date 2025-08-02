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
            className="absolute top-[20%] left-[55%] flex flex-col text-[10vh] font-bold leading-[0.8] tracking-tight text-white"
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
      <div className="h-[500vh]" />

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

      {/* Epic Statement */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center"
        >
          <motion.h2 
            className="text-[20vh] font-bold leading-[0.8] tracking-tighter"
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff, #ff0000)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            animate={{
              filter: [
                "hue-rotate(0deg)",
                "hue-rotate(180deg)",
                "hue-rotate(360deg)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ELITE
          </motion.h2>
        </motion.div>
      </section>

      {/* Minimal Statement */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="max-w-2xl mx-auto px-8 text-center"
        >
          <motion.p 
            className="text-2xl md:text-4xl font-light tracking-wide leading-relaxed"
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            whileInView={{ letterSpacing: "0.1em", opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            WHERE LEGENDS BEGIN
          </motion.p>
        </motion.div>
      </section>

      {/* Interactive Element */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="w-[300px] h-[300px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="w-[200px] h-[200px] rounded-full border border-white/30 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="w-[100px] h-[100px] rounded-full bg-red-600/20 flex items-center justify-center"
                whileHover={{ scale: 1.5, backgroundColor: "rgba(220, 38, 38, 0.5)" }}
              >
                <span className="text-2xl font-bold">∞</span>
              </motion.div>
            </motion.div>
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