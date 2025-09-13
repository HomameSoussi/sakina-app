import { motion } from 'framer-motion'
import { Check, Star, Zap, Heart, Shield, Globe } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { useState } from 'react'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const plans = [
    {
      name: "Free",
      description: "Essential panic relief and basic CBT tools",
      price: { monthly: 0, yearly: 0 },
      badge: null,
      features: [
        "Panic relief button with 4-step guide",
        "Basic breathing exercises (3 types)",
        "5-4-3-2-1 grounding technique",
        "Daily mood check-in",
        "Basic CBT thought records",
        "Crisis resources directory",
        "Offline access to core features",
        "Basic Islamic content (optional)"
      ],
      limitations: [
        "Limited to 3 saved journal entries",
        "Basic audio library (5 tracks)",
        "No advanced analytics",
        "Community support only"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      description: "Complete mental wellness toolkit with premium features",
      price: { monthly: 9.99, yearly: 99.99 },
      badge: "Most Popular",
      features: [
        "Everything in Free, plus:",
        "Unlimited journal entries & mood tracking",
        "Advanced CBT worksheets & exercises",
        "Complete audio library (50+ tracks)",
        "Guided meditations & sleep stories",
        "Extended Islamic content library",
        "Personalized insights & analytics",
        "Progress tracking & goal setting",
        "Priority crisis support",
        "Custom dhikr & reminder settings",
        "Data export & backup",
        "Ad-free experience",
        "Early access to new features"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Family",
      description: "Pro features for up to 6 family members",
      price: { monthly: 19.99, yearly: 199.99 },
      badge: "Best Value",
      features: [
        "Everything in Pro, plus:",
        "Up to 6 individual accounts",
        "Family progress dashboard",
        "Shared crisis resources",
        "Family meditation sessions",
        "Parental controls & monitoring",
        "Age-appropriate content filtering",
        "Family therapist recommendations",
        "Group challenges & goals",
        "Shared Islamic calendar & reminders",
        "Priority family support",
        "Educational resources for parents"
      ],
      limitations: [],
      cta: "Start Family Plan",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
              Simple • Transparent • No Hidden Fees
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your Path to{' '}
              <span className="text-teal-600">سَكِينَة</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Start your mental wellness journey with our free plan, or unlock the full potential 
              of Islamic-inspired anxiety relief with Pro features.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-teal-600"
              />
              <span className={`text-sm ${isYearly ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Yearly
              </span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save 17%
              </Badge>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                <Card className={`h-full ${plan.popular ? 'ring-2 ring-teal-500 shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-shadow`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className={`${plan.popular ? 'bg-teal-600 text-white' : 'bg-blue-600 text-white'} px-4 py-1`}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-gray-500 dark:text-gray-400 ml-1">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {isYearly && plan.price.monthly > 0 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          ${(plan.price.yearly / 12).toFixed(2)}/month billed annually
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button 
                      className={`w-full mb-6 ${plan.popular ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>

                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className={`text-sm ${feature.startsWith('Everything') ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                      
                      {plan.limitations.length > 0 && (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                            Limitations
                          </div>
                          {plan.limitations.map((limitation, i) => (
                            <div key={i} className="flex items-start mb-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {limitation}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What's Included in Each Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Compare features across all plans to find what works best for your mental wellness journey.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Family</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Panic Relief Button", free: true, pro: true, family: true },
                  { feature: "Basic Breathing Exercises", free: true, pro: true, family: true },
                  { feature: "Mood Tracking", free: "Basic", pro: "Advanced", family: "Advanced" },
                  { feature: "CBT Tools", free: "Basic", pro: "Complete", family: "Complete" },
                  { feature: "Audio Library", free: "5 tracks", pro: "50+ tracks", family: "50+ tracks" },
                  { feature: "Islamic Content", free: "Basic", pro: "Extended", family: "Extended" },
                  { feature: "Journal Entries", free: "3 saved", pro: "Unlimited", family: "Unlimited" },
                  { feature: "Progress Analytics", free: false, pro: true, family: true },
                  { feature: "Crisis Support", free: "Community", pro: "Priority", family: "Priority" },
                  { feature: "Family Features", free: false, pro: false, family: true },
                  { feature: "Number of Accounts", free: "1", pro: "1", family: "6" }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-400">—</span>
                      ) : (
                        <span className="text-sm text-gray-600 dark:text-gray-400">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-400">—</span>
                      ) : (
                        <span className="text-sm text-gray-600 dark:text-gray-400">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.family === 'boolean' ? (
                        row.family ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-400">—</span>
                      ) : (
                        <span className="text-sm text-gray-600 dark:text-gray-400">{row.family}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Can I try Pro features before subscribing?",
                answer: "Yes! We offer a 7-day free trial of Pro features. No credit card required to start."
              },
              {
                question: "Is the Islamic content optional?",
                answer: "Absolutely. All Islamic content can be toggled on or off. The app works perfectly for users of all backgrounds."
              },
              {
                question: "What happens to my data if I cancel?",
                answer: "You can export all your data before canceling. We keep your data for 30 days after cancellation in case you want to reactivate."
              },
              {
                question: "Do you offer student or healthcare worker discounts?",
                answer: "Yes! We offer 50% discounts for students and healthcare workers. Contact support with verification."
              },
              {
                question: "Is my data secure and private?",
                answer: "Your privacy is our priority. All data is encrypted, stored securely, and never shared with third parties. We're HIPAA-compliant."
              },
              {
                question: "Can I switch between plans?",
                answer: "Yes, you can upgrade or downgrade at any time. Changes take effect at your next billing cycle."
              }
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join a community that values both mental health and spiritual wellness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Heart, stat: "10,000+", label: "Active Users", color: "text-red-500" },
              { icon: Star, stat: "4.8/5", label: "App Store Rating", color: "text-yellow-500" },
              { icon: Shield, stat: "100%", label: "Data Privacy", color: "text-green-500" },
              { icon: Globe, stat: "15+", label: "Languages", color: "text-blue-500" }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{item.stat}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Begin with our free plan and discover how Sakina can help you find your inner peace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
                Download Free App
              </Button>
            </div>
            <p className="text-sm text-teal-200 mt-4">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
