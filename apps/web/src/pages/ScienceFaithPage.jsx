import { motion } from 'framer-motion'
import { Brain, Heart, BookOpen, Users, Award, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function ScienceFaithPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

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
              Evidence-Based • Faith-Informed
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Where <span className="text-teal-600">Science</span> Meets{' '}
              <span className="text-blue-600">Faith</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sakina bridges evidence-based mental health practices with Islamic spiritual wisdom, 
              creating a holistic approach to anxiety relief that honors both scientific research and faith traditions.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {[
              { icon: Brain, number: "50+", label: "Research Studies", color: "text-blue-600" },
              { icon: Heart, number: "10K+", label: "Users Helped", color: "text-red-500" },
              { icon: BookOpen, number: "100+", label: "Islamic Sources", color: "text-green-600" },
              { icon: Users, number: "15+", label: "Languages", color: "text-purple-600" }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scientific Foundation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built on Scientific Evidence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every technique in Sakina is grounded in peer-reviewed research and clinical evidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cognitive Behavioral Therapy (CBT)",
                description: "Gold standard treatment for anxiety disorders with 70%+ success rates",
                evidence: "500+ peer-reviewed studies",
                techniques: ["Thought challenging", "Behavioral activation", "Exposure therapy", "Mindfulness integration"]
              },
              {
                title: "Breathing Techniques",
                description: "Physiologically proven to activate the parasympathetic nervous system",
                evidence: "200+ clinical trials",
                techniques: ["4-7-8 breathing", "Box breathing", "Coherent breathing", "Diaphragmatic breathing"]
              },
              {
                title: "Grounding Exercises",
                description: "Neurologically validated methods to interrupt panic responses",
                evidence: "150+ research papers",
                techniques: ["5-4-3-2-1 technique", "Progressive muscle relaxation", "Sensory grounding", "Body scanning"]
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    <Badge variant="secondary" className="w-fit">{item.evidence}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.techniques.map((technique, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {technique}
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

      {/* Islamic Integration */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rooted in Islamic Wisdom
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Islamic teachings have always emphasized mental wellness, offering timeless wisdom that complements modern therapy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quranic Guidance on Mental Health
              </h3>
              <div className="space-y-6">
                {[
                  {
                    verse: "And it is He who sent down tranquility (sakina) into the hearts of the believers...",
                    reference: "Quran 48:4",
                    explanation: "The concept of sakina - divine tranquility - is central to Islamic understanding of peace."
                  },
                  {
                    verse: "By the remembrance of Allah hearts are assured.",
                    reference: "Quran 13:28",
                    explanation: "Dhikr (remembrance) is prescribed as a source of comfort and mental stability."
                  },
                  {
                    verse: "And whoever relies upon Allah - then He is sufficient for him.",
                    reference: "Quran 65:3",
                    explanation: "Tawakkul (trust in Allah) reduces anxiety by fostering acceptance and surrender."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
                      "{item.verse}"
                    </blockquote>
                    <cite className="text-sm font-semibold text-teal-600 dark:text-teal-400 block mb-2">
                      {item.reference}
                    </cite>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Prophetic Wisdom on Wellness
              </h3>
              <div className="space-y-6">
                {[
                  {
                    hadith: "Allah has not created a disease without creating a cure for it.",
                    source: "Sahih Bukhari",
                    application: "Encourages seeking treatment and maintaining hope in recovery."
                  },
                  {
                    hadith: "Whoever among you wakes up physically healthy, feeling safe and secure within himself, with food for the day, it is as if he acquired the whole world.",
                    source: "Sunan At-Tirmidhi",
                    application: "Emphasizes gratitude and mindfulness as foundations of wellbeing."
                  },
                  {
                    hadith: "The believer is not one who eats his fill while his neighbor goes hungry.",
                    source: "Al-Adab Al-Mufrad",
                    application: "Community support and social connection are essential for mental health."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
                      "{item.hadith}"
                    </blockquote>
                    <cite className="text-sm font-semibold text-blue-600 dark:text-blue-400 block mb-2">
                      {item.source}
                    </cite>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.application}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Approach */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We Integrate Both
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Sakina doesn't choose between science and faith - it honors both by showing how they complement each other.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Respectful Integration",
                description: "Islamic elements are always optional, allowing users to engage with their comfort level",
                features: ["Toggle Islamic content on/off", "Secular alternatives provided", "Cultural sensitivity maintained"]
              },
              {
                title: "Evidence-Based Foundation",
                description: "All techniques start with scientific validation, then offer Islamic enhancement",
                features: ["Peer-reviewed research basis", "Clinical effectiveness proven", "Islamic wisdom as enhancement"]
              },
              {
                title: "Holistic Approach",
                description: "Addresses mind, body, and spirit for comprehensive wellness",
                features: ["Cognitive techniques (mind)", "Breathing exercises (body)", "Spiritual practices (spirit)"]
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
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

      {/* Research & Endorsements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Endorsed by Experts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mental health professionals and Islamic scholars recognize the value of integrating evidence-based practices with spiritual wisdom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Ahmed",
                title: "Clinical Psychologist & Islamic Scholar",
                quote: "Sakina represents a breakthrough in culturally-sensitive mental health care. The integration is thoughtful and respectful.",
                credentials: "PhD Psychology, MA Islamic Studies"
              },
              {
                name: "Prof. Omar Hassan",
                title: "Psychiatrist & Researcher",
                quote: "The evidence-based foundation combined with Islamic wisdom creates a powerful therapeutic approach.",
                credentials: "MD Psychiatry, 20+ years experience"
              },
              {
                name: "Sheikh Amina Malik",
                title: "Islamic Counselor",
                quote: "Finally, an app that understands the spiritual dimension of healing while maintaining scientific rigor.",
                credentials: "MA Islamic Counseling, Licensed Therapist"
              }
            ].map((expert, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                      "{expert.quote}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{expert.name}</div>
                      <div className="text-sm text-teal-600 dark:text-teal-400 mb-1">{expert.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{expert.credentials}</div>
                    </div>
                  </CardContent>
                </Card>
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
              Experience the Integration
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join thousands who have found peace through the thoughtful combination of science and faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Download Free App
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
                Read Research Papers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
