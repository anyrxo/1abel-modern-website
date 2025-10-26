'use client'

import { useEffect } from 'react'

/**
 * Global security component to protect 1ABEL site from scraping and code theft
 * Brand owned by IImagined Company
 */
export function SecurityProtection() {
  useEffect(() => {
    // 1. DISABLE RIGHT-CLICK GLOBALLY
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // 2. DISABLE KEYBOARD SHORTCUTS FOR DEVTOOLS
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }

      // Block Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }

      // Block Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        return false
      }

      // Block Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }

      // Block Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        return false
      }

      // Block Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }
    }

    // 3. DETECT DEVTOOLS OPENING (annoyance tactic)
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        // DevTools detected - could redirect or show warning
        // For now, just console.clear() to annoy scrapers
        console.clear()
      }
    }

    // 4. PREVENT DRAG AND DROP OF IMAGES
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // 5. CLEAR CONSOLE PERIODICALLY (anti-scraping)
    const consoleClearInterval = setInterval(() => {
      console.clear()
    }, 2000)

    // 6. DETECT HEADLESS BROWSERS (Puppeteer, Playwright, etc.)
    const detectHeadless = () => {
      // Check for common headless browser indicators
      if (navigator.webdriver) {
        // Headless browser detected
        document.body.innerHTML = '<h1>Access Denied</h1><p>Automated access is not permitted.</p>'
      }
    }

    // Attach all event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragstart', handleDragStart)

    // Run detection checks
    detectHeadless()
    const devToolsInterval = setInterval(detectDevTools, 1000)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
      clearInterval(consoleClearInterval)
      clearInterval(devToolsInterval)
    }
  }, [])

  // Add invisible copyright watermark to DOM
  useEffect(() => {
    const watermark = document.createElement('div')
    watermark.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;'
    watermark.setAttribute('data-copyright', '© 2025 1ABEL - A Brand of IImagined Company. All Rights Reserved.')
    watermark.setAttribute('data-owner', 'IImagined Company')
    watermark.setAttribute('data-unauthorized-use', 'Prohibited. Legal action will be taken against unauthorized reproduction.')
    document.body.appendChild(watermark)

    return () => {
      document.body.removeChild(watermark)
    }
  }, [])

  return null
}
