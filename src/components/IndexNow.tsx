'use client'

import { useEffect } from 'react'

interface IndexNowConfig {
  host: string
  key: string
  keyLocation: string
}

/**
 * IndexNow - Instant indexing for Bing, Yandex, and other search engines
 *
 * IndexNow is a protocol that allows websites to instantly notify search engines
 * about new/updated/deleted content without waiting for crawlers.
 *
 * Supported by: Bing, Yandex, Seznam.cz, Naver
 */
export function IndexNow({ urls }: { urls?: string[] }) {
  useEffect(() => {
    // Only run in browser and in production
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return

    const submitToIndexNow = async () => {
      const config: IndexNowConfig = {
        host: '1abel.com', // Replace with your actual domain
        key: generateIndexNowKey(),
        keyLocation: 'https://1abel.com/indexnow-key.txt',
      }

      // URLs to submit (current page or provided URLs)
      const urlsToSubmit = urls || [window.location.href]

      // Submit to Bing IndexNow API
      try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            host: config.host,
            key: config.key,
            keyLocation: config.keyLocation,
            urlList: urlsToSubmit,
          }),
        })

        if (response.ok) {
          console.log('✅ IndexNow: URLs submitted successfully')
        } else {
          console.warn('⚠️ IndexNow: Submission failed', response.status)
        }
      } catch (error) {
        console.error('❌ IndexNow: Error submitting URLs', error)
      }

      // Also submit to Yandex directly
      try {
        for (const url of urlsToSubmit) {
          await fetch(`https://yandex.com/indexnow?url=${encodeURIComponent(url)}&key=${config.key}`, {
            method: 'GET',
          })
        }
        console.log('✅ Yandex IndexNow: URLs submitted')
      } catch (error) {
        console.warn('⚠️ Yandex IndexNow: Submission failed')
      }
    }

    // Submit after page load
    if (document.readyState === 'complete') {
      setTimeout(submitToIndexNow, 2000)
    } else {
      window.addEventListener('load', () => setTimeout(submitToIndexNow, 2000))
    }

  }, [urls])

  return null
}

/**
 * Generate or retrieve IndexNow API key
 *
 * This key is stored in /public/indexnow-key.txt
 * Key: 21c1b6aa5252f4b3a3f828e36098226a
 */
function generateIndexNowKey(): string {
  // Production key that matches /public/indexnow-key.txt
  return '21c1b6aa5252f4b3a3f828e36098226a'
}

/**
 * Utility function to manually submit URLs to IndexNow
 * Use this when you know specific pages have been updated
 */
export async function submitUrlsToIndexNow(urls: string[]) {
  const config: IndexNowConfig = {
    host: '1abel.com',
    key: generateIndexNowKey(),
    keyLocation: 'https://1abel.com/indexnow-key.txt',
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: config.host,
        key: config.key,
        keyLocation: config.keyLocation,
        urlList: urls,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('IndexNow submission failed:', error)
    return false
  }
}
