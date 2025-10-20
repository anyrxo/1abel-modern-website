'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function AccessoriesPage() {
  const products = [
    {
      id: 1,
      name: "Baseball Cap",
      price: "$35",
      image: "/placeholder-cap.jpg"
    },
    {
      id: 2,
      name: "Beanie",
      price: "$25",
      image: "/placeholder-beanie.jpg"
    },
    {
      id: 3,
      name: "Tote Bag",
      price: "$45",
      image: "/placeholder-tote.jpg"
    },
    {
      id: 4,
      name: "Socks",
      price: "$15",
      image: "/placeholder-socks.jpg"
    },
    {
      id: 5,
      name: "Belt",
      price: "$55",
      image: "/placeholder-belt.jpg"
    },
    {
      id: 6,
      name: "Scarf",
      price: "$40",
      image: "/placeholder-scarf.jpg"
    }
  ]

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="pt-28 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">ACCESSORIES</h1>
            <p className="text-gray-600 text-lg">Complete your look</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/accessories/${product.id}`}>
                  <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
