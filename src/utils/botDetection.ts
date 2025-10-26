/**
 * Advanced Bot Detection Utility
 * Detects headless browsers, automation tools, and scrapers
 */

export interface BotFingerprint {
  isBot: boolean
  confidence: number
  reasons: string[]
  fingerprint: {
    userAgent: string
    platform: string
    vendor: string
    hasWebdriver: boolean
    hasHeadless: boolean
    pluginCount: number
    languages: readonly string[]
    hasTouch: boolean
    screenResolution: string
    colorDepth: number
    timezone: string
    timestamp: string
  }
}

export function detectBot(): BotFingerprint {
  const reasons: string[] = []
  let botScore = 0

  // User agent checks
  const ua = navigator.userAgent.toLowerCase()
  const botPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python',
    'java', 'perl', 'ruby', 'headless', 'phantom', 'selenium', 'puppeteer'
  ]

  if (botPatterns.some(pattern => ua.includes(pattern))) {
    botScore += 50
    reasons.push('Bot pattern in user agent')
  }

  // Webdriver detection
  if ((navigator as any).webdriver) {
    botScore += 40
    reasons.push('Webdriver detected')
  }

  // Headless browser detection
  if (!navigator.plugins.length && !navigator.mimeTypes.length) {
    botScore += 30
    reasons.push('No plugins (likely headless)')
  }

  // Chrome headless specific
  if (/HeadlessChrome/.test(ua)) {
    botScore += 50
    reasons.push('Headless Chrome detected')
  }

  // Language check (bots often have no languages)
  if (!navigator.languages || navigator.languages.length === 0) {
    botScore += 20
    reasons.push('No languages configured')
  }

  // Screen resolution checks (bots often have odd resolutions)
  if (screen.width === 0 || screen.height === 0) {
    botScore += 30
    reasons.push('Invalid screen dimensions')
  }

  // Color depth check (bots often have 0 or unusual values)
  if (screen.colorDepth === 0 || screen.colorDepth > 32) {
    botScore += 20
    reasons.push('Unusual color depth')
  }

  // Check for common automation properties
  if ((window as any)._phantom || (window as any).callPhantom) {
    botScore += 50
    reasons.push('PhantomJS detected')
  }

  if ((window as any).__nightmare) {
    botScore += 50
    reasons.push('Nightmare.js detected')
  }

  if ((document as any).__selenium_unwrapped || (document as any).__webdriver_evaluate) {
    botScore += 50
    reasons.push('Selenium markers detected')
  }

  // Check for automation flags
  if ((window as any).chrome && !(window as any).chrome.runtime) {
    botScore += 20
    reasons.push('Chrome runtime missing')
  }

  // Permission API check (bots often fail this)
  if (!navigator.permissions) {
    botScore += 15
    reasons.push('Permissions API missing')
  }

  // Connection API check
  if (!(navigator as any).connection && !(navigator as any).mozConnection && !(navigator as any).webkitConnection) {
    botScore += 10
    reasons.push('Connection API missing')
  }

  // Vendor check (empty or unusual values)
  if (!navigator.vendor || navigator.vendor === '') {
    botScore += 15
    reasons.push('No vendor information')
  }

  // Mouse movement tracking (bots don't move mouse naturally)
  // This would be implemented in a component with event listeners

  const fingerprint = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    hasWebdriver: !!(navigator as any).webdriver,
    hasHeadless: /headless/i.test(ua),
    pluginCount: navigator.plugins.length,
    languages: navigator.languages,
    hasTouch: 'ontouchstart' in window,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  }

  return {
    isBot: botScore >= 40, // 40% confidence threshold
    confidence: Math.min(botScore, 100),
    reasons,
    fingerprint,
  }
}

/**
 * Log bot detection to console (in production, send to analytics)
 */
export function logBotDetection(detection: BotFingerprint) {
  if (detection.isBot) {
    console.warn('[SECURITY] Bot detected:', {
      confidence: `${detection.confidence}%`,
      reasons: detection.reasons,
      fingerprint: detection.fingerprint,
    })

    // In production, send to your analytics/logging service:
    // fetch('/api/security/log-bot', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(detection)
    // })
  }
}

/**
 * Advanced canvas fingerprinting (unique per browser/device)
 * Helps identify repeat bot visits
 */
export function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'no-canvas'

    canvas.width = 200
    canvas.height = 50

    // Draw text with varying properties
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText('1ABEL', 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText('Security', 4, 17)

    // Convert to hash
    const dataUrl = canvas.toDataURL()
    let hash = 0
    for (let i = 0; i < dataUrl.length; i++) {
      const char = dataUrl.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }

    return hash.toString(16)
  } catch (e) {
    return 'canvas-blocked'
  }
}

/**
 * WebGL fingerprinting (more advanced)
 */
export function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return 'no-webgl'

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return 'no-debug-info'

    const vendor = (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    return `${vendor}|${renderer}`
  } catch (e) {
    return 'webgl-blocked'
  }
}

/**
 * Timing attack detection
 * Bots often have unusual timing patterns
 */
export function detectTimingAnomalies(): boolean {
  const start = performance.now()

  // Perform some operations
  for (let i = 0; i < 1000; i++) {
    Math.sqrt(i)
  }

  const end = performance.now()
  const duration = end - start

  // Bots in VM often have inconsistent timing
  // Real browsers: 0.1-2ms, Bots: often <0.05ms or >5ms
  return duration < 0.05 || duration > 5
}

/**
 * Mouse movement entropy check
 * Real users have natural randomness, bots don't
 */
export class MouseEntropyTracker {
  private movements: Array<{ x: number; y: number; time: number }> = []
  private startTime: number = Date.now()

  trackMovement(x: number, y: number) {
    this.movements.push({ x, y, time: Date.now() - this.startTime })

    // Keep only last 50 movements
    if (this.movements.length > 50) {
      this.movements.shift()
    }
  }

  calculateEntropy(): number {
    if (this.movements.length < 10) return 0

    // Calculate variance in movements
    const xValues = this.movements.map(m => m.x)
    const yValues = this.movements.map(m => m.y)

    const xVariance = this.variance(xValues)
    const yVariance = this.variance(yValues)

    // High variance = likely human (natural randomness)
    // Low variance = likely bot (mechanical movements)
    return Math.sqrt(xVariance + yVariance)
  }

  private variance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const squareDiffs = values.map(value => Math.pow(value - mean, 2))
    return squareDiffs.reduce((a, b) => a + b, 0) / values.length
  }

  isLikelyBot(): boolean {
    const entropy = this.calculateEntropy()
    // Entropy < 100 suggests mechanical/scripted movement
    return entropy > 0 && entropy < 100
  }
}
