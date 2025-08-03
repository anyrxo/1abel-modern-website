'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Eye, Heart, Share2, Calendar, Tag, Mail, ArrowLeft, Sparkles, TrendingUp, Music, Globe, DollarSign, Users, Zap, ArrowRight, Copy, Twitter, Facebook, Linkedin } from 'lucide-react'
import Link from 'next/link'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import ShimmerButton from '@/components/magicui/shimmer-button'
import NumberTicker from '@/components/magicui/number-ticker'
import BlurIn from '@/components/magicui/blur-in'
import { formatBlogDate, getPostStats } from '@/utils/blogMetrics'

interface BlogPostClientProps {
  post: any
  content: JSX.Element
}

export function BlogPostClient({ post, content }: BlogPostClientProps) {
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const shareUrl = `https://1abel.com/blog/${post.slug}`
  const shareText = `Check out "${post.title}" by @1abel`
  const postStats = getPostStats(post)
  
  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank')
  }
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Hero Section */}
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

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8"
          >
            <AnimatedGradientText>
              <Sparkles className="w-3 h-3 mr-1" />
              {post.category}
            </AnimatedGradientText>
            <span>•</span>
            <time className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatBlogDate(post.date)}
            </time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <BlurIn
            word={post.title}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            duration={1}
          />

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl"
          >
            {post.excerpt}
          </motion.p>

          {/* Stats and Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-8 pb-8 border-b border-gray-800"
          >
            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <NumberTicker value={postStats.views} />
              </span>
              <motion.button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 transition-colors ${
                  liked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <NumberTicker value={postStats.likes + (liked ? 1 : 0)} />
              </motion.button>
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <NumberTicker value={postStats.shares} />
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => handleShare('twitter')}
                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => handleShare('facebook')}
                className="p-3 bg-gray-800 hover:bg-blue-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => handleShare('linkedin')}
                className="p-3 bg-gray-800 hover:bg-blue-800 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleCopy}
                className={`p-3 rounded-full transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative"
          >
            {content}
          </motion.article>

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
                  Join The Revolution
                  <Sparkles className="w-4 h-4 ml-2" />
                </AnimatedGradientText>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to <span className="text-red-600">Level Up</span> Your Music Career?
                </h3>
                
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join 1ABEL and experience the future of music labels. Fair deals, 
                  modern marketing, and a team that's genuinely invested in your success.
                </p>
                
                <a 
                  href="mailto:anyro@1abel.com?subject=Artist%20Application"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
                >
                  <Mail className="w-5 h-5 mr-2 text-white" />
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}