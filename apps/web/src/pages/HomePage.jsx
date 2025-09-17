import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Shield, 
  Brain, 
  Moon, 
  Smartphone, 
  Download, 
  Play, 
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import InteractivePanicButton from '../components/InteractivePanicButton'
import { useLanguage } from '../contexts/LanguageContext'

const HomePage = () => {
  const { t } = useLanguage()
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Heart,
      title: t('panicRelief'),
      description: t('panicReliefDesc'),
      color: 'text-red-500',
    },
    {
      icon: Brain,
      title: t('cbtTools'),
      description: t('cbtToolsDesc'),
      color: 'text-blue-500',
    },
    {
      icon: Moon,
      title: t('islamicIntegration'),
      description: t('islamicIntegrationDesc'),
      color: 'text-purple-500',
    },
    {
      icon: Shield,
      title: t('privacyFirst'),
      description: t('privacyFirstDesc'),
      color: 'text-green-500',
    },
  ]

  const stats = [
    { number: '10K+', label: t('usersHelped'), icon: Users },
    { number: '4.8★', label: t('appRating'), icon: Star },
    { number: '15+', label: t('languages'), icon: Globe },
    { number: '24/7', label: t('crisisSupport'), icon: Shield },
  ]

  const testimonials = [
    {
      name: 'Amira K.',
      location: 'London, UK',
      text: 'Sakina helped me through my worst panic attacks. The Islamic content is beautifully integrated and never feels forced.',
      rating: 5,
    },
    {
      name: 'Omar M.',
      location: 'Toronto, CA',
      text: 'As someone who struggled to find mental health resources that respect my faith, Sakina is a blessing.',
      rating: 5,
    },
    {
      name: 'Sarah L.',
      location: 'Sydney, AU',
      text: 'The CBT tools are excellent, and I love that I can use them with or without the Islamic elements.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <Badge variant="secondary" className="mb-4">
                🌟 Now Available on iOS & Android
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t('heroTitle')}{' '}
                <span className="text-primary">سَكِينَة</span>
                <br />
                <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">
                  {t('heroSubtitle')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <a href="#download">
                    <Download className="mr-2 h-5 w-5" />
                    {t('downloadFree')}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/features">
                    <Play className="mr-2 h-5 w-5" />
                    {t('watchDemo')}
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t('freeToUse')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t('noAds')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t('privacyFirst')}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border">
                <h3 className="text-2xl font-semibold mb-4 text-center text-teal-600">
                  {t('tryPanicReliefButton')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm">
                  {t('experienceGuidedProcess')}
                </p>
                <InteractivePanicButton />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('everythingYouNeed')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('sakinaCombines')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setActiveFeature(index)}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <feature.icon className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from people who found their peace with Sakina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Start Your Journey to Inner Peace
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Download Sakina today and discover a new way to manage anxiety with tools 
              that respect your values and support your mental wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Download for iOS
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Download for Android
              </Button>
            </div>
            <p className="text-primary-foreground/70 mt-6 text-sm">
              Free download • No ads • Privacy focused
            </p>
          </motion.div>
        </div>
      </section>

      {/* Crisis Banner */}
      <section className="py-8 bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-destructive" />
              <div>
                <h3 className="font-semibold text-destructive">
                  Need immediate help?
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you're experiencing a mental health crisis, please reach out for professional support.
                </p>
              </div>
            </div>
            <Button asChild variant="destructive">
              <Link to="/crisis">
                Crisis Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
