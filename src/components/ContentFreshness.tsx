/**
 * Content Freshness Signals
 * Helps search engines understand content recency and updates
 */

interface FreshnessProps {
  publishDate: string
  lastModified?: string
  updateFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  nextUpdate?: string
}

/**
 * Display last updated timestamp
 */
export function LastUpdated({ date }: { date: string }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="text-sm text-gray-500 italic" itemProp="dateModified" content={date}>
      Last updated: {formatDate(date)}
    </div>
  )
}

/**
 * Freshness schema markup
 */
export function FreshnessSchema({ publishDate, lastModified, updateFrequency }: FreshnessProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    datePublished: publishDate,
    dateModified: lastModified || publishDate,
    ...(updateFrequency && {
      contentUpdatePolicy: updateFrequency,
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <meta name="date" content={publishDate} />
      <meta name="last-modified" content={lastModified || publishDate} />
      {updateFrequency && <meta name="revisit-after" content={updateFrequency} />}
    </>
  )
}

/**
 * Content version indicator
 */
export function ContentVersion({ version }: { version: string }) {
  return (
    <meta name="version" content={version} />
  )
}

/**
 * Real-time price freshness indicator
 */
export function PriceFreshness({ lastUpdated }: { lastUpdated: string }) {
  const isRecent = () => {
    const now = new Date()
    const updated = new Date(lastUpdated)
    const diffHours = (now.getTime() - updated.getTime()) / (1000 * 60 * 60)
    return diffHours < 24
  }

  return (
    <>
      <meta name="price-updated" content={lastUpdated} />
      {isRecent() && (
        <span className="text-xs text-green-600 font-semibold ml-2">
          Price verified today
        </span>
      )}
    </>
  )
}

/**
 * Inventory freshness
 */
export function InventoryFreshness({
  inStock,
  lastChecked,
}: {
  inStock: boolean
  lastChecked: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    validThrough: new Date(
      new Date(lastChecked).getTime() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(), // Valid for 7 days
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Review freshness indicator
 */
export function ReviewFreshness({ latestReviewDate }: { latestReviewDate: string }) {
  const daysSince = () => {
    const now = new Date()
    const reviewDate = new Date(latestReviewDate)
    return Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const days = daysSince()

  return (
    <div className="text-sm text-gray-600">
      {days < 7 ? (
        <span className="text-green-600 font-semibold">New reviews this week</span>
      ) : days < 30 ? (
        <span className="text-blue-600">Recent reviews this month</span>
      ) : (
        <span>Latest review: {Math.floor(days / 30)} months ago</span>
      )}
    </div>
  )
}

/**
 * Seasonal content freshness
 */
export function SeasonalFreshness({ season }: { season: 'spring' | 'summer' | 'fall' | 'winter' }) {
  const currentSeason = () => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) return 'spring'
    if (month >= 5 && month <= 7) return 'summer'
    if (month >= 8 && month <= 10) return 'fall'
    return 'winter'
  }

  const isCurrent = season === currentSeason()

  return (
    <>
      <meta name="season" content={season} />
      {isCurrent && (
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
          Current Season
        </span>
      )}
    </>
  )
}

/**
 * Event-based freshness (sales, launches, etc.)
 */
export function EventFreshness({
  eventName,
  startDate,
  endDate,
}: {
  eventName: string
  startDate: string
  endDate: string
}) {
  const isActive = () => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    return now >= start && now <= end
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventName,
    startDate,
    endDate,
    eventStatus: isActive()
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventCancelled',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {isActive() && (
        <div className="bg-red-500 text-white px-4 py-2 rounded font-semibold">
          {eventName} - Active Now
        </div>
      )}
    </>
  )
}

/**
 * Auto-update timestamps for dynamic content
 */
export function AutoFreshnessTimestamp() {
  const now = new Date().toISOString()

  return (
    <>
      <meta name="generated" content={now} />
      <meta name="cache-control" content="max-age=3600, must-revalidate" />
    </>
  )
}
