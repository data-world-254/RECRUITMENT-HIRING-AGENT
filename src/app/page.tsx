'use client'

import { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Brain } from 'lucide-react'
import NeuralNetworkHero from '@/components/ui/neural-network-hero'
import VideoSection from '@/components/ui/video-section'

// Lazy load heavy components
const LazyHomePageContent = lazy(() => import('./homepage-content'))

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Do not auto-redirect away from home so the hero component can render
  // Users can navigate via the CTA buttons instead
  useEffect(() => {
    // intentionally no redirect here
  }, [])

  // Show loading state while auth is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Neural Network Hero Section */}
      <NeuralNetworkHero
        title="Transform Your Hiring Process with AI Precision."
        description="Transform your hiring process with intelligent automation, advanced analytics, and bias-free candidate screening. Hire 5x faster with 95% accuracy."
        badgeText="Smart AI Integration"
        badgeLabel="New"
        ctaButtons={[
          { 
            text: "Get Started", 
            href: "/auth/signup",
            onClick: () => router.push('/auth/signup'),
            primary: true 
          },
          { 
            text: "See It in Action", 
            href: "/auth/signin",
            onClick: () => router.push('/auth/signin')
          }
        ]}
        microDetails={["95% AI Accuracy", "5x Faster Hiring", "70% Cost Reduction"]}
      />

      {/* Video Section */}
      <VideoSection
        videoSrc="/assets/videos/HR Talking.mp4"
        title="See It in Action"
        description="Watch how our AI-powered platform transforms your hiring process"
      />

      {/* Value Propositions Section - Below Hero */}
      <section className="relative py-24 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* 95% AI Accuracy Rate */}
            <div className="group relative">
              <div 
                className="relative h-full rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 13, 186, 0.1), rgba(74, 13, 186, 0.05))',
                  borderColor: 'rgba(74, 13, 186, 0.3)',
                  borderWidth: '1px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(74, 13, 186, 0.3), transparent 70%)',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div 
                    className="text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300 font-figtree"
                    style={{ color: '#4A0DBA' }}
                  >
                    95%
                  </div>
                  <div className="text-base font-medium text-white/90 font-figtree tracking-wide">
                    AI Accuracy Rate
                  </div>
                </div>
              </div>
            </div>

            {/* 5x Faster Hiring */}
            <div className="group relative">
              <div 
                className="relative h-full rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 13, 186, 0.1), rgba(74, 13, 186, 0.05))',
                  borderColor: 'rgba(74, 13, 186, 0.3)',
                  borderWidth: '1px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(74, 13, 186, 0.3), transparent 70%)',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div 
                    className="text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300 font-figtree"
                    style={{ color: '#4A0DBA' }}
                  >
                    5x
                  </div>
                  <div className="text-base font-medium text-white/90 font-figtree tracking-wide">
                    Faster Hiring
                  </div>
                </div>
              </div>
            </div>

            {/* 70% Cost Reduction */}
            <div className="group relative">
              <div 
                className="relative h-full rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 13, 186, 0.1), rgba(74, 13, 186, 0.05))',
                  borderColor: 'rgba(74, 13, 186, 0.3)',
                  borderWidth: '1px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(74, 13, 186, 0.3), transparent 70%)',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div 
                    className="text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300 font-figtree"
                    style={{ color: '#4A0DBA' }}
                  >
                    70%
                  </div>
                  <div className="text-base font-medium text-white/90 font-figtree tracking-wide">
                    Cost Reduction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy load the rest of the content */}
      <Suspense fallback={
        <div className="py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }>
        <LazyHomePageContent />
      </Suspense>
    </div>
  )
}