'use client'

import { useEffect } from 'react'

export default function EnvTrap() {
  useEffect(() => {
    console.warn('[SECURITY] Environment file access attempt detected')
    console.warn('[SECURITY] IP should be logged and blocked')
  }, [])

  // Generate fake environment variables to waste attacker time
  const fakeEnvVars = [
    'DATABASE_URL=postgresql://fake:fake@localhost:5432/fake',
    'API_KEY=sk_test_fake1234567890abcdefghijklmnop',
    'SECRET_KEY=thisisnotarealsecretkey123456789',
    'STRIPE_KEY=pk_test_fake1234567890',
    'AWS_ACCESS_KEY=AKIAFAKEACCESSKEY123',
    'AWS_SECRET_KEY=fakeSecretKey123456789abcdef',
    'JWT_SECRET=notarealjwtsecret123456',
    'ADMIN_PASSWORD=admin123',
    'SMTP_PASSWORD=email_password_123',
    'REDIS_URL=redis://localhost:6379',
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <h1 className="text-2xl mb-4">.env</h1>
      <div className="space-y-2">
        {fakeEnvVars.map((envVar, i) => (
          <div key={i} className="opacity-80">{envVar}</div>
        ))}
      </div>

      {/* Generate massive fake data to waste scraper bandwidth */}
      <div className="hidden">
        {Array.from({ length: 2000 }, (_, i) =>
          `FAKE_KEY_${i}=fake_value_${Math.random().toString(36)}_${i}\n`
        ).join('')}
      </div>
    </div>
  )
}
