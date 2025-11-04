'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown,
  Users,
  BarChart3,
  ArrowRight
} from 'lucide-react'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const solutions = [
  {
    name: 'AI-Powered Screening',
    description: 'Automated resume analysis and candidate matching',
    href: '/features#screening',
    icon: Brain,
  },
  {
    name: 'Analytics Dashboard',
    description: 'Real-time insights and recruitment metrics',
    href: '/features#analytics',
    icon: BarChart3,
  },
  {
    name: 'Team Collaboration',
    description: 'Streamlined hiring process for teams',
    href: '/features#collaboration',
    icon: Users,
  },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="fixed top-6 left-0 right-0 z-30 px-4 md:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/5 shadow-lg" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HR AI Agent</span>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-figtree text-white">HR AI Agent</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Solutions dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:text-white/80 transition-colors"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              Solutions
              <ChevronDown className="h-5 w-5 flex-none text-white/70" aria-hidden="true" />
            </button>

            {solutionsOpen && (
              <div
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition-all duration-200"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                  <div className="p-4">
                    {solutions.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <Link href={item.href} className="font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            )}
          </div>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-white/80 ${
                pathname === item.href ? 'text-white' : 'text-white/90'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user ? (
            <Button
              onClick={() => router.push('/dashboard')}
              variant="gradient"
              className="group"
            >
              Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => router.push('/auth/signin')}
              >
                Sign in
              </Button>
              <Button
                variant="gradient"
                onClick={() => router.push('/auth/signup')}
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">HR AI Agent</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold font-figtree gradient-text">HR AI Agent</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {user ? (
                      <Button
                        onClick={() => {
                          router.push('/dashboard')
                          setMobileMenuOpen(false)
                        }}
                        variant="gradient"
                        className="w-full group"
                      >
                        Dashboard
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            router.push('/auth/signin')
                            setMobileMenuOpen(false)
                          }}
                          className="w-full"
                        >
                          Sign in
                        </Button>
                        <Button
                          variant="gradient"
                          onClick={() => {
                            router.push('/auth/signup')
                            setMobileMenuOpen(false)
                          }}
                          className="w-full group"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    </header>
  )
}
