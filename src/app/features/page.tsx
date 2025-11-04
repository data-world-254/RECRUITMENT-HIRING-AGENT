'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
  Filter,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Screening',
    description: 'Advanced machine learning algorithms analyze resumes and match candidates to job requirements with 94% accuracy.',
    benefits: ['Automated resume parsing', 'Skills matching', 'Cultural fit analysis', 'Bias-free screening'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Get instant insights into your recruitment process with comprehensive dashboards and reporting.',
    benefits: ['Live metrics tracking', 'Performance analytics', 'Time-to-hire optimization', 'Cost analysis'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Streamline your hiring process with collaborative tools designed for modern HR teams.',
    benefits: ['Multi-user access', 'Role-based permissions', 'Collaborative reviews', 'Team notifications'],
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Set up automated recruitment workflows that handle repetitive tasks and keep your process moving.',
    benefits: ['Email automation', 'Interview scheduling', 'Status updates', 'Follow-up reminders'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with GDPR compliance, ensuring your data and candidates\' privacy are protected.',
    benefits: ['End-to-end encryption', 'GDPR compliance', 'SOC 2 certified', 'Regular audits'],
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Global Integration',
    description: 'Connect with your favorite tools and platforms through our extensive integration ecosystem.',
    benefits: ['ATS integration', 'Calendar sync', 'Email platforms', 'Job boards'],
    color: 'from-indigo-500 to-purple-500',
  },
]

const stats = [
  { label: 'Time Saved', value: '75%', description: 'Average reduction in screening time' },
  { label: 'Accuracy Rate', value: '94%', description: 'AI matching accuracy' },
  { label: 'Cost Reduction', value: '60%', description: 'Lower recruitment costs' },
  { label: 'Happy Customers', value: '10K+', description: 'Companies using our platform' },
]

const process = [
  {
    step: '01',
    title: 'Job Posting',
    description: 'Create detailed job postings with AI-optimized descriptions and requirements.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'AI Screening',
    description: 'Our AI analyzes resumes and matches candidates based on skills and experience.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Team Review',
    description: 'Review shortlisted candidates with collaborative tools and detailed insights.',
    icon: Users,
  },
  {
    step: '04',
    title: 'Interview & Hire',
    description: 'Schedule interviews and make data-driven hiring decisions.',
    icon: CheckCircle,
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Powerful Features</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-figtree font-semibold mb-6 gradient-text">
              Everything You Need for
              <br />
              Smart Hiring
            </h1>
            
            <p className="text-xl md:text-2xl font-figtree font-light text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our comprehensive platform combines AI-powered screening, real-time analytics, 
              and team collaboration tools to revolutionize your recruitment process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-figtree gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900 font-figtree mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground font-figtree font-light">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-figtree font-semibold mb-4 gradient-text">
              Powerful Features for Modern HR
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              Discover the tools and capabilities that make our platform the choice of leading companies worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 group border-0 bg-white/80 backdrop-blur-md">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-figtree font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-base font-figtree font-light">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground font-figtree font-light">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-figtree font-semibold mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes recruitment simple, efficient, and effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold font-figtree mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-figtree font-light">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-figtree font-semibold mb-6 gradient-text">
              Ready to Experience the Future of Hiring?
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground mb-8">
              Join thousands of companies already using our AI-powered recruitment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="gradient"
                className="group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="group"
              >
                Schedule Demo
                <Calendar className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
