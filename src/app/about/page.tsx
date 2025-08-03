'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { motion } from 'framer-motion'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import ShimmerButton from '@/components/magicui/shimmer-button'
import NumberTicker from '@/components/magicui/number-ticker'
import WordRotate from '@/components/magicui/word-rotate'
import BlurIn from '@/components/magicui/blur-in'
import { Instagram, Youtube, Twitter, TrendingUp, Users, DollarSign, Sparkles, Zap, Globe, Heart, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
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
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <AnimatedGradientText className="mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            The Anyro Revolution
            <Sparkles className="w-4 h-4 ml-2" />
          </AnimatedGradientText>
          
          <BlurIn
            word="FROM SOCIAL MEDIA TO MUSIC"
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-600 bg-clip-text text-transparent"
            duration={1}
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Industry-leading social media experts who dominated with <WordRotate words={["streamers", "models", "influencers", "creators"]} className="text-red-600 font-bold" /> 
            discovered music labels were stuck in 2010. So we decided to revolutionize an entire industry.
          </motion.p>
        </div>
      </section>

      {/* The Social Media Story */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              THE <span className="text-red-600">DISRUPTION</span> STORY
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-red-600">Before 1ABEL</h3>
              <p className="text-xl text-gray-300 mb-6">
                We built empires for streamers and models. Turned unknown faces into millionaires. 
                Created viral moments that broke the internet. Managed accounts with millions of followers.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Instagram className="w-6 h-6 text-red-600" />
                  <span className="text-gray-400">10M+ followers managed across platforms</span>
                </div>
                <div className="flex items-center gap-4">
                  <DollarSign className="w-6 h-6 text-red-600" />
                  <span className="text-gray-400">$5M+ in brand deals secured</span>
                </div>
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                  <span className="text-gray-400">500% average growth rate</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gray-900/90 backdrop-blur p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">The Moment Everything Changed</h3>
                <p className="text-gray-300 mb-4">
                  "We watched talented artists sign terrible deals with labels who didn't understand 
                  TikTok, thought Instagram was just for photos, and were still pitching radio DJs 
                  like it's 2005."
                </p>
                <p className="text-gray-400 italic">
                  That's when we realized: Music needed what we do best - modern marketing that actually works.
                </p>
              </div>
            </motion.div>
          </div>

          {/* The Revolution */}
          <div className="text-center mb-20">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12"
            >
              SO WE BUILT <span className="text-red-600">1ABEL</span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Global Reach",
                  description: "Applied our viral strategies to music. Result: 150M+ streams and counting."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "34 Artists",
                  description: "Each one carefully selected, each one on their way to global recognition."
                },
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: "$2M+ Deals",
                  description: "Brand partnerships that traditional labels could never secure."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gray-900/90 backdrop-blur p-8 rounded-2xl border border-gray-700 hover:border-red-600/50 transition-all duration-300">
                    <div className="text-red-600 mb-4">{item.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantage */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-16"
          >
            WHY WE'RE <span className="text-red-600">DIFFERENT</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-red-600">Traditional Labels</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Still pitching to radio DJs and hoping for the best</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>18-month release cycles that kill momentum</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>360 deals that take everything from artists</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Zero understanding of TikTok, Reels, or viral marketing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Stuck in outdated methods from 20 years ago</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-green-500">1ABEL Method</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Viral TikTok campaigns that actually convert to streams</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>2-week releases to capture momentum instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Fair deals: 80% royalties, artists keep masters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Algorithm experts who've grown millions of followers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Modern tactics that dominate modern platforms</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-16"
          >
            THE <span className="text-red-600">PROOF</span> IS IN THE NUMBERS
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: 150, suffix: "M+", label: "Total Streams", description: "Across all platforms" },
              { value: 34, label: "Global Artists", description: "And growing fast" },
              { value: 2, suffix: "M+", label: "$Brand Deals", description: "Secured for artists" },
              { value: 500, suffix: "M+", label: "Social Views", description: "Viral campaigns" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-red-600 mb-2">
                  <NumberTicker value={stat.value} />{stat.suffix}
                </div>
                <div className="text-xl text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Case Studies */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center mb-12">Success Stories</h3>
            {[
              {
                artist: "1ABEL Artist",
                before: "0 monthly listeners",
                after: "100K+ monthly listeners",
                time: "6 months",
                method: "TikTok viral campaign + playlist strategy"
              },
              {
                artist: "1ABEL Artist",
                before: "Local producer",
                after: "Nike & Fashion Nova deals",
                time: "4 months",
                method: "Influencer partnerships + brand alignment"
              },
              {
                artist: "1ABEL Artist",
                before: "Independent struggle",
                after: "Billboard charting",
                time: "8 months",
                method: "Strategic features + social momentum"
              }
            ].map((story, index) => (
              <motion.div
                key={story.artist}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div>
                    <h4 className="text-xl font-bold text-red-600">{story.artist}</h4>
                    <p className="text-gray-400">Artist</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Before 1ABEL</p>
                    <p className="font-semibold">{story.before}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">After 1ABEL</p>
                    <p className="font-semibold text-green-500">{story.after}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Time: {story.time}</p>
                    <p className="text-sm text-gray-500">{story.method}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Revolution CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/20 to-black relative overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-600/30 rounded-full"
              initial={{ 
                x: Math.random() * 1000,
                y: Math.random() * 1000
              }}
              animate={{
                x: Math.random() * 1000,
                y: Math.random() * 1000
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedGradientText className="mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Limited Spots Available
            <Zap className="w-4 h-4 ml-2" />
          </AnimatedGradientText>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
            READY TO WORK WITH THE EXPERTS?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            We only work with artists who are ready to embrace modern marketing and build real careers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ShimmerButton className="shadow-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <a href="mailto:anyro@1abel.com" className="inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white hover:text-white focus:text-white">
                Apply Now
                <ArrowRight className="w-5 h-5 ml-3 text-white" />
              </a>
            </ShimmerButton>
            <Link href="/contact">
              <motion.a 
                href="https://twitter.com/anyrxo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="border border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}