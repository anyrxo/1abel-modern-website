/**
 * AI Search Engine Optimization
 * Optimized for GPT, Claude, Perplexity, Bard, and other AI search engines
 *
 * These components help AI understand and extract key information from your content
 */

interface AIContentProps {
  content: string
  type: 'article' | 'product' | 'faq' | 'review' | 'guide'
  keywords?: string[]
}

/**
 * Speakable Content for Voice Search
 * Helps voice assistants (Google Assistant, Alexa, Siri) identify key content
 */
export function SpeakableContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      itemScope
      itemType="https://schema.org/WebPageElement"
      itemProp="speakable"
      className="speakable-content"
    >
      {children}
    </div>
  )
}

/**
 * Quick Answer Box Optimization
 * Optimizes content for featured snippets and AI quick answers
 */
export function QuickAnswer({ question, answer }: { question: string; answer: string }) {
  return (
    <div
      itemScope
      itemType="https://schema.org/Question"
      className="quick-answer"
      data-ai-extractable="true"
    >
      <h3 itemProp="name" className="text-lg font-semibold">
        {question}
      </h3>
      <div
        itemScope
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <div itemProp="text" className="mt-2">
          {answer}
        </div>
      </div>
    </div>
  )
}

/**
 * Key Takeaways Component
 * Highlights main points for AI extraction
 */
export function KeyTakeaways({ points }: { points: string[] }) {
  return (
    <div
      className="key-takeaways"
      data-ai-extractable="true"
      data-content-type="summary"
    >
      <h3 className="text-lg font-bold mb-3">Key Takeaways</h3>
      <ul className="list-disc pl-5 space-y-2">
        {points.map((point, index) => (
          <li key={index} itemProp="mainEntity">
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * AI Content Declaration
 * Declares content structure to AI crawlers
 */
export function AIContentDeclaration({
  title,
  summary,
  mainPoints,
  keywords,
}: {
  title: string
  summary: string
  mainPoints: string[]
  keywords: string[]
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: summary,
    mainEntity: mainPoints.map(point => ({
      '@type': 'Thing',
      name: point,
    })),
    keywords: keywords.join(', '),
    // AI-specific metadata
    'ai:extractable': true,
    'ai:content-type': 'informative',
    'ai:language': 'en',
    'ai:reading-level': 'general',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * Enhanced Article Structure for AI
 */
export function ArticleStructure({
  headline,
  summary,
  author,
  datePublished,
  dateModified,
  sections,
}: {
  headline: string
  summary: string
  author: string
  datePublished: string
  dateModified?: string
  sections: Array<{ heading: string; content: string }>
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    abstract: summary,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    articleBody: sections.map(s => s.content).join('\n\n'),
    articleSection: sections.map(s => s.heading),
    // AI crawler hints
    'ai:structure': 'hierarchical',
    'ai:extractable': true,
    'ai:key-sections': sections.map(s => s.heading),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article
        itemScope
        itemType="https://schema.org/Article"
        data-ai-content="true"
      >
        <h1 itemProp="headline">{headline}</h1>
        <meta itemProp="datePublished" content={datePublished} />
        {dateModified && <meta itemProp="dateModified" content={dateModified} />}

        <div itemProp="abstract" className="article-summary">
          {summary}
        </div>

        {sections.map((section, index) => (
          <section key={index} data-ai-section={section.heading}>
            <h2>{section.heading}</h2>
            <div itemProp="articleBody">{section.content}</div>
          </section>
        ))}
      </article>
    </>
  )
}

/**
 * Product AI Optimization
 * Helps AI understand product details
 */
export function ProductAISchema({
  name,
  description,
  price,
  currency,
  availability,
  features,
  specs,
}: {
  name: string
  description: string
  price: number
  currency: string
  availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  features: string[]
  specs: Record<string, string>
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
    },
    // AI-extractable features
    'ai:features': features,
    'ai:specifications': specs,
    'ai:extractable': true,
    additionalProperty: Object.entries(specs).map(([key, value]) => ({
      '@type': 'PropertyValue',
      name: key,
      value,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * FAQ AI Optimization
 * Optimized for AI Q&A systems
 */
export function FAQAISchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    // AI crawler hints
    'ai:content-type': 'faq',
    'ai:extractable': true,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div itemScope itemType="https://schema.org/FAQPage" data-ai-content="faq">
        {faqs.map((faq, index) => (
          <QuickAnswer key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  )
}

/**
 * Citation and Source Declaration
 * Helps AI attribute information correctly
 */
export function CitationSchema({
  sources,
}: {
  sources: Array<{ name: string; url: string; dateAccessed: string }>
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    citation: sources.map(source => ({
      '@type': 'WebPage',
      name: source.name,
      url: source.url,
      dateAccessed: source.dateAccessed,
    })),
    'ai:sourced': true,
    'ai:verifiable': true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * AI Training Opt-Out Declaration
 * Declares that content should not be used for AI training
 */
export function AITrainingOptOut() {
  return (
    <>
      <meta name="robots" content="noai, noimageai" />
      <meta name="ai-training" content="no" />
      <meta name="chatgpt" content="noindex" />
      <meta name="anthropic-ai" content="noindex" />
      <meta name="bard" content="noindex" />
    </>
  )
}

/**
 * AI-Friendly Content Wrapper
 * Wraps content with AI-extractable markers
 */
export function AIFriendlyContent({
  children,
  contentType,
  keywords,
}: {
  children: React.ReactNode
  contentType: 'article' | 'product' | 'faq' | 'review' | 'guide'
  keywords: string[]
}) {
  return (
    <div
      data-ai-content="true"
      data-content-type={contentType}
      data-keywords={keywords.join(',')}
      data-ai-extractable="true"
      className="ai-friendly-content"
    >
      {children}
    </div>
  )
}
