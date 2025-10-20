'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, ShoppingCart } from 'lucide-react'
import { useSound } from '@/lib/soundManager'
import { usePathname } from 'next/navigation'

export function Header() {
  const { playClick, playLogo } = useSound()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left Menu */}
          <div className="flex items-center space-x-8">
            <Link
              href="/tops"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                isActive('/tops') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              TOPS
            </Link>
            <Link
              href="/bottoms"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                isActive('/bottoms') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              BOTTOMS
            </Link>
            <Link
              href="/accessories"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                isActive('/accessories') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              ACCESSORIES
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-3xl font-bold cursor-pointer tracking-tighter"
                onClick={() => playLogo()}
              >
                <span className="text-black">1ABEL</span>
              </motion.div>
            </Link>
          </div>

          {/* Right Menu */}
          <div className="flex items-center justify-end space-x-8">
            <Link
              href="/account"
              className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center ${
                isActive('/account') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              <User className="w-4 h-4 mr-1" />
              ACCOUNT
            </Link>
            <Link
              href="/contact"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                isActive('/contact') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              CONTACT US
            </Link>
            <Link
              href="/cart"
              className={`text-xs font-medium tracking-wider uppercase transition-colors flex items-center ${
                isActive('/cart') ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => playClick()}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              CART
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}