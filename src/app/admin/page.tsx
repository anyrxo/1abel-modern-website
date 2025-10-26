'use client'

import { useEffect } from 'react'

export default function AdminTrap() {
  useEffect(() => {
    // Log bot access attempt
    const logBotAccess = async () => {
      try {
        const fingerprint = {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screen: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          path: window.location.pathname,
          referrer: document.referrer,
          plugins: Array.from(navigator.plugins).map(p => p.name),
          hasWebdriver: navigator.webdriver,
          hasHeadless: /headless/i.test(navigator.userAgent),
        }

        console.warn('[SECURITY] Honeypot triggered:', fingerprint)

        // In production, send to your logging service
        // await fetch('/api/security/log-bot', {
        //   method: 'POST',
        //   body: JSON.stringify(fingerprint)
        // })
      } catch (e) {
        console.error('Bot logging error:', e)
      }
    }

    logBotAccess()
  }, [])

  // Generate random fake admin panel to waste bot time
  const fakeLinks = [
    '/admin/users', '/admin/settings', '/admin/database',
    '/admin/config', '/admin/backup', '/admin/logs',
    '/admin/security', '/admin/api', '/admin/dashboard'
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl mb-4">Login Required</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-gray-700 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 rounded"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {fakeLinks.map((link) => (
            <a
              key={link}
              href={link}
              className="block p-4 bg-gray-800 rounded hover:bg-gray-700"
            >
              {link.replace('/admin/', '')}
            </a>
          ))}
        </div>

        {/* Hidden text to waste scraper resources */}
        <div className="hidden" aria-hidden="true">
          {Array.from({ length: 1000 }, (_, i) =>
            `admin user database config password token secret key api ${i}`
          ).join(' ')}
        </div>
      </div>
    </div>
  )
}
