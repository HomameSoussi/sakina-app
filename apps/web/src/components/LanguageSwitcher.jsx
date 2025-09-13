import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'

const languages = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    flag: '🇺🇸'
  },
  { 
    code: 'fr', 
    name: 'French', 
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  { 
    code: 'ar', 
    name: 'Arabic', 
    nativeName: 'العربية',
    flag: '🇸🇦'
  }
]

const LanguageSwitcher = ({ variant = 'default' }) => {
  const { language, changeLanguage, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  if (variant === 'compact') {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className={`absolute top-full mt-2 z-50 min-w-[200px] bg-background border rounded-lg shadow-lg ${
                  isRTL ? 'left-0' : 'right-0'
                }`}
              >
                <div className="p-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted ${
                        language === lang.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{lang.flag}</span>
                        <div className="text-left">
                          <div className="font-medium">{lang.name}</div>
                          <div className="text-xs text-muted-foreground">{lang.nativeName}</div>
                        </div>
                      </div>
                      {language === lang.code && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            language === lang.code
              ? 'bg-background text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.name}</span>
          <span className="sm:hidden">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
