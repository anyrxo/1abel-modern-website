'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="pt-28 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wider">
                ← Back to Home
              </Link>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 uppercase">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Last updated: January 30, 2025
            </p>
            <p className="text-lg text-gray-700 mb-12">
              At 1ABEL, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you shop with us.
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Information We Collect</h2>
                <p className="mb-4">When you visit our store or make a purchase, we collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email, phone number, shipping address)</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Device and browser information</li>
                  <li>Website usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Provide customer support</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Information Sharing</h2>
                <p className="mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Shipping carriers to deliver your orders</li>
                  <li>Payment processors to handle transactions</li>
                  <li>Analytics providers to improve our services</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Cookies</h2>
                <p>
                  We use cookies to enhance your shopping experience, remember your preferences, and analyze site traffic.
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Your Rights</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request corrections to your data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal information.
                  However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Contact Us</h2>
                <p>
                  For privacy inquiries, please contact us at{' '}
                  <a href="mailto:privacy@1abel.com" className="underline hover:no-underline">
                    privacy@1abel.com
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
