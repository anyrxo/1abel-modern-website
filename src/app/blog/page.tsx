'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { calculateBlogMetrics, formatBlogDate } from '@/utils/blogMetrics'
import { blogPosts, newsArticles } from '@/data/blogPosts'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import NumberTicker from '@/components/magicui/number-ticker'
import ShimmerButton from '@/components/magicui/shimmer-button'
import WordRotate from '@/components/magicui/word-rotate'
import BlurIn from '@/components/magicui/blur-in'
import { Header } from '@/components/Header'
import { ChevronRight, Clock, Eye, Heart, Share2, Calendar, Tag, Mail, Sparkles, TrendingUp, BookOpen, ArrowRight } from 'lucide-react'

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

      {/* Hero Section - Magical and Beautiful */}
      <section className="relative pt-32 pb-16 px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent animate-pulse" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedGradientText className="mb-8">
            <BookOpen className="w-4 h-4 mr-2" />
            Industry Insights & News
            <BookOpen className="w-4 h-4 ml-2" />
          </AnimatedGradientText>

          <BlurIn
            word="1ABEL BLOG"
            className="text-6xl md:text-8xl font-bold mb-8"
            duration={1}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Deep insights on <WordRotate words={rotatingWords} className="text-red-600 font-bold" /> 
            from the team revolutionizing how music careers are built
          </motion.p>

          {/* Blog Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
          >
            {[
              { value: totalMetrics.totalPosts, label: "Articles", icon: <BookOpen className="w-5 h-5" /> },
              { value: totalMetrics.totalReads, suffix: "+", label: "Total Reads", icon: <Eye className="w-5 h-5" /> },
              { value: totalMetrics.totalLikes, suffix: "+", label: "Likes", icon: <Heart className="w-5 h-5" /> },
              { value: totalMetrics.totalShares, suffix: "+", label: "Shares", icon: <Share2 className="w-5 h-5" /> }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                  {stat.icon}
                  <span className="text-sm">{stat.label}</span>
                </div>
                <div className="text-3xl font-bold text-red-600">
                  <NumberTicker value={stat.value} />{stat.suffix}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation - Beautiful */}
      <section className="px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-8 mb-12 border-b border-gray-800">
            <motion.button
              onClick={() => setActiveTab('general')}
              className={`pb-4 px-1 transition-all duration-300 relative ${
                activeTab === 'general'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Music & Brand
              {activeTab === 'general' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-600"
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('news')}
              className={`pb-4 px-1 transition-all duration-300 relative ${
                activeTab === 'news'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Industry News
              {activeTab === 'news' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-600"
                />
              )}
            </motion.button>
          </div>

          {/* Featured Post */}
          {currentPosts.length > 0 && (
            <motion.div
              key={`featured-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Link href={`/blog/${currentPosts[0].slug}`}>
                <motion.article
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-red-600/50 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative p-12">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <AnimatedGradientText>
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </AnimatedGradientText>
                      <span>•</span>
                      <time>{formatBlogDate(currentPosts[0].date)}</time>
                      <span>•</span>
                      <span className="text-red-600">{currentPosts[0].category}</span>
                      <span>•</span>
                      <span>{currentPosts[0].readTime}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white group-hover:text-red-600 transition-colors">
                      {currentPosts[0].title}
                    </h2>

                    <p className="text-xl text-gray-400 mb-8 max-w-3xl">
                      {currentPosts[0].excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <NumberTicker value={currentPosts[0].views} />
                        </span>
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          <NumberTicker value={currentPosts[0].likes} />
                        </span>
                        <span className="flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          <NumberTicker value={currentPosts[0].shares} />
                        </span>
                      </div>

                      <motion.span 
                        className="text-red-600 group-hover:text-white transition-colors inline-flex items-center font-semibold"
                        whileHover={{ x: 5 }}
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          )}

          {/* Blog Posts Grid - Beautiful Cards */}
          <motion.div
            key={`posts-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPosts.slice(1).map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-600/50 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      {/* Date and Category */}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <time className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatBlogDate(post.date)}
                        </time>
                        <span className="text-red-600 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views > 999 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                          </span>
                        </div>

                        <motion.div
                          className="text-red-600 group-hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-2xl border border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10" />
              
              <div className="relative z-10">
                <AnimatedGradientText className="mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Stay Ahead of the Industry
                  <Sparkles className="w-4 h-4 ml-2" />
                </AnimatedGradientText>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Get Weekly <span className="text-red-600">Insights</span>
                </h3>
                
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join industry leaders who receive our exclusive analysis on streaming trends, 
                  viral marketing strategies, and the future of music.
                </p>
                
                <ShimmerButton className="shadow-2xl">
                  <a 
                    href="mailto:anyro@1abel.com?subject=Newsletter%20Subscription"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe to Newsletter
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </ShimmerButton>
              </div>
            </div>
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