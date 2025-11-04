'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, Video, ExternalLink, Loader2, MapPin, UserCheck, UserX, AlertTriangle, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'
import { JobPosting } from '@/types'

interface InterviewData extends JobPosting {
  applicantCount: number
  upcomingInterviews: number
  applicantStats: {
    total: number
    shortlisted: number
    flagged: number
    rejected: number
    pending: number
  }
}

export function InterviewsSection() {
  const { user } = useAuth()
  const [interviews, setInterviews] = useState<InterviewData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadInterviews = async () => {
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
        
        // Get job postings with interview dates
        const { data: jobs, error: jobsError } = await supabase
          .from('job_postings')
          .select('*')
          .eq('company_id', company.id)
          .eq('status', 'active')
          .not('interview_date', 'is', null)
          .order('interview_date', { ascending: true })
        
        if (jobsError) {
          throw jobsError
        }
        
        // Get detailed applicant statistics for each job
        const jobIds = jobs?.map(job => job.id) || []
        let applicantStatsMap: { [key: string]: any } = {}
        
        if (jobIds.length > 0) {
          const { data: applicants, error: applicantsError } = await supabase
            .from('applicants')
            .select('job_posting_id, status')
            .in('job_posting_id', jobIds)
          
          if (!applicantsError && applicants) {
            applicantStatsMap = applicants.reduce((acc, applicant) => {
              if (!acc[applicant.job_posting_id]) {
                acc[applicant.job_posting_id] = {
                  total: 0,
                  shortlisted: 0,
                  flagged: 0,
                  rejected: 0,
                  pending: 0
                }
              }
              
              acc[applicant.job_posting_id].total++
              acc[applicant.job_posting_id][applicant.status]++
              
              return acc
            }, {} as { [key: string]: any })
          }
        }
        
        // Process interview data
        const now = new Date()
        const interviewData = jobs?.map(job => ({
          ...job,
          applicantCount: applicantStatsMap[job.id]?.total || 0,
          upcomingInterviews: new Date(job.interview_date) > now ? 1 : 0,
          applicantStats: applicantStatsMap[job.id] || {
            total: 0,
            shortlisted: 0,
            flagged: 0,
            rejected: 0,
            pending: 0
          }
        })) || []
        
        setInterviews(interviewData)
      } catch (err) {
        console.error('Error loading interviews:', err)
        setError('Failed to load interview data')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadInterviews()
  }, [user])

  const formatInterviewDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUpcoming: date > new Date(),
      isToday: date.toDateString() === new Date().toDateString()
    }
  }

  const upcomingInterviews = interviews.filter(interview => 
    new Date(interview.interview_date) > new Date()
  )

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-figtree font-semibold mb-2 gradient-text">
          Interviews
        </h1>
        <p className="text-xl font-figtree font-light text-muted-foreground">
          Manage your interview schedule
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
            <p className="text-muted-foreground">Loading interview schedule...</p>
          </div>
        </motion.div>
      )}

      {/* Interview Summary */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl font-figtree font-semibold flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                Interview Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Total Interviews</h3>
                  <p className="text-2xl font-bold text-primary font-figtree">{interviews.length}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Upcoming</h3>
                  <p className="text-2xl font-bold text-primary font-figtree">{upcomingInterviews.length}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Total Applicants</h3>
                  <p className="text-2xl font-bold text-blue-600 font-figtree">
                    {interviews.reduce((sum, interview) => sum + interview.applicantStats.total, 0)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Shortlisted</h3>
                  <p className="text-2xl font-bold text-green-600 font-figtree">
                    {interviews.reduce((sum, interview) => sum + interview.applicantStats.shortlisted, 0)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Flagged</h3>
                  <p className="text-2xl font-bold text-yellow-600 font-figtree">
                    {interviews.reduce((sum, interview) => sum + interview.applicantStats.flagged, 0)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-3">
                    <UserX className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-figtree font-semibold mb-1">Rejected</h3>
                  <p className="text-2xl font-bold text-red-600 font-figtree">
                    {interviews.reduce((sum, interview) => sum + interview.applicantStats.rejected, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Upcoming Interviews */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Interviews
              </CardTitle>
              <CardDescription>
                Scheduled interviews for your active job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming interviews</h3>
                  <p className="text-muted-foreground mb-6">
                    Interviews will appear here when you schedule them for your job postings
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview, index) => {
                    const dateInfo = formatInterviewDate(interview.interview_date)
                    return (
                      <motion.div
                        key={interview.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold font-figtree">{interview.job_title}</h3>
                                  <Badge variant={dateInfo.isToday ? 'warning' : 'success'}>
                                    {dateInfo.isToday ? 'Today' : 'Upcoming'}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground font-figtree font-light mb-3">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {dateInfo.date} at {dateInfo.time}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {interview.company_name}
                                  </div>
                                </div>
                                
                                {/* Applicant Statistics for Interview */}
                                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                  <h5 className="text-xs font-semibold text-gray-700 mb-2 font-figtree">Applicant Statistics</h5>
                                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-1 mb-1">
                                        <UserPlus className="w-3 h-3 text-blue-600" />
                                        <span className="text-xs font-medium text-gray-600">Total</span>
                                      </div>
                                      <p className="text-sm font-bold text-blue-600">{interview.applicantStats.total}</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-1 mb-1">
                                        <UserCheck className="w-3 h-3 text-green-600" />
                                        <span className="text-xs font-medium text-gray-600">Shortlisted</span>
                                      </div>
                                      <p className="text-sm font-bold text-green-600">{interview.applicantStats.shortlisted}</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-1 mb-1">
                                        <AlertTriangle className="w-3 h-3 text-yellow-600" />
                                        <span className="text-xs font-medium text-gray-600">Flagged</span>
                                      </div>
                                      <p className="text-sm font-bold text-yellow-600">{interview.applicantStats.flagged}</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-1 mb-1">
                                        <UserX className="w-3 h-3 text-red-600" />
                                        <span className="text-xs font-medium text-gray-600">Rejected</span>
                                      </div>
                                      <p className="text-sm font-bold text-red-600">{interview.applicantStats.rejected}</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-1 mb-1">
                                        <Users className="w-3 h-3 text-gray-600" />
                                        <span className="text-xs font-medium text-gray-600">Pending</span>
                                      </div>
                                      <p className="text-sm font-bold text-gray-600">{interview.applicantStats.pending}</p>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground font-figtree font-light">
                                  {interview.job_description.substring(0, 100)}...
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {interview.interview_meeting_link && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(interview.interview_meeting_link!, '_blank')}
                                  >
                                    <Video className="w-4 h-4 mr-1" />
                                    Join Meeting
                                  </Button>
                                )}
                                {interview.google_calendar_link && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(interview.google_calendar_link, '_blank')}
                                  >
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    Calendar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
