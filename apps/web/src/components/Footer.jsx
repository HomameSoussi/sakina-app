import { Link } from 'react-router-dom'
import { Heart, Mail, Twitter, Github } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Download', href: '#download' },
        { name: 'Science & Faith', href: '/science-faith' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Crisis Resources', href: '/crisis' },
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Licenses', href: '/licenses' },
        { name: 'Medical Disclaimer', href: '/disclaimer' },
      ],
    },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">سَكِينَة Sakina</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                Find your calm with Islamic-inspired anxiety relief. Panic first-aid and CBT tools 
                with an inclusive Islamic lens that respects all backgrounds.
              </p>
              <div className="flex space-x-4">
                <a
                  href="mailto:support@sakina-app.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
                <a
                  href="https://twitter.com/sakina_app"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://github.com/sakina-app"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Crisis Banner */}
        <div className="border-t py-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="font-semibold text-destructive mb-1">
                  Need immediate help?
                </h4>
                <p className="text-sm text-muted-foreground">
                  If you're in crisis, please reach out for professional support immediately.
                </p>
              </div>
              <Link
                to="/crisis"
                className="inline-flex items-center px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors font-medium"
              >
                Crisis Resources
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Sakina. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="block sm:inline">
                Made with ❤️ for mental wellness.
              </span>
              <span className="hidden sm:inline mx-2">•</span>
              <span className="block sm:inline">
                Not a substitute for professional care.
              </span>
            </div>
          </div>
        </div>


      </div>
    </footer>
  )
}

export default Footer
