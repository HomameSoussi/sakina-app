import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Brain, 
  Headphones, 
  BookOpen, 
  Lock, 
  Star,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Timer,
  Zap,
  Crown,
  Gift
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useLanguage } from '../contexts/LanguageContext'
import InteractivePanicButton from '../components/InteractivePanicButton'

const ToolsPageUpdated = () => {
  const { t, language, isRTL } = useLanguage()
  const [usageCount, setUsageCount] = useState(() => {
    return parseInt(localStorage.getItem('sakina-usage-count') || '0')
  })
  const [selectedTool, setSelectedTool] = useState('panic')
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingCount, setBreathingCount] = useState(4)
  const [breathingPhase, setBreathingPhase] = useState('inhale')
  const [moodEntries, setMoodEntries] = useState(() => {
    return JSON.parse(localStorage.getItem('sakina-mood-entries') || '[]')
  })

  const FREE_LIMIT = 5
  const isLimitReached = usageCount >= FREE_LIMIT

  const tools = [
    {
      id: 'panic',
      title: t('panicRelief'),
      description: t('immediateRelief'),
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      free: true
    },
    {
      id: 'breathing',
      title: t('breathingExercises'),
      description: t('breathingExercisesDesc'),
      icon: Timer,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      free: true
    },
    {
      id: 'mood',
      title: t('moodCheckIn'),
      description: t('moodCheckInDesc'),
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      free: true
    },
    {
      id: 'cbt',
      title: t('cbtThoughtRecord'),
      description: t('cbtThoughtRecordDesc'),
      icon: BookOpen,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      free: false
    },
    {
      id: 'meditation',
      title: t('guidedMeditations'),
      description: t('guidedMeditationsDesc'),
      icon: Headphones,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      free: false
    }
  ]

  const handleToolUse = (toolId) => {
    if (isLimitReached && tools.find(t => t.id === toolId)?.free) {
      return
    }
    
    const newCount = usageCount + 1
    setUsageCount(newCount)
    localStorage.setItem('sakina-usage-count', newCount.toString())
    setSelectedTool(toolId)
  }

  const resetUsage = () => {
    setUsageCount(0)
    localStorage.setItem('sakina-usage-count', '0')
  }

  // Breathing exercise logic
  useEffect(() => {
    let interval
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            setBreathingPhase(current => {
              switch (current) {
                case 'inhale': return 'hold'
                case 'hold': return 'exhale'
                case 'exhale': return 'inhale'
                default: return 'inhale'
              }
            })
            return breathingPhase === 'inhale' ? 4 : breathingPhase === 'hold' ? 7 : 8
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [breathingActive, breathingPhase])

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale':
        return language === 'ar' ? 'استنشق ببطء' : 'Breathe in slowly'
      case 'hold':
        return language === 'ar' ? 'احبس النفس' : 'Hold your breath'
      case 'exhale':
        return language === 'ar' ? 'ازفر ببطء' : 'Breathe out slowly'
      default:
        return language === 'ar' ? 'استنشق ببطء' : 'Breathe in slowly'
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="h-4 w-4" />
            {language === 'ar' ? 'مجاني للاستخدام' : 'Free to Use'}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('freeToolsTitle')}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('freeToolsDescription')}
          </p>

          {/* Usage Tracker */}
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('freeUsageToday')}
              </span>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {usageCount}/{FREE_LIMIT}
              </span>
            </div>
            
            <Progress value={(usageCount / FREE_LIMIT) * 100} className="mb-3" />
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('resetsDaily')} • {t('unlimitedWithPro')}
            </p>
            
            {isLimitReached && (
              <Alert className="mt-4">
                <Crown className="h-4 w-4" />
                <AlertDescription>
                  {language === 'ar' 
                    ? 'لقد وصلت إلى الحد اليومي. ترقى للخطة الاحترافية للوصول غير المحدود!'
                    : "You've reached today's limit. Upgrade to Pro for unlimited access!"
                  }
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon
            const canUse = tool.free ? !isLimitReached : false
            
            return (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedTool === tool.id 
                      ? `${tool.borderColor} border-2 ${tool.bgColor}` 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${!canUse && tool.free ? 'opacity-50' : ''}`}
                  onClick={() => canUse && handleToolUse(tool.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${tool.bgColor}`}>
                          <Icon className={`h-6 w-6 ${tool.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                          {tool.free ? (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {language === 'ar' ? 'مجاني' : 'Free'}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              {language === 'ar' ? 'احترافي' : 'Pro'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {!tool.free && <Lock className="h-5 w-5 text-gray-400" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Interactive Tool Display */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                {language === 'ar' ? 'زر تخفيف الهلع' : 'Panic Relief Button'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'عملية موجهة من 4 خطوات لمساعدتك خلال نوبات الهلع'
                  : 'Guided 4-step process to help you through panic attacks'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <InteractivePanicButton />
            </CardContent>
          </Card>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('readyForMore')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('getUnlimitedAccess')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
                <Crown className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'ترقية للخطة الاحترافية' : 'Upgrade to Pro'}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
                <Gift className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'تحميل التطبيق' : 'Download App'}
              </Button>
            </div>
          </div>
        </div>

        {/* Support Mission */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('supportMission')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'ar' 
                ? 'ساعدنا في توفير دعم مجاني للصحة النفسية لمن هم في أمس الحاجة إليه.'
                : 'Help us provide free mental health support to those who need it most.'
              }
            </p>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              {t('makeADonation')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolsPageUpdated
