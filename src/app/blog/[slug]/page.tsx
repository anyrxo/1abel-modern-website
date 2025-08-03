import { notFound } from 'next/navigation'
import { blogPosts, newsArticles } from '@/data/blogPosts'
import { DollarSign, TrendingUp, Music, Globe, Users, Zap } from 'lucide-react'
import { Header } from '@/components/Header'
import { BlogPostClient } from '@/components/BlogPostClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts and news articles
export async function generateStaticParams() {
  const blogSlugs = blogPosts.map((post) => ({
    slug: post.slug,
  }))
  
  const newsSlugs = newsArticles.map((article) => ({
    slug: article.slug,
  }))
  
  return [...blogSlugs, ...newsSlugs]
}

// Generate metadata for blog posts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const blogData = getBlogContent(resolvedParams.slug)
  
  if (!blogData) {
    return {
      title: 'Blog Post Not Found | 1ABEL Music Label',
      description: 'The requested blog post could not be found.'
    }
  }

  const { post } = blogData
  const title = `${post.title} | 1ABEL Music Blog`
  const description = post.excerpt
  const url = `https://1abel.com/blog/${resolvedParams.slug}`

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
        <div className="mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            As the world's leading RnB, trap, and rap music label, 1ABEL has tested every streaming platform to maximize our artists' earnings and exposure. Here's the brutal truth about which platforms actually pay and promote your music.
          </p>
        </div>

        <section className="mb-16">
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
              <div key={platform.platform} className="relative group">
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
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            Platform Growth Strategies That Actually Work
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-green-600">✓ Spotify Algorithm Mastery</h3>
              <p className="text-gray-300 mb-4">
                Our artists average 300% growth in monthly listeners using these exact strategies:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Release consistently every 4-6 weeks to maintain algorithm favor</li>
                <li>• Target 30-60 second songs for maximum completion rates</li>
                <li>• Use playlist placement services (we have partnerships with 500+ curators)</li>
                <li>• Optimize for the first 30 seconds - this determines algorithmic push</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">✓ Apple Music Editorial Strategy</h3>
              <p className="text-gray-300 mb-4">
                While harder to crack, Apple Music editorial features can transform careers overnight:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Submit 4+ weeks before release (we submit 6 weeks early)</li>
                <li>• Include high-quality press shots and compelling artist story</li>
                <li>• Target genre-specific playlists first, then crossover</li>
                <li>• Apple favors complete albums over singles for editorial consideration</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Music className="w-8 h-8 text-red-600" />
            1ABEL Success Stories: Real Numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  A1
                </div>
                <div>
                  <h3 className="text-xl font-bold">Anonymous Artist #1</h3>
                  <p className="text-gray-400">RnB/Trap Fusion</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Before 1ABEL:</span>
                  <span className="text-white">2,000 monthly listeners</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">After 6 months:</span>
                  <span className="text-green-600 font-bold">850,000 monthly listeners</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue increase:</span>
                  <span className="text-green-600 font-bold">4,250%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  A2
                </div>
                <div>
                  <h3 className="text-xl font-bold">Anonymous Artist #2</h3>
                  <p className="text-gray-400">Melodic Rap</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">TikTok followers:</span>
                  <span className="text-white">500 → 2.3M in 4 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Viral video:</span>
                  <span className="text-green-600 font-bold">89M views</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Spotify growth:</span>
                  <span className="text-green-600 font-bold">1.2M monthly listeners</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Globe className="w-8 h-8 text-red-600" />
            The Global Distribution Advantage
          </h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Unlike traditional labels that focus on single markets, 1ABEL leverages global distribution 
              networks to maximize reach and revenue across all major streaming platforms simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { region: "North America", growth: "+420%" },
              { region: "Europe", growth: "+380%" },
              { region: "Asia-Pacific", growth: "+520%" },
              { region: "Latin America", growth: "+290%" }
            ].map((region, index) => (
              <div key={region.region} className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-red-600 mb-2">{region.growth}</div>
                <div className="text-gray-400">{region.region}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-red-600" />
            Why Artists Choose 1ABEL Over Major Labels
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">💰</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Keep 80% of Your Revenue</h3>
                <p className="text-gray-300">While major labels take 70-90%, we believe artists deserve the majority of their earnings.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Modern Marketing That Works</h3>
                <p className="text-gray-300">TikTok viral strategies, Instagram growth hacking, and playlist placement - not outdated radio promotion.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Speed to Market</h3>
                <p className="text-gray-300">From demo to global distribution in weeks, not months. We move at internet speed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-red-600" />
            Action Steps: Start Growing Today
          </h2>
          
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30">
            <h3 className="text-2xl font-bold mb-6 text-center">Ready to Transform Your Music Career?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                <div className="text-4xl mb-4">📧</div>
                <h4 className="text-lg font-bold mb-2">Step 1: Submit</h4>
                <p className="text-gray-300">Send us your best 3 tracks</p>
              </div>
              
              <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                <div className="text-4xl mb-4">🎧</div>
                <h4 className="text-lg font-bold mb-2">Step 2: Review</h4>
                <p className="text-gray-300">We evaluate within 48 hours</p>
              </div>
              
              <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-lg font-bold mb-2">Step 3: Launch</h4>
                <p className="text-gray-300">Start growing immediately</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                Join 34 artists who chose the future over the past. Fair deals, modern marketing, real results.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return content[slug] || <div>Content not found</div>
}

function getNewsPostContent(slug: string) {
  const content: { [key: string]: JSX.Element } = {}
  return content[slug] || <div>News content not found</div>
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const blogData = getBlogContent(resolvedParams.slug)
  
  if (!blogData) {
    notFound()
  }
  
  const { post, content } = blogData
  const shareUrl = `https://1abel.com/blog/${resolvedParams.slug}`

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
      <BlogPostClient post={post} content={content} />
    </div>
  )
}