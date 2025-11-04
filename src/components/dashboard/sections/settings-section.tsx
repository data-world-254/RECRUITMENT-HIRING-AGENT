'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings } from 'lucide-react'
import { WebhookTest } from '../webhook-test'
import { WebhookDebug } from '../webhook-debug'

export function SettingsSection() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-figtree font-semibold mb-2 gradient-text">
          Settings
        </h1>
        <p className="text-xl font-figtree font-light text-muted-foreground">
          Configure your recruitment preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground font-figtree font-light">
                Settings panel coming soon.
              </p>
            </div>
          </CardContent>
        </Card>

        <WebhookTest />
      </div>

      <WebhookDebug />
    </div>
  )
}
