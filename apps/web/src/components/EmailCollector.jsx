import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, Loader2, Gift, Star, Users, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useLanguage } from '../contexts/LanguageContext'

export default function EmailCollector({ variant = 'default', className = '' }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const submitToGoogleSheets = async (emailData) => {
    // Google Sheets Web App URL - This would be provided by the user
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
    
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailData.email,
          timestamp: new Date().toISOString(),
          source: emailData.source,
          language: emailData.language,
          variant: emailData.variant
        })
      })
      
      // Since we're using no-cors, we can't read the response
      // We'll assume success if no error is thrown
      return { success: true }
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError(t('pleaseEnterValidEmail'))
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await submitToGoogleSheets({
        email,
        source: window.location.pathname,
        language: localStorage.getItem('language') || 'en',
        variant
      })
      
      setIsSubmitted(true)
      setEmail('')
      
      // Track conversion event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'email_signup', {
          event_category: 'engagement',
          event_label: variant
        })
      }
    } catch (error) {
      setError(t('somethingWentWrong'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center p-6 ${className}`}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
          {t('thankYouForJoining')}
        </h3>
        <p className="text-green-600 dark:text-green-400 mb-4">
          {t('wellKeepYouUpdated')}
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-green-600 dark:text-green-400">
          <div className="flex items-center">
            <Gift className="w-4 h-4 mr-1" />
            {t('earlyAccess')}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {t('exclusiveContent')}
          </div>
        </div>
      </motion.div>
    )
  }

  const variants = {
    default: {
      title: t('stayUpdated'),
      description: t('getNotifiedWhenAppLaunches'),
      buttonText: t('notifyMe'),
      benefits: [
        { icon: Gift, text: t('earlyAccess') },
        { icon: Star, text: t('exclusiveContent') },
        { icon: Users, text: t('communityUpdates') }
      ]
    },
    hero: {
      title: t('joinThousands'),
      description: t('beFirstToKnow'),
      buttonText: t('getEarlyAccess'),
      benefits: [
        { icon: Heart, text: t('mentalWellnessTips') },
        { icon: Gift, text: t('freeResources') },
        { icon: Star, text: t('betaAccess') }
      ]
    },
    sidebar: {
      title: t('downloadReminder'),
      description: t('remindMeWhenReady'),
      buttonText: t('remindMe'),
      benefits: []
    }
  }

  const currentVariant = variants[variant] || variants.default

  return (
    <Card className={`${className} border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-primary">
          {currentVariant.title}
        </CardTitle>
        <CardDescription className="text-base">
          {currentVariant.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={t('enterYourEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center text-lg py-3"
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full text-lg py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              currentVariant.buttonText
            )}
          </Button>
        </form>

        {currentVariant.benefits.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-center text-muted-foreground mb-3">
              {t('whatYouGet')}
            </p>
            {currentVariant.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
              >
                <benefit.icon className="w-4 h-4 text-primary" />
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            {t('noSpamPromise')} • {t('unsubscribeAnytime')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Floating Email Collector Component
export function FloatingEmailCollector() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useState(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, 10000) // Show after 10 seconds

    return () => clearTimeout(timer)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <div className="relative">
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
          >
            ×
          </button>
          <EmailCollector variant="sidebar" className="shadow-2xl" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Exit Intent Email Collector
export function ExitIntentEmailCollector() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useState(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !isDismissed) {
        setIsVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => setIsDismissed(true)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
            >
              ×
            </button>
            <EmailCollector variant="hero" className="shadow-2xl" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
