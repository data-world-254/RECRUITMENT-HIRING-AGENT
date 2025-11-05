'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '../metric-card'
import { 
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Loader2,
  Briefcase,
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
  ChevronDown
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'
import { useAnalyticsRealtime, useJobsRealtime } from '@/hooks/use-realtime-data'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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

interface JobPosting {
  id: string
  job_title: string
  status: string
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
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])
  const [selectedJobId, setSelectedJobId] = useState<string | 'all'>('all')
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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
        .select('id, job_title, status, created_at')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })
      
      if (jobsError) {
        throw jobsError
      }
      
      // Set job postings for dropdown
      if (jobs) {
        setJobPostings(jobs)
        // Set default to first active job or first job (only if no job is selected)
        // Use functional setState to avoid dependency on selectedJobId
        setSelectedJobId(prev => {
          if (prev === 'all' || !jobs.find(j => j.id === prev)) {
            const activeJob = jobs.find(j => j.status === 'active')
            if (activeJob) {
              return activeJob.id
            } else if (jobs.length > 0) {
              return jobs[0].id
            }
          }
          return prev
        })
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
      
      // Get applicant statistics - will be loaded separately based on selected job
      // This is kept for the overall metrics at the top
      
      // Calculate metrics
      const activeJobs = jobs?.filter(job => job.status === 'active').length || 0
      const totalJobs = jobs?.length || 0
      
      setMetrics({
        activeJobs,
        totalJobs,
        totalReports,
        readyReports,
        totalApplicants: 0, // Will be set by loadJobAnalytics
        shortlistedApplicants: 0,
        flaggedApplicants: 0,
        rejectedApplicants: 0
      })
      
      // Analytics will be loaded by the useEffect that watches selectedJobId
    } catch (err) {
      console.error('Error loading dashboard metrics:', err)
      setError('Failed to load dashboard metrics')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Load job-specific analytics from recruitment_analytics table
  const loadJobAnalytics = useCallback(async (jobId: string) => {
    if (!user || !jobId) return
    
    try {
      setIsLoadingAnalytics(true)
      
      const { data: analytics, error: analyticsError } = await supabase
        .from('recruitment_analytics')
        .select('total_applicants, total_applicants_shortlisted, total_applicants_rejected, total_applicants_flagged_to_hr')
        .eq('job_posting_id', jobId)
        .single()
      
      if (!analyticsError && analytics) {
        setMetrics(prev => ({
          ...prev,
          totalApplicants: analytics.total_applicants || 0,
          shortlistedApplicants: analytics.total_applicants_shortlisted || 0,
          rejectedApplicants: analytics.total_applicants_rejected || 0,
          flaggedApplicants: analytics.total_applicants_flagged_to_hr || 0,
        }))
      } else {
        // If no analytics found, set to 0
        setMetrics(prev => ({
          ...prev,
          totalApplicants: 0,
          shortlistedApplicants: 0,
          rejectedApplicants: 0,
          flaggedApplicants: 0,
        }))
      }
    } catch (err) {
      console.error('Error loading job analytics:', err)
    } finally {
      setIsLoadingAnalytics(false)
    }
  }, [user])

  // Load analytics for all jobs
  const loadAllJobsAnalytics = useCallback(async (jobIds: string[]) => {
    if (!user || jobIds.length === 0) return
    
    try {
      setIsLoadingAnalytics(true)
      
      const { data: analytics, error: analyticsError } = await supabase
        .from('recruitment_analytics')
        .select('total_applicants, total_applicants_shortlisted, total_applicants_rejected, total_applicants_flagged_to_hr')
        .in('job_posting_id', jobIds)
      
      if (!analyticsError && analytics) {
        const totals = analytics.reduce((acc, curr) => ({
          total_applicants: acc.total_applicants + (curr.total_applicants || 0),
          total_applicants_shortlisted: acc.total_applicants_shortlisted + (curr.total_applicants_shortlisted || 0),
          total_applicants_rejected: acc.total_applicants_rejected + (curr.total_applicants_rejected || 0),
          total_applicants_flagged_to_hr: acc.total_applicants_flagged_to_hr + (curr.total_applicants_flagged_to_hr || 0),
        }), { total_applicants: 0, total_applicants_shortlisted: 0, total_applicants_rejected: 0, total_applicants_flagged_to_hr: 0 })
        
        setMetrics(prev => ({
          ...prev,
          totalApplicants: totals.total_applicants,
          shortlistedApplicants: totals.total_applicants_shortlisted,
          rejectedApplicants: totals.total_applicants_rejected,
          flaggedApplicants: totals.total_applicants_flagged_to_hr,
        }))
      } else {
        setMetrics(prev => ({
          ...prev,
          totalApplicants: 0,
          shortlistedApplicants: 0,
          rejectedApplicants: 0,
          flaggedApplicants: 0,
        }))
      }
    } catch (err) {
      console.error('Error loading all jobs analytics:', err)
    } finally {
      setIsLoadingAnalytics(false)
    }
  }, [user])

  // Handle job selection change
  const handleJobSelect = (jobId: string | 'all') => {
    setSelectedJobId(jobId)
    setIsPopoverOpen(false)
    if (jobId === 'all') {
      // Get all job IDs for this company
      const jobIds = jobPostings.map(j => j.id)
      if (jobIds.length > 0) {
        loadAllJobsAnalytics(jobIds)
      }
    } else {
      loadJobAnalytics(jobId)
    }
  }

  // Load metrics on component mount
  useEffect(() => {
    loadDashboardMetrics()
  }, [user, loadDashboardMetrics])

  // Load analytics when selected job changes (but only if job postings are loaded)
  useEffect(() => {
    if (selectedJobId && jobPostings.length > 0 && selectedJobId !== 'all') {
      // Only load if we have a valid job ID
      const jobExists = jobPostings.find(j => j.id === selectedJobId)
      if (jobExists) {
        loadJobAnalytics(selectedJobId)
      }
    } else if (selectedJobId === 'all' && jobPostings.length > 0) {
      const jobIds = jobPostings.map(j => j.id)
      if (jobIds.length > 0) {
        loadAllJobsAnalytics(jobIds)
      }
    }
  }, [selectedJobId, jobPostings, loadJobAnalytics, loadAllJobsAnalytics])

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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-figtree font-extralight mb-2 text-[#2D2DDD] dark:text-white">
          Welcome back!
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-figtree font-light text-gray-600 dark:text-gray-300">
          Here's what's happening with your recruitment process
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg"
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
            <Loader2 className="animate-spin-smooth rounded-full h-8 w-8 border-b-2 border-[#2D2DDD] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard metrics...</p>
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl font-figtree font-extralight flex items-center gap-3 text-gray-900 dark:text-white mb-2">
                  <Users className="w-5 h-5 text-[#2D2DDD] flex-shrink-0" />
                  Applicant Analytics Overview
                </CardTitle>
                <CardDescription className="text-sm font-figtree font-light text-gray-600 dark:text-gray-400">
                  Comprehensive breakdown of your recruitment pipeline
                </CardDescription>
              </div>
              <div className="flex-shrink-0 flex items-center sm:items-start">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading || jobPostings.length === 0}
                      className="h-9 min-w-[180px] max-w-[250px] border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="max-w-[150px] truncate text-sm font-figtree font-medium">
                        {isLoading ? (
                          'Loading...'
                        ) : jobPostings.length === 0 ? (
                          'No Jobs Available'
                        ) : selectedJobId === 'all' ? (
                          'All Job Posts'
                        ) : (
                          jobPostings.find(j => j.id === selectedJobId)?.job_title || 'Select Job'
                        )}
                      </span>
                      <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  {jobPostings.length > 0 && (
                    <PopoverContent className="w-72 p-2 z-[100]" align="end">
                      <div className="space-y-1 max-h-[300px] overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => handleJobSelect('all')}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm font-figtree transition-colors",
                            selectedJobId === 'all'
                              ? "bg-[#2D2DDD] text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          )}
                        >
                          All Job Posts
                        </button>
                        {jobPostings.map((job) => (
                          <button
                            type="button"
                            key={job.id}
                            onClick={() => handleJobSelect(job.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md text-sm font-figtree transition-colors",
                              selectedJobId === job.id
                                ? "bg-[#2D2DDD] text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{job.job_title}</span>
                              {job.status === 'active' && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded flex-shrink-0">
                                  Active
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  )}
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-figtree font-medium mb-1 text-gray-900 dark:text-white">Total Applicants</h3>
                {isLoadingAnalytics ? (
                  <Loader2 className="w-6 h-6 animate-spin text-[#2D2DDD] mx-auto my-2" />
                ) : (
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400 font-figtree">{metrics.totalApplicants}</p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
                  {selectedJobId === 'all' ? 'Across all job postings' : 'For selected job'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-figtree font-medium mb-1 text-gray-900 dark:text-white">Shortlisted</h3>
                {isLoadingAnalytics ? (
                  <Loader2 className="w-6 h-6 animate-spin text-green-600 dark:text-green-400 mx-auto my-2" />
                ) : (
                  <p className="text-xl font-bold text-green-600 dark:text-green-400 font-figtree">{metrics.shortlistedApplicants}</p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
                  {metrics.totalApplicants > 0 ? Math.round((metrics.shortlistedApplicants / metrics.totalApplicants) * 100) : 0}% of total
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-figtree font-medium mb-1 text-gray-900 dark:text-white">Flagged</h3>
                {isLoadingAnalytics ? (
                  <Loader2 className="w-6 h-6 animate-spin text-yellow-600 dark:text-yellow-400 mx-auto my-2" />
                ) : (
                  <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 font-figtree">{metrics.flaggedApplicants}</p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
                  Require review
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-3">
                  <UserX className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-figtree font-medium mb-1 text-gray-900 dark:text-white">Rejected</h3>
                {isLoadingAnalytics ? (
                  <Loader2 className="w-6 h-6 animate-spin text-red-600 dark:text-red-400 mx-auto my-2" />
                ) : (
                  <p className="text-xl font-bold text-red-600 dark:text-red-400 font-figtree">{metrics.rejectedApplicants}</p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
                  {metrics.totalApplicants > 0 ? Math.round((metrics.rejectedApplicants / metrics.totalApplicants) * 100) : 0}% of total
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
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-figtree font-extralight flex items-center gap-3 text-gray-900 dark:text-white">
              <BarChart3 className="w-4 h-4 text-[#2D2DDD]" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-sm font-figtree font-light text-gray-600 dark:text-gray-400">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#2D2DDD] to-[#2D2DDD]/80 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-figtree font-medium mb-1 text-gray-900 dark:text-white">Manage Jobs</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
                    View and edit job postings
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#2D2DDD] to-[#2D2DDD]/80 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-figtree font-medium mb-1 text-gray-900 dark:text-white">View Reports</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
                    Download analytics
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#2D2DDD] to-[#2D2DDD]/80 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-figtree font-medium mb-1 text-gray-900 dark:text-white">Create Job</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-figtree font-light">
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
