'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  X, 
  Star, 
  ArrowRight,
  Sparkles,
  Zap,
  Crown,
  Users,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started with AI recruitment',
    price: { monthly: 29, yearly: 290 },
    features: [
      'Up to 100 job postings',
      'Basic AI screening',
      'Email support',
      'Standard analytics',
      'Team of up to 5 users',
      'Basic integrations',
    ],
    limitations: [
      'No advanced AI features',
      'Limited customization',
      'No priority support',
    ],
    popular: false,
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Professional',
    description: 'Advanced features for growing companies and HR teams',
    price: { monthly: 79, yearly: 790 },
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
    limitations: [
      'No white-label option',
      'Limited custom branding',
    ],
    popular: true,
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Enterprise',
    description: 'Complete solution for large organizations with custom needs',
    price: { monthly: 199, yearly: 1990 },
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
    limitations: [],
    popular: false,
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

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
              <span className="text-sm font-medium">Flexible Pricing</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-figtree font-semibold mb-6 gradient-text">
              Simple, Transparent
              <br />
              Pricing
            </h1>
            
            <p className="text-xl md:text-2xl font-figtree font-light text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your team. Start free, upgrade anytime.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="success" className="ml-2">
                  Save 20%
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="success" className="px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full transition-all duration-300 ${
                  plan.popular 
                    ? 'border-primary shadow-glow scale-105' 
                    : 'hover:shadow-lg border-gray-200'
                }`}>
                  <CardHeader className="text-center pb-8">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-figtree font-semibold">{plan.name}</CardTitle>
                    <CardDescription className="text-base font-figtree font-light">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold font-figtree gradient-text">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground font-figtree font-light">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="font-figtree font-light">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <X className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                          <span className="font-figtree font-light">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      variant={plan.popular ? 'gradient' : 'outline'}
                      className="w-full group"
                      size="lg"
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
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
              Ready to Get Started?
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
                Contact Sales
                <Users className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}