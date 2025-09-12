# Deployment Guide for Sakina

This guide covers deploying the Sakina app to production environments.

## 🏗️ Infrastructure Overview

### Production Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile Apps   │    │   Web App       │    │   Backend       │
│                 │    │                 │    │                 │
│ • iOS App Store │    │ • Vercel CDN    │    │ • Supabase      │
│ • Google Play   │    │ • Custom Domain │    │ • Edge Functions│
│ • Expo Updates  │    │ • SSL/TLS       │    │ • PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   External APIs │
                    │                 │
                    │ • Aladhan API   │
                    │ • Quran API     │
                    │ • Stripe        │
                    └─────────────────┘
```

## 🌐 Web App Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected
- Environment variables configured

### Automatic Deployment
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   ```

2. **Configure Environment Variables**
   ```bash
   # Set production environment variables
   vercel env add VITE_SUPABASE_URL production
   vercel env add VITE_SUPABASE_ANON_KEY production
   vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
   ```

3. **Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   
   # Or use the npm script
   pnpm web:deploy
   ```

### Custom Domain Setup
1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `app.sakina.com`)

2. **Configure DNS**
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - Verify HTTPS is working

### Performance Optimization
- **Static Assets**: Automatically optimized by Vercel
- **Image Optimization**: Use Vercel's image optimization
- **Caching**: Configure cache headers in `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📱 Mobile App Deployment

### iOS App Store

#### Prerequisites
- Apple Developer Account ($99/year)
- Xcode installed on macOS
- App Store Connect access

#### Build and Submit
1. **Configure App**
   ```bash
   # Update app.json with production config
   {
     "expo": {
       "name": "Sakina",
       "slug": "sakina-app",
       "version": "1.0.0",
       "ios": {
         "bundleIdentifier": "com.sakina.app",
         "buildNumber": "1"
       }
     }
   }
   ```

2. **Build for iOS**
   ```bash
   # Build production iOS app
   pnpm mobile:build:ios
   
   # Or use EAS CLI directly
   cd apps/mobile
   eas build --platform ios --profile production
   ```

3. **Submit to App Store**
   ```bash
   # Submit for review
   pnpm mobile:submit:ios
   
   # Or use EAS CLI
   eas submit --platform ios
   ```

#### App Store Optimization
- **App Name**: "Sakina - Anxiety Relief"
- **Keywords**: anxiety, mental health, meditation, Islamic, CBT
- **Description**: Emphasize panic relief and Islamic integration
- **Screenshots**: Show panic button, breathing exercises, mood tracking
- **Privacy Policy**: Required for health apps

### Google Play Store

#### Prerequisites
- Google Play Developer Account ($25 one-time)
- Google Play Console access

#### Build and Submit
1. **Configure App**
   ```bash
   # Update app.json for Android
   {
     "expo": {
       "android": {
         "package": "com.sakina.app",
         "versionCode": 1
       }
     }
   }
   ```

2. **Build for Android**
   ```bash
   # Build production Android app
   pnpm mobile:build:android
   
   # Or use EAS CLI
   eas build --platform android --profile production
   ```

3. **Submit to Google Play**
   ```bash
   # Submit for review
   pnpm mobile:submit:android
   
   # Or use EAS CLI
   eas submit --platform android
   ```

#### Google Play Optimization
- **App Category**: Health & Fitness
- **Content Rating**: Everyone
- **Target Audience**: Adults
- **Data Safety**: Declare data collection practices

### Over-the-Air Updates (OTA)

#### Expo Updates
```bash
# Publish update to production
cd apps/mobile
eas update --branch production --message "Bug fixes and improvements"

# Publish to specific channel
eas update --channel production-v1
```

#### Update Strategy
- **Critical Fixes**: Immediate OTA updates
- **New Features**: App Store/Play Store releases
- **A/B Testing**: Use update channels for gradual rollouts

## 🗄️ Backend Deployment (Supabase)

### Production Setup

#### 1. Create Production Project
1. **Supabase Dashboard**
   - Create new project
   - Choose region closest to users
   - Set strong database password

2. **Configure Project**
   ```bash
   # Link local project to production
   supabase link --project-ref your-project-ref
   
   # Push database schema
   supabase db push
   
   # Deploy edge functions
   supabase functions deploy
   ```

#### 2. Environment Variables
```bash
# Production environment variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 3. Database Configuration
- **Connection Pooling**: Enable for high traffic
- **Backups**: Configure automated backups
- **Monitoring**: Set up alerts for performance

### Edge Functions Deployment

#### Deploy All Functions
```bash
# Deploy all edge functions
supabase functions deploy

# Deploy specific function
supabase functions deploy prayer-times
```

#### Function Configuration
```typescript
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

### Database Security

#### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

#### API Security
- **Rate Limiting**: Configure in Supabase dashboard
- **API Keys**: Rotate regularly
- **CORS**: Configure allowed origins

## 🔗 External API Configuration

### Aladhan API (Prayer Times)
```bash
# No API key required for basic usage
# Rate limit: 1000 requests per day
ALADHAN_API_URL=https://api.aladhan.com/v1
```

### Quran API
```bash
# Register at quran.com for API access
QURAN_API_KEY=your-quran-api-key
QURAN_API_URL=https://api.quran.com/api/v4
```

### Stripe Configuration

#### Production Setup
1. **Stripe Dashboard**
   - Switch to live mode
   - Get live API keys
   - Configure webhooks

2. **Webhook Configuration**
   ```bash
   # Webhook endpoint
   https://your-project.supabase.co/functions/v1/stripe-webhook
   
   # Events to listen for
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
   ```

3. **Environment Variables**
   ```bash
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## 🔍 Monitoring & Analytics

### Application Monitoring

#### Supabase Monitoring
- **Database Performance**: Query performance and slow queries
- **API Usage**: Request volume and error rates
- **Storage Usage**: File uploads and bandwidth

#### Vercel Analytics
- **Web Vitals**: Core web vitals monitoring
- **Traffic**: Page views and user sessions
- **Performance**: Load times and error rates

#### Expo Analytics
- **Crash Reporting**: Automatic crash detection
- **Performance**: App launch time and memory usage
- **User Engagement**: Session duration and feature usage

### Error Tracking

#### Sentry Integration
```bash
# Install Sentry
pnpm add @sentry/react @sentry/react-native

# Configure for web
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});

# Configure for mobile
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "your-sentry-dsn",
});
```

### Health Checks

#### API Health Endpoints
```typescript
// Health check endpoint
export default async function handler(req: Request) {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      stripe: await checkStripe(),
      aladhan: await checkAladhan(),
    }
  };
  
  return new Response(JSON.stringify(health), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

#### Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring with alerts
- **StatusPage**: Public status page for users

## 🔒 Security Checklist

### Pre-Deployment Security
- [ ] Environment variables secured
- [ ] API keys rotated
- [ ] Database RLS policies tested
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled

### Post-Deployment Security
- [ ] SSL certificates verified
- [ ] Security headers configured
- [ ] Vulnerability scanning scheduled
- [ ] Backup procedures tested
- [ ] Incident response plan ready
- [ ] Access logs monitored

## 📊 Performance Optimization

### Web Performance
- **Bundle Size**: Analyze with `pnpm build:web --analyze`
- **Code Splitting**: Lazy load routes and components
- **Image Optimization**: Use WebP format and responsive images
- **Caching**: Configure service worker for offline support

### Mobile Performance
- **Bundle Size**: Use Expo bundle analyzer
- **Memory Usage**: Profile with Flipper
- **Battery Usage**: Optimize background tasks
- **Network Usage**: Implement offline-first architecture

### Database Performance
- **Indexing**: Add indexes for frequently queried columns
- **Query Optimization**: Use EXPLAIN ANALYZE for slow queries
- **Connection Pooling**: Configure pgBouncer
- **Caching**: Implement Redis for frequently accessed data

## 🚀 Deployment Automation

### GitHub Actions
The CI/CD pipeline automatically:
1. **Tests**: Run all tests on pull requests
2. **Builds**: Create production builds
3. **Deploys**: Deploy to staging and production
4. **Notifies**: Send deployment status updates

### Deployment Environments
- **Development**: Feature branches deploy to preview URLs
- **Staging**: `develop` branch deploys to staging environment
- **Production**: `main` branch deploys to production

### Rollback Strategy
```bash
# Rollback web deployment
vercel rollback

# Rollback mobile app (OTA)
eas update --branch production --message "Rollback to previous version"

# Rollback database migration
supabase db reset --db-url your-staging-url
```

## 📞 Support & Maintenance

### Regular Maintenance
- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and rotate API keys
- **Annually**: Security audit and penetration testing

### Incident Response
1. **Detection**: Automated alerts for critical issues
2. **Assessment**: Determine severity and impact
3. **Response**: Implement fix or rollback
4. **Communication**: Update users via status page
5. **Post-mortem**: Document lessons learned

### Backup & Recovery
- **Database**: Automated daily backups with point-in-time recovery
- **Files**: Supabase storage with geographic replication
- **Code**: Git repository with multiple remotes
- **Configuration**: Infrastructure as code with version control

---

**For additional support, contact the DevOps team or refer to the [troubleshooting guide](TROUBLESHOOTING.md).**
