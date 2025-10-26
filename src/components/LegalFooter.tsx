'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function LegalFooter() {
  return (
    <footer className="bg-white border-t border-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/arc-2" className="hover:text-black transition-colors inline-block">
                    Arc 2 Shadow
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/arc-3" className="hover:text-black transition-colors inline-block">
                    Arc 3 Light
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/contact" className="hover:text-black transition-colors inline-block">
                    Contact Us
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/shipping" className="hover:text-black transition-colors inline-block">
                    Shipping
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/refund" className="hover:text-black transition-colors inline-block">
                    Returns
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/terms-of-use" className="hover:text-black transition-colors inline-block">
                    Terms of Use
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/terms" className="hover:text-black transition-colors inline-block">
                    Terms & Conditions
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/privacy" className="hover:text-black transition-colors inline-block">
                    Privacy Policy
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/about" className="hover:text-black transition-colors inline-block">
                    About
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <a
                    href="https://instagram.com/1abelofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors inline-block"
                  >
                    Instagram
                  </a>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <a
                    href="https://twitter.com/1abelofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors inline-block"
                  >
                    Twitter
                  </a>
                </motion.div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="text-center md:text-left">
              <p className="font-semibold text-black mb-1">
                © 2025 1ABEL - A Brand of IImagined Company
              </p>
              <p className="text-xs">All Rights Reserved. Unauthorized reproduction prohibited.</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs">Designed & Envisioned by Anyro (@anyrxo)</p>
              <p className="text-xs mt-1">Website by IImagined</p>
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="mt-6 text-xs text-gray-500 text-center max-w-3xl mx-auto">
            <p>
              1ABEL and "Where Sound Becomes Style" are trademarks of IImagined Company.
              All product images, designs, and content are protected by copyright and trademark laws.
              See our <Link href="/terms-of-use" className="underline hover:text-black">Terms of Use</Link> for details.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
