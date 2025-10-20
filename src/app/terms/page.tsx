'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
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
              Terms of Service
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Last updated: January 30, 2025
            </p>
            <p className="text-lg text-gray-700 mb-12">
              By accessing and using 1ABEL's website and services, you agree to comply with these Terms of Service.
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Agreement to Terms</h2>
                <p>
                  By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                  If you do not agree with any of these terms, you are prohibited from using this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily access the materials on 1ABEL's website for personal, non-commercial use only.
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software on the website</li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Purchases and Payments</h2>
                <p className="mb-4">
                  All purchases are subject to product availability. We reserve the right to refuse or cancel any order for any reason.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are in AUD and subject to change without notice</li>
                  <li>Payment must be received before your order is processed</li>
                  <li>We accept major credit cards and other payment methods as shown at checkout</li>
                  <li>All sales are final - see our Refund Policy for exceptions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, and software, is the property of 1ABEL
                  and is protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">User Accounts</h2>
                <p className="mb-4">
                  If you create an account on our website:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Limitation of Liability</h2>
                <p>
                  In no event shall 1ABEL or its suppliers be liable for any damages arising out of the use or inability to use
                  the materials on this website, even if 1ABEL or an authorized representative has been notified orally or in writing
                  of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of Australia,
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Changes to Terms</h2>
                <p>
                  We reserve the right to revise these terms of service at any time without notice.
                  By using this website, you are agreeing to be bound by the current version of these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Contact Us</h2>
                <p>
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@1abel.com" className="underline hover:no-underline">
                    legal@1abel.com
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
