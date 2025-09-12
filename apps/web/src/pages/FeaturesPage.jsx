import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Brain, 
  Moon, 
  Shield, 
  Zap, 
  Headphones,
  BookOpen,
  Clock,
  Globe,
  Smartphone,
  Download,
  Play,
  Pause,
  Volume2,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const FeaturesPage = () => {
  const [activeDemo, setActiveDemo] = useState('panic')
  const [isPlaying, setIsPlaying] = useState(false)

  const mainFeatures = [
    {
      id: 'panic',
      icon: Heart,
      title: 'Panic Relief Button',
      subtitle: 'Instant access to calm',
      description: 'One-tap access to a guided 4-step panic relief flow: grounding exercises, breathing techniques, optional dhikr, and emergency contacts.',
      benefits: [
        'Works 100% offline once downloaded',
        '5-4-3-2-1 grounding technique',
        'Box breathing and 4-7-8 patterns',
        'Optional Islamic dhikr integration',
        'Emergency contact quick-dial'
      ],
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
    },
    {
      id: 'cbt',
      icon: Brain,
      title: 'CBT Tools',
      subtitle: 'Reframe your thoughts',
      description: 'Evidence-based cognitive behavioral therapy techniques to identify, challenge, and reframe anxious thoughts with optional Islamic perspectives.',
      benefits: [
        'Thought record worksheets',
        'Cognitive distortion identification',
        'Reframing exercises',
        'Islamic wisdom integration',
        'Progress tracking'
      ],
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      id: 'library',
      icon: Headphones,
      title: 'Calm Audio Library',
      subtitle: 'Soothing sounds & recitations',
      description: 'Curated collection of Quranic recitations, ruqyah, sleep stories, nature sounds, and guided meditations for relaxation.',
      benefits: [
        'High-quality audio content',
        'Offline download capability',
        'Multiple reciters available',
        'Sleep stories and nature sounds',
        'Guided dhikr meditations'
      ],
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      id: 'journal',
      icon: BookOpen,
      title: 'Mood Journal',
      subtitle: 'Track your wellness journey',
      description: 'Daily mood check-ins with valence and arousal tracking, tags, voice-to-text notes, and insights to understand your patterns.',
      benefits: [
        'Simple mood rating system',
        'Customizable mood tags',
        'Voice-to-text journaling',
        'Weekly and monthly insights',
        'Privacy-first data storage'
      ],
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
  ]

  const additionalFeatures = [
    {
      icon: Clock,
      title: 'Prayer Time Integration',
      description: 'Gentle reminders for prayer times with optional calm breathing suggestions.',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Available in Arabic, English, French, and Moroccan Arabic with RTL support.',
    },
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'Your data stays on your device. Optional encrypted cloud sync available.',
    },
    {
      icon: Zap,
      title: 'Offline First',
      description: 'Core features work without internet. Download content for offline access.',
    },
  ]

  const islamicFeatures = [
    {
      title: 'Dhikr Integration',
      description: 'Combine breathing exercises with remembrance of Allah',
      example: 'Breathe in: "La" • Breathe out: "ilaha illa Allah"'
    },
    {
      title: 'Quranic Verses',
      description: 'Carefully selected verses for comfort and peace',
      example: 'Quran 13:28 - "By the remembrance of Allah hearts are assured"'
    },
    {
      title: 'Duas for Anxiety',
      description: 'Authentic supplications from Quran and Sunnah',
      example: '"Allahumma inni a\'udhu bika minal-hammi wal-hazan"'
    },
    {
      title: 'Islamic Perspective on Mental Health',
      description: 'Understanding wellness through Islamic teachings',
      example: 'Tawakkul, Sabr, and seeking both spiritual and medical help'
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              🚀 Comprehensive Mental Wellness
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Features That <span className="text-primary">Actually Help</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sakina combines evidence-based mental health tools with optional Islamic practices 
              to provide comprehensive, culturally-sensitive support for anxiety and stress.
            </p>
          </motion.div>
        </div>

        {/* Main Features */}
        <section className="mb-20">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {mainFeatures.map((feature) => (
                <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2">
                  <feature.icon className={`h-4 w-4 ${feature.color}`} />
                  <span className="hidden sm:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {mainFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} mb-6`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{feature.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button size="lg" className="mr-4">
                      <Download className="mr-2 h-5 w-5" />
                      Try This Feature
                    </Button>
                    <Button variant="outline" size="lg">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="relative mx-auto w-80 h-96 bg-gradient-to-br from-primary to-secondary rounded-3xl p-1 shadow-2xl">
                      <div className="w-full h-full bg-background rounded-3xl p-6 flex flex-col">
                        {/* Mock app interface based on feature */}
                        {feature.id === 'panic' && (
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                              <Heart className="w-16 h-16 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">سَكِينَة</h3>
                            <p className="text-muted-foreground text-center text-sm">
                              Tap for instant calm
                            </p>
                          </div>
                        )}
                        
                        {feature.id === 'cbt' && (
                          <div className="space-y-4">
                            <div className="text-center mb-6">
                              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                              <h3 className="font-semibold">Thought Record</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm font-medium">Anxious Thought:</p>
                                <p className="text-xs text-muted-foreground">"I'll fail this presentation"</p>
                              </div>
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium">Balanced Thought:</p>
                                <p className="text-xs text-muted-foreground">"I'm prepared and will do my best"</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {feature.id === 'library' && (
                          <div className="space-y-4">
                            <div className="text-center mb-4">
                              <Headphones className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                              <h3 className="font-semibold">Audio Library</h3>
                            </div>
                            <div className="space-y-2">
                              {['Surah Al-Fatiha', 'Ruqyah for Anxiety', 'Rain Sounds'].map((track, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <span className="text-sm">{track}</span>
                                  <Button size="sm" variant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {feature.id === 'journal' && (
                          <div className="space-y-4">
                            <div className="text-center mb-4">
                              <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-2" />
                              <h3 className="font-semibold">Mood Check-in</h3>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">How positive do you feel?</p>
                                <div className="flex justify-between">
                                  {[1,2,3,4,5].map(n => (
                                    <div key={n} className={`w-8 h-8 rounded-full border-2 ${n === 4 ? 'bg-primary border-primary' : 'border-muted'}`} />
                                  ))}
                                </div>
                              </div>
                              <div className="p-2 bg-muted rounded text-xs">
                                "Feeling grateful for today's progress..."
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Additional Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Everyone</h2>
            <p className="text-xl text-muted-foreground">
              Thoughtful features that respect your privacy, culture, and individual needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Islamic Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Moon className="inline h-8 w-8 text-purple-500 mr-2" />
              Islamic Integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Optional Islamic content that enhances your spiritual wellness journey. 
              All features can be used with or without Islamic elements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {islamicFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-accent rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Example:</p>
                      <p className="text-sm mt-1 italic">{feature.example}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-primary-foreground"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Download Sakina today and start your journey to better mental wellness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Download for iOS
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Download for Android
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default FeaturesPage
