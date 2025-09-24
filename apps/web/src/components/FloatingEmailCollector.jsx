import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { useLanguage } from '../contexts/LanguageContext'

export default function FloatingEmailCollector() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Show after 30 seconds instead of 10 to be less intrusive
    const timer = setTimeout(() => {
      // Only show if user hasn't already interacted with panic relief
      const hasInteracted = sessionStorage.getItem('sakina-panic-relief-used')
      if (!hasInteracted && !isSubmitted) {
        setIsVisible(true)
      }
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [isSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      
      // Auto-hide after success
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    // Don't show again for this session
    sessionStorage.setItem('sakina-floating-email-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm"
      >
        <Card className="shadow-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-teal-100 dark:bg-teal-800 rounded-full">
                  <Mail className="h-4 w-4 text-teal-600 dark:text-teal-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t('downloadReminder')}</h3>
                  <p className="text-xs text-muted-foreground">{t('remindMeWhenReady')}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder={t('enterYourEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-sm h-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('submitting')}</span>
                    </div>
                  ) : (
                    t('remindMe')
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-2">
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 mb-2">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">{t('thankYouForJoining')}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t('wellKeepYouUpdated')}</p>
              </div>
            )}

            <div className="flex items-center justify-center mt-3 pt-2 border-t border-teal-200 dark:border-teal-700">
              <p className="text-xs text-muted-foreground">
                {t('noSpamPromise')} • {t('unsubscribeAnytime')}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
