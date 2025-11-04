'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Animated3DShape from '@/components/ui/animated-3d-shape'
import { Testimonials } from '@/components/ui/testimonials-section'
import { ModernPricingPage, PricingCardProps } from '@/components/ui/animated-glassy-pricing'
import { 
  Brain, 
  Users, 
  Zap, 
  Target, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  FileText,
  Shield,
  DollarSign,
  Building2,
  GraduationCap,
  Code,
  Palette,
  ShoppingCart,
  Stethoscope,
  Sparkles
} from 'lucide-react'

export default function HomePageContent() {
  const router = useRouter()

  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Candidate Screening',
      description: 'Advanced machine learning algorithms analyze resumes, cover letters, and portfolios to identify the best candidates in seconds.',
      benefits: ['95% accuracy rate', '10x faster screening', 'Bias-free evaluation'],
    },
    {
      icon: Users,
      title: 'Intelligent Candidate Pipeline',
      description: 'Automatically organize, score, and rank candidates with smart categorization and predictive analytics.',
      benefits: ['Automated ranking', 'Smart tagging', 'Pipeline insights'],
    },
    {
      icon: Zap,
      title: 'Automated Workflow Engine',
      description: 'Streamline your entire recruitment process from job posting to offer letter with intelligent automation.',
      benefits: ['Zero manual tasks', 'Custom workflows', 'Smart notifications'],
    },
    {
      icon: Target,
      title: 'Advanced Analytics & Insights',
      description: 'Get deep insights into your recruitment performance with real-time dashboards and predictive analytics.',
      benefits: ['Real-time metrics', 'Predictive insights', 'ROI tracking'],
    },
  ]

  const industrySolutions = [
    {
      icon: Code,
      title: 'Technology & Software',
      description: 'Specialized screening for developers, engineers, and technical roles with coding assessment integration.',
      metrics: '85% faster tech hiring',
    },
    {
      icon: Building2,
      title: 'Enterprise & Corporate',
      description: 'Scalable solutions for large organizations with complex hiring needs and compliance requirements.',
      metrics: '60% cost reduction',
    },
    {
      icon: GraduationCap,
      title: 'Education & Training',
      description: 'Academic and training institution recruitment with specialized educator screening capabilities.',
      metrics: '90% candidate quality',
    },
    {
      icon: Stethoscope,
      title: 'Healthcare & Medical',
      description: 'Healthcare-specific screening with credential verification and specialized medical role matching.',
      metrics: '100% compliance',
    },
    {
      icon: ShoppingCart,
      title: 'Retail & E-commerce',
      description: 'High-volume hiring solutions for retail positions with seasonal scaling capabilities.',
      metrics: '3x faster scaling',
    },
    {
      icon: Palette,
      title: 'Creative & Design',
      description: 'Portfolio-based screening for creative roles with visual assessment and design evaluation.',
      metrics: '95% match accuracy',
    },
  ]

  const businessBenefits = [
    {
      icon: DollarSign,
      title: 'Reduce Hiring Costs',
      description: 'Cut recruitment costs by up to 70% with automated screening and reduced time-to-hire.',
      value: '70% cost savings',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Clock,
      title: 'Faster Time-to-Hire',
      description: 'Reduce average time-to-hire from weeks to days with intelligent automation and smart matching.',
      value: '5x faster hiring',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: TrendingUp,
      title: 'Higher Quality Hires',
      description: 'Improve candidate quality with AI-powered matching and predictive analytics for better outcomes.',
      value: '40% better retention',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Shield,
      title: 'Compliance & Security',
      description: 'Ensure full compliance with employment laws and data protection regulations with built-in safeguards.',
      value: '100% compliant',
      color: 'from-orange-500 to-red-600',
    },
  ]

  

  const faqs = [
    {
      question: 'How accurate is the AI screening?',
      answer: 'Our AI achieves 95% accuracy in candidate matching, with continuous learning to improve over time.',
    },
    {
      question: 'Can I customize the screening criteria?',
      answer: 'Yes, you can fully customize screening criteria, job requirements, and evaluation parameters.',
    },
    {
      question: 'Does it integrate with our existing HR systems?',
      answer: 'We integrate with 50+ popular HR systems including Workday, BambooHR, and custom APIs.',
    },
    {
      question: 'Is my data secure and compliant?',
      answer: 'We are SOC 2 Type II compliant with enterprise-grade security and GDPR compliance.',
    },
    {
      question: 'What support do you provide?',
      answer: 'We offer 24/7 support, dedicated account managers, and comprehensive training resources.',
    },
    {
      question: 'Can I try before I buy?',
      answer: 'Yes, we offer a 14-day free trial with full access to all features and no credit card required.',
    },
  ]

  return (
    <>
      {/* Animated 3D Background Shape for Content Sections */}
      <Animated3DShape className="opacity-30" />
      
      {/* Enhanced Features Section */}
      <section className="py-20 px-4 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 mb-6">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Your all-in-one AI engine</span>
            </div>
            <h2 className="text-5xl font-figtree font-semibold mb-4 gradient-text">
              Powerful AI-Driven Features
            </h2>
            <p className="text-xl font-figtree font-light text-gray-700 max-w-3xl mx-auto">
              Transform your recruitment process with cutting-edge AI technology that learns, adapts, and delivers exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105">
                  <CardHeader className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-lg">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3 relative z-10">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed mb-4 relative z-10 text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/5 to-primary/8"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-secondary/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-32 w-4 h-4 bg-primary/20 rounded-full animate-pulse delay-700"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Tools, security, and integrations</span>
            </div>
            <h2 className="text-4xl font-figtree font-semibold mb-4 gradient-text">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl font-figtree font-light text-gray-700 max-w-2xl mx-auto">
              Tailored recruitment solutions for every industry with specialized screening and assessment tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrySolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/80 hover:scale-105 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{solution.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{solution.description}</p>
                    <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">{solution.metrics}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
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
              Measurable Business Impact
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              See the real impact on your bottom line with our comprehensive ROI tracking and analytics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center mx-auto mb-4`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                    <div className="text-2xl font-bold text-primary">{benefit.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      

      

      {/* Enhanced How It Works Section */}
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
              How It Works
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and see results immediately with our streamlined process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create & Post Jobs',
                description: 'Use our AI-optimized templates to create compelling job postings that attract top talent',
                icon: FileText,
                details: ['AI-optimized templates', 'Multi-channel posting', 'SEO optimization'],
              },
              {
                step: '02',
                title: 'AI Candidate Screening',
                description: 'Our advanced AI analyzes and scores candidates based on your specific requirements',
                icon: Brain,
                details: ['Resume analysis', 'Skill matching', 'Bias-free evaluation'],
              },
              {
                step: '03',
                title: 'Review & Interview',
                description: 'Review AI-ranked candidates with detailed insights and conduct smart interviews',
                icon: Users,
                details: ['Smart ranking', 'Interview scheduling', 'Collaborative review'],
              },
              {
                step: '04',
                title: 'Hire & Onboard',
                description: 'Make data-driven hiring decisions and seamlessly onboard your new team members',
                icon: CheckCircle,
                details: ['Decision analytics', 'Offer management', 'Onboarding automation'],
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold font-figtree mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-figtree font-light mb-4">{step.description}</p>
                <div className="space-y-1">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-figtree font-semibold mb-4 gradient-text">
              Frequently Asked Questions
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our AI-powered recruitment platform
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 font-figtree">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground font-figtree font-light">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <Testimonials />

      

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/15"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 right-32 w-4 h-4 bg-primary/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-secondary/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-1000"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700">Launch with AI Precision</span>
                </div>
                
                <h2 className="text-5xl font-figtree font-semibold mb-6 gradient-text">
                  Ready to Transform Your Hiring?
                </h2>
                <p className="text-xl font-figtree font-light text-gray-700 mb-8 max-w-2xl mx-auto">
                  Join thousands of companies already using our AI-powered recruitment platform. 
                  Start your free trial today and see the difference AI can make.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="xl"
                    variant="gradient"
                    onClick={() => router.push('/auth/signup')}
                    className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={() => router.push('/pricing')}
                    className="group bg-white/30 backdrop-blur-md border-white/40 hover:bg-white/40 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-24 px-4 bg-black overflow-hidden">
        <ModernPricingPage
          title={
            <>
              Simple, Transparent <span style={{ color: '#4A0DBA' }}>Pricing</span>
            </>
          }
          subtitle="Choose the perfect plan for your team. Start free, upgrade anytime."
          plans={[
            {
              planName: 'Starter',
              description: 'Perfect for small teams getting started with AI recruitment',
              price: '29',
              features: [
                'Up to 100 job postings',
                'Basic AI screening',
                'Email support',
                'Standard analytics',
                'Team of up to 5 users',
                'Basic integrations',
              ],
              buttonText: 'Get Started',
              isPopular: false,
              buttonVariant: 'secondary',
              onButtonClick: () => router.push('/auth/signup'),
            },
            {
              planName: 'Professional',
              description: 'Advanced features for growing companies and HR teams',
              price: '79',
              features: [
                'Unlimited job postings',
                'Advanced AI screening',
                'Priority support',
                'Advanced analytics',
                'Team of up to 25 users',
                'All integrations',
                'Custom workflows',
                'Advanced reporting',
                'API access',
              ],
              buttonText: 'Get Started',
              isPopular: true,
              buttonVariant: 'primary',
              onButtonClick: () => router.push('/auth/signup'),
            },
            {
              planName: 'Enterprise',
              description: 'Complete solution for large organizations with custom needs',
              price: '199',
              features: [
                'Everything in Professional',
                'Unlimited users',
                'White-label solution',
                'Custom AI training',
                'Dedicated account manager',
                '24/7 phone support',
                'Custom integrations',
                'Advanced security',
                'SLA guarantee',
                'Custom deployment',
              ],
              buttonText: 'Contact Sales',
              isPopular: false,
              buttonVariant: 'primary',
              onButtonClick: () => router.push('/contact'),
            },
          ]}
          showAnimatedBackground={true}
        />
      </section>
    </>
  )
}
