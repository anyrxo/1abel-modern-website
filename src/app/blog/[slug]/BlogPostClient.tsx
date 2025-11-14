'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { BlogPost, blogPosts } from '@/data/blog-posts'
import { useEffect } from 'react'

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  // Reading progress indicator
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Get related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      publisher: {
        '@type': 'Organization',
        name: '1ABEL',
        logo: {
          '@type': 'ImageObject',
          url: 'https://1abel.com/logo.png',
        },
      },
      keywords: post.tags.join(', '),
      articleSection: post.category,
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [post])

  return (
    <div className="bg-white text-black min-h-screen relative">
      <Header />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX }}
      />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-gray-500">
              <Link href="/blog" className="hover:text-black transition-colors">
                Blog
              </Link>
              <span className="mx-2">→</span>
              <span className="text-black">{post.title}</span>
            </nav>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-8">
              <span className="tracking-[0.2em] uppercase bg-black text-white px-3 py-1">
                {post.category}
              </span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] mb-10">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-gray-600 leading-[1.6] mb-12 font-light">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pb-12 border-b border-black/10">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-lg">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm">{post.author.name}</div>
                <div className="text-xs text-gray-500">{post.author.role}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto px-4 md:px-8 mt-16"
        >
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-0 prose-h2:mb-6 prose-h2:leading-[1.2]
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:leading-[1.3]
              prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-h4:leading-[1.4]
              prose-p:text-base prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:mt-0
              prose-strong:text-black prose-strong:font-semibold
              prose-em:text-gray-800 prose-em:italic
              prose-ul:my-5 prose-ul:space-y-2 prose-ul:pl-6
              prose-ol:my-5 prose-ol:space-y-2 prose-ol:pl-6
              prose-li:text-base prose-li:text-gray-700 prose-li:leading-relaxed prose-li:marker:text-black prose-li:marker:font-bold prose-li:my-0
              prose-a:text-black prose-a:underline prose-a:underline-offset-2 prose-a:decoration-1 prose-a:font-medium
              hover:prose-a:text-gray-600 hover:prose-a:decoration-gray-400
              prose-blockquote:border-l-2 prose-blockquote:border-black/20 prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-img:rounded-lg prose-img:my-8
              prose-code:text-sm prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:my-8
              [&_section]:mb-12 [&_section]:pb-12 [&_section]:border-b [&_section]:border-black/5 [&_section:last-child]:border-b-0 [&_section:last-child]:pb-0 [&_section:first-child]:pt-0
              [&_section>h2]:mt-0 [&_section>h2]:mb-5
              [&_section>h3]:mt-7 [&_section>h3:first-of-type]:mt-5
              [&_section>p:first-of-type]:mt-0 [&_section>p:last-child]:mb-0
              [&_section>ul]:mt-4 [&_section>ol]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.content.trim() }}
          />

          {/* Tags */}
          <div className="mt-20 pt-12 border-t border-black/10">
            <div className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-5">Topics</div>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-700 bg-gray-50 px-5 py-2.5 border border-black/5 tracking-wide hover:bg-gray-100 hover:border-black/10 transition-all duration-300 cursor-default rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-10 bg-gradient-to-br from-gray-50 to-white border border-black/5 rounded-sm">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center font-bold text-3xl flex-shrink-0 rounded-sm">
                {post.author.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">Written By</div>
                <h3 className="font-bold text-xl mb-3 tracking-tight">{post.author.name}</h3>
                <p className="text-[15px] text-gray-700 leading-[1.7] mb-4">{post.author.bio}</p>
                <div className="text-xs text-gray-500 tracking-wide">{post.author.role}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 md:px-8 mt-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-12">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 border border-black/5 mb-5 relative overflow-hidden group-hover:border-black/15 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <span className="text-6xl font-bold tracking-tighter opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 uppercase text-center leading-none">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
                          {relatedPost.category}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold leading-[1.2] tracking-tight group-hover:text-gray-600 transition-colors duration-300">
                          {relatedPost.title}
                        </h3>

                        <p className="text-[15px] text-gray-600 leading-[1.65] line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {relatedPost.excerpt}
                        </p>

                        <div className="pt-1">
                          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors inline-flex items-center gap-2 font-medium">
                            Read More
                            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

      </article>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-16 px-4 md:px-8 mt-20">
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
