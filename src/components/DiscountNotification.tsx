'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift, TrendingDown, Award } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DiscountNotificationProps {
  show: boolean
  discount: {
    code: string
    message: string
    value: number
    type: 'percentage' | 'fixed' | 'bogo'
    savingsAmount: number
  }
  onClose: () => void
}

const CONGRATS_MESSAGES = [
  "You just unlocked a secret discount!",
  "Smart shopper detected!",
  "Congratulations! You found a hidden perk!",
  "Look at you, getting premium savings!",
  "This is what winning looks like!",
  "You're part of the exclusive club now!"
]

export function DiscountNotification({ show, discount, onClose }: DiscountNotificationProps) {
  const [congratsMessage] = useState(() =>
    CONGRATS_MESSAGES[Math.floor(Math.random() * CONGRATS_MESSAGES.length)]
  )

  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 6000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          {/* Glass morphism card */}
          <div className="relative overflow-hidden rounded-premium-xl backdrop-blur-2xl bg-gradient-to-br from-white/90 to-white/70 border border-white/20 shadow-2xl glass-card hover-elevate">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 animate-gradient" />

            {/* Content */}
            <div className="relative p-6">
              {/* Icon with glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              {/* Congrats message */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              >
                {congratsMessage}
              </motion.h3>

              {/* Discount details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm mb-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-gray-900">{discount.code}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {discount.message}
                </p>
              </motion.div>

              {/* Savings amount */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 btn-liquid bg-gradient-to-r from-green-500 to-emerald-500 shadow-xl pulse-glow magnetic-button">
                  <TrendingDown className="w-5 h-5 text-white" />
                  <span className="text-lg font-bold text-white">
                    Save ${discount.savingsAmount.toFixed(2)}
                  </span>
                </div>
              </motion.div>

              {/* Why you got it */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-center text-gray-600 mt-4 italic"
              >
                Applied automatically because you're shopping smart
              </motion.p>
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors flex items-center justify-center text-gray-700 hover:text-gray-900"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Suggested discount card for cart
interface DiscountSuggestionProps {
  code: string
  message: string
  onApply: () => void
  applied: boolean
}

export function DiscountSuggestion({ code, message, onApply, applied }: DiscountSuggestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-premium backdrop-blur-xl bg-gradient-to-br from-yellow-50/90 to-orange-50/90 border border-yellow-200/50 p-4 shadow-xl glass-card"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 animate-pulse" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{code}</p>
            <p className="text-xs text-gray-600">{message}</p>
          </div>
        </div>

        {!applied ? (
          <motion.button
            onClick={onApply}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 btn-liquid bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold shadow-xl hover-elevate magnetic-button ripple"
          >
            Apply
          </motion.button>
        ) : (
          <div className="px-4 py-2 btn-liquid bg-green-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3" />
            Applied
          </div>
        )}
      </div>

      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.div>
  )
}
