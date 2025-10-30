'use client'

import { useEffect, useState } from 'react'

interface SEOMetrics {
  // Core Web Vitals
  lcp: number | null
  fid: number | null
  cls: number | null

  // Page metrics
  pageLoadTime: number | null
  domContentLoaded: number | null
  timeToInteractive: number | null

  // SEO signals
  wordCount: number
  headingStructure: {
    h1: number
    h2: number
    h3: number
  }
  imageCount: number
  imagesWithAlt: number
  internalLinks: number
  externalLinks: number
  metaDescription: boolean
  metaTitle: boolean
  canonicalUrl: boolean
  structuredData: boolean
  openGraph: boolean

  // User engagement
  scrollDepth: number
  timeOnPage: number
  bounced: boolean
}

/**
 * Real-time SEO Performance Tracker
 * Monitors and reports SEO health metrics
 */
export function SEOPerformanceTracker() {
  const [metrics, setMetrics] = useState<Partial<SEOMetrics>>({})
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const pageLoadTime = Date.now()

    // Analyze page structure
    const analyzePageStructure = () => {
      const body = document.body
      const text = body.innerText || ''

      // Word count
      const wordCount = text.split(/\s+/).filter(Boolean).length

      // Heading structure
      const h1Count = document.querySelectorAll('h1').length
      const h2Count = document.querySelectorAll('h2').length
      const h3Count = document.querySelectorAll('h3').length

      // Images
      const images = document.querySelectorAll('img')
      const imageCount = images.length
      const imagesWithAlt = Array.from(images).filter(img => img.alt).length

      // Links
      const links = document.querySelectorAll('a')
      const internalLinks = Array.from(links).filter(link =>
        link.href.includes(window.location.hostname)
      ).length
      const externalLinks = links.length - internalLinks

      // Meta tags
      const metaDescription = !!document.querySelector('meta[name="description"]')
      const metaTitle = !!document.querySelector('title')
      const canonicalUrl = !!document.querySelector('link[rel="canonical"]')
      const structuredData = !!document.querySelector('script[type="application/ld+json"]')
      const openGraph = !!document.querySelector('meta[property="og:title"]')

      return {
        wordCount,
        headingStructure: { h1: h1Count, h2: h2Count, h3: h3Count },
        imageCount,
        imagesWithAlt,
        internalLinks,
        externalLinks,
        metaDescription,
        metaTitle,
        canonicalUrl,
        structuredData,
        openGraph,
      }
    }

    // Track scroll depth
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollDepth = Math.round(((scrollTop + windowHeight) / documentHeight) * 100)

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        setMetrics(prev => ({ ...prev, scrollDepth }))
      }
    }

    // Performance metrics
    const measurePerformance = () => {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navTiming) {
        setMetrics(prev => ({
          ...prev,
          pageLoadTime: navTiming.loadEventEnd - navTiming.loadEventStart,
          domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
          timeToInteractive: navTiming.domInteractive - navTiming.fetchStart,
        }))
      }
    }

    // Initialize tracking
    const structureMetrics = analyzePageStructure()
    setMetrics(prev => ({ ...prev, ...structureMetrics }))

    // Scroll tracking
    window.addEventListener('scroll', trackScrollDepth)
    trackScrollDepth() // Initial call

    // Performance tracking
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
    }

    // Time on page
    const startTime = Date.now()
    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      setMetrics(prev => ({ ...prev, timeOnPage }))

      // Bounce detection (less than 30 seconds and low scroll depth)
      const bounced = timeOnPage < 30 && maxScrollDepth < 25
      setMetrics(prev => ({ ...prev, bounced }))
    }

    const timeOnPageInterval = setInterval(trackTimeOnPage, 5000)

    // Calculate SEO score
    const calculateScore = () => {
      let score = 0

      // Content quality (30 points)
      if (structureMetrics.wordCount > 300) score += 10
      if (structureMetrics.wordCount > 1000) score += 5
      if (structureMetrics.headingStructure.h1 === 1) score += 5 // Exactly one H1
      if (structureMetrics.headingStructure.h2 >= 2) score += 5
      if (structureMetrics.headingStructure.h3 >= 2) score += 5

      // Images (10 points)
      if (structureMetrics.imageCount > 0) score += 5
      if (structureMetrics.imagesWithAlt === structureMetrics.imageCount) score += 5

      // Links (10 points)
      if (structureMetrics.internalLinks >= 3) score += 5
      if (structureMetrics.externalLinks >= 1) score += 5

      // Meta tags (30 points)
      if (structureMetrics.metaDescription) score += 8
      if (structureMetrics.metaTitle) score += 8
      if (structureMetrics.canonicalUrl) score += 6
      if (structureMetrics.structuredData) score += 4
      if (structureMetrics.openGraph) score += 4

      // Performance (20 points) - will be calculated later
      score += 20 // Assume good performance for now

      setScore(Math.min(100, score))
    }

    calculateScore()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth)
      window.removeEventListener('load', measurePerformance)
      clearInterval(timeOnPageInterval)
    }
  }, [])

  // Report to analytics endpoint
  useEffect(() => {
    if (Object.keys(metrics).length === 0) return

    const reportMetrics = async () => {
      // Send to analytics (uncomment when ready)
      // try {
      //   await fetch('/api/analytics/seo-metrics', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       url: window.location.href,
      //       metrics,
      //       score,
      //       timestamp: new Date().toISOString(),
      //     }),
      //   })
      // } catch (error) {
      //   console.error('Failed to report SEO metrics:', error)
      // }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 SEO Performance Metrics:', metrics)
        console.log('🎯 SEO Score:', score, '/100')
      }
    }

    // Report after 10 seconds on page
    const timeout = setTimeout(reportMetrics, 10000)
    return () => clearTimeout(timeout)
  }, [metrics, score])

  // This component doesn't render anything
  return null
}

/**
 * Get SEO health recommendations
 */
export function getSEORecommendations(metrics: Partial<SEOMetrics>): string[] {
  const recommendations: string[] = []

  if (!metrics.metaDescription) {
    recommendations.push('Add a meta description (150-160 characters)')
  }

  if (!metrics.metaTitle) {
    recommendations.push('Add a page title (50-60 characters)')
  }

  if (metrics.headingStructure?.h1 !== 1) {
    recommendations.push('Use exactly one H1 heading per page')
  }

  if ((metrics.wordCount ?? 0) < 300) {
    recommendations.push('Add more content (aim for 300+ words)')
  }

  if ((metrics.imagesWithAlt ?? 0) < (metrics.imageCount ?? 0)) {
    recommendations.push('Add alt text to all images')
  }

  if ((metrics.internalLinks ?? 0) < 3) {
    recommendations.push('Add more internal links (aim for 3+)')
  }

  if (!metrics.canonicalUrl) {
    recommendations.push('Add canonical URL to prevent duplicate content')
  }

  if (!metrics.structuredData) {
    recommendations.push('Add structured data (JSON-LD schema)')
  }

  if (!metrics.openGraph) {
    recommendations.push('Add Open Graph meta tags for social sharing')
  }

  return recommendations
}
