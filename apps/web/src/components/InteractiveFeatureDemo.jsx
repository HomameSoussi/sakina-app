import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Brain, 
  Moon, 
  Shield, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle,
  Sparkles,
  Zap,
  Target,
  Award
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { useLanguage } from '../contexts/LanguageContext'

export default function InteractiveFeatureDemo({ featureType = 'panic-relief' }) {
  const { t } = useLanguage()
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completedFeatures, setCompletedFeatures] = useState([])
  const [showReward, setShowReward] = useState(false)

  const features = {
    'panic-relief': {
      title: t('panicReliefDemo'),
      description: t('experienceInstantCalm'),
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      steps: [
        {
          title: t('recognizePanic'),
          description: t('identifyPanicSymptoms'),
          duration: 3000,
          action: t('breatheSlowly')
        },
        {
          title: t('groundYourself'),
          description: t('use54321Technique'),
          duration: 5000,
          action: t('lookAround')
        },
        {
          title: t('breatheWithUs'),
          description: t('followBreathingPattern'),
          duration: 8000,
          action: t('inhaleExhale')
        },
        {
          title: t('findCalm'),
          description: t('feelPeaceReturning'),
          duration: 3000,
          action: t('youAreStrong')
        }
      ]
    },
    'cbt-tools': {
      title: t('cbtToolsDemo'),
      description: t('reframeNegativeThoughts'),
      icon: Brain,
      color: 'from-blue-500 to-indigo-500',
      steps: [
        {
          title: t('identifyThought'),
          description: t('whatAreYouThinking'),
          duration: 4000,
          action: t('writeItDown')
        },
        {
          title: t('challengeThought'),
          description: t('isThisThoughtHelpful'),
          duration: 5000,
          action: t('questionIt')
        },
        {
          title: t('replaceThought'),
          description: t('findBalancedPerspective'),
          duration: 4000,
          action: t('reframe')
        },
        {
          title: t('practiceNew'),
          description: t('reinforcePositiveThinking'),
          duration: 3000,
          action: t('believeIt')
        }
      ]
    },
    'islamic-integration': {
      title: t('islamicIntegrationDemo'),
      description: t('connectWithFaith'),
      icon: Moon,
      color: 'from-purple-500 to-violet-500',
      steps: [
        {
          title: t('rememberAllah'),
          description: t('turnToAllahInDifficulty'),
          duration: 4000,
          action: 'سُبْحَانَ اللَّهِ'
        },
        {
          title: t('reciteDhikr'),
          description: t('calmHeartWithRemembrance'),
          duration: 6000,
          action: 'لَا إِلَٰهَ إِلَّا اللَّهُ'
        },
        {
          title: t('seekComfort'),
          description: t('findPeaceInQuran'),
          duration: 5000,
          action: t('reciteAyah')
        },
        {
          title: t('trustAllah'),
          description: t('surrenderToAllahsWill'),
          duration: 3000,
          action: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ'
        }
      ]
    }
  }

  const currentFeature = features[featureType]

  useEffect(() => {
    let interval
    if (isActive && currentStep < currentFeature.steps.length) {
      const stepDuration = currentFeature.steps[currentStep].duration
      const progressIncrement = 100 / (stepDuration / 100)
      
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentStep < currentFeature.steps.length - 1) {
              setCurrentStep(prev => prev + 1)
              return 0
            } else {
              setIsActive(false)
              setShowReward(true)
              setCompletedFeatures(prev => [...prev, featureType])
              return 100
            }
          }
          return prev + progressIncrement
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isActive, currentStep, featureType])

  const startDemo = () => {
    setIsActive(true)
    setCurrentStep(0)
    setProgress(0)
    setShowReward(false)
  }

  const resetDemo = () => {
    setIsActive(false)
    setCurrentStep(0)
    setProgress(0)
    setShowReward(false)
  }

  if (showReward) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.6,
            repeat: 2
          }}
          className="flex justify-center mb-4"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        
        <h3 className="text-2xl font-bold text-primary mb-2">
          {t('congratulations')}
        </h3>
        <p className="text-muted-foreground mb-6">
          {t('youCompletedFeature')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetDemo} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('tryAgain')}
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('downloadFullApp')}
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {t('likedThisFeature')} <strong>{t('downloadSakinaApp')}</strong> {t('forFullExperience')}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <Card className="overflow-hidden border-2 border-primary/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${currentFeature.color} rounded-full flex items-center justify-center shadow-lg`}>
            <currentFeature.icon className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold">
          {currentFeature.title}
        </CardTitle>
        <CardDescription className="text-base">
          {currentFeature.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isActive ? (
          <div className="text-center space-y-4">
            <Button 
              onClick={startDemo}
              size="lg"
              className={`w-full text-lg py-6 bg-gradient-to-r ${currentFeature.color} hover:opacity-90 transition-opacity`}
            >
              <Play className="w-5 h-5 mr-2" />
              {t('startDemo')}
            </Button>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                {t('interactive')}
              </div>
              <div className="flex items-center justify-center">
                <Target className="w-4 h-4 mr-1 text-green-500" />
                {t('evidenceBased')}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  {t('step')} {currentStep + 1} {t('of')} {currentFeature.steps.length}
                </span>
                <Badge variant="secondary">
                  {Math.round((currentStep / currentFeature.steps.length) * 100)}% {t('complete')}
                </Badge>
              </div>
              <Progress value={(currentStep / currentFeature.steps.length) * 100 + (progress / currentFeature.steps.length)} />
            </div>

            {/* Current Step */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                <h3 className="text-xl font-semibold">
                  {currentFeature.steps[currentStep].title}
                </h3>
                <p className="text-muted-foreground">
                  {currentFeature.steps[currentStep].description}
                </p>
                
                {/* Interactive Element */}
                <div className="py-8">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-32 h-32 mx-auto bg-gradient-to-br ${currentFeature.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl`}
                  >
                    {currentFeature.steps[currentStep].action}
                  </motion.div>
                </div>

                {/* Step Progress */}
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${currentFeature.color} rounded-full`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex gap-2 justify-center">
              <Button onClick={resetDemo} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('restart')}
              </Button>
            </div>
          </div>
        )}

        {/* Feature Benefits */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold mb-2 text-center">{t('thisFeatureHelps')}</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {featureType === 'panic-relief' && (
              <>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('reduceAnxietyFast')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('groundInPresent')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('calmNervousSystem')}
                </div>
              </>
            )}
            {featureType === 'cbt-tools' && (
              <>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('identifyNegativePatterns')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('developHealthyThinking')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('buildResilienceSkills')}
                </div>
              </>
            )}
            {featureType === 'islamic-integration' && (
              <>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('strengthenFaithConnection')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('findSpiritualComfort')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {t('integrateIslamicPractices')}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
