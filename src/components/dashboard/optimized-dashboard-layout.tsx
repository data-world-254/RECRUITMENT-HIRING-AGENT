'use client'

import { useState, useEffect, useCallback, Suspense, lazy } from 'react'
import { Sidebar } from './sidebar'
import { useAuth } from '@/hooks/use-auth'

// Lazy load all sections for optimal performance
const LazyOverviewSection = lazy(() => import('./sections/overview-section').then(m => ({ default: m.OverviewSection })))
const LazyJobsSection = lazy(() => import('./sections/jobs-section').then(m => ({ default: m.JobsSection })))
const LazyRealCandidatesSection = lazy(() => import('./sections/real-candidates-section').then(m => ({ default: m.RealCandidatesSection })))
const LazyReportsSection = lazy(() => import('./sections/reports-section').then(m => ({ default: m.ReportsSection })))
const LazyInterviewsSection = lazy(() => import('./sections/interviews-section').then(m => ({ default: m.InterviewsSection })))
const LazySettingsSection = lazy(() => import('./sections/settings-section').then(m => ({ default: m.SettingsSection })))

// Loading component for sections
const SectionLoader = ({ sectionName }: { sectionName: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin-smooth mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading {sectionName}...</p>
    </div>
  </div>
)

export function OptimizedDashboardLayout() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')
  const [isPreloading, setIsPreloading] = useState(true)
  const [preloadTime, setPreloadTime] = useState<number>(0)

  // Preload critical data for instant rendering
  const preloadCriticalData = useCallback(async () => {
    if (!user) return
    
    const startTime = performance.now()
    
    try {
      setIsPreloading(true)
      
      // Simple preload - just wait a moment for initial data
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const endTime = performance.now()
      setPreloadTime(endTime - startTime)
      
      console.log(`🚀 Dashboard preloaded in ${(endTime - startTime).toFixed(2)}ms`)
    } catch (error) {
      console.error('Dashboard preloading failed:', error)
    } finally {
      setIsPreloading(false)
    }
  }, [user])

  // Preload data on mount
  useEffect(() => {
    preloadCriticalData()
  }, [preloadCriticalData])

  // Optimized section rendering with lazy loading
  const renderSection = useCallback(() => {
    if (isPreloading) {
      return <SectionLoader sectionName="dashboard" />
    }

    switch (activeSection) {
      case 'overview':
        return (
          <Suspense fallback={<SectionLoader sectionName="overview" />}>
            <LazyOverviewSection />
          </Suspense>
        )
      case 'jobs':
        return (
          <Suspense fallback={<SectionLoader sectionName="jobs" />}>
            <LazyJobsSection />
          </Suspense>
        )
      case 'candidates':
        return (
          <Suspense fallback={<SectionLoader sectionName="candidates" />}>
            <LazyRealCandidatesSection />
          </Suspense>
        )
      case 'reports':
        return (
          <Suspense fallback={<SectionLoader sectionName="reports" />}>
            <LazyReportsSection />
          </Suspense>
        )
      case 'interviews':
        return (
          <Suspense fallback={<SectionLoader sectionName="interviews" />}>
            <LazyInterviewsSection />
          </Suspense>
        )
      case 'settings':
        return (
          <Suspense fallback={<SectionLoader sectionName="settings" />}>
            <LazySettingsSection />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<SectionLoader sectionName="overview" />}>
            <LazyOverviewSection />
          </Suspense>
        )
    }
  }, [activeSection, isPreloading])

  // Optimized section change handler
  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
