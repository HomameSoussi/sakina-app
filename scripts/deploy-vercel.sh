#!/bin/bash

# Sakina App - Vercel Deployment Script
# This script deploys the web app to Vercel

set -e

echo "🚀 Deploying Sakina Web App to Vercel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
check_vercel_cli() {
    echo -e "${BLUE}📋 Checking Vercel CLI...${NC}"
    
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
        npm install -g vercel
        echo -e "${GREEN}✅ Vercel CLI installed${NC}"
    else
        echo -e "${GREEN}✅ Vercel CLI found${NC}"
    fi
}

# Check if user is logged in to Vercel
check_vercel_auth() {
    echo -e "${BLUE}🔐 Checking Vercel authentication...${NC}"
    
    if ! vercel whoami &> /dev/null; then
        echo -e "${YELLOW}⚠️  Not logged in to Vercel. Please login...${NC}"
        vercel login
        echo -e "${GREEN}✅ Logged in to Vercel${NC}"
    else
        echo -e "${GREEN}✅ Already logged in to Vercel${NC}"
    fi
}

# Check environment variables
check_env_vars() {
    echo -e "${BLUE}📋 Checking environment variables...${NC}"
    
    if [ ! -f ".env.local" ]; then
        echo -e "${RED}❌ .env.local file not found${NC}"
        echo "Please create .env.local with your Supabase credentials"
        exit 1
    fi
    
    # Source environment variables
    source .env.local
    
    if [ -z "$VITE_SUPABASE_URL" ]; then
        echo -e "${RED}❌ VITE_SUPABASE_URL is not set in .env.local${NC}"
        exit 1
    fi
    
    if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
        echo -e "${RED}❌ VITE_SUPABASE_ANON_KEY is not set in .env.local${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Environment variables checked${NC}"
}

# Build the web app
build_app() {
    echo -e "${BLUE}🏗️  Building web app...${NC}"
    
    # Install dependencies
    pnpm install
    
    # Build packages first
    pnpm build:packages
    
    # Build web app
    pnpm build:web
    
    echo -e "${GREEN}✅ Web app built successfully${NC}"
}

# Deploy to Vercel
deploy_to_vercel() {
    echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
    
    cd apps/web
    
    # Link project if not already linked
    if [ ! -f ".vercel/project.json" ]; then
        echo -e "${YELLOW}🔗 Linking Vercel project...${NC}"
        vercel link --yes
    fi
    
    # Set environment variables in Vercel
    echo -e "${BLUE}🔧 Setting environment variables...${NC}"
    
    vercel env add VITE_SUPABASE_URL production <<< "$VITE_SUPABASE_URL"
    vercel env add VITE_SUPABASE_ANON_KEY production <<< "$VITE_SUPABASE_ANON_KEY"
    
    if [ -n "$VITE_STRIPE_PUBLISHABLE_KEY" ]; then
        vercel env add VITE_STRIPE_PUBLISHABLE_KEY production <<< "$VITE_STRIPE_PUBLISHABLE_KEY"
    fi
    
    # Deploy to production
    echo -e "${BLUE}🚀 Deploying to production...${NC}"
    vercel --prod
    
    cd ../..
    
    echo -e "${GREEN}✅ Deployed to Vercel successfully${NC}"
}

# Get deployment URL
get_deployment_url() {
    echo -e "${BLUE}🔗 Getting deployment URL...${NC}"
    
    cd apps/web
    DEPLOYMENT_URL=$(vercel ls --meta | grep "sakina" | head -1 | awk '{print $2}')
    cd ../..
    
    if [ -n "$DEPLOYMENT_URL" ]; then
        echo -e "${GREEN}✅ Deployment URL: https://$DEPLOYMENT_URL${NC}"
        
        # Save to .env.local
        echo "VERCEL_URL=https://$DEPLOYMENT_URL" >> .env.local
    else
        echo -e "${YELLOW}⚠️  Could not retrieve deployment URL${NC}"
    fi
}

# Configure custom domain (optional)
configure_domain() {
    echo -e "${BLUE}🌐 Domain configuration${NC}"
    
    read -p "Do you want to configure a custom domain? (y/N): " configure_custom_domain
    
    if [[ $configure_custom_domain =~ ^[Yy]$ ]]; then
        read -p "Enter your custom domain (e.g., app.sakina.com): " custom_domain
        
        if [ -n "$custom_domain" ]; then
            cd apps/web
            vercel domains add "$custom_domain"
            cd ../..
            
            echo -e "${GREEN}✅ Custom domain configured: $custom_domain${NC}"
            echo -e "${BLUE}📋 Don't forget to update your DNS settings:${NC}"
            echo "Type: CNAME"
            echo "Name: $(echo $custom_domain | cut -d'.' -f1)"
            echo "Value: cname.vercel-dns.com"
        fi
    fi
}

# Main deployment function
main() {
    echo -e "${GREEN}🌙 Sakina App - Vercel Deployment${NC}"
    echo -e "${BLUE}Islamic-inspired anxiety relief app${NC}"
    echo ""
    
    check_vercel_cli
    check_vercel_auth
    check_env_vars
    build_app
    deploy_to_vercel
    get_deployment_url
    configure_domain
    
    echo ""
    echo -e "${GREEN}🎉 Web app deployment completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo "1. Test your web app at the deployment URL"
    echo "2. Configure analytics and monitoring"
    echo "3. Set up custom domain DNS if configured"
    echo "4. Deploy mobile apps to app stores"
    echo ""
    echo -e "${GREEN}May Allah bless your efforts! 🤲${NC}"
}

# Run main function
main "$@"
