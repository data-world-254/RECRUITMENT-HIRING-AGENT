'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '../metric-card'
import { 
  TrendingUp,
  Brain,
  Clock,
  CheckCircle,
  BarChart3,
  Loader2,
  Briefcase,
  Users,
  UserCheck,
  UserX,
  AlertTriangle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'
import { useAnalyticsRealtime, useJobsRealtime } from '@/hooks/use-realtime-data'

interface DashboardMetrics {
  activeJobs: number
  totalJobs: number
  totalReports: number
  readyReports: number
  totalApplicants: number
  shortlistedApplicants: number
  flaggedApplicants: number
  rejectedApplicants: number
}

export function OverviewSection() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeJobs: 0,
    totalJobs: 0,
    totalReports: 0,
    readyReports: 0,
    totalApplicants: 0,
    shortlistedApplicants: 0,
    flaggedApplicants: 0,
    rejectedApplicants: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboardMetrics = useCallback(async () => {
    if (!user) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      // Get company for this user
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('user_id', user.id)
        .single()
      
      if (companyError) {
        throw companyError
      }
      
      // Get job postings for this company
      const { data: jobs, error: jobsError } = await supabase
        .from('job_postings')
        .select('id, status, created_at')
        .eq('company_id', company.id)
      
      if (jobsError) {
        throw jobsError
      }
      
      const jobIds = jobs?.map(job => job.id) || []
      
      // Get recruitment analytics for reports
      let totalReports = 0
      let readyReports = 0
      
      if (jobIds.length > 0) {
        const { data: analytics, error: analyticsError } = await supabase
          .from('recruitment_analytics')
          .select('processing_status')
          .in('job_posting_id', jobIds)
        
        if (!analyticsError && analytics) {
          totalReports = analytics.length
          readyReports = analytics.filter(a => a.processing_status === 'finished').length
        }
      }
      
      // Get applicant statistics
      let totalApplicants = 0
      let shortlistedApplicants = 0
      let flaggedApplicants = 0
      let rejectedApplicants = 0
      
      if (jobIds.length > 0) {
        const { data: applicants, error: applicantsError } = await supabase
          .from('applicants')
          .select('status')
          .in('job_posting_id', jobIds)
        
        if (!applicantsError && applicants) {
          const normalize = (s?: string | null) => {
            if (!s) return ''
            const val = s.trim().toLowerCase()
            if (val === 'flag to hr' || val === 'flag_to_hr' || val === 'flagged' || val === 'flag' || val === 'flag-to-hr') return 'flagged'
            if (val === 'shortlisted' || val === 'short-list' || val === 'short_list') return 'shortlisted'
            if (val === 'rejected' || val === 'reject') return 'rejected'
            return val
          }

          totalApplicants = applicants.length
          shortlistedApplicants = applicants.filter(a => normalize((a as any).status) === 'shortlisted').length
          flaggedApplicants = applicants.filter(a => normalize((a as any).status) === 'flagged').length
          rejectedApplicants = applicants.filter(a => normalize((a as any).status) === 'rejected').length
        }
      }
      
      // Calculate metrics
      const activeJobs = jobs?.filter(job => job.status === 'active').length || 0
      const totalJobs = jobs?.length || 0
      
      setMetrics({
        activeJobs,
        totalJobs,
        totalReports,
        readyReports,
        totalApplicants,
        shortlistedApplicants,
        flaggedApplicants,
        rejectedApplicants
      })
    } catch (err) {
      console.error('Error loading dashboard metrics:', err)
      setError('Failed to load dashboard metrics')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Load metrics on component mount
  useEffect(() => {
    loadDashboardMetrics()
  }, [user, loadDashboardMetrics])

  // Set up real-time subscriptions for data updates
  useAnalyticsRealtime(() => {
    console.log('Analytics data changed, refreshing metrics...')
    loadDashboardMetrics()
  })

  useJobsRealtime(() => {
    console.log('Jobs data changed, refreshing metrics...')
    loadDashboardMetrics()
  })

  const metricsData = [
    {
      title: 'Active Jobs',
      value: metrics.activeJobs,
      icon: TrendingUp,
      trend: metrics.totalJobs > 0 ? { 
        value: metrics.totalJobs, 
        label: 'total jobs', 
        isPositive: true 
      } : undefined,
    },
    {
      title: 'Total Jobs',
      value: metrics.totalJobs,
      icon: Briefcase,
    },
    {
      title: 'Reports Generated',
      value: metrics.totalReports,
      icon: BarChart3,
      trend: metrics.totalReports > 0 ? { 
        value: metrics.readyReports, 
        label: 'ready', 
        isPositive: true 
      } : undefined,
    },
    {
      title: 'Ready Reports',
      value: metrics.readyReports,
      icon: CheckCircle,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-figtree font-semibold mb-2 gradient-text">
          Welcome back!
        </h1>
        <p className="text-xl font-figtree font-light text-muted-foreground">
          Here's what's happening with your recruitment process
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <div className="text-center">
            <Loader2 className="animate-spin-smooth rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard metrics...</p>
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              trend={metric.trend}
              delay={index * 0.1}
            />
          ))}
        </div>
      )}

      {/* Applicant Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-figtree font-semibold flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              Applicant Analytics Overview
            </CardTitle>
            <CardDescription className="text-base font-figtree font-light">
              Comprehensive breakdown of your recruitment pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Total Applicants</h3>
                <p className="text-2xl font-bold text-blue-600 font-figtree">{metrics.totalApplicants}</p>
                <p className="text-xs text-muted-foreground font-figtree font-light">
                  Across all job postings
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Shortlisted</h3>
                <p className="text-2xl font-bold text-green-600 font-figtree">{metrics.shortlistedApplicants}</p>
                <p className="text-xs text-muted-foreground font-figtree font-light">
                  {metrics.totalApplicants > 0 ? Math.round((metrics.shortlistedApplicants / metrics.totalApplicants) * 100) : 0}% of total
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Flagged</h3>
                <p className="text-2xl font-bold text-yellow-600 font-figtree">{metrics.flaggedApplicants}</p>
                <p className="text-xs text-muted-foreground font-figtree font-light">
                  Require review
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-3">
                  <UserX className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Rejected</h3>
                <p className="text-2xl font-bold text-red-600 font-figtree">{metrics.rejectedApplicants}</p>
                <p className="text-xs text-muted-foreground font-figtree font-light">
                  {metrics.totalApplicants > 0 ? Math.round((metrics.rejectedApplicants / metrics.totalApplicants) * 100) : 0}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-figtree font-semibold flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              AI Analysis Overview
            </CardTitle>
            <CardDescription className="text-base font-figtree font-light">
              Real-time insights from your AI recruitment agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Processing Speed</h3>
                <p className="text-sm text-muted-foreground font-figtree font-light">
                  Average 24 hours per application
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Accuracy Rate</h3>
                <p className="text-sm text-muted-foreground font-figtree font-light">
                  94% match accuracy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary via-secondary to-primary flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-figtree font-semibold mb-1">Success Rate</h3>
                <p className="text-sm text-muted-foreground font-figtree font-light">
                  78% hiring success
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-figtree font-semibold flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription className="font-figtree font-light">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Manage Jobs</h3>
                  <p className="text-xs text-muted-foreground font-figtree font-light">
                    View and edit job postings
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-secondary to-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">View Reports</h3>
                  <p className="text-xs text-muted-foreground font-figtree font-light">
                    Download analytics
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary via-secondary to-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Create Job</h3>
                  <p className="text-xs text-muted-foreground font-figtree font-light">
                    Post new positions
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
