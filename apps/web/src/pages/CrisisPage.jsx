import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Clock, Heart, Shield, AlertTriangle, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription } from '../components/ui/alert'

export default function CrisisPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const emergencyContacts = [
    {
      country: "United States",
      services: [
        { name: "988 Suicide & Crisis Lifeline", number: "988", type: "Call/Text", available: "24/7" },
        { name: "Crisis Text Line", number: "Text HOME to 741741", type: "Text", available: "24/7" },
        { name: "National Domestic Violence Hotline", number: "1-800-799-7233", type: "Call", available: "24/7" },
        { name: "SAMHSA National Helpline", number: "1-800-662-4357", type: "Call", available: "24/7" }
      ]
    },
    {
      country: "United Kingdom",
      services: [
        { name: "Samaritans", number: "116 123", type: "Call", available: "24/7" },
        { name: "Crisis Text Line UK", number: "Text SHOUT to 85258", type: "Text", available: "24/7" },
        { name: "Mind Infoline", number: "0300 123 3393", type: "Call", available: "9am-6pm Mon-Fri" },
        { name: "NHS 111", number: "111", type: "Call", available: "24/7" }
      ]
    },
    {
      country: "Canada",
      services: [
        { name: "Talk Suicide Canada", number: "1-833-456-4566", type: "Call/Text", available: "24/7" },
        { name: "Kids Help Phone", number: "1-800-668-6868", type: "Call/Text", available: "24/7" },
        { name: "Crisis Services Canada", number: "1-833-456-4566", type: "Call", available: "24/7" }
      ]
    },
    {
      country: "Australia",
      services: [
        { name: "Lifeline", number: "13 11 14", type: "Call/Text", available: "24/7" },
        { name: "Beyond Blue", number: "1300 22 4636", type: "Call", available: "24/7" },
        { name: "Kids Helpline", number: "1800 55 1800", type: "Call", available: "24/7" }
      ]
    }
  ]

  const islamicResources = [
    {
      organization: "Islamic Society of North America (ISNA)",
      description: "Mental health resources and counselor directory",
      contact: "www.isna.net/mental-health",
      services: ["Counselor Directory", "Educational Resources", "Community Support"]
    },
    {
      organization: "Khalil Center",
      description: "Islamic psychology and mental health services",
      contact: "www.khalilcenter.com",
      services: ["Therapy Services", "Islamic Psychology", "Crisis Support"]
    },
    {
      organization: "Maristan",
      description: "Mental health platform for Muslim community",
      contact: "www.maristan.co",
      services: ["Online Therapy", "Islamic Counseling", "Support Groups"]
    },
    {
      organization: "Naseeha Mental Health",
      description: "Crisis helpline for Muslim youth",
      contact: "1-866-627-3342",
      services: ["Crisis Helpline", "Peer Support", "Islamic Guidance"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Emergency Alert */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="font-semibold">
            If you're in immediate danger, call emergency services: 911 (US), 999 (UK), 000 (AU)
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Crisis Support • Available 24/7
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              You Are <span className="text-red-600">Not Alone</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              If you're experiencing a mental health crisis, immediate help is available. 
              These resources provide professional support when you need it most.
            </p>
          </motion.div>

          <Alert className="max-w-4xl mx-auto mb-12 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <Heart className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Remember:</strong> Seeking help is a sign of strength, not weakness. 
              Professional support can provide immediate relief and long-term strategies for recovery.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Immediate Help Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Immediate Crisis Support
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional crisis counselors are available 24/7 to provide immediate support and guidance.
            </p>
          </motion.div>

          <div className="space-y-8">
            {emergencyContacts.map((country, index) => (
              <motion.div key={country.country} variants={fadeInUp}>
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-700">
                    <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      {country.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {country.services.map((service, i) => (
                        <div key={i} className="p-6 border-b md:border-r md:last:border-r-0 border-gray-200 dark:border-gray-700 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {service.name}
                            </h3>
                            <Badge variant="outline" className="ml-2">
                              {service.type}
                            </Badge>
                          </div>
                          <div className="flex items-center mb-2">
                            <Phone className="w-4 h-4 text-green-600 mr-2" />
                            <span className="font-mono text-lg text-green-600 font-semibold">
                              {service.number}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {service.available}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Mental Health Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Islamic Mental Health Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Culturally-sensitive mental health support that integrates Islamic values and understanding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {islamicResources.map((resource, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {resource.organization}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center text-teal-600 dark:text-teal-400 mb-3">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span className="font-mono text-sm">{resource.contact}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {resource.services.map((service, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              When to Seek Help
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Recognizing the signs of a mental health crisis can help you or someone you care about get help quickly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Immediate Danger Signs",
                icon: AlertTriangle,
                color: "text-red-600",
                bgColor: "bg-red-100 dark:bg-red-900/20",
                signs: [
                  "Thoughts of suicide or self-harm",
                  "Plans to hurt yourself or others",
                  "Feeling trapped or hopeless",
                  "Talking about death or dying",
                  "Giving away possessions"
                ]
              },
              {
                title: "Severe Symptoms",
                icon: Shield,
                color: "text-orange-600",
                bgColor: "bg-orange-100 dark:bg-orange-900/20",
                signs: [
                  "Severe panic attacks",
                  "Inability to function daily",
                  "Extreme mood swings",
                  "Hearing or seeing things",
                  "Complete social withdrawal"
                ]
              },
              {
                title: "Concerning Changes",
                icon: Users,
                color: "text-yellow-600",
                bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
                signs: [
                  "Dramatic personality changes",
                  "Increased substance use",
                  "Neglecting responsibilities",
                  "Risky or reckless behavior",
                  "Loss of interest in everything"
                ]
              }
            ].map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center mb-4`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.signs.map((sign, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <div className={`w-2 h-2 rounded-full ${category.color.replace('text-', 'bg-')} mr-3 mt-2 flex-shrink-0`}></div>
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Care Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Immediate Self-Care Strategies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              While seeking professional help, these strategies can provide immediate relief and grounding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Breathing Exercise",
                description: "4-7-8 breathing to calm your nervous system",
                steps: ["Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts", "Repeat 4 times"]
              },
              {
                title: "Grounding Technique",
                description: "5-4-3-2-1 method to reconnect with the present",
                steps: ["5 things you can see", "4 things you can touch", "3 things you can hear", "2 things you can smell", "1 thing you can taste"]
              },
              {
                title: "Islamic Dhikr",
                description: "Remembrance of Allah for spiritual comfort",
                steps: ["La hawla wa la quwwata illa billah", "Astaghfirullah", "Subhan Allah", "Alhamdulillahi rabbil alameen"]
              },
              {
                title: "Safety Planning",
                description: "Create a plan for crisis moments",
                steps: ["Identify warning signs", "List coping strategies", "Contact trusted people", "Remove harmful items"]
              }
            ].map((strategy, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      {strategy.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {strategy.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {strategy.steps.map((step, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5 flex-shrink-0">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Network */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Building Your Support Network
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Recovery is easier with support. Consider reaching out to these people in your life.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Family & Friends", description: "Trusted people who care about you" },
                { title: "Mental Health Professionals", description: "Therapists, counselors, psychiatrists" },
                { title: "Community Leaders", description: "Imams, religious leaders, mentors" }
              ].map((support, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {support.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {support.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Help is Always Available
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              You don't have to face this alone. Professional help is just a call or text away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call Crisis Line
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                Text for Help
              </Button>
            </div>
            <p className="text-sm text-red-200 mt-4">
              Available 24/7 • Confidential • Free • Professional support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
