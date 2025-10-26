'use client'

import { useEffect } from 'react'
import { detectBot, logBotDetection, getCanvasFingerprint, getWebGLFingerprint, MouseEntropyTracker } from '@/utils/botDetection'

/**
 * Security Monitor Component
 * Add this to your root layout to monitor for bots and suspicious activity
 *
 * Features:
 * - Bot detection on mount
 * - Mouse movement tracking
 * - Canvas/WebGL fingerprinting
 * - Console trap (detects DevTools)
 * - Timing attack detection
 *
 * Usage: <SecurityMonitor />
 */
export function SecurityMonitor() {
  useEffect(() => {
    // Initial bot detection
    const detection = detectBot()
    logBotDetection(detection)

    if (detection.isBot && detection.confidence > 70) {
      console.warn('[SECURITY] High confidence bot detected - consider blocking')
      // In production: send to your backend for IP blocking
      // fetch('/api/security/block-ip', { method: 'POST' })
    }

    // Canvas & WebGL fingerprinting
    const canvasFingerprint = getCanvasFingerprint()
    const webglFingerprint = getWebGLFingerprint()

    console.log('[SECURITY] Fingerprints:', {
      canvas: canvasFingerprint,
      webgl: webglFingerprint,
    })

    // Mouse entropy tracking
    const mouseTracker = new MouseEntropyTracker()

    const handleMouseMove = (e: MouseEvent) => {
      mouseTracker.trackMovement(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Check mouse entropy after 5 seconds
    const entropyCheck = setTimeout(() => {
      if (mouseTracker.isLikelyBot()) {
        console.warn('[SECURITY] Suspicious mouse movement patterns detected')
        // In production: log this
      }
    }, 5000)

    // DevTools detection trap
    const devtoolsCheck = setInterval(() => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160
      const heightThreshold = window.outerHeight - window.innerHeight > 160

      if (widthThreshold || heightThreshold) {
        console.warn('[SECURITY] DevTools possibly open')
      }
    }, 1000)

    // Console trap - detect console.log hijacking
    const originalLog = console.log
    let consoleAccessCount = 0

    console.log = function(...args: any[]) {
      consoleAccessCount++
      if (consoleAccessCount > 100) {
        console.warn('[SECURITY] Excessive console access detected')
      }
      return originalLog.apply(console, args)
    }

    // Right-click protection (optional - can be annoying for users)
    // Uncomment if you want to prevent right-click
    // const handleContextMenu = (e: MouseEvent) => {
    //   if (!e.shiftKey) { // Allow with Shift key for legitimate use
    //     e.preventDefault()
    //     console.warn('[SECURITY] Right-click attempt detected')
    //   }
    // }
    // document.addEventListener('contextmenu', handleContextMenu)

    // Keyboard shortcuts protection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect common scraper shortcuts
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') || // View source
        e.key === 'F12' // DevTools
      ) {
        console.warn('[SECURITY] DevTools shortcut detected:', e.key)
        // Don't prevent default - that's annoying for legitimate users
        // Just log it for monitoring
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Clipboard hijacking detection
    let clipboardAccessCount = 0
    const handleCopy = () => {
      clipboardAccessCount++
      if (clipboardAccessCount > 50) {
        console.warn('[SECURITY] Excessive clipboard access')
      }
    }

    document.addEventListener('copy', handleCopy)

    // Performance timing analysis (detect VM/automation)
    const performanceChecks = setInterval(() => {
      const timing = performance.now()
      // Bots in VMs often have unusual performance characteristics
      if (timing < 0.1 || timing > 10000) {
        console.warn('[SECURITY] Unusual performance timing detected')
      }
    }, 5000)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(entropyCheck)
      clearInterval(devtoolsCheck)
      clearInterval(performanceChecks)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('copy', handleCopy)
      console.log = originalLog
    }
  }, [])

  // Component renders nothing - pure monitoring
  return null
}

/**
 * Lightweight Security Monitor (for pages where you don't want full monitoring)
 */
export function LightSecurityMonitor() {
  useEffect(() => {
    const detection = detectBot()
    if (detection.confidence > 80) {
      console.warn('[SECURITY] Bot detected:', detection.confidence + '%')
    }
  }, [])

  return null
}
