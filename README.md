# Sakina (سَكِينَة) - Islamic-Inspired Anxiety Relief App

> **Sakina** means "tranquility" or "peace" in Arabic, representing the divine peace that Allah places in the hearts of believers.

A comprehensive anxiety relief application that combines evidence-based cognitive behavioral therapy (CBT) techniques with optional Islamic spiritual practices. Designed to provide immediate panic relief, mood tracking, psycho-education, and a supportive audio library.

## 🌟 Features

### 🚨 Panic First Aid
- **Instant Relief Button**: Large, accessible panic button for immediate help
- **Guided Breathing**: 4-7-8, box breathing, and coherent breathing exercises
- **Grounding Techniques**: 5-4-3-2-1 sensory grounding and progressive muscle relaxation
- **Islamic Integration**: Optional dhikr (remembrance) during breathing exercises

### 🧠 CBT Tools
- **Thought Records**: Track and challenge negative thought patterns
- **Cognitive Distortions**: Learn to identify thinking traps
- **Worry Time**: Structured worry management technique
- **Islamic Perspective**: Optional spiritual reframing with Quranic wisdom

### 📱 Mood Tracking
- **Daily Check-ins**: Track mood valence and arousal levels
- **Mood Tags**: Categorize emotions with culturally appropriate terms
- **Progress Insights**: Visualize mood patterns over time
- **Journal Integration**: Add notes and reflections

### 🎧 Audio Library
- **Guided Meditations**: Secular and Islamic-inspired sessions
- **Quran Recitation**: Calming verses for anxiety relief
- **Ruqyah**: Islamic spiritual healing audio
- **Nature Sounds**: Rain, ocean, and forest soundscapes
- **Sleep Stories**: Peaceful narratives for bedtime

### 🕌 Islamic Integration (Optional)
- **Prayer Times**: Location-based prayer reminders
- **Qibla Direction**: Find the direction of prayer
- **Verse of the Day**: Daily Quranic verses for comfort
- **Dhikr Reminders**: Customizable remembrance notifications
- **99 Names of Allah**: Beautiful names for meditation

### 🔒 Privacy & Security
- **Offline-First**: Core features work without internet
- **Local Storage**: Sensitive data stays on your device
- **Optional Sync**: Cloud backup with end-to-end encryption
- **HIPAA Considerations**: Privacy-focused design

## 🏗️ Architecture

This is a **monorepo** built with modern technologies:

### 📱 Mobile App (React Native + Expo)
- **Framework**: React Native with Expo Router
- **UI Library**: Tamagui for cross-platform components
- **State Management**: Zustand for lightweight state
- **Navigation**: Expo Router with file-based routing
- **Audio**: Expo AV for audio playback
- **Notifications**: Expo Notifications for reminders

### 🌐 Website (React + Vite)
- **Framework**: React with Vite for fast development
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth interactions
- **SEO**: Meta tags and Open Graph optimization
- **Deployment**: Vercel for global CDN

### 🗄️ Backend (Supabase)
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth with social providers
- **Real-time**: WebSocket subscriptions for live updates
- **Edge Functions**: Deno-based serverless functions
- **Storage**: File uploads for audio content

### 🔗 Integrations
- **Aladhan API**: Prayer times and Islamic calendar
- **Quran API**: Verses, translations, and recitations
- **Stripe**: Subscription payments and billing
- **Expo Notifications**: Push notifications

### 📦 Shared Packages
- **UI Components**: Reusable components across platforms
- **i18n**: Internationalization with Arabic RTL support
- **Integrations**: Shared API clients and utilities
- **Types**: TypeScript definitions

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **pnpm** 8+
- **Expo CLI** for mobile development
- **Supabase CLI** for backend development
- **Docker** (optional) for containerized development

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/sakina-app.git
cd sakina-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start Supabase locally
pnpm supabase:start

# Run database migrations
pnpm supabase:migrate

# Seed the database
pnpm supabase:seed
```

### Development

```bash
# Start all development servers
pnpm dev

# Or start individually
pnpm dev:web      # Web app on http://localhost:5173
pnpm dev:mobile   # Mobile app with Expo
pnpm dev:packages # Watch mode for shared packages
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch

# Test specific projects
pnpm test:web
pnpm test:mobile
pnpm test:packages
```

### Building

```bash
# Build all projects
pnpm build

# Build specific projects
pnpm build:web
pnpm build:mobile
pnpm build:packages
```

## 📱 Mobile Development

### iOS Development
```bash
# Run on iOS simulator
pnpm mobile:ios

# Build for iOS
pnpm mobile:build:ios

# Submit to App Store
pnpm mobile:submit:ios
```

### Android Development
```bash
# Run on Android emulator
pnpm mobile:android

# Build for Android
pnpm mobile:build:android

# Submit to Google Play
pnpm mobile:submit:android
```

## 🌐 Web Deployment

### Vercel Deployment
```bash
# Deploy to production
pnpm web:deploy

# Preview deployment
pnpm web:preview
```

### Docker Deployment
```bash
# Build Docker image
pnpm docker:build

# Run in production mode
pnpm docker:prod

# Development with Docker
pnpm docker:dev
```

## 🗄️ Database Management

### Supabase Commands
```bash
# Start local Supabase
pnpm supabase:start

# Reset database
pnpm supabase:reset

# Push migrations
pnpm supabase:migrate

# Generate TypeScript types
pnpm supabase:types
```

### Database Schema

The database includes tables for:
- **Users**: Authentication and profile data
- **Journal Entries**: Mood tracking and notes
- **Sessions**: Panic relief and CBT sessions
- **Content**: Lessons, audio, and educational material
- **Crisis Resources**: Emergency contact information
- **User Preferences**: Settings and Islamic content toggles

## 🔧 Configuration

### Environment Variables

Create `.env.local` with the following variables:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# External APIs
ALADHAN_API_KEY=your_aladhan_api_key
QURAN_API_KEY=your_quran_api_key

# Mobile (Expo)
EXPO_TOKEN=your_expo_token
```

### Customization

#### Islamic Content
- Toggle Islamic features in `packages/ui/src/theme/index.ts`
- Modify prayer time calculations in `packages/integrations/src/aladhan.ts`
- Customize dhikr phrases in `packages/i18n/src/locales/*/messages.ts`

#### Branding
- Update colors in `packages/ui/src/theme/index.ts`
- Replace logo files in `apps/mobile/assets/` and `apps/web/public/`
- Modify app name in `app.json` and `package.json`

## 🧪 Testing Strategy

### Unit Tests
- **Components**: React Testing Library for UI components
- **Utilities**: Jest for pure functions and utilities
- **API Clients**: Mock external APIs and test error handling

### Integration Tests
- **Authentication**: Test login/logout flows
- **Database**: Test CRUD operations with test database
- **API Integrations**: Test external API integrations

### E2E Tests
- **Critical Flows**: Panic button, mood check-in, audio playback
- **Cross-Platform**: Test on iOS, Android, and web
- **Accessibility**: Screen reader and keyboard navigation

## 🔒 Security & Privacy

### Data Protection
- **Local-First**: Sensitive data stored locally by default
- **Encryption**: End-to-end encryption for cloud sync
- **Anonymization**: Personal data can be anonymized
- **GDPR Compliance**: Right to deletion and data portability

### Security Measures
- **Row Level Security**: Database-level access control
- **API Rate Limiting**: Prevent abuse of external APIs
- **Input Validation**: Sanitize all user inputs
- **Dependency Scanning**: Automated vulnerability checks

## 🌍 Internationalization

### Supported Languages
- **English**: Primary language
- **Arabic**: Full RTL support with Islamic terminology
- **Moroccan Arabic (Darija)**: Regional dialect support
- **French**: Secondary language support

### Adding New Languages
1. Create new locale file in `packages/i18n/src/locales/`
2. Add language to `packages/i18n/src/index.ts`
3. Update language selector in settings
4. Test RTL layout if applicable

## 📊 Analytics & Monitoring

### Privacy-Focused Analytics
- **Local Analytics**: Track usage patterns locally
- **Aggregated Metrics**: Anonymous usage statistics
- **Crash Reporting**: Error tracking without personal data
- **Performance Monitoring**: App performance metrics

### Health Metrics
- **Session Duration**: Time spent in panic relief
- **Feature Usage**: Most used CBT tools and audio content
- **Mood Trends**: Aggregated mood improvement data
- **Crisis Interventions**: Anonymous crisis resource usage

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Semantic commit messages

### Islamic Content Guidelines
- **Authenticity**: All Islamic content must be authentic and properly sourced
- **Sensitivity**: Respectful representation of Islamic practices
- **Optionality**: Islamic features must always be optional
- **Inclusivity**: Welcoming to users of all backgrounds

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Islamic Scholars**: For guidance on authentic Islamic content
- **Mental Health Professionals**: For CBT technique validation
- **Open Source Community**: For the amazing tools and libraries
- **Beta Testers**: For feedback and bug reports

## 📞 Support

### Crisis Resources
If you're experiencing a mental health crisis:
- **US**: Call 988 (Suicide & Crisis Lifeline)
- **UK**: Call 116 123 (Samaritans)
- **Emergency**: Call your local emergency number

### Technical Support
- **Documentation**: [docs.sakina-app.com](https://docs.sakina-app.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/sakina-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/sakina-app/discussions)
- **Email**: support@sakina-app.com

---

**Built with ❤️ for mental health and spiritual well-being**

*"And it is He who sent down tranquility (sakina) into the hearts of the believers..."* - Quran 48:4
