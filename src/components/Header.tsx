'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useSound } from '@/lib/soundManager'
import { usePathname } from 'next/navigation'

export function Header() {
  const { playClick, playLogo, playManifesto, playBeeps, playHover } = useSound()
  const pathname = usePathname()

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur border-b border-gray-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="text-2xl font-bold cursor-pointer"
            onClick={() => playLogo()}
          >
            <span className="text-red-600">1</span><span className="text-white">ABEL</span>
          </motion.div>
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link 
            href="/blog" 
            className={`transition-colors text-sm font-medium ${
              pathname === '/blog' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => playClick()}
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors text-sm font-medium ${
              pathname === '/about' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => playManifesto()}
          >
            About
          </Link>
          <a 
            href="mailto:anyro@1abel.com" 
            className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            onMouseEnter={() => playHover()}
            onClick={() => playBeeps()}
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </a>
        </div>
      </div>
    </motion.nav>
  )
}