import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Gift } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useLanguage } from '../contexts/LanguageContext'

export default function ExitIntentEmailCollector() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let exitIntentTriggered = false

    const handleMouseLeave = (e) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !exitIntentTriggered) {
        const hasInteracted = sessionStorage.getItem('sakina-exit-intent-shown')
        const hasDismissed = sessionStorage.getItem('sakina-floating-email-dismissed')
        
        if (!hasInteracted && !hasDismissed && !isSubmitted) {
          setIsVisible(true)
          exitIntentTriggered = true
          sessionStorage.setItem('sakina-exit-intent-shown', 'true')
        }
      }
    }

    // Add event listener after a delay to avoid immediate triggering
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000) // Wait 5 seconds before enabling exit intent

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
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
      }, 4000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-2 border-teal-200 bg-gradient-to-br from-white to-teal-50 dark:from-gray-900 dark:to-teal-900/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-teal-100 dark:bg-teal-800 rounded-full">
                    <Heart className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                  </div>
                  <Gift className="h-5 w-5 text-amber-500" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <CardTitle className="text-xl mb-2">
                {t('waitBeforeYouGo')} 🤲
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                {t('getEarlyAccessToSakina')}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              {!isSubmitted ? (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                      <div className="text-teal-600 dark:text-teal-300 font-semibold text-sm">
                        {t('earlyAccess')}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="text-amber-600 dark:text-amber-300 font-semibold text-sm">
                        {t('freeResources')}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder={t('enterYourEmail')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-center"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t('submitting')}</span>
                        </div>
                      ) : (
                        <>
                          <Gift className="w-4 h-4 mr-2" />
                          {t('getEarlyAccess')}
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-green-600 dark:text-green-400">
                    {t('jazakAllahuKhairan')} 🤲
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('wellKeepYouUpdated')}
                  </p>
                </div>
              )}

              <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-muted-foreground">
                  {t('noSpamPromise')} • {t('unsubscribeAnytime')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
