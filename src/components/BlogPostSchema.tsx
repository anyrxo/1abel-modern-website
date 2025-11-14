import { BlogPost } from '@/data/blog-posts'

interface BlogPostSchemaProps {
  post: BlogPost
}

/**
 * JSON-LD Schema markup for blog posts
 * Implements Article and BlogPosting schemas for optimal SEO and AI indexing
 */
export default function BlogPostSchema({ post }: BlogPostSchemaProps) {
  // Extract reading time as number (e.g., "22 min" -> 22)
  const readingTimeMinutes = parseInt(post.readTime.replace(/\D/g, ''), 10) || 15

  // Calculate approximate word count (average 200 words per minute)
  const estimatedWordCount = readingTimeMinutes * 200

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.seo.metaTitle,
    description: post.seo.metaDescription,
    image: post.seo.ogImage || 'https://1abel.com/images/og-blog.jpg',
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: '1ABEL',
      url: 'https://1abel.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://1abel.com/images/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.seo.canonicalUrl || `https://1abel.com/blog/${post.slug}`,
    },
    keywords: post.seo.keywords.join(', '),
    articleSection: post.category,
    wordCount: estimatedWordCount,
    timeRequired: `PT${readingTimeMinutes}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://1abel.com/blog',
      name: '1ABEL Style Journal',
      description: 'Music-inspired minimalist fashion insights, guides, and philosophy',
    },
    about: post.tags.map(tag => ({
      '@type': 'Thing',
      name: tag,
    })),
    // Add BreadcrumbList for navigation context
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://1abel.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://1abel.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.category,
          item: `https://1abel.com/blog?category=${post.category.toLowerCase()}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: post.title,
          item: post.seo.canonicalUrl || `https://1abel.com/blog/${post.slug}`,
        },
      ],
    },
    // Indicate this is original content
    isBasedOn: undefined,
    license: 'All rights reserved',
    copyrightYear: new Date(post.publishedAt).getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: '1ABEL',
      url: 'https://1abel.com',
    },
  }

  // Add FAQPage schema if post has FAQ sections (common in guides)
  const hasFAQ = post.title.toLowerCase().includes('guide') ||
                 post.title.toLowerCase().includes('how to') ||
                 post.category === 'Guides'

  const faqSchema = hasFAQ ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${post.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: post.excerpt || post.seo.metaDescription,
        },
      },
    ],
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
