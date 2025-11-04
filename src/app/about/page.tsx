'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Target, 
  Users, 
  Lightbulb,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Globe,
  Award,
  Heart,
  Zap,
  Shield
} from 'lucide-react'

const values = [
  {
    icon: Brain,
    title: 'Innovation First',
    description: 'We push the boundaries of AI technology to create cutting-edge recruitment solutions that set new industry standards.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Human-Centered',
    description: 'Our technology enhances human decision-making rather than replacing it, ensuring better outcomes for both employers and candidates.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'We maintain the highest standards of data security and privacy, earning the trust of thousands of companies worldwide.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'We believe in the power of technology to connect talent with opportunity, creating positive change on a global scale.',
    color: 'from-yellow-500 to-orange-500',
  },
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former VP of Engineering at Google, leading AI research for 10+ years.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'AI researcher and former Principal Engineer at Microsoft, specializing in machine learning.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Product',
    bio: 'Product leader with 8+ years building user-centric recruitment platforms.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'David Kim',
    role: 'Head of AI Research',
    bio: 'PhD in Computer Science, leading our AI research and development efforts.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
]

const milestones = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize recruitment through AI',
  },
  {
    year: '2021',
    title: 'First AI Model',
    description: 'Launched our first AI-powered resume screening algorithm',
  },
  {
    year: '2022',
    title: 'Series A Funding',
    description: 'Raised $10M to accelerate product development',
  },
  {
    year: '2023',
    title: '10,000+ Companies',
    description: 'Reached milestone of serving 10,000+ companies worldwide',
  },
  {
    year: '2024',
    title: 'Global Expansion',
    description: 'Expanded to 50+ countries with localized AI models',
  },
]

const stats = [
  { label: 'Companies Served', value: '10,000+', icon: Users },
  { label: 'Jobs Posted', value: '1M+', icon: TrendingUp },
  { label: 'Countries', value: '50+', icon: Globe },
  { label: 'Team Members', value: '100+', icon: Award },
]

export default function AboutPage() {
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
              <span className="text-sm font-medium">About Us</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-figtree font-semibold mb-6 gradient-text">
              Building the Future of
              <br />
              Recruitment
            </h1>
            
            <p className="text-xl md:text-2xl font-figtree font-light text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize how companies find and hire talent, 
              making recruitment faster, fairer, and more effective through the power of AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-figtree font-semibold mb-6 gradient-text">
                Our Mission
              </h2>
              <p className="text-lg font-figtree font-light text-muted-foreground mb-6">
                We believe that finding the right talent shouldn't be a time-consuming, 
                biased, or inefficient process. Our AI-powered platform eliminates these 
                challenges by providing intelligent, automated solutions that help companies 
                discover exceptional candidates quickly and fairly.
              </p>
              <p className="text-lg font-figtree font-light text-muted-foreground mb-8">
                By combining cutting-edge artificial intelligence with deep understanding 
                of recruitment challenges, we're creating a world where every company can 
                access the best talent, and every qualified candidate gets a fair chance.
              </p>
              <Button variant="gradient" className="group">
                Join Our Mission
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center">
                    <Target className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-secondary" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
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
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold font-figtree gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900 font-figtree">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we build products and serve our customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 text-center border-0 bg-white/80 backdrop-blur-md">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-figtree font-semibold">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base font-figtree font-light">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind our AI-powered recruitment platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="hover:shadow-glow transition-all duration-300 border-0 bg-white/80 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold font-figtree mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-figtree font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground font-figtree font-light">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a global leader in AI-powered recruitment
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary to-secondary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-md">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary font-figtree mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold font-figtree mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground font-figtree font-light">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary border-4 border-white shadow-lg"></div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
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
              Join Us in Revolutionizing Recruitment
            </h2>
            <p className="text-xl font-figtree font-light text-muted-foreground mb-8">
              Be part of the future of hiring. Experience the power of AI-driven recruitment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="gradient"
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="group"
              >
                View Careers
                <Heart className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
