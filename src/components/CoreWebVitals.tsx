'use client'

import { useEffect, useState } from 'react'

interface WebVitalsMetrics {
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  inp: number | null // Interaction to Next Paint (new Core Web Vital)
}

interface PerformanceMetrics {
  score: number
  metrics: WebVitalsMetrics
  timestamp: string
}

export function CoreWebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null,
  })

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // LCP - Largest Contentful Paint
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          setMetrics(prev => ({ ...prev, lcp: lastEntry.renderTime || lastEntry.loadTime }))
        })
        observer.observe({ type: 'largest-contentful-paint', buffered: true })
      } catch (e) {
        console.warn('LCP observation not supported')
      }
    }

    // FID - First Input Delay
    const observeFID = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
          })
        })
        observer.observe({ type: 'first-input', buffered: true })
      } catch (e) {
        console.warn('FID observation not supported')
      }
    }

    // CLS - Cumulative Layout Shift
    const observeCLS = () => {
      try {
        let clsValue = 0
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              setMetrics(prev => ({ ...prev, cls: clsValue }))
            }
          })
        })
        observer.observe({ type: 'layout-shift', buffered: true })
      } catch (e) {
        console.warn('CLS observation not supported')
      }
    }

    // FCP - First Contentful Paint
    const observeFCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
          })
        })
        observer.observe({ type: 'paint', buffered: true })
      } catch (e) {
        console.warn('FCP observation not supported')
      }
    }

    // TTFB - Time to First Byte
    const measureTTFB = () => {
      try {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigationEntry) {
          setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }))
        }
      } catch (e) {
        console.warn('TTFB measurement not supported')
      }
    }

    // INP - Interaction to Next Paint (new metric replacing FID)
    const observeINP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, inp: entry.duration }))
          })
        })
        observer.observe({ type: 'event', buffered: true, durationThreshold: 0 } as any)
      } catch (e) {
        console.warn('INP observation not supported')
      }
    }

    // Initialize all observers
    observeLCP()
    observeFID()
    observeCLS()
    observeFCP()
    measureTTFB()
    observeINP()

    // Report metrics to analytics endpoint (optional)
    const reportMetrics = () => {
      const performanceData: PerformanceMetrics = {
        score: calculateScore(),
        metrics: metrics,
        timestamp: new Date().toISOString(),
      }

      // Send to analytics (uncomment when ready)
      // fetch('/api/analytics/web-vitals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(performanceData),
      // })

      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          lcp: metrics.lcp,
          fid: metrics.fid,
          cls: metrics.cls,
          fcp: metrics.fcp,
          ttfb: metrics.ttfb,
          inp: metrics.inp,
        })
      }
    }

    // Report after page is loaded
    if (document.readyState === 'complete') {
      setTimeout(reportMetrics, 3000)
    } else {
      window.addEventListener('load', () => setTimeout(reportMetrics, 3000))
    }

  }, [])

  // Calculate overall performance score (0-100)
  const calculateScore = (): number => {
    let score = 100

    // LCP scoring (target: < 2.5s)
    if (metrics.lcp) {
      if (metrics.lcp > 4000) score -= 30
      else if (metrics.lcp > 2500) score -= 15
    }

    // FID scoring (target: < 100ms)
    if (metrics.fid) {
      if (metrics.fid > 300) score -= 20
      else if (metrics.fid > 100) score -= 10
    }

    // CLS scoring (target: < 0.1)
    if (metrics.cls) {
      if (metrics.cls > 0.25) score -= 25
      else if (metrics.cls > 0.1) score -= 12
    }

    // FCP scoring (target: < 1.8s)
    if (metrics.fcp) {
      if (metrics.fcp > 3000) score -= 15
      else if (metrics.fcp > 1800) score -= 7
    }

    // TTFB scoring (target: < 600ms)
    if (metrics.ttfb) {
      if (metrics.ttfb > 1800) score -= 10
      else if (metrics.ttfb > 600) score -= 5
    }

    return Math.max(0, Math.min(100, score))
  }

  // This component doesn't render anything - it just tracks metrics
  return null
}

// Helper function to get metric rating
export function getMetricRating(metric: keyof WebVitalsMetrics, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<keyof WebVitalsMetrics, { good: number; needsImprovement: number }> = {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1800, needsImprovement: 3000 },
    ttfb: { good: 600, needsImprovement: 1800 },
    inp: { good: 200, needsImprovement: 500 },
  }

  const threshold = thresholds[metric]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}
