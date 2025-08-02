'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [currentArtist, setCurrentArtist] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const artists = [
    {
      name: "The Weeknd",
      role: "Artist",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=80",
      featured: "After Hours"
    },
    {
      name: "Drake", 
      role: "Artist & Producer",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80",
      featured: "For All The Dogs"
    },
    {
      name: "PARTYNEXTDOOR",
      role: "Artist & Songwriter",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
      featured: "PARTYMOBILE"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArtist((prev) => (prev + 1) % artists.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold text-white"
            >
              1ABEL
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
            1ABEL
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#artists" className="text-white/70 hover:text-white transition-colors">Artists</Link>
            <Link href="#releases" className="text-white/70 hover:text-white transition-colors">Releases</Link>
            <Link href="#videos" className="text-white/70 hover:text-white transition-colors">Videos</Link>
            <Link href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - OVO Style */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArtist}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
            <img
              src={artists[currentArtist].image}
              alt={artists[currentArtist].name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtist}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <p className="text-white/60 text-sm font-medium mb-2">{artists[currentArtist].role}</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
                {artists[currentArtist].name}
              </h1>
              <p className="text-white/80 text-xl mb-8">Featured: {artists[currentArtist].featured}</p>
              <button className="px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors">
                EXPLORE
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Artist Selector */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentArtist(index)}
              className={`w-12 h-1 transition-all ${
                index === currentArtist ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Latest Releases - Grid Style */}
      <section id="releases" className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Latest Releases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Die For You",
                artist: "The Weeknd",
                cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80",
                type: "Single"
              },
              {
                title: "Search & Rescue",
                artist: "Drake",
                cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80",
                type: "Single"
              },
              {
                title: "Her Old Friends",
                artist: "PARTYNEXTDOOR",
                cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
                type: "EP"
              },
              {
                title: "Starboy",
                artist: "The Weeknd ft. Daft Punk",
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
                type: "Album"
              },
              {
                title: "One Dance",
                artist: "Drake",
                cover: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80",
                type: "Single"
              },
              {
                title: "Loyal",
                artist: "PARTYNEXTDOOR ft. Drake",
                cover: "https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=400&q=80",
                type: "Single"
              }
            ].map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-900 mb-4">
                  <img
                    src={release.cover}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm">{release.type}</p>
                <h3 className="text-white font-medium text-lg">{release.title}</h3>
                <p className="text-white/60">{release.artist}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Videos Section */}
      <section id="videos" className="bg-black py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Music Videos</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-video bg-gray-900 relative group cursor-pointer overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
                alt="Music Video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-white border-b-10 border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-2xl font-bold">Blinding Lights</h3>
                <p className="text-white/80">The Weeknd</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Hotline Bling", artist: "Drake" },
                { title: "Come and See Me", artist: "PARTYNEXTDOOR" },
                { title: "I Feel It Coming", artist: "The Weeknd" },
                { title: "God's Plan", artist: "Drake" }
              ].map((video, index) => (
                <div
                  key={video.title}
                  className="aspect-video bg-gray-900 relative group cursor-pointer overflow-hidden"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${1493225457124 + index}-a3eb161ffa5f?w=400&q=80`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h4 className="text-white font-medium">{video.title}</h4>
                    <p className="text-white/60 text-sm">{video.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="bg-black py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Artists</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "The Weeknd",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
                genre: "R&B / Pop"
              },
              {
                name: "Drake",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
                genre: "Hip-Hop / R&B"
              },
              {
                name: "PARTYNEXTDOOR",
                image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
                genre: "R&B / Soul"
              },
              {
                name: "Majid Jordan",
                image: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=600&q=80",
                genre: "Electronic / R&B"
              },
              {
                name: "dvsn",
                image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
                genre: "R&B / Soul"
              },
              {
                name: "Roy Woods",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80",
                genre: "R&B / Hip-Hop"
              }
            ].map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-gray-900 mb-4">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-white text-xl font-medium">{artist.name}</h3>
                <p className="text-white/60">{artist.genre}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Contact</h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            For business inquiries, booking requests, and general information
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div>
              <p className="text-white/40 text-sm mb-2">General Inquiries</p>
              <a href="mailto:info@1abel.com" className="text-white text-lg hover:opacity-80 transition-opacity">
                info@1abel.com
              </a>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div>
              <p className="text-white/40 text-sm mb-2">Press</p>
              <a href="mailto:press@1abel.com" className="text-white text-lg hover:opacity-80 transition-opacity">
                press@1abel.com
              </a>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div>
              <p className="text-white/40 text-sm mb-2">Booking</p>
              <a href="mailto:booking@1abel.com" className="text-white text-lg hover:opacity-80 transition-opacity">
                booking@1abel.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/40 text-sm">&copy; 2024 1ABEL. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">YouTube</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Spotify</a>
          </div>
        </div>
      </footer>
    </>
  )
}