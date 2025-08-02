'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: 'lift' | 'glow' | 'tilt' | 'scale' | 'magnetic'
  glowColor?: string
  delay?: number
}

export default function AnimatedCard({
  children,
  className,
  hoverEffect = 'lift',
  glowColor = 'red',
  delay = 0
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })

    if (hoverEffect === 'tilt') {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rotateX = (e.clientY - centerY) / 10
      const rotateY = (centerX - e.clientX) / 10

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    } else if (hoverEffect === 'magnetic') {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.1
      const deltaY = (e.clientY - centerY) * 0.1

      cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }
  }

  const handleMouseLeave = () => {
    if (hoverEffect === 'tilt' || hoverEffect === 'magnetic') {
      if (cardRef.current) {
        cardRef.current.style.transform = ''
      }
    }
    setMousePosition({ x: 50, y: 50 })
  }

  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'hover:-translate-y-4 hover:shadow-2xl'
      case 'glow':
        return `hover:shadow-2xl hover:shadow-${glowColor}-500/25`
      case 'scale':
        return 'hover:scale-105'
      case 'tilt':
      case 'magnetic':
        return 'transition-all duration-300 ease-out'
      default:
        return 'hover:-translate-y-2'
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'card-premium group relative',
        'transform-gpu transition-all duration-500 ease-out',
        'opacity-0 translate-y-8',
        {
          'opacity-100 translate-y-0': isVisible,
        },
        getHoverStyles(),
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Background glow effect */}
      {hoverEffect === 'glow' && (
        <div
          ref={glowRef}
          className={cn(
            'absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100',
            'transition-opacity duration-500',
            `bg-gradient-to-r from-${glowColor}-500/20 to-purple-500/20`,
            'blur-xl -z-10 scale-110'
          )}
        />
      )}

      {/* Mouse tracking light effect */}
      <div
        className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className={cn(
          'absolute inset-[1px] rounded-inherit',
          `bg-gradient-to-r from-${glowColor}-500/20 via-purple-500/20 to-${glowColor}-500/20`
        )} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
    </div>
  )
}