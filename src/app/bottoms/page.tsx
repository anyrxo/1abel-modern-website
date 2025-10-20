'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function BottomsPage() {
  const products = [
    {
      id: 1,
      name: "SNOW LEOPARD SWEATPANTS",
      price: "$120.00 AUD",
      image: "/placeholder-sweatpants.jpg",
      soldOut: false
    },
    {
      id: 2,
      name: "DISTRAUGHT SWEATPANTS",
      price: "$120.00 AUD",
      image: "/placeholder-sweatpants2.jpg",
      soldOut: false
    },
    {
      id: 3,
      name: "BAGGY JEANS - ASH",
      price: "$150.00 AUD",
      image: "/placeholder-jeans-ash.jpg",
      soldOut: false
    },
    {
      id: 4,
      name: "FLARED JEANS - ASH",
      price: "$150.00 AUD",
      image: "/placeholder-flared-ash.jpg",
      soldOut: false
    },
    {
      id: 5,
      name: "FLARED JEANS - SKY BLUE",
      price: "$150.00 AUD",
      image: "/placeholder-flared-blue.jpg",
      soldOut: false
    },
    {
      id: 6,
      name: "BAGGY JEANS - STRIPED",
      price: "$150.00 AUD",
      image: "/placeholder-jeans-striped.jpg",
      soldOut: true
    },
    {
      id: 7,
      name: "BOXERS (3 PACK)",
      price: "$50.00 AUD",
      image: "/placeholder-boxers.jpg",
      soldOut: false
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
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">BOTTOMS</h1>
            <p className="text-gray-600 text-lg">Comfort meets style</p>
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
                <Link href={`/bottoms/${product.id}`}>
                  <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                    {product.soldOut && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-sm font-semibold">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 uppercase tracking-wide">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.price}
                    {product.soldOut && <span className="ml-2 text-gray-400">— Sold Out</span>}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
