'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight,
  Download,
  Calendar,
  Users
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

const sidebarItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    id: 'jobs',
    label: 'Job Postings',
    icon: Briefcase,
    href: '/dashboard/jobs',
  },
  {
    id: 'candidates',
    label: 'Real Candidates',
    icon: Users,
    href: '/dashboard/candidates',
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    href: '/dashboard/reports',
  },
  {
    id: 'interviews',
    label: 'Interviews',
    icon: Calendar,
    href: '/dashboard/interviews',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
]

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    // The redirect will be handled by the auth state change
    window.location.href = '/'
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white border-r border-border shadow-lg h-screen sticky top-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-figtree font-semibold">HR AI Dashboard</h2>
                <p className="text-xs text-muted-foreground font-figtree font-light">Recruitment Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`} />
                {!isCollapsed && (
                  <>
                    <span className="font-figtree font-medium">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                    )}
                  </>
                )}
              </button>
            )
          })}
        </nav>

        {/* Reports Section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold font-figtree">Quick Reports</span>
              </div>
              <p className="text-xs text-muted-foreground font-figtree font-light mb-3">
                Download comprehensive reports from Google Sheets
              </p>
              <Button
                size="sm"
                variant="gradient"
                className="w-full text-xs"
                onClick={() => onSectionChange('reports')}
              >
                <Download className="w-3 h-3 mr-1" />
                Generate Report
              </Button>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {!isCollapsed && <span className="font-figtree font-medium">Sign Out</span>}
          </Button>
        </div>

        {/* Collapse Toggle */}
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
