'use client'

import { motion } from 'framer-motion'

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-white/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Animated gradient "1" */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="text-[120px] font-bold bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent"
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          1
        </motion.div>

        {/* Pulsing glow effect */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 blur-2xl bg-gradient-to-r from-gray-400 to-gray-600 -z-10"
        />
      </motion.div>
    </div>
  )
}
