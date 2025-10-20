'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="pt-28 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/account" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wider">
              ← Back to Account
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2">PROFILE</h1>
            <p className="text-gray-600 mb-12">Manage your personal information</p>

            {/* Profile Form */}
            <div className="space-y-8">
              <div className="border border-black p-8">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Personal Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                        <User className="inline w-4 h-4 mr-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="+61 400 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"
                  >
                    Save Changes
                  </motion.button>
                </form>
              </div>

              <div className="border border-black p-8">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Shipping Address</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Melbourne"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="3000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                        State
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="VIC"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Australia"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"
                  >
                    Update Address
                  </motion.button>
                </form>
              </div>
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
