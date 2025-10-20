'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function RefundPage() {
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
              Refund Policy
            </h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section className="border-l-4 border-black pl-6">
                <p className="text-xl font-bold mb-2">ALL SALES ARE FINAL</p>
                <p>
                  Due to the nature of our products and limited production runs, we do not accept returns or offer refunds on any purchases.
                  Please review your order carefully before completing your purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Exceptions</h2>
                <p className="mb-4">
                  We will only accept returns or issue refunds in the following cases:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Defective Products:</strong> If your item arrives with a manufacturing defect</li>
                  <li><strong>Wrong Item:</strong> If you receive an incorrect item that differs from your order</li>
                  <li><strong>Damaged in Transit:</strong> If your item arrives damaged due to shipping</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">How to Report an Issue</h2>
                <p className="mb-4">
                  If you believe your item qualifies for a return under our exceptions policy, you must contact us within 7 days of receiving your order.
                </p>
                <p className="mb-4">
                  Please email <a href="mailto:support@1abel.com" className="underline hover:no-underline">support@1abel.com</a> with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your order number</li>
                  <li>Clear photos of the defect or damage</li>
                  <li>A detailed description of the issue</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Approval Process</h2>
                <p>
                  Once we receive your request, our team will review it within 2-3 business days.
                  If approved, we will provide you with instructions for returning the item.
                  Approved returns will receive a full refund or replacement at our discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Non-Refundable Items</h2>
                <p className="mb-4">
                  The following items are NOT eligible for return or refund under any circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Items that have been worn, washed, or altered</li>
                  <li>Items without original tags or packaging</li>
                  <li>Sale or promotional items</li>
                  <li>Gift cards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Sizing & Fit</h2>
                <p>
                  We do not accept returns for sizing or fit issues. Please carefully review our size guide before placing your order.
                  If you're unsure about sizing, please contact us at{' '}
                  <a href="mailto:support@1abel.com" className="underline hover:no-underline">
                    support@1abel.com
                  </a>{' '}
                  before purchasing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Refund Processing</h2>
                <p>
                  Approved refunds will be processed within 5-10 business days of receiving the returned item.
                  Refunds will be issued to the original payment method used for the purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">Contact Us</h2>
                <p>
                  For refund inquiries, please contact us at{' '}
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
