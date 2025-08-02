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
    "WHERE LEGENDS ARE BORN",
    "BEYOND MUSIC",
    "CULTURAL ARCHITECTS",
    "DEFINING GENERATIONS",
    "TIMELESS ARTISTRY",
    "INFINITE POSSIBILITIES",
    "CREATIVE EXCELLENCE",
    "LUXURY IN SOUND",
    "ELEVATED EXPERIENCES",
    "FUTURE FORWARD"
  ]

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Hero Section with Vertical 1ABEL */}
      <section className="fixed inset-0 flex items-center justify-center">
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative"
        >
          {/* Big 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[40vh] font-bold leading-none"
          >
            1
          </motion.div>
          
          {/* Vertical ABEL */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-[15%] left-[60%] flex flex-col text-[8vh] font-bold leading-none tracking-wider"
          >
            {['A', 'B', 'E', 'L'].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.2, 
                  x: 10,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-gray-500"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      </section>

      {/* Spacer for scroll */}
      <div className="h-[500vh]" />

      {/* Infinite Scrolling Text - Layer 1 */}
      <section className="fixed top-[20%] left-0 w-full overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="flex flex-col"
        >
          {[...Array(2)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex flex-col">
              {phrases.map((phrase, index) => (
                <motion.div
                  key={`${repeatIndex}-${index}`}
                  className="text-[15vh] font-bold whitespace-nowrap px-8 py-4 text-white/10 hover:text-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {phrase}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Infinite Scrolling Text - Layer 2 (Opposite Direction) */}
      <section className="fixed top-[40%] left-0 w-full overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y2 }}
          className="flex flex-col"
        >
          {[...Array(2)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex flex-col">
              {[...phrases].reverse().map((phrase, index) => (
                <motion.div
                  key={`${repeatIndex}-${index}`}
                  className="text-[10vh] font-light whitespace-nowrap px-8 py-2 text-white/5 hover:text-white/20 transition-all duration-300"
                  style={{ fontStyle: 'italic' }}
                  whileHover={{ scale: 1.02 }}
                >
                  {phrase}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto px-8 text-center"
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            WE ARE THE FUTURE
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Where visionaries unite. Where culture is crafted. Where legends rise.
          </motion.p>
        </motion.div>
      </section>

      {/* Manifesto Section */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-5xl font-bold mb-6">OUR VISION</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't just sign artists. We cultivate icons. We build empires. 
              We create movements that transcend time and space.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-9xl font-bold opacity-20">∞</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-9xl font-bold mb-12">
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              READY?
            </motion.span>
          </h2>
          
          <motion.button
            className="px-12 py-6 border-2 border-white text-xl font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">ENTER THE REALM</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-black font-bold"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ENTER THE REALM
            </motion.span>
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-600 mb-4">1ABEL © 2024</p>
          <p className="text-gray-700 text-sm">Beyond Everything</p>
        </motion.div>
      </footer>

      {/* Background Gradient Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  )
}