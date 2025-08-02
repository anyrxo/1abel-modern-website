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
import { ChevronRight, Clock, Eye, Heart, Share2, Calendar, Tag } from 'lucide-react'

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
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <AnimatedGradientText className="mb-6">
              🎵 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
              <span className="inline animate-gradient bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
                1ABEL Blog & Insights
              </span>
            </AnimatedGradientText>
          </motion.div>

          <BlurIn
            word="Where Music Meets Innovation"
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent"
            duration={1.2}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Discover insights about{" "}
            <WordRotate
              words={rotatingWords}
              className="text-red-400 font-bold"
              duration={3000}
            />
          </motion.div>

          {/* Blog Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
          >
            <div className="text-center">
              <NumberTicker value={totalMetrics.totalPosts} className="text-3xl font-bold text-red-400" />
              <p className="text-sm text-gray-400 mt-1">Articles</p>
            </div>
            <div className="text-center">
              <NumberTicker value={totalMetrics.totalViews} className="text-3xl font-bold text-red-400" />
              <p className="text-sm text-gray-400 mt-1">Views</p>
            </div>
            <div className="text-center">
              <NumberTicker value={totalMetrics.totalLikes} className="text-3xl font-bold text-red-400" />
              <p className="text-sm text-gray-400 mt-1">Likes</p>
            </div>
            <div className="text-center">
              <NumberTicker value={totalMetrics.averageReadTime} className="text-3xl font-bold text-red-400" />
              <p className="text-sm text-gray-400 mt-1">Avg Read</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-900/50 rounded-full p-1 backdrop-blur">
              <button
                onClick={() => setActiveTab('general')}
                className={`px-8 py-3 rounded-full transition-all duration-300 ${
                  activeTab === 'general'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Music & Brand ({blogPosts.length})
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-8 py-3 rounded-full transition-all duration-300 ${
                  activeTab === 'news'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Industry News ({newsArticles.length})
              </button>
            </div>
          </div>

          {/* Current Tab Metrics */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto"
          >
            <div className="text-center p-4 bg-gray-900/30 rounded-lg backdrop-blur">
              <Eye className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <NumberTicker value={currentMetrics.totalViews} className="text-2xl font-bold text-white" />
              <p className="text-sm text-gray-400">Total Views</p>
            </div>
            <div className="text-center p-4 bg-gray-900/30 rounded-lg backdrop-blur">
              <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <NumberTicker value={currentMetrics.totalLikes} className="text-2xl font-bold text-white" />
              <p className="text-sm text-gray-400">Total Likes</p>
            </div>
            <div className="text-center p-4 bg-gray-900/30 rounded-lg backdrop-blur">
              <Clock className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <NumberTicker value={currentMetrics.averageReadTime} className="text-2xl font-bold text-white" />
              <p className="text-sm text-gray-400">Avg Minutes</p>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            key={`posts-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPosts.map((post, index) => (
              <AnimatedCard
                key={post.id}
                hoverEffect={index % 5 === 0 ? 'glow' : index % 3 === 0 ? 'tilt' : 'lift'}
                glowColor="red"
                delay={index * 100}
                className="bg-gray-900/50 backdrop-blur rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50"
              >
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${post.categoryColor}-500/20 text-${post.categoryColor}-400 border border-${post.categoryColor}-500/30`}>
                      <Tag className="w-3 h-3 inline mr-1" />
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {formatBlogDate(post.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {Math.floor(Math.random() * 5000 + 1000)}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {Math.floor(Math.random() * 200 + 50)}
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <ShimmerButton
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
                    shimmerColor="#ef4444"
                    background="linear-gradient(135deg, #dc2626, #b91c1c)"
                  >
                    Read Article
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </ShimmerButton>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>

          {/* Load More Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <ShimmerButton
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4"
              shimmerColor="#ffffff"
              background="linear-gradient(135deg, #374151, #1f2937)"
            >
              Load More Articles
              <ChevronRight className="w-5 h-5 ml-2" />
            </ShimmerButton>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <BlurIn
            word="Stay In The Loop"
            className="text-3xl md:text-4xl font-bold mb-4"
            duration={0.8}
          />
          <p className="text-gray-300 text-lg mb-8">
            Get the latest music industry insights and 1ABEL updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <ShimmerButton
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              shimmerColor="#ef4444"
              background="linear-gradient(135deg, #dc2626, #b91c1c)"
            >
              Subscribe
            </ShimmerButton>
          </div>
        </div>
      </section>
    </div>
  )
}