import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/use-auth'
import { ConditionalLayout } from '@/components/layout/conditional-layout'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  // Optimize font loading
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'AI-Powered Recruitment Platform | HR Recruitment AI Agent',
  description: 'Transform your hiring process with AI-powered recruitment platform. Hire 5x faster with 95% accuracy using intelligent automation, advanced analytics, and bias-free candidate screening.',
  keywords: ['AI recruitment', 'automated hiring', 'candidate screening', 'HR technology', 'recruitment software', 'hiring automation', 'talent acquisition', 'AI-powered HR'],
  authors: [{ name: 'HR Recruitment AI Team' }],
  openGraph: {
    title: 'AI-Powered Recruitment Platform | HR Recruitment AI Agent',
    description: 'Transform your hiring process with AI-powered recruitment platform. Hire 5x faster with 95% accuracy using intelligent automation and advanced analytics.',
    type: 'website',
    siteName: 'HR Recruitment AI Agent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Recruitment Platform',
    description: 'Transform your hiring process with AI-powered recruitment platform. Hire 5x faster with 95% accuracy.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#e51ae5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${figtree.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
            <ConditionalLayout>{children}</ConditionalLayout>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
