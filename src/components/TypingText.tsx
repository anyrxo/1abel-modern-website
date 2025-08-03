'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSound } from '@/lib/soundManager'

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
  playSound?: boolean
}

export function TypingText({ 
  text, 
  className = '', 
  speed = 50, 
  delay = 0,
  onComplete,
  playSound = true 
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { playTypingSound } = useSound()
  const soundCounterRef = useRef(0)

  useEffect(() => {
    setDisplayedText('')
    setIsTyping(false)
    soundCounterRef.current = 0

    const startTyping = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          
          // Play typing sound every 3 characters for better effect
          if (playSound && soundCounterRef.current % 3 === 0) {
            playTypingSound()
          }
          soundCounterRef.current++
          
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          if (onComplete) onComplete()
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(startTyping)
  }, [text, speed, delay, onComplete, playSound, playTypingSound])

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      )}
    </motion.span>
  )
}