import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Users, 
  Globe, 
  Shield, 
  Star,
  CheckCircle,
  Gift,
  Zap,
  Crown,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '../contexts/LanguageContext'

const DonatePage = () => {
  const { t, isRTL } = useLanguage()
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time') // 'one-time' or 'monthly'

  const predefinedAmounts = [10, 25, 50, 100, 250, 500]

  const impactStats = [
    {
      amount: 10,
      impact: 'Provides 1 month of free crisis support for someone in need',
      icon: Shield,
      color: 'text-blue-500'
    },
    {
      amount: 25,
      impact: 'Funds translation of anxiety relief content into one new language',
      icon: Globe,
      color: 'text-green-500'
    },
    {
      amount: 50,
      impact: 'Supports development of new Islamic mental health resources',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      amount: 100,
      impact: 'Enables free app access for 10 users who cannot afford Pro',
      icon: Users,
      color: 'text-purple-500'
    }
  ]

  const donorBenefits = [
    'Exclusive donor updates on our impact',
    'Early access to new features and content',
    'Special recognition in our community',
    'Tax-deductible receipt (where applicable)',
    'Direct connection to our mission'
  ]

  const getSelectedImpact = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount
    return impactStats.find(stat => stat.amount <= amount) || impactStats[0]
  }

  const handleDonate = () => {
    const amount = customAmount || selectedAmount
    // In a real implementation, this would integrate with Stripe or another payment processor
    alert(`Thank you for your ${donationType} donation of $${amount}! This would redirect to payment processing.`)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 mr-4" />
            <h1 className="text-4xl font-bold">
              Support Mental Wellness for All
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Help us provide free, culturally-sensitive mental health support to those who need it most. 
            Your donation makes anxiety relief accessible to everyone, regardless of their ability to pay.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Tax Deductible
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-blue-500 mr-2" />
              Secure Payments
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              100% Goes to Mission
            </div>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-sm text-muted-foreground">Users Helped</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Crisis Support</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Free Core Features</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-6 w-6 mr-2 text-primary" />
                  Make a Donation
                </CardTitle>
                <CardDescription>
                  Choose your contribution to support mental wellness for all
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">Donation Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        donationType === 'one-time'
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <Gift className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">One-time</div>
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        donationType === 'monthly'
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <Crown className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">Monthly</div>
                      <Badge variant="secondary" className="text-xs mt-1">More Impact</Badge>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Select Amount {donationType === 'monthly' && '(per month)'}
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedAmount === amount && !customAmount
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <div className="font-bold">${amount}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount(0)
                      }}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Impact Preview */}
                {(selectedAmount > 0 || customAmount) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <div className="flex items-start space-x-3">
                      {React.createElement(getSelectedImpact().icon, {
                        className: `h-5 w-5 ${getSelectedImpact().color} mt-0.5`
                      })}
                      <div>
                        <div className="font-medium text-sm">Your Impact</div>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedImpact().impact}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Donate Button */}
                <Button 
                  onClick={handleDonate}
                  size="lg" 
                  className="w-full"
                  disabled={!selectedAmount && !customAmount}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate ${customAmount || selectedAmount} {donationType === 'monthly' && '/month'}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Secure payment processing • Cancel monthly donations anytime
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Why Donate & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Why Your Donation Matters */}
            <Card>
              <CardHeader>
                <CardTitle>Why Your Donation Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <div className="font-medium">Accessibility for All</div>
                    <div className="text-sm text-muted-foreground">
                      Many people cannot afford mental health resources. Your donation keeps our core features free.
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-medium">Cultural Sensitivity</div>
                    <div className="text-sm text-muted-foreground">
                      We're building the first truly inclusive Islamic mental health platform.
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <div className="font-medium">Crisis Prevention</div>
                    <div className="text-sm text-muted-foreground">
                      Early intervention through accessible tools can prevent mental health crises.
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <div className="font-medium">Innovation & Research</div>
                    <div className="text-sm text-muted-foreground">
                      Fund development of new evidence-based features and Islamic mental health research.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Donor Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {donorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transparency */}
            <Card>
              <CardHeader>
                <CardTitle>Our Commitment to Transparency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-muted-foreground">Direct Program Funding</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">15%</div>
                    <div className="text-sm text-muted-foreground">Operations & Growth</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  We publish quarterly impact reports showing exactly how donations are used 
                  to advance our mission of accessible mental health support.
                </p>
              </CardContent>
            </Card>

            {/* Alternative Ways to Help */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Share Sakina with Friends
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Leave an App Store Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Help with Translations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Volunteer Your Skills
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">
                Together, We Can Make Mental Health Accessible
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Every donation, no matter the size, brings us closer to a world where everyone 
                has access to culturally-sensitive mental health support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/pricing">
                    <Crown className="h-4 w-4 mr-2" />
                    Become a Pro Subscriber
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#download">
                    Download Free App
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

export default DonatePage
