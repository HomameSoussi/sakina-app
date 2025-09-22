import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Pause, Play, RotateCcw, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { useLanguage } from '../contexts/LanguageContext'
import { interpolateTranslation } from '../utils/translationHelper'

export default function InteractivePanicButton() {
  const { t } = useLanguage()
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [breathingPhase, setBreathingPhase] = useState('inhale') // inhale, hold, exhale
  const [breathingCount, setBreathingCount] = useState(4)
  const [isBreathing, setIsBreathing] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])

  const steps = [
    {
      title: t('groundYourself'),
      subtitle: t('groundingTechnique'),
      instruction: t('groundingInstruction'),
      duration: 30,
      type: "grounding"
    },
    {
      title: t('breatheDeep'), 
      subtitle: t('breathingTechnique'),
      instruction: t('breathingInstruction'),
      duration: 60,
      type: "breathing"
    },
    {
      title: t('positiveAffirmations'),
      subtitle: t('remindYourself'),
      instruction: t('affirmationInstruction'),
      duration: 30,
      type: "affirmation"
    },
    {
      title: t('seekSupport'),
      subtitle: t('youreNotAlone'),
      instruction: t('supportInstruction'),
      duration: 20,
      type: "support"
    }
  ]

  const breathingPattern = {
    inhale: { count: 4, next: 'hold', instruction: t('breatheInSlowly') },
    hold: { count: 7, next: 'exhale', instruction: t('holdYourBreath') },
    exhale: { count: 8, next: 'inhale', instruction: t('breatheOutSlowly') }
  }

  useEffect(() => {
    let interval
    if (isBreathing && currentStep === 1) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            const nextPhase = breathingPattern[breathingPhase].next
            setBreathingPhase(nextPhase)
            return breathingPattern[nextPhase].count
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isBreathing, breathingPhase, currentStep])

  const startPanicRelief = () => {
    setIsActive(true)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const nextStep = () => {
    setCompletedSteps(prev => [...prev, currentStep])
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      if (currentStep === 0) { // Moving to breathing step
        setIsBreathing(true)
        setBreathingPhase('inhale')
        setBreathingCount(4)
      }
    } else {
      // Completed all steps
      setIsActive(false)
      setIsBreathing(false)
    }
  }

  const resetExercise = () => {
    setIsActive(false)
    setCurrentStep(0)
    setIsBreathing(false)
    setBreathingPhase('inhale')
    setBreathingCount(4)
    setCompletedSteps([])
  }

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing)
  }

  if (!isActive) {
    return (
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block"
        >
          <Button
            onClick={startPanicRelief}
            size="lg"
            className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl text-xl font-bold relative overflow-hidden"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white rounded-full"
            />
            <div className="relative z-10 flex flex-col items-center">
              <Heart className="w-12 h-12 mb-2" />
              <span>{t('iNeedHelp')}</span>
              <span className="text-sm font-normal">{t('tapForRelief')}</span>
            </div>
          </Button>
        </motion.div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
          {t('feelingOverwhelmed')}
        </p>
      </div>
    )
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-xl">
        <CardContent className="p-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {interpolateTranslation(t('stepProgress'), { current: currentStep + 1, total: steps.length })}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% {t('complete')}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {currentStepData.title}
              </h3>
              <p className="text-lg text-teal-600 dark:text-teal-400 mb-4">
                {currentStepData.subtitle}
              </p>
              
              {/* Breathing Animation */}
              {currentStep === 1 && (
                <div className="mb-6">
                  <motion.div
                    animate={{
                      scale: breathingPhase === 'inhale' ? 1.3 : breathingPhase === 'hold' ? 1.3 : 1,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center"
                  >
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold">{breathingCount}</div>
                      <div className="text-sm">{breathingPattern[breathingPhase].instruction}</div>
                    </div>
                  </motion.div>
                  
                  <Button
                    onClick={toggleBreathing}
                    variant="outline"
                    size="sm"
                    className="mb-4"
                  >
                    {isBreathing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isBreathing ? t('pauseBreathing') : t('startBreathing')}
                  </Button>
                </div>
              )}

              {/* Grounding Exercise */}
              {currentStep === 0 && (
                <div className="mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('lookAroundIdentify')}</p>
                    <ul className="text-left space-y-1 text-sm">
                      <li>• {t('fiveThingsSee')}</li>
                      <li>• {t('fourThingsTouch')}</li>
                      <li>• {t('threeThingsHear')}</li>
                      <li>• {t('twoThingsSmell')}</li>
                      <li>• {t('oneThingTaste')}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Affirmations */}
              {currentStep === 2 && (
                <div className="mb-6">
                  <div className="space-y-3">
                    {[
                      t('affirmation1'),
                      t('affirmation2'), 
                      t('affirmation3'),
                      t('affirmation4')
                    ].map((affirmation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.5 }}
                        className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg"
                      >
                        <p className="text-teal-800 dark:text-teal-200 font-medium">
                          {affirmation}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Resources */}
              {currentStep === 3 && (
                <div className="mb-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      {t('callTrustedFriend')}
                    </Button>
                    <Button variant="outline" className="w-full">
                      {t('textCrisisLine')}
                    </Button>
                    <Button variant="outline" className="w-full">
                      {t('callCrisisHotline')}
                    </Button>
                  </div>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {currentStepData.instruction}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <Button onClick={resetExercise} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('startOver')}
                </Button>
                <Button onClick={nextStep} size="sm" className="bg-teal-600 hover:bg-teal-700">
                  {currentStep === steps.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('complete')}
                    </>
                  ) : (
                    t('nextStep')
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Completed Steps Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  completedSteps.includes(index)
                    ? 'bg-green-500'
                    : index === currentStep
                    ? 'bg-teal-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
