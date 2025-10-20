'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function ShippingPage() {
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

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 uppercase">
              Shipping Policy
            </h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Processing Time</h2>
                <p>
                  All orders are processed within 1-3 weeks of purchase. Orders are not shipped or delivered on weekends or holidays.
                  If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Domestic Shipping (Australia)</h2>
                <p className="mb-4">
                  Standard shipping within Australia typically takes 5-7 business days after the processing period.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days (if available at checkout)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">International Shipping</h2>
                <p className="mb-4">
                  We ship worldwide. International shipping times vary by location:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>USA, Canada, UK, Europe: 10-21 business days</li>
                  <li>New Zealand, Asia: 7-14 business days</li>
                  <li>Other regions: 14-28 business days</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  * International customers are responsible for any customs fees, duties, or taxes that may apply.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Tracking</h2>
                <p>
                  Once your order has shipped, you will receive a confirmation email with tracking information.
                  You can track your package using the provided tracking number.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Lost or Damaged Packages</h2>
                <p className="mb-4">
                  If your package is lost or arrives damaged, please contact us immediately at support@1abel.com with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your order number</li>
                  <li>Photos of the damaged package/items (if applicable)</li>
                  <li>Tracking information</li>
                </ul>
                <p className="mt-4">
                  We will work with you and the carrier to resolve the issue as quickly as possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Contact Us</h2>
                <p>
                  For shipping inquiries, please contact us at{' '}
                  <a href="mailto:support@1abel.com" className="underline hover:no-underline">
                    support@1abel.com
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
