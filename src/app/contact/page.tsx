'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6">
              GET IN TOUCH
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Have questions about our collections or need assistance? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-card rounded-premium shadow-xl hover-elevate border border-black/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black/10 rounded-premium bg-gradient-to-br from-black/5 to-black/10 hover-elevate">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Email</h3>
              <p className="text-sm text-gray-600 mb-4">support@1abel.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-card rounded-premium shadow-xl hover-elevate border border-black/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black/10 rounded-premium bg-gradient-to-br from-black/5 to-black/10 hover-elevate">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Mon-Fri, 9AM-6PM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-card rounded-premium shadow-xl hover-elevate border border-black/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black/10 rounded-premium bg-gradient-to-br from-black/5 to-black/10 hover-elevate">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Location</h3>
              <p className="text-sm text-gray-600 mb-4">Melbourne, Australia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-card rounded-premium shadow-xl hover-elevate border border-black/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black/10 rounded-premium bg-gradient-to-br from-black/5 to-black/10 hover-elevate">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Hours</h3>
              <p className="text-sm text-gray-600 mb-4">24/7 Online Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center uppercase">
              Send Us A Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full glass-input backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full glass-input backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full glass-input backdrop-blur-sm"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full glass-input backdrop-blur-sm resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white btn-liquid hover-elevate pulse-glow magnetic-button ripple shadow-2xl text-sm tracking-wider uppercase font-semibold"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center uppercase">
            Frequently Asked
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "What are your shipping times?",
                answer: "We ship all orders within 1-3 weeks. International shipping may take longer depending on location."
              },
              {
                question: "What is your return policy?",
                answer: "All sales are final. Please review your order carefully before purchasing."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship worldwide. Shipping costs are calculated at checkout."
              },
              {
                question: "How do I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-premium p-6 shadow-lg hover-elevate border border-black/10 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/arc-2" className="hover:text-black transition-colors inline-block">Arc 2 Shadow</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/arc-3" className="hover:text-black transition-colors inline-block">Arc 3 Light</Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/contact" className="hover:text-black transition-colors inline-block">Contact Us</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/shipping" className="hover:text-black transition-colors inline-block">Shipping</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/refund" className="hover:text-black transition-colors inline-block">Returns</Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/about" className="hover:text-black transition-colors inline-block">About</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/terms" className="hover:text-black transition-colors inline-block">Terms</Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/privacy" className="hover:text-black transition-colors inline-block">Privacy</Link>
                  </motion.div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wide text-sm md:text-base">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Instagram</a>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Twitter</a>
                  </motion.div>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025, 1ABEL</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
