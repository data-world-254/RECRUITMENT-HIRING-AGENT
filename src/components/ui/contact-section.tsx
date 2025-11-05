'use client'

import { Mail, Phone, MapPin, Clock, Shield, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const ACCENT = '#2D2DDD'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } })
}

export default function ContactSection() {
  return (
    <div className="relative z-20 w-full h-full pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs sm:text-sm mb-4" style={{ boxShadow: `0 0 32px ${ACCENT}30` }}>
              We're here to help
            </span>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight">
              Contact Us
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-3">
              Reach out any time. Our team responds quickly and securely.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((card, i) => (
              <motion.div 
                key={card.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="pointer-events-auto group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-white/15"
                style={{
                  // custom CSS var so hover styles can use the accent
                  // and to create subtle glow
                  ['--accent' as any]: ACCENT,
                  boxShadow: `0 0 0 0 rgba(0,0,0,0), 0 10px 40px -10px ${ACCENT}33`
                }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl" style={{ background: ACCENT }} />
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-white/20" style={{ background: `${ACCENT}22` }}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold tracking-tight mb-1">{card.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{card.desc}</p>
                    {card.extra && (
                      <div className="mt-3 text-white/70 text-sm">
                        {card.extra}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const cards = [
  {
    title: 'Email',
    desc: 'support@hraigagent.com',
    icon: Mail,
    extra: null
  },
  {
    title: 'Phone',
    desc: '+1 (555) 123-4567',
    icon: Phone,
    extra: <span>Mon–Fri, 9:00–18:00 (UTC-5)</span>
  },
  {
    title: 'Headquarters',
    desc: 'New York, USA',
    icon: MapPin,
    extra: <span>Global remote team</span>
  },
  {
    title: 'Security & Compliance',
    desc: 'Enterprise-grade encryption and data protection.',
    icon: Shield,
    extra: <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />24/7 monitoring</span>
  },
  {
    title: 'Live Chat',
    desc: 'Get support in minutes from our AI-assisted agents.',
    icon: MessageSquare,
    extra: <span>Average response time: &lt; 5 min</span>
  },
  {
    title: 'Status',
    desc: 'All systems operational',
    icon: Clock,
    extra: <span style={{ color: ACCENT }} className="font-medium">99.99% uptime</span>
  }
]


