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
  ArrowRight
} from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
            <GradientButton
              onClick={() => router.push('/dashboard')}
              showArrow={false}
            >
              Dashboard
            </GradientButton>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => router.push('/auth/signin')}
              >
                Sign in
              </Button>
              <GradientButton
                onClick={() => router.push('/auth/signup')}
              >
                Get Started
              </GradientButton>
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
                      <GradientButton
                        onClick={() => {
                          router.push('/dashboard')
                          setMobileMenuOpen(false)
                        }}
                        showArrow={false}
                        className="w-full"
                      >
                        Dashboard
                      </GradientButton>
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
                        <GradientButton
                          onClick={() => {
                            router.push('/auth/signup')
                            setMobileMenuOpen(false)
                          }}
                          className="w-full"
                        >
                          Get Started
                        </GradientButton>
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
