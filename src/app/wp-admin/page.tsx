'use client'

import { useEffect } from 'react'

export default function WordPressTrap() {
  useEffect(() => {
    // Log WordPress scanner attempt
    const logScanner = async () => {
      const fingerprint = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: '/wp-admin',
        referrer: document.referrer,
        isBot: /bot|crawler|spider|scraper/i.test(navigator.userAgent),
      }
      console.warn('[SECURITY] WordPress scanner detected:', fingerprint)
    }
    logScanner()
  }, [])

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">WordPress Login</h1>
        <div className="bg-gray-100 p-6 rounded">
          <form className="space-y-4">
            <div>
              <label className="block mb-2">Username or Email</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input type="password" className="w-full p-2 border rounded" />
            </div>
            <button className="w-full p-2 bg-blue-500 text-white rounded">
              Log In
            </button>
          </form>
        </div>

        {/* Fake WordPress structure to waste bot time */}
        <div className="hidden">
          <a href="/wp-admin/admin.php">Dashboard</a>
          <a href="/wp-admin/post.php">Posts</a>
          <a href="/wp-admin/users.php">Users</a>
          <a href="/wp-content/plugins">Plugins</a>
          <a href="/wp-includes">Includes</a>
          <a href="/xmlrpc.php">XMLRPC</a>
          {Array.from({ length: 500 }, (_, i) => (
            `wordpress wp-admin wp-content plugin theme user post page ${i}`
          )).join(' ')}
        </div>
      </div>
    </div>
  )
}
