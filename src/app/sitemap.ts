import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://1abel.com'
  const currentDate = new Date()

  // Static pages - High priority for main navigation
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/arc-2`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95, // High priority - main product line
    },
    {
      url: `${baseUrl}/arc-3`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95, // High priority - main product line
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9, // Blog landing page - high value for SEO
    },
    {
      url: `${baseUrl}/press`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75, // Press page - important for media outreach
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Arc 2 Shadow product pages - Critical for conversions
  const arc2Products = [
    'tops/thermal', 'tops/hoodie', 'tops/tee', 'tops/longsleeve', 'tops/crewneck', 'tops/overshirt',
    'bottoms/denim', 'bottoms/cargo', 'bottoms/joggers', 'bottoms/sweats', 'bottoms/shorts',
    'outerwear/puffer', 'accessories/beanie', 'accessories/cap', 'accessories/belt',
    'accessories/gloves', 'accessories/socks', 'accessories/ring'
  ].map(path => ({
    url: `${baseUrl}/arc-2/${path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Arc 3 Light product pages - Critical for conversions
  const arc3Products = [
    'tops/thermal', 'tops/hoodie', 'tops/tee', 'tops/longsleeve', 'tops/crewneck', 'tops/overshirt',
    'bottoms/denim', 'bottoms/cargo', 'bottoms/joggers', 'bottoms/sweats', 'bottoms/shorts',
    'outerwear/puffer', 'accessories/beanie', 'accessories/cap', 'accessories/belt',
    'accessories/gloves', 'accessories/socks', 'accessories/ring'
  ].map(path => ({
    url: `${baseUrl}/arc-3/${path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Blog posts - SEO powerhouse with 62+ comprehensive articles
  // Featured posts get higher priority for AI indexing
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.7, // Increased priority for blog content
  }))

  // Combine all pages - Total 100+ URLs for comprehensive indexing
  return [...staticPages, ...arc2Products, ...arc3Products, ...blogPages]
}