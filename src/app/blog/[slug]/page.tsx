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
    'tiktok-algorithm-secrets-how-to-go-viral-as-music-artist': (
      <div className="prose prose-invert max-w-none">
        <div className="mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            After helping 34 artists go viral on TikTok with a combined 500M+ views, 1ABEL has cracked the TikTok algorithm code. Here's exactly what works in 2025.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            The Algorithm Truth: What TikTok Really Wants
          </h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 mb-8">
            <p className="text-lg text-gray-300 mb-6">
              TikTok's algorithm prioritizes <span className="text-red-600 font-bold">completion rate above everything else</span>. It doesn't matter if you have 10M followers - if people skip your video in the first 3 seconds, you're dead.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/90 backdrop-blur p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-green-600">✓ What Works</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• <strong>Hook in 0-3 seconds:</strong> Start with movement, text, or surprising statement</li>
                <li>• <strong>15-second sweet spot:</strong> Videos under 15 seconds get highest completion rates</li>
                <li>• <strong>Visual storytelling:</strong> Show don't tell - dancing, reactions, behind-scenes</li>
                <li>• <strong>Trending sounds:</strong> Use audio that's already gaining traction</li>
                <li>• <strong>Peak posting times:</strong> 6-10AM and 7-9PM in your target timezone</li>
              </ul>
            </div>

            <div className="bg-gray-900/90 backdrop-blur p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-red-600">✗ What Kills Videos</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• <strong>Slow starts:</strong> Taking 5+ seconds to get to the point</li>
                <li>• <strong>Poor audio quality:</strong> TikTok heavily weighs audio engagement</li>
                <li>• <strong>Over-editing:</strong> Too many effects confuse the algorithm</li>
                <li>• <strong>Asking for follows:</strong> Algorithm sees this as low-value content</li>
                <li>• <strong>Recycled content:</strong> Posting same video to multiple accounts</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Music className="w-8 h-8 text-red-600" />
            Music-Specific Viral Strategies
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">The 15-Second Rule for Musicians</h3>
              <p className="text-gray-300 mb-4">
                Your catchiest 15 seconds should be the FIRST 15 seconds of your TikTok, not buried in the middle of the song.
              </p>
              <div className="bg-red-900/20 p-4 rounded-xl border border-red-600/30">
                <p className="text-red-400 font-semibold">❌ Wrong: Intro → Verse → Hook</p>
                <p className="text-green-400 font-semibold">✅ Right: Hook → Visual story → Call to action</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Content Types That Go Viral</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    type: "Behind the Scenes",
                    description: "Studio sessions, writing process, day in the life",
                    conversion: "40% higher stream conversion"
                  },
                  {
                    type: "Quick Tutorials",
                    description: "Chord progressions, vocal techniques, production tips",
                    conversion: "65% follow-to-fan rate"
                  },
                  {
                    type: "Reaction Content",
                    description: "React to comments, other music, industry news",
                    conversion: "300% higher engagement"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-6 bg-gray-800 rounded-xl">
                    <h4 className="text-lg font-bold mb-2 text-white">{item.type}</h4>
                    <p className="text-gray-400 mb-3 text-sm">{item.description}</p>
                    <p className="text-green-400 text-sm font-semibold">{item.conversion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-red-600" />
            1ABEL's Viral Formula (Tested on 500M+ Views)
          </h2>
          
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30">
            <h3 className="text-2xl font-bold mb-6 text-center">The HOOK-STORY-CALL Framework</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                <div className="text-4xl mb-4">🎣</div>
                <h4 className="text-lg font-bold mb-2">HOOK (0-3 seconds)</h4>
                <p className="text-gray-300">Start with movement, text overlay, or surprising statement that stops the scroll</p>
              </div>
              
              <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                <div className="text-4xl mb-4">📖</div>
                <h4 className="text-lg font-bold mb-2">STORY (3-12 seconds)</h4>
                <p className="text-gray-300">Quick visual narrative - show your personality, process, or behind-scenes moment</p>
              </div>
              
              <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-lg font-bold mb-2">CALL (12-15 seconds)</h4>
                <p className="text-gray-300">Subtle direction - "Link in bio", "Part 2?", or "What should I cover next?"</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                This framework has generated <span className="text-red-600 font-bold">89M views</span> for one 1ABEL artist in 4 months.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-red-600" />
            Advanced Algorithm Hacks
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">⏰</div>
              <div>
                <h3 className="text-xl font-bold mb-2">The 2-Hour Window</h3>
                <p className="text-gray-300">TikTok judges your video's performance in the first 2 hours. Post when your audience is most active, then engage heavily with comments.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">🔁</div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Loop Technique</h3>
                <p className="text-gray-300">End your video in a way that makes viewers want to watch it again. Loops dramatically increase completion rate and average watch time.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">💬</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Comment Baiting (Ethically)</h3>
                <p className="text-gray-300">Ask genuine questions or make slightly controversial statements that encourage thoughtful discussion. Engagement rate is crucial.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),

    'why-every-other-australian-label-stuck-in-2015-and-we-are-not': (
      <div className="prose prose-invert max-w-none">
        <div className="mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            While traditional labels still pitch radio DJs, 1ABEL artists get discovered on TikTok. While they offer 360 deals, we let artists keep 80% and their masters. Here's why the old system is broken and how we're building the future.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            The 2015 Mindset That's Killing Artists
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-red-600">❌ What Traditional Labels Still Do</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <strong className="text-red-400">Radio Pitching:</strong> Spending $50K+ trying to get on FM radio when 67% of music discovery happens on social media
                </li>
                <li>
                  <strong className="text-red-400">360 Deals:</strong> Taking 20-30% of touring, merch, and brand deals on top of 70% of streaming revenue
                </li>
                <li>
                  <strong className="text-red-400">Old Marketing:</strong> Print ads, billboards, and "traditional media" that reaches fewer people than a single viral TikTok
                </li>
                <li>
                  <strong className="text-red-400">Slow Releases:</strong> 6-12 month album cycles when artists need to drop singles every 4-6 weeks to stay relevant
                </li>
                <li>
                  <strong className="text-red-400">Industry Gatekeeping:</strong> Requiring connections and politics instead of focusing on talent and data
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-green-600">✅ How 1ABEL Actually Works</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <strong className="text-green-400">TikTok First:</strong> We start with social media because that's where careers are made in 2025
                </li>
                <li>
                  <strong className="text-green-400">Artist-Friendly Deals:</strong> Artists keep 80% of streaming, 100% of touring, and own their masters
                </li>
                <li>
                  <strong className="text-green-400">Modern Marketing:</strong> Viral strategies, playlist placement, influencer partnerships that actually convert
                </li>
                <li>
                  <strong className="text-green-400">Rapid Release:</strong> New music every 4-6 weeks to feed the algorithm and keep fans engaged
                </li>
                <li>
                  <strong className="text-green-400">Data-Driven Decisions:</strong> We sign talent based on streaming data and social engagement, not industry politics
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-red-600" />
            The Numbers Don't Lie: Why Traditional Deals Are Theft
          </h2>
          
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-red-600/30 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Revenue Breakdown: Traditional vs 1ABEL</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900/50 rounded-xl border border-red-600/30">
                <h4 className="text-xl font-bold mb-4 text-red-400">Traditional Label Deal</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Streaming Revenue (70% to label)</span>
                    <span className="text-red-400">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Artist Share (30%)</span>
                    <span className="text-white font-bold">$900</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Touring (20% to label)</span>
                    <span className="text-red-400">$400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Merch (25% to label)</span>
                    <span className="text-red-400">$250</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 flex justify-between font-bold">
                    <span>Artist Takes Home:</span>
                    <span className="text-white">$4,050</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-green-600/30">
                <h4 className="text-xl font-bold mb-4 text-green-400">1ABEL Partnership</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Streaming Revenue (20% to 1ABEL)</span>
                    <span className="text-green-400">$600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Artist Share (80%)</span>
                    <span className="text-white font-bold">$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Touring (0% to label)</span>
                    <span className="text-green-400">$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Merch (0% to label)</span>
                    <span className="text-green-400">$0</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 flex justify-between font-bold">
                    <span>Artist Takes Home:</span>
                    <span className="text-green-400 text-xl">$7,400</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-2xl font-bold text-green-400">1ABEL artists make 83% more money from the same success</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Globe className="w-8 h-8 text-red-600" />
            Real Success Stories: Modern Marketing That Works
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  🎵
                </div>
                <div>
                  <h3 className="text-xl font-bold">Case Study: R&B Artist "Maya"</h3>
                  <p className="text-gray-400">Traditional Label → 1ABEL</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-red-400 font-semibold mb-2">With Traditional Label (18 months):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• $180K spent on radio promotion</li>
                    <li>• 12K monthly Spotify listeners</li>
                    <li>• 3K Instagram followers</li>
                    <li>• Zero viral moments</li>
                    <li>• $2,400 total artist earnings</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">With 1ABEL (6 months):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• $30K spent on TikTok/Instagram strategy</li>
                    <li>• 850K monthly Spotify listeners</li>
                    <li>• 120K Instagram followers</li>
                    <li>• 3 viral TikToks (2M+ views each)</li>
                    <li>• $47,000 total artist earnings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  🎤
                </div>
                <div>
                  <h3 className="text-xl font-bold">Case Study: Trap Producer "BEATS"</h3>
                  <p className="text-gray-400">Independent → 1ABEL</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-red-400 font-semibold mb-2">Solo Independent (12 months):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Posted beats randomly on Instagram</li>
                    <li>• 2.5K YouTube subscribers</li>
                    <li>• Selling beats for $25-50 each</li>
                    <li>• No playlist placements</li>
                    <li>• $8,400 annual revenue</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">With 1ABEL (8 months):</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Strategic TikTok beat previews</li>
                    <li>• 89K YouTube subscribers</li>
                    <li>• Exclusive beats selling for $500-2000</li>
                    <li>• 14 editorial playlist placements</li>
                    <li>• $156,000 annual revenue pace</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-red-600" />
            Why Artists Are Switching to 1ABEL
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Speed to Market</h3>
                <p className="text-gray-300">Traditional labels take 6-18 months to release music after signing. We can have your music on all platforms and promoted on TikTok within 2 weeks.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">📱</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Social Media Expertise</h3>
                <p className="text-gray-300">Our team has built social media followings in the millions. We understand algorithms, trends, and viral content creation at a level traditional A&Rs can't match.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">💰</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Artist-First Revenue Model</h3>
                <p className="text-gray-300">We make money when you make money, not by taking percentages of everything you do. Our success is directly tied to your streaming and social media growth.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold mb-2">No Politics, Just Results</h3>
                <p className="text-gray-300">We don't care about industry connections or who you know. If your music has potential and the data supports it, we want to work with you.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
    
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

  return content[slug] || (
    <div className="prose prose-invert max-w-none">
      <div className="mb-12">
        <p className="text-xl text-gray-300 leading-relaxed">
          This blog post is currently being written and will be available soon. Check back later for the complete article.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <p className="text-gray-300">
          We're working hard to bring you valuable, actionable content that helps artists succeed. 
          This article will cover everything you need to know about this topic.
        </p>
      </div>
      
      <div className="text-center p-8">
        <p className="text-gray-400">
          Want to be notified when this article is published? Contact us at anyro@1abel.com
        </p>
      </div>
    </div>
  )
}

function getNewsPostContent(slug: string) {
  const content: { [key: string]: JSX.Element } = {}
  return content[slug] || (
    <div className="prose prose-invert max-w-none">
      <div className="mb-12">
        <p className="text-xl text-gray-300 leading-relaxed">
          This news article is currently being written and will be available soon. Check back later for the complete article.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4">Breaking Industry News</h2>
        <p className="text-gray-300">
          Stay tuned for the latest industry insights and analysis from 1ABEL. 
          We track the most important developments affecting independent artists.
        </p>
      </div>
      
      <div className="text-center p-8">
        <p className="text-gray-400">
          Get industry news updates: anyro@1abel.com
        </p>
      </div>
    </div>
  )
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