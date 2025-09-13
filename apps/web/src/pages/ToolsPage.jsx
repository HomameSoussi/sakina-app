import { useState, useEffect } from 'react'
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

const ToolsPage = () => {
  const { t, isRTL } = useLanguage()
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
      description: 'Immediate relief for panic attacks',
      icon: Heart,
      color: 'text-red-500',
      free: true,
      component: 'PanicButton'
    },
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: '4-7-8 and box breathing techniques',
      icon: Timer,
      color: 'text-blue-500',
      free: true,
      component: 'BreathingExercise'
    },
    {
      id: 'mood',
      title: 'Mood Check-in',
      description: 'Track your emotional state',
      icon: Brain,
      color: 'text-purple-500',
      free: true,
      component: 'MoodTracker'
    },
    {
      id: 'cbt',
      title: 'CBT Thought Record',
      description: 'Challenge negative thoughts',
      icon: BookOpen,
      color: 'text-green-500',
      free: false,
      component: 'CBTTool'
    },
    {
      id: 'audio',
      title: 'Guided Meditations',
      description: 'Calming audio sessions',
      icon: Headphones,
      color: 'text-indigo-500',
      free: false,
      component: 'AudioLibrary'
    }
  ]

  useEffect(() => {
    localStorage.setItem('sakina-usage-count', usageCount.toString())
  }, [usageCount])

  useEffect(() => {
    localStorage.setItem('sakina-mood-entries', JSON.stringify(moodEntries))
  }, [moodEntries])

  const incrementUsage = () => {
    if (!isLimitReached) {
      setUsageCount(prev => prev + 1)
    }
  }

  const BreathingExercise = () => {
    const [phase, setPhase] = useState('inhale')
    const [count, setCount] = useState(4)
    const [isActive, setIsActive] = useState(false)

    const breathingPattern = {
      inhale: { count: 4, next: 'hold', instruction: 'Breathe in slowly', color: 'bg-blue-500' },
      hold: { count: 7, next: 'exhale', instruction: 'Hold your breath', color: 'bg-yellow-500' },
      exhale: { count: 8, next: 'inhale', instruction: 'Breathe out slowly', color: 'bg-green-500' }
    }

    useEffect(() => {
      let interval
      if (isActive) {
        interval = setInterval(() => {
          setCount(prev => {
            if (prev <= 1) {
              const nextPhase = breathingPattern[phase].next
              setPhase(nextPhase)
              return breathingPattern[nextPhase].count
            }
            return prev - 1
          })
        }, 1000)
      }
      return () => clearInterval(interval)
    }, [isActive, phase])

    const toggleBreathing = () => {
      if (!isActive) {
        incrementUsage()
      }
      setIsActive(!isActive)
    }

    return (
      <div className="text-center space-y-6">
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.2 : phase === 'hold' ? 1.2 : 1,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`w-32 h-32 mx-auto rounded-full ${breathingPattern[phase].color} flex items-center justify-center text-white shadow-lg`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold">{count}</div>
            <div className="text-sm">{breathingPattern[phase].instruction}</div>
          </div>
        </motion.div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            4-7-8 Breathing: Inhale for 4, hold for 7, exhale for 8
          </p>
          <Button onClick={toggleBreathing} disabled={isLimitReached && !isActive}>
            {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isActive ? 'Pause' : 'Start'} Breathing
          </Button>
        </div>
      </div>
    )
  }

  const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(null)
    const [note, setNote] = useState('')

    const moods = [
      { emoji: '😊', label: 'Happy', value: 5 },
      { emoji: '😌', label: 'Calm', value: 4 },
      { emoji: '😐', label: 'Neutral', value: 3 },
      { emoji: '😟', label: 'Anxious', value: 2 },
      { emoji: '😢', label: 'Sad', value: 1 }
    ]

    const saveMoodEntry = () => {
      if (selectedMood && !isLimitReached) {
        const entry = {
          id: Date.now(),
          mood: selectedMood,
          note,
          timestamp: new Date().toISOString()
        }
        setMoodEntries(prev => [entry, ...prev.slice(0, 4)]) // Keep only 5 entries
        setSelectedMood(null)
        setNote('')
        incrementUsage()
      }
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">How are you feeling right now?</h3>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMood?.value === mood.value
                    ? 'border-primary bg-primary/10'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                What's on your mind? (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share what's contributing to this feeling..."
                className="w-full p-3 border rounded-lg resize-none h-20"
                disabled={isLimitReached}
              />
            </div>
            <Button onClick={saveMoodEntry} disabled={isLimitReached}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Mood Entry
            </Button>
          </motion.div>
        )}

        {moodEntries.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Recent Entries</h4>
            <div className="space-y-2">
              {moodEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-2xl">{entry.mood.emoji}</span>
                  <div className="flex-1">
                    <div className="font-medium">{entry.mood.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const ProFeatureCard = ({ tool }) => (
    <Card className="relative overflow-hidden border-2 border-dashed border-muted">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <tool.icon className={`h-6 w-6 ${tool.color}`} />
            <CardTitle>{tool.title}</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-center py-8">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Unlock this feature with Sakina Pro
          </p>
          <Button asChild>
            <a href="/pricing">
              Upgrade to Pro
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderToolContent = () => {
    const tool = tools.find(t => t.id === selectedTool)
    
    if (!tool.free) {
      return <ProFeatureCard tool={tool} />
    }

    switch (selectedTool) {
      case 'panic':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Panic Relief Button
              </CardTitle>
              <CardDescription>
                Guided 4-step process to help you through panic attacks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractivePanicButton />
            </CardContent>
          </Card>
        )
      
      case 'breathing':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Timer className="h-5 w-5 mr-2 text-blue-500" />
                Breathing Exercises
              </CardTitle>
              <CardDescription>
                Calm your nervous system with guided breathing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreathingExercise />
            </CardContent>
          </Card>
        )
      
      case 'mood':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                Mood Check-in
              </CardTitle>
              <CardDescription>
                Track your emotional state and identify patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MoodTracker />
            </CardContent>
          </Card>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Free Mental Wellness Tools
            <span className="text-primary block text-2xl mt-2">أدوات العافية النفسية المجانية</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try our evidence-based anxiety relief tools for free. Experience the power of Sakina 
            before downloading the full app.
          </p>
        </motion.div>

        {/* Usage Limit Alert */}
        {isLimitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
              <Zap className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                <strong>Free limit reached!</strong> You've used {FREE_LIMIT} free sessions today. 
                <a href="/pricing" className="underline ml-1">Upgrade to Pro</a> for unlimited access 
                or <a href="#download" className="underline ml-1">download the app</a> for more free features.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Usage Progress */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Free Usage Today</span>
                <span className="text-sm text-muted-foreground">
                  {usageCount}/{FREE_LIMIT} sessions used
                </span>
              </div>
              <Progress value={(usageCount / FREE_LIMIT) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Resets daily • Unlimited with Pro plan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tool Selection */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedTool === tool.id
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <tool.icon className={`h-5 w-5 ${tool.color}`} />
                {!tool.free && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <div className="font-medium text-sm">{tool.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{tool.description}</div>
            </button>
          ))}
        </div>

        {/* Tool Content */}
        <motion.div
          key={selectedTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          {renderToolContent()}
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Ready for More?</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get unlimited access to all tools, advanced CBT worksheets, guided meditations, 
                Islamic content, and much more with Sakina Pro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/pricing">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#download">
                    Download Free App
                  </a>
                </Button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Want to support our mission?
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/donate" className="text-primary">
                    <Heart className="h-4 w-4 mr-2" />
                    Make a Donation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ToolsPage
