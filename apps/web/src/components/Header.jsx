import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, Heart } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const { t, isRTL } = useLanguage()

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('features'), href: '/features' },
    { name: t('scienceFaith'), href: '/science-faith' },
    { name: t('prayerTimes'), href: '/prayer-times' },
    { name: 'Tools', href: '/tools', highlight: true },
    { name: t('pricing'), href: '/pricing' },
    { name: t('crisisHelp'), href: '/crisis', urgent: true },
  ]

  const isActive = (href) => location.pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              سَكِينَة
            </span>
            <span className="hidden text-lg font-semibold text-muted-foreground sm:block">
              Sakina
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative ${
                  isActive(item.href)
                    ? 'text-primary'
                    : item.urgent
                    ? 'text-destructive hover:text-destructive/80'
                    : item.highlight
                    ? 'text-primary bg-primary/10 px-3 py-1 rounded-full'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
                {item.highlight && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <LanguageSwitcher variant="compact" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button asChild>
              <a href="#download" className="bg-primary hover:bg-primary/90">
                {t('downloadApp')}
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary relative ${
                        isActive(item.href)
                          ? 'text-primary'
                          : item.urgent
                          ? 'text-destructive hover:text-destructive/80'
                          : item.highlight
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item.name}
                      {item.highlight && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </Link>
                  ))}
                  <div className="pt-4 border-t space-y-4">
                    <div>
                      <span className="text-sm font-medium mb-3 block">Language</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Theme</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </div>
                  </div>
                  <Button asChild className="mt-4">
                    <a href="#download" onClick={() => setIsOpen(false)}>
                      {t('downloadApp')}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
