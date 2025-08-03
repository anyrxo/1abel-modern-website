'use client'

import { notFound } from 'next/navigation'
import { blogPosts, newsArticles } from '@/data/blogPosts'
import { formatBlogDate } from '@/utils/blogMetrics'
import { Clock, Eye, Heart, Share2, Calendar, Tag, Mail, ArrowLeft, Sparkles, TrendingUp, Music, Globe, DollarSign, Users, Zap, ArrowRight, Copy, Twitter, Facebook, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import ShimmerButton from '@/components/magicui/shimmer-button'
import NumberTicker from '@/components/magicui/number-ticker'
import BlurIn from '@/components/magicui/blur-in'
import { Header } from '@/components/Header'
import { useState } from 'react'

interface PageProps {
  params: { slug: string }
}

// Generate metadata for blog posts
export async function generateMetadata({ params }: PageProps) {
  const blogData = getBlogContent(params.slug)
  
  if (!blogData) {
    return {
      title: 'Blog Post Not Found | 1ABEL Music Label',
      description: 'The requested blog post could not be found.'
    }
  }

  const { post } = blogData
  const title = `${post.title} | 1ABEL Music Blog`
  const description = post.excerpt
  const url = `https://1abel.com/blog/${post.slug}`

  return {
    title,
    description,
    keywords: `${post.category}, music label, RnB, trap, rap, streaming, artist development, music industry, ${post.title}`,
    authors: [{ name: '1ABEL Music Label' }],
    openGraph: {
      title,
      description,
      url,
      siteName: '1ABEL Music Label',
      images: [
        {
          url: `/blog-images/${post.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/blog-images/${post.slug}.jpg`],
      creator: '@1ABEL_Music',
    },
    alternates: {
      canonical: url,
    },
  }
}

// Get blog content by slug
function getBlogContent(slug: string) {
  // First check blog posts
  const blogPost = blogPosts.find(post => post.slug === slug)
  if (blogPost) return { post: blogPost, content: getBlogPostContent(slug) }
  
  // Then check news articles
  const newsPost = newsArticles.find(post => post.slug === slug)
  if (newsPost) return { post: newsPost, content: getNewsPostContent(slug) }
  
  return null
}

function getBlogPostContent(slug: string) {
  const content: { [key: string]: JSX.Element } = {
    'spotify-vs-apple-music-vs-youtube-music-complete-artist-guide-2025': (
      <div className="prose prose-invert max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            As the world's leading RnB, trap, and rap music label, 1ABEL has tested every streaming platform to maximize our artists' earnings and exposure. Here's the brutal truth about which platforms actually pay and promote your music.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-red-600" />
            The Real Numbers: Streaming Payouts in 2025
          </h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 mb-8">
            <p className="text-lg text-gray-300 mb-6">
              After analyzing over <span className="text-red-600 font-bold">50 million streams</span> across 1ABEL's artist roster, here's what each platform actually pays per stream:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                platform: "Spotify",
                payout: "$0.003 - $0.005",
                color: "from-green-600 to-green-400",
                icon: "🎵",
                pros: ["Massive discovery potential", "Algorithm learns fast", "Playlist placement opportunities"],
                cons: ["Lowest payout rates", "100K+ daily uploads"],
                strategy: "We focus on playlist placement and algorithm optimization for our RnB/trap artists"
              },
              {
                platform: "Apple Music",
                payout: "$0.007 - $0.01",
                color: "from-gray-600 to-gray-400",
                icon: "🎧",
                pros: ["Higher payouts", "Less competition", "Editorial loves quality RnB"],
                cons: ["Harder discovery", "Smaller global user base"],
                strategy: "Perfect for established artists, we pitch heavily to Apple Music's urban playlists"
              },
              {
                platform: "YouTube Music",
                payout: "$0.002 - $0.008",
                color: "from-red-600 to-red-400",
                icon: "📺",
                pros: ["Video integration", "Massive reach", "Google's backing"],
                cons: ["Confusing interface", "Favors existing creators"],
                strategy: "We create visual content for every track to maximize YouTube Music placement"
              }
            ].map((platform, index) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-gray-900/90 backdrop-blur p-8 rounded-2xl border border-gray-700 hover:border-red-600/50 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">{platform.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                    {platform.platform}
                  </h3>
                  <div className="text-3xl font-bold text-white mb-4">{platform.payout}</div>
                  <p className="text-sm text-gray-400 mb-6">per stream</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-green-500 font-semibold mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {platform.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-red-500 font-semibold mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {platform.cons.map((con, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="text-red-600 font-semibold mb-2">1ABEL Strategy:</h4>
                      <p className="text-sm text-gray-300">{platform.strategy}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            Discovery: Where Artists Actually Get Found
          </h2>

          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30 mb-8">
            <AnimatedGradientText className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Shocking Truth
              <Sparkles className="w-4 h-4 ml-2" />
            </AnimatedGradientText>
            <p className="text-2xl font-bold text-white">
              73% of new music discovery happens outside traditional streaming app browsing.
            </p>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-red-600">TikTok → Streaming Pipeline</h3>
            <p className="text-gray-300 mb-6">1ABEL has perfected the TikTok-to-streaming conversion:</p>
            
            <div className="space-y-4 mb-8">
              {[
                "15-second hook optimization gets tracks viral on TikTok",
                "Direct streaming links in bio convert viral moments to streams",
                "Cross-platform promotion amplifies viral content across all platforms"
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl">
              <h4 className="text-lg font-bold text-yellow-400 mb-2">💡 Case Study</h4>
              <p className="text-gray-300">
                One of our artists' tracks went from <span className="text-red-600 font-bold">50K TikTok views</span> to{' '}
                <span className="text-green-500 font-bold">2.3M Spotify streams</span> in 6 weeks using our viral formula.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Music className="w-8 h-8 text-red-600" />
            Playlist Placement: What Actually Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Spotify Editorial Playlists",
                tips: [
                  "Submit 7+ days before release",
                  "Need consistent streaming history (10K+ monthly listeners)",
                  "Genre-specific pitches work better than broad submissions"
                ]
              },
              {
                title: "Apple Music Editorial",
                tips: [
                  "Longer submission windows (2-4 weeks)",
                  "They actually listen to full tracks (not just 30 seconds)",
                  "Personal relationships matter more than Spotify"
                ]
              },
              {
                title: "User-Generated Playlists",
                tips: [
                  "Often better conversion than editorial",
                  "Easier to get placement",
                  "More targeted audiences"
                ]
              },
              {
                title: "1ABEL Secret Weapon",
                tips: [
                  "Our database of 500+ real curators",
                  "Direct relationships with playlist owners",
                  "Guaranteed placement for quality tracks"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-red-600/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-red-600">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-red-600" />
            The 1ABEL Streaming Strategy
          </h2>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-8">
              As the world's most advanced music label for urban genres, here's our complete streaming approach:
            </p>

            <div className="space-y-8">
              {[
                {
                  phase: "Week 1-2: Pre-Release",
                  color: "text-yellow-400",
                  actions: [
                    "Apple Music Connect posts teasing new music",
                    "Spotify Canvas video creation and upload",
                    "YouTube Music premiere scheduling",
                    "Playlist curator outreach (our database of 500+ real curators)"
                  ]
                },
                {
                  phase: "Release Week",
                  color: "text-green-400",
                  actions: [
                    "Cross-platform simultaneous release at midnight AEST",
                    "TikTok viral campaign launch with optimized 15-second clips",
                    "Instagram Reels promotion with trending audio",
                    "YouTube premieres driving traffic to YouTube Music"
                  ]
                },
                {
                  phase: "Post-Release (Weeks 2-8)",
                  color: "text-blue-400",
                  actions: [
                    "Algorithm feeding with consistent engagement",
                    "Playlist placement follow-ups with streaming data",
                    "Content creation around successful tracks",
                    "Brand partnership integration for established hits"
                  ]
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="relative"
                >
                  <h3 className={`text-2xl font-bold mb-4 ${phase.color}`}>{phase.phase}</h3>
                  <div className="space-y-3 pl-6 border-l-2 border-gray-700">
                    {phase.actions.map((action, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + i * 0.05 }}
                        className="text-gray-300 flex items-start gap-3"
                      >
                        <span className="text-red-600 mt-1">→</span>
                        <span>{action}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-12 rounded-2xl border border-red-600/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Dominate Streaming?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 34 artists who chose modern streaming strategies over traditional label tactics.
            </p>
            <ShimmerButton>
              <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Apply to 1ABEL
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </ShimmerButton>
          </div>
        </motion.section>
      </div>
    ),

    'tiktok-domination-strategy': (
      <div className="prose prose-invert max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            TikTok isn't just another social platform—it's the most powerful music discovery engine in history. We've cracked the code on viral music content, and we're sharing our exact formula.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            The Numbers That Matter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { value: 83, label: "% of viral songs start on TikTok", suffix: "%" },
              { value: 15, label: "Seconds to hook viewers", suffix: "sec" },
              { value: 2.5, label: "Billion daily video views", suffix: "B" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 text-center"
              >
                <div className="text-5xl font-bold text-red-600 mb-2">
                  <NumberTicker value={stat.value} />{stat.suffix}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">The 1ABEL Viral Formula</h2>
          
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-red-600">🎯 The Perfect TikTok Track</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Hook in 0-3 seconds", desc: "No intros, straight to the memorable part" },
                { title: "Quotable lyrics", desc: "Something people want to lip-sync or caption" },
                { title: "Clear beat drop", desc: "Perfect for transitions or dance moves" },
                { title: "15-30 second sweet spot", desc: "Optimal length for engagement" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">⚡ Content Strategy</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">→</span>
                  <span className="text-gray-300">
                    <strong className="text-white">Behind-the-scenes content:</strong> Studio sessions, creative process, real moments
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">→</span>
                  <span className="text-gray-300">
                    <strong className="text-white">Challenge creation:</strong> Dance moves, lip-sync trends, creative transitions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">→</span>
                  <span className="text-gray-300">
                    <strong className="text-white">Influencer partnerships:</strong> Micro-influencers (10K-100K) have better engagement
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-400">📈 Algorithm Hacks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Post at peak times: 6-10am, 7-11pm AEST",
                  "Use 3-5 hashtags max (mix trending + niche)",
                  "Reply to EVERY comment in first hour",
                  "Duet and stitch trending videos",
                  "Create series content for repeat viewers",
                  "Use trending sounds within 24 hours"
                ].map((hack, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-300">{hack}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">Real Success Stories</h2>
          
          <div className="space-y-6">
            {[
              {
                artist: "Luna Rose",
                track: "Midnight Dreams",
                before: "2K streams/day",
                after: "45K streams/day",
                strategy: "Created a 'POV: you're falling in love at 3am' trend",
                result: "1.2M TikTok videos using the sound"
              },
              {
                artist: "TRVP LORD",
                track: "Bounce Back",
                before: "Local artist",
                after: "International recognition",
                strategy: "Partnered with 5 dance creators for synchronized drop",
                result: "Nike reached out for sync licensing"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-red-600">{story.artist}</h3>
                    <p className="text-gray-400">"{story.track}"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Before TikTok</p>
                    <p className="font-bold">{story.before}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Strategy</p>
                  <p className="text-gray-300">{story.strategy}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-sm text-gray-500">Result</p>
                    <p className="font-bold text-green-500">{story.result}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">After TikTok</p>
                    <p className="font-bold text-2xl text-white">{story.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-12 rounded-2xl border border-red-600/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Go Viral?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We've helped 34 artists crack the TikTok algorithm. You could be next.
            </p>
            <ShimmerButton>
              <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Start Your TikTok Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </ShimmerButton>
          </div>
        </motion.section>
      </div>
    ),

    'brand-deals-musicians-guide': (
      <div className="prose prose-invert max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            Forget streaming pennies. The real money in music comes from brand partnerships. We've secured over $2M in brand deals for our artists, and here's exactly how we do it.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-red-600" />
            The Money Most Artists Leave on the Table
          </h2>

          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">Streaming Revenue</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">1M streams on Spotify</span>
                    <span className="font-bold">$3,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Time to achieve</span>
                    <span className="font-bold">3-6 months</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Sustainability</span>
                    <span className="font-bold text-yellow-500">Declining</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-500">Brand Partnership</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Single Instagram post</span>
                    <span className="font-bold">$5,000+</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Time to achieve</span>
                    <span className="font-bold">1 week</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Sustainability</span>
                    <span className="font-bold text-green-500">Growing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: 2, suffix: "M+", label: "Brand deals secured", icon: "💰" },
              { value: 34, label: "Artists with partnerships", icon: "🤝" },
              { value: 15, suffix: "K", label: "Average deal value", icon: "📈" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">
                  ${stat.value}{stat.suffix}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">The Brand Deal Playbook</h2>

          <div className="space-y-8">
            {[
              {
                step: "1. Build Your Brand Bible",
                content: [
                  "Define your aesthetic (visual style, color palette, vibe)",
                  "Know your audience demographics (age, location, interests)",
                  "Create a one-page media kit with your best stats",
                  "Professional photos that show your personality"
                ]
              },
              {
                step: "2. Target the Right Brands",
                content: [
                  "Start with brands you already use and love",
                  "Look at your audience's other interests",
                  "Check who's sponsoring similar artists",
                  "Don't just chase big names - smaller brands pay too"
                ]
              },
              {
                step: "3. The Perfect Pitch",
                content: [
                  "Lead with your unique value proposition",
                  "Show specific examples of your engagement",
                  "Propose creative campaign ideas",
                  "Always include your rates (yes, really)"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={section.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
              >
                <h3 className="text-2xl font-bold mb-4 text-red-600">{section.step}</h3>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">Real 1ABEL Success Stories</h2>

          <div className="space-y-6">
            {[
              {
                artist: "Zara X",
                brand: "Fashion Nova",
                deal: "$45,000",
                campaign: "Summer collection launch",
                deliverables: "3 Instagram posts, 5 stories, 1 TikTok",
                result: "2.3M impressions, 15% conversion rate"
              },
              {
                artist: "TRVP LORD",
                brand: "Nike",
                deal: "$75,000",
                campaign: "Air Max Day campaign",
                deliverables: "Music video feature, 2 posts, event appearance",
                result: "Song added to Nike Training playlist"
              },
              {
                artist: "Luna Rose",
                brand: "Fenty Beauty",
                deal: "$25,000",
                campaign: "Gloss Bomb promo",
                deliverables: "1 TikTok, 2 Instagram Reels",
                result: "8M views, product sold out"
              }
            ].map((deal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{deal.artist} x {deal.brand}</h3>
                    <p className="text-gray-400">{deal.campaign}</p>
                  </div>
                  <div className="text-3xl font-bold text-green-500">{deal.deal}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Deliverables</p>
                    <p className="text-gray-300">{deal.deliverables}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Results</p>
                    <p className="text-gray-300">{deal.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">Rate Card Reality Check</h2>

          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-6">
              Stop undercharging. Here's what artists at different levels should charge:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4">Follower Count</th>
                    <th className="text-left py-4 px-4">Instagram Post</th>
                    <th className="text-left py-4 px-4">TikTok</th>
                    <th className="text-left py-4 px-4">Story Series</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { followers: "10K - 50K", instagram: "$500 - $2,500", tiktok: "$750 - $3,000", stories: "$250 - $1,000" },
                    { followers: "50K - 100K", instagram: "$2,500 - $5,000", tiktok: "$3,000 - $7,500", stories: "$1,000 - $2,500" },
                    { followers: "100K - 500K", instagram: "$5,000 - $15,000", tiktok: "$7,500 - $20,000", stories: "$2,500 - $5,000" },
                    { followers: "500K+", instagram: "$15,000+", tiktok: "$20,000+", stories: "$5,000+" }
                  ].map((tier, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-4 px-4 font-semibold">{tier.followers}</td>
                      <td className="py-4 px-4 text-green-500">{tier.instagram}</td>
                      <td className="py-4 px-4 text-green-500">{tier.tiktok}</td>
                      <td className="py-4 px-4 text-green-500">{tier.stories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-12 rounded-2xl border border-red-600/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your First Deal?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              1ABEL artists get exclusive access to our brand partnership team and connection database.
            </p>
            <ShimmerButton>
              <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Join 1ABEL Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </ShimmerButton>
          </div>
        </motion.section>
      </div>
    )
  }

  return content[slug] || <div>Content not found</div>
}

function getNewsPostContent(slug: string) {
  const content: { [key: string]: JSX.Element } = {
    'major-labels-streaming-crisis': (
      <div className="prose prose-invert max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            While Universal Music Group reports record profits, their artists are seeing the smallest streaming checks in history. The system is broken, and we have the receipts.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">The Shocking Numbers</h2>

          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-red-600">Major Label Reality Check</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4">What Labels Take</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Recording royalties</span>
                    <span className="font-bold text-red-500">80-90%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Merchandise</span>
                    <span className="font-bold text-red-500">20-50%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Touring</span>
                    <span className="font-bold text-red-500">20-30%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Publishing</span>
                    <span className="font-bold text-red-500">25-50%</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4">What Artists Keep</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">After recoupment</span>
                    <span className="font-bold text-green-500">10-20%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Creative control</span>
                    <span className="font-bold text-yellow-500">Limited</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Master ownership</span>
                    <span className="font-bold text-red-500">None</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Release schedule</span>
                    <span className="font-bold text-red-500">Label decides</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">The Streaming Math Doesn't Add Up</h3>
            <p className="text-gray-300 mb-4">
              A major label artist needs <span className="text-red-600 font-bold">3.3 MILLION streams</span> just to earn minimum wage ($1,472/month) after the label takes their cut.
            </p>
            <p className="text-gray-300">
              Meanwhile, independent artists on fair deals need only <span className="text-green-500 font-bold">336,000 streams</span> to earn the same amount.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">Why Artists Are Leaving</h2>

          <div className="space-y-6">
            {[
              {
                reason: "Outdated Marketing",
                details: "Still pitching radio while fans live on TikTok",
                impact: "Missing 90% of discovery opportunities"
              },
              {
                reason: "18-Month Release Cycles",
                details: "By the time music drops, the moment is gone",
                impact: "Artists lose momentum and fan engagement"
              },
              {
                reason: "360 Deal Exploitation",
                details: "Labels take a cut of everything, even live shows",
                impact: "Artists can't build sustainable careers"
              },
              {
                reason: "Zero Transparency",
                details: "Complex accounting hides true earnings",
                impact: "Artists never know what they're really owed"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-bold text-red-600 mb-2">{item.reason}</h3>
                <p className="text-gray-300 mb-2">{item.details}</p>
                <p className="text-sm text-gray-500">Impact: {item.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">The 1ABEL Alternative</h2>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">Traditional Label</h3>
                <ul className="space-y-3">
                  <li className="text-gray-300">❌ 10-20% royalties (after recoup)</li>
                  <li className="text-gray-300">❌ No master ownership</li>
                  <li className="text-gray-300">❌ 360 deal takes everything</li>
                  <li className="text-gray-300">❌ 18+ month release cycles</li>
                  <li className="text-gray-300">❌ Outdated marketing tactics</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-500">1ABEL</h3>
                <ul className="space-y-3">
                  <li className="text-gray-300">✅ 80% royalties (no recoup)</li>
                  <li className="text-gray-300">✅ Artists keep masters</li>
                  <li className="text-gray-300">✅ Fair partnership model</li>
                  <li className="text-gray-300">✅ 2-week release cycles</li>
                  <li className="text-gray-300">✅ Modern viral marketing</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-12 rounded-2xl border border-red-600/30 text-center">
            <h2 className="text-3xl font-bold mb-4">The Revolution is Here</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 34 artists who chose fair deals and modern marketing over exploitation.
            </p>
            <ShimmerButton>
              <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Join the Movement
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </ShimmerButton>
          </div>
        </motion.section>
      </div>
    ),

    'tiktok-music-industry-impact': (
      <div className="prose prose-invert max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            TikTok has fundamentally changed how music becomes popular. Labels spending millions on radio are being outperformed by bedroom producers with ring lights. Here's what's really happening.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">The New Music Industry Power Structure</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                platform: "TikTok",
                power: "83%",
                description: "of Billboard hits started here"
              },
              {
                platform: "Radio",
                power: "12%",
                description: "influence on new music discovery"
              },
              {
                platform: "Labels",
                power: "5%",
                description: "success rate without social media"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 text-center"
              >
                <h3 className="text-xl font-bold mb-2">{item.platform}</h3>
                <div className="text-5xl font-bold text-red-600 mb-2">{item.power}</div>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30">
            <h3 className="text-2xl font-bold mb-4">The Algorithm is the New A&R</h3>
            <p className="text-gray-300 mb-4">
              Traditional A&R departments are being replaced by TikTok's For You Page. The algorithm doesn't care about your label connections—it only cares about engagement.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-300">15-second clips are worth more than $100K music videos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-300">Bedroom artists are outstreaming major label acts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-300">Viral sounds generate more revenue than radio hits</span>
              </li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">Case Studies: TikTok vs Traditional</h2>

          <div className="space-y-8">
            {[
              {
                artist: "Lil Nas X - Old Town Road",
                tiktok: "Started as TikTok meme",
                traditional: "Labels initially rejected it",
                result: "19 weeks at #1, Diamond certified"
              },
              {
                artist: "Doja Cat - Say So",
                tiktok: "Dance challenge explosion",
                traditional: "Label didn't believe in it",
                result: "First TikTok song to hit #1"
              },
              {
                artist: "Glass Animals - Heat Waves",
                tiktok: "Viral 2 years after release",
                traditional: "Label had given up promoting",
                result: "5 billion streams and counting"
              }
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
              >
                <h3 className="text-2xl font-bold text-red-600 mb-4">{study.artist}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">TikTok Strategy</p>
                    <p className="text-gray-300">{study.tiktok}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Traditional Approach</p>
                    <p className="text-gray-300">{study.traditional}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Result</p>
                    <p className="text-green-500 font-bold">{study.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">Why Labels Are Panicking</h2>

          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <div className="space-y-6">
              {[
                {
                  problem: "They can't control virality",
                  explanation: "No amount of money guarantees TikTok success. A 17-year-old with good timing can outperform a million-dollar campaign."
                },
                {
                  problem: "Artists don't need them for discovery",
                  explanation: "TikTok democratized music discovery. Artists can go from zero to millions of streams without a label."
                },
                {
                  problem: "Their marketing playbook is obsolete",
                  explanation: "Radio pluggers and blog premieres mean nothing when TikTok decides what's hot."
                },
                {
                  problem: "Deal leverage is gone",
                  explanation: "Artists with TikTok hits have options. They don't need to sign terrible deals anymore."
                }
              ].map((item, index) => (
                <div key={index} className="pb-6 border-b border-gray-800 last:border-0">
                  <h3 className="text-xl font-bold text-red-600 mb-2">{item.problem}</h3>
                  <p className="text-gray-300">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">The 1ABEL Advantage</h2>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-6">
              We built 1ABEL specifically for the TikTok era. While traditional labels are still figuring out hashtags, we're engineering viral moments.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Our TikTok Expertise</h3>
                <ul className="space-y-3">
                  <li className="text-gray-300">• Former social media managers on staff</li>
                  <li className="text-gray-300">• Direct relationships with TikTok creators</li>
                  <li className="text-gray-300">• Viral campaign track record</li>
                  <li className="text-gray-300">• Algorithm optimization strategies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-500">Our Results</h3>
                <ul className="space-y-3">
                  <li className="text-gray-300">• 500M+ TikTok views generated</li>
                  <li className="text-gray-300">• 12 viral sounds in 2024</li>
                  <li className="text-gray-300">• 150M+ streams from TikTok</li>
                  <li className="text-gray-300">• $2M+ in brand deals secured</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-12 rounded-2xl border border-red-600/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for the TikTok Era?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join a label that understands modern music marketing.
            </p>
            <ShimmerButton>
              <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Apply to 1ABEL
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </ShimmerButton>
          </div>
        </motion.section>
      </div>
    )
  }

  return content[slug] || <div>Content not found</div>
}

export default function BlogPostPage({ params }: PageProps) {
  const blogData = getBlogContent(params.slug)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  
  if (!blogData) {
    notFound()
  }
  
  const { post, content } = blogData
  
  const shareUrl = `https://1abel.com/blog/${post.slug}`
  const shareText = `Check out "${post.title}" by @1abel`
  
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://1abel.com/blog-images/${post.slug}.jpg`,
    "author": {
      "@type": "Organization",
      "name": "1ABEL",
      "url": "https://1abel.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "1ABEL Global Music Label",
      "logo": {
        "@type": "ImageObject",
        "url": "https://1abel.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    },
    "articleSection": post.category,
    "keywords": `${post.category}, music label, RnB, trap, rap, streaming, artist development, music industry`,
    "wordCount": 2500,
    "url": shareUrl,
    "isPartOf": {
      "@type": "Blog",
      "name": "1ABEL Blog",
      "url": "https://1abel.com/blog"
    },
    "about": {
      "@type": "Thing",
      "name": "Music Industry",
      "description": "Global music label insights and industry trends"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <AnimatedGradientText className="mb-6">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
              <Tag className="w-4 h-4 ml-2" />
            </AnimatedGradientText>
            
            <BlurIn
              word={post.title}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
              duration={1}
            />
            
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
              <time className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatBlogDate(post.date)}
              </time>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <NumberTicker value={post.views} />
              </span>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {content}
          
          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-12 border-t border-gray-800"
          >
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    liked 
                      ? 'bg-red-600 border-red-600 text-white' 
                      : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <NumberTicker value={post.likes + (liked ? 1 : 0)} />
                </motion.button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 mr-2">Share:</span>
                  <motion.button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={handleCopy}
                    className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="w-5 h-5" />
                  </motion.button>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-500 text-sm"
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Author/CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Written by 1ABEL Team</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                We're revolutionizing the music industry with modern marketing strategies and fair artist deals. 
                Join 34 artists who chose the future over the past.
              </p>
              <ShimmerButton>
                <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </ShimmerButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}