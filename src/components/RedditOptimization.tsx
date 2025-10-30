/**
 * Reddit & Forum Optimization
 * Makes content more shareable and discoverable on Reddit, forums, and discussion sites
 */

interface RedditMetaProps {
  title: string
  description: string
  image: string
  url: string
  subreddit?: string
}

/**
 * Reddit-optimized meta tags
 */
export function RedditMetaTags({ title, description, image, url }: RedditMetaProps) {
  return (
    <>
      {/* Reddit-specific meta tags */}
      <meta property="reddit:title" content={title} />
      <meta property="reddit:description" content={description} />
      <meta property="reddit:image" content={image} />

      {/* Ensure large image preview on Reddit */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* Twitter card for Reddit (they use Twitter cards as fallback) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </>
  )
}

/**
 * Forum-friendly content structure
 */
export function ForumFriendlyContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="forum-friendly"
      data-shareable="true"
      data-discussion-friendly="true"
    >
      {children}
    </div>
  )
}

/**
 * Generate Reddit-optimized title
 * Follows Reddit best practices for engagement
 */
export function generateRedditTitle(productName: string, hook: string): string {
  const templates = [
    `I found the perfect ${productName} and here's why`, // Personal discovery
    `Why this ${productName} changed my wardrobe`, // Transformation
    `${productName} review: Worth the hype?`, // Question format
    `The ${productName} everyone's talking about`, // Social proof
    `This ${productName} is different (and better)`, // Differentiation
    `My honest ${productName} review after 6 months`, // Long-term review
    `${hook} - My experience with ${productName}`, // Hook-based
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

/**
 * Discussion-optimized FAQ component
 */
export function DiscussionFAQ({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  return (
    <div className="discussion-faq" data-forum-content="true">
      <h2 className="text-2xl font-bold mb-4">Common Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Q: {faq.q}</h3>
          <p className="text-gray-700">A: {faq.a}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Shareable quote component
 * Makes text easy to quote in forums
 */
export function ShareableQuote({ quote, author }: { quote: string; author?: string }) {
  return (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700"
      data-shareable-quote="true"
    >
      <p className="text-lg">{quote}</p>
      {author && <cite className="text-sm text-gray-500 mt-2 block">— {author}</cite>}
    </blockquote>
  )
}

/**
 * TL;DR component for Reddit/forums
 */
export function TLDR({ points }: { points: string[] }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
      <h3 className="font-bold text-lg mb-2">TL;DR:</h3>
      <ul className="list-disc pl-5 space-y-1">
        {points.map((point, index) => (
          <li key={index} className="text-gray-800">
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Before/After comparison (popular on Reddit)
 */
export function BeforeAfter({
  before,
  after,
  metric,
}: {
  before: string
  after: string
  metric: string
}) {
  return (
    <div className="before-after grid grid-cols-2 gap-4 my-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h4 className="font-bold text-red-600 mb-2">Before</h4>
        <p className="text-2xl font-bold">{before}</p>
      </div>
      <div className="text-center">
        <h4 className="font-bold text-green-600 mb-2">After</h4>
        <p className="text-2xl font-bold">{after}</p>
      </div>
      <div className="col-span-2 text-center text-sm text-gray-600">{metric}</div>
    </div>
  )
}

/**
 * Pros/Cons component (forum-friendly)
 */
export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="pros-cons grid md:grid-cols-2 gap-6 my-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-bold text-green-800 text-lg mb-3">✅ Pros</h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="text-gray-800">
              • {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-bold text-red-800 text-lg mb-3">❌ Cons</h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="text-gray-800">
              • {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * Comparison table (popular for product discussions)
 */
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: Array<{ [key: string]: string | number }>
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * User experience rating (Reddit-style)
 */
export function ExperienceRating({
  category,
  rating,
  outOf = 10,
}: {
  category: string
  rating: number
  outOf?: number
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded mb-2">
      <span className="font-semibold">{category}:</span>
      <div className="flex items-center">
        <span className="text-2xl font-bold text-blue-600 mr-2">{rating}</span>
        <span className="text-gray-500">/ {outOf}</span>
      </div>
    </div>
  )
}

/**
 * Forum signature component
 */
export function ForumSignature({ brand = '1ABEL' }: { brand?: string }) {
  return (
    <div className="forum-signature text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200">
      <p>
        This content is from {brand} - Where Sound Becomes Style
      </p>
      <p>Music-inspired minimalist fashion</p>
    </div>
  )
}
