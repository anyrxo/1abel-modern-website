'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { calculateBlogMetrics, formatBlogDate } from '@/utils/blogMetrics'
import { blogPosts, newsArticles } from '@/data/blogPosts'
import AnimatedCard from '@/components/AnimatedCard'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import NumberTicker from '@/components/magicui/number-ticker'
import ShimmerButton from '@/components/magicui/shimmer-button'
import WordRotate from '@/components/magicui/word-rotate'
import BlurIn from '@/components/magicui/blur-in'
import { Header } from '@/components/Header'
import { ChevronRight, Clock, Eye, Heart, Share2, Calendar, Tag, Mail } from 'lucide-react'

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'news'>('general')
  const [isLoaded, setIsLoaded] = useState(false)

  // Calculate metrics for both post types
  const generalMetrics = calculateBlogMetrics(blogPosts)
  const newsMetrics = calculateBlogMetrics(newsArticles)
  const totalMetrics = calculateBlogMetrics([...blogPosts, ...newsArticles])

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  const currentPosts = activeTab === 'general' ? blogPosts : newsArticles
  const currentMetrics = activeTab === 'general' ? generalMetrics : newsMetrics

  const rotatingWords = [
    "Music Discovery",
    "Artist Growth", 
    "Streaming Insights",
    "Industry Trends",
    "Music Technology"
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section - Minimal and Clean */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4"
          >
            <span className="text-red-600">1</span>ABEL BLOG
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Insights on modern music, streaming strategy, and building Australia's most advanced music label.
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation - Simple */}
      <section className="px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-8 mb-12 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('general')}
              className={`pb-4 px-1 transition-all duration-300 ${
                activeTab === 'general'
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Music & Brand
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`pb-4 px-1 transition-all duration-300 ${
                activeTab === 'news'
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Industry News
            </button>
          </div>

          {/* Blog Posts Grid */}
          <motion.div
            key={`posts-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="border-b border-gray-800 pb-8 mb-8 hover:border-gray-700 transition-colors">
                    {/* Date and Category */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <time>{formatBlogDate(post.date)}</time>
                      <span className="text-red-600">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <span className="text-red-600 group-hover:text-white transition-colors inline-flex items-center">
                      Read Article
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Simple Footer */}
      <footer className="mt-20 py-12 border-t border-gray-800 px-8">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 1ABEL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}