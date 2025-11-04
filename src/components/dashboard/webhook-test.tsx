'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TestTube, CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react'
import { WebhookService } from '@/lib/webhook-service'

export function WebhookTest() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'success' | 'error'
    message: string
  }>({ status: 'idle', message: '' })

  const handleTestWebhook = async () => {
    setIsTesting(true)
    setTestResult({ status: 'idle', message: '' })

    try {
      // Test the webhook directly
      const response = await fetch('/api/test-webhook')
      const result = await response.json()
      
      console.log('Webhook test result:', result)
      
      setTestResult({
        status: result.success ? 'success' : 'error',
        message: result.success 
          ? `Webhook test successful! Status: ${result.status}`
          : `Webhook test failed: ${result.message}`,
      })
    } catch (error) {
      console.error('Webhook test error:', error)
      setTestResult({
        status: 'error',
        message: 'Failed to test webhook connection',
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5" />
          N8N Webhook Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground font-figtree font-light">
          Test the connection to your N8N webhook to ensure job postings are sent correctly.
        </p>
        
        <Button
          onClick={handleTestWebhook}
          disabled={isTesting}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          {isTesting && <Loader2 className="w-4 h-4 animate-spin-smooth" />}
          {isTesting ? 'Testing Connection...' : 'Test Webhook Connection'}
        </Button>

        {testResult.status !== 'idle' && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            testResult.status === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {testResult.status === 'success' && <CheckCircle className="w-4 h-4" />}
            {testResult.status === 'error' && <XCircle className="w-4 h-4" />}
            <span className="text-sm font-figtree font-medium">{testResult.message}</span>
          </div>
        )}

        <div className="pt-4 border-t">
          <h4 className="font-figtree font-semibold mb-2">Webhook Configuration:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Method:</span>
              <Badge variant="outline">POST</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Endpoint:</span>
              <span className="font-mono text-xs">/api/webhooks/n8n-outgoing</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">N8N URL:</span>
              <span className="font-mono text-xs text-green-600">✓ Configured</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-figtree font-semibold mb-2">N8N Setup Instructions:</h4>
          <ol className="text-sm text-muted-foreground space-y-1 font-figtree font-light">
            <li>1. Create a Webhook node in your N8N workflow</li>
            <li>2. Set the HTTP method to POST</li>
            <li>3. Copy the webhook URL from N8N</li>
            <li>4. Add it to your .env.local file as N8N_WEBHOOK_URL</li>
            <li>5. Test the connection using this component</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
