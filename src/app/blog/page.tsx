'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { blogPosts } from '@/data/blog-posts'
import { useState } from 'react'
import { Rss } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))]

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="bg-white text-black min-h-screen relative">
      <Header />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-12"
            />

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] mb-8 uppercase leading-none">
              Insights
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Thoughts on minimalism, slow fashion, design philosophy, and building a wardrobe that actually works.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <a
                href="/blog/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
              >
                <Rss className="w-4 h-4" />
                Subscribe via RSS
              </a>
            </motion.div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-black'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'All' && featuredPosts.length > 0 && (
        <section className="px-4 md:px-8 pb-20 relative border-t border-black/5">
          <div className="max-w-7xl mx-auto pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Featured Articles</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Featured image placeholder */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 via-gray-50 to-white border border-black/5 mb-6 relative overflow-hidden group-hover:border-black/15 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <span className="text-7xl font-bold tracking-tighter opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 uppercase text-center leading-none">
                          {post.category}
                        </span>
                      </div>
                      {/* Featured badge */}
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] tracking-[0.25em] uppercase bg-black text-white px-3 py-1.5 font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="tracking-[0.2em] uppercase">{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold leading-[1.2] tracking-tight group-hover:text-gray-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-[15px] text-gray-600 leading-[1.7] line-clamp-3 group-hover:text-gray-700 transition-colors">
                        {post.excerpt}
                      </p>

                      <div className="pt-2">
                        <span className="text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors inline-flex items-center gap-2 font-medium">
                          Read Article
                          <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      {regularPosts.length > 0 && (
        <section className="px-4 md:px-8 pb-32 relative border-t border-black/5">
          <div className="max-w-7xl mx-auto pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
                {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="group border-b border-black/5 pb-12 hover:border-black/20 transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="space-y-5">
                      {/* Category badge */}
                      <div className="inline-block">
                        <span className="text-xs tracking-[0.2em] uppercase bg-gray-50 text-gray-600 px-4 py-2 border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-300">
                          {post.category}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold leading-[1.15] tracking-tight group-hover:text-gray-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-[16px] text-gray-600 leading-[1.75] group-hover:text-gray-700 transition-colors">
                        {post.excerpt}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 pt-2">
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Read more link */}
                      <div className="pt-3">
                        <span className="text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors inline-flex items-center gap-2 font-medium">
                          Read Article
                          <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Shop</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/arc-2" className="hover:text-black transition-colors inline-block">Arc 2 Shadow</Link>
                </li>
                <li>
                  <Link href="/arc-3" className="hover:text-black transition-colors inline-block">Arc 3 Light</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Support</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors inline-block">Contact</Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-black transition-colors inline-block">Shipping</Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-black transition-colors inline-block">Returns</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Company</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-black transition-colors inline-block">About</Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-black transition-colors inline-block">Blog</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-black transition-colors inline-block">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-black transition-colors inline-block">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-gray-400">Connect</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="https://instagram.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/1abelofficial" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors inline-block">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2025, 1ABEL All rights reserved</p>
            <p className="mt-4 md:mt-0">SITE BY IIMAGINED</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
