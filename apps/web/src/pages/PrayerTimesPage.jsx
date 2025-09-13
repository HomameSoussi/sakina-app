import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  Compass, 
  Calendar,
  Sun,
  Moon,
  Star,
  Sunrise,
  Sunset,
  RefreshCw,
  Navigation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

const PrayerTimesPage = () => {
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPrayer, setNextPrayer] = useState(null)
  const [qiblaDirection, setQiblaDirection] = useState(null)
  const [hijriDate, setHijriDate] = useState(null)

  const prayerNames = {
    Fajr: { name: 'Fajr', arabic: 'الفجر', icon: Sunrise, color: 'text-blue-500' },
    Dhuhr: { name: 'Dhuhr', arabic: 'الظهر', icon: Sun, color: 'text-yellow-500' },
    Asr: { name: 'Asr', arabic: 'العصر', icon: Sun, color: 'text-orange-500' },
    Maghrib: { name: 'Maghrib', arabic: 'المغرب', icon: Sunset, color: 'text-red-500' },
    Isha: { name: 'Isha', arabic: 'العشاء', icon: Moon, color: 'text-purple-500' }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
          fetchPrayerTimes(latitude, longitude)
          fetchQiblaDirection(latitude, longitude)
        },
        (error) => {
          console.error('Error getting location:', error)
          // Fallback to a default location (Mecca)
          const defaultLat = 21.4225
          const defaultLng = 39.8262
          setLocation({ latitude: defaultLat, longitude: defaultLng })
          fetchPrayerTimes(defaultLat, defaultLng)
          fetchQiblaDirection(defaultLat, defaultLng)
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
      setLoading(false)
    }
  }

  const fetchPrayerTimes = async (lat, lng) => {
    try {
      setLoading(true)
      // Using Aladhan API for prayer times
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
      )
      const data = await response.json()
      
      if (data.code === 200) {
        setPrayerTimes(data.data.timings)
        setHijriDate(data.data.date.hijri)
        calculateNextPrayer(data.data.timings)
      } else {
        throw new Error('Failed to fetch prayer times')
      }
    } catch (err) {
      setError('Failed to load prayer times. Please try again.')
      console.error('Prayer times error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchQiblaDirection = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/qibla/${lat}/${lng}`
      )
      const data = await response.json()
      
      if (data.code === 200) {
        setQiblaDirection(data.data.direction)
      }
    } catch (err) {
      console.error('Qibla direction error:', err)
    }
  }

  const calculateNextPrayer = (timings) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
    
    for (const prayer of prayers) {
      const [hours, minutes] = timings[prayer].split(':').map(Number)
      const prayerTime = hours * 60 + minutes
      
      if (prayerTime > currentTime) {
        const timeUntil = prayerTime - currentTime
        setNextPrayer({
          name: prayer,
          time: timings[prayer],
          minutesUntil: timeUntil
        })
        return
      }
    }
    
    // If no prayer found today, next is Fajr tomorrow
    const [hours, minutes] = timings.Fajr.split(':').map(Number)
    const fajrTime = hours * 60 + minutes
    const timeUntil = (24 * 60) - currentTime + fajrTime
    setNextPrayer({
      name: 'Fajr',
      time: timings.Fajr,
      minutesUntil: timeUntil,
      tomorrow: true
    })
  }

  const formatTimeUntil = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const refreshPrayerTimes = () => {
    if (location) {
      fetchPrayerTimes(location.latitude, location.longitude)
    } else {
      getCurrentLocation()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading prayer times...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unable to Load Prayer Times</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={getCurrentLocation}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
            Prayer Times
            <span className="text-primary block text-2xl mt-2">أوقات الصلاة</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay connected with your daily prayers. Accurate prayer times based on your location 
            with Qibla direction and Islamic calendar.
          </p>
        </motion.div>

        {/* Current Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Today's Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                {hijriDate && (
                  <p className="text-lg text-muted-foreground" dir="rtl">
                    {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Compass className="h-5 w-5 mr-2 text-primary" />
                Qibla Direction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                    <Navigation 
                      className="h-8 w-8 text-primary" 
                      style={{ 
                        transform: qiblaDirection ? `rotate(${qiblaDirection}deg)` : 'rotate(0deg)' 
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-semibold">
                    {qiblaDirection ? `${Math.round(qiblaDirection)}°` : 'Loading...'}
                  </p>
                  <p className="text-sm text-muted-foreground">From North</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Prayer Alert */}
        {nextPrayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Alert className="border-primary/20 bg-primary/5">
              <Clock className="h-4 w-4" />
              <AlertDescription className="text-lg">
                <strong>Next Prayer:</strong> {prayerNames[nextPrayer.name]?.name} ({prayerNames[nextPrayer.name]?.arabic}) 
                at {nextPrayer.time} - <strong>{formatTimeUntil(nextPrayer.minutesUntil)}</strong> remaining
                {nextPrayer.tomorrow && ' (tomorrow)'}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {Object.entries(prayerNames).map(([key, prayer], index) => {
            const IconComponent = prayer.icon
            const isNext = nextPrayer?.name === key
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden ${isNext ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                  {isNext && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      Next
                    </Badge>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IconComponent className={`h-5 w-5 mr-2 ${prayer.color}`} />
                        <span className="text-lg">{prayer.name}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-right" dir="rtl">
                      <span className="text-lg font-arabic">{prayer.arabic}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-center">
                      {prayerTimes?.[key] || '--:--'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Islamic Calendar Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Prayer Reminders</span>
                <Badge variant="secondary">Pro Feature</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Qibla Compass</span>
                <Badge variant="outline">Available</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Islamic Events</span>
                <Badge variant="secondary">Pro Feature</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Dhikr Counter</span>
                <Badge variant="secondary">Pro Feature</Badge>
              </div>
              <Button className="w-full mt-4" asChild>
                <a href="/pricing">
                  Unlock All Features
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prayer Time Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={refreshPrayerTimes}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Prayer Times
              </Button>
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Change Location
              </Button>
              <div className="text-sm text-muted-foreground">
                <p>Calculation Method: Islamic Society of North America (ISNA)</p>
                <p>Madhab: Shafi (for Asr calculation)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">
                Never Miss a Prayer Again
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the full Sakina app with prayer notifications, Qibla compass, 
                Islamic calendar, and anxiety relief tools all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#download">
                    Download Sakina App
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/pricing">
                    View Pricing
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

export default PrayerTimesPage
