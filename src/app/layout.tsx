import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalSoundSystem } from '@/components/GlobalSoundSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1abel - Premium Entertainment Label',
  description: '1abel - Premium entertainment label representing breakthrough artists in music and fashion. Building the future of entertainment through innovation, creativity, and authentic artistic expression.',
  keywords: 'music label, fashion, entertainment, artists, music production, fashion modeling',
  authors: [{ name: '1abel' }],
  creator: '1abel',
  publisher: '1abel',
  openGraph: {
    title: '1abel - Premium Entertainment Label',
    description: '1abel - Premium entertainment label representing breakthrough artists in music and fashion.',
    url: 'https://1abel.com',
    siteName: '1abel',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '1abel Entertainment Label',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1abel - Premium Entertainment Label',
    description: '1abel - Premium entertainment label representing breakthrough artists in music and fashion.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GlobalSoundSystem />
      </body>
    </html>
  )
}