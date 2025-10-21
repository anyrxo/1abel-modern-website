'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { User, Package, Heart, Settings } from 'lucide-react'

export default function AccountPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="pt-28 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">ACCOUNT</h1>
            <p className="text-gray-600 text-base md:text-lg">Manage your 1ABEL experience</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: <User className="w-8 h-8" />,
                title: "Profile",
                description: "Update your personal information and preferences",
                href: "/account/profile"
              },
              {
                icon: <Package className="w-8 h-8" />,
                title: "Orders",
                description: "View and track your order history",
                href: "/account/orders"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Wishlist",
                description: "Saved items for later",
                href: "/account/wishlist"
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Settings",
                description: "Manage account settings and privacy",
                href: "/account/settings"
              }
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-2 border-black p-6 md:p-8 hover:bg-black hover:text-white transition-all duration-300 touch-manipulation"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-300">{item.description}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-6 md:p-8 bg-black text-white text-center"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4">Sign In</h2>
            <p className="text-sm md:text-base text-gray-400 mb-6">Sign in to access your account</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <button className="flex-1 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors text-sm tracking-wider uppercase font-medium touch-manipulation">
                Sign In
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-colors text-sm tracking-wider uppercase font-medium touch-manipulation">
                Create Account
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
