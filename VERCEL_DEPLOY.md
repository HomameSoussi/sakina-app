# 🚀 Vercel Deployment Instructions for Sakina

The Sakina web app is ready for deployment to Vercel! Here are three ways to deploy:

## 🎯 Option 1: GitHub Integration (Recommended)

This is the easiest and most automated approach:

### 1. Connect Repository to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository: `HomameSoussi/sakina-app`
4. Select the **`apps/web`** directory as the root directory
5. Vercel will auto-detect it as a Vite project

### 2. Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `apps/web`
- **Build Command**: `pnpm build` (or `npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `pnpm install` (or `npm install`)

### 3. Set Environment Variables
In your Vercel project settings, add these environment variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (optional)
```

### 4. Deploy
Click **"Deploy"** and Vercel will automatically build and deploy your app!

## 🎯 Option 2: Vercel CLI (Local)

If you prefer command-line deployment:

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Web App Directory
```bash
cd apps/web
vercel --prod
```

### 4. Set Environment Variables
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
```

## 🎯 Option 3: Manual Upload

For quick testing or if you prefer manual deployment:

### 1. Download Build Files
The built files are in `apps/web/dist/` directory or use the deployment package: `sakina-web-deployment.tar.gz`

### 2. Drag & Drop to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select **"Browse"** and upload the `dist` folder
3. Vercel will automatically deploy the static files

### 3. Configure Environment Variables
Add the environment variables in the Vercel dashboard after deployment.

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)
The project includes a `vercel.json` file with:
- ✅ **SPA routing** - All routes redirect to `index.html`
- ✅ **Security headers** - XSS protection, content type options
- ✅ **Caching** - Optimized caching for static assets
- ✅ **Environment variables** - Proper environment variable mapping

### Build Configuration
- **Framework**: Vite (React)
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (recommended)

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel
1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain (e.g., `app.sakina.com`)

### 2. Configure DNS
Add a CNAME record in your DNS provider:
```
Type: CNAME
Name: app (or your subdomain)
Value: cname.vercel-dns.com
```

### 3. SSL Certificate
Vercel automatically provisions SSL certificates for all domains.

## 📊 Post-Deployment Checklist

After successful deployment:

- [ ] **Test the website** - Visit your Vercel URL
- [ ] **Check panic button** - Ensure it works properly
- [ ] **Test responsive design** - Check mobile and desktop views
- [ ] **Verify routing** - Test navigation between pages
- [ ] **Check console** - Ensure no JavaScript errors
- [ ] **Test features page** - Verify interactive elements work
- [ ] **Configure analytics** - Set up Vercel Analytics (optional)

## 🔍 Troubleshooting

### Build Errors
If you encounter build errors:
1. Check that all dependencies are installed
2. Verify environment variables are set correctly
3. Ensure the build command is `pnpm build` or `npm run build`

### Routing Issues
If routes don't work:
1. Verify `vercel.json` is in the root directory
2. Check that the SPA fallback is configured correctly

### Environment Variables
If features don't work:
1. Verify environment variables are set in Vercel dashboard
2. Ensure variable names start with `VITE_`
3. Check that Supabase URL and keys are correct

## 🎉 Success!

Once deployed, your Sakina app will be available at:
- **Vercel URL**: `https://your-project.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

The app features:
- ✨ **Beautiful landing page** with Islamic branding
- 🚨 **Interactive panic button** demo
- 🧠 **CBT tools showcase** with examples
- 🎧 **Audio library preview** with sample content
- 📱 **Mobile-responsive** design
- 🌙 **Dark/light theme** support
- 🌍 **Multilingual** ready (English/Arabic)

## 📞 Support

If you need help with deployment:
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: [Report deployment issues](https://github.com/HomameSoussi/sakina-app/issues)
- **Vercel Support**: Available in your Vercel dashboard

---

**May Allah bless your deployment and bring peace to all users! 🌙✨**

*"And it is He who sent down tranquility (sakina) into the hearts of the believers..."* - Quran 48:4
