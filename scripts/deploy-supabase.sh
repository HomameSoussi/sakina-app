#!/bin/bash

# Sakina App - Supabase Deployment Script
# This script sets up the Supabase backend for the Sakina app

set -e

echo "🚀 Deploying Sakina App to Supabase..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if required environment variables are set
check_env_vars() {
    echo -e "${BLUE}📋 Checking environment variables...${NC}"
    
    if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
        echo -e "${RED}❌ SUPABASE_ACCESS_TOKEN is not set${NC}"
        echo "Please set your Supabase access token:"
        echo "export SUPABASE_ACCESS_TOKEN=your_token_here"
        exit 1
    fi
    
    if [ -z "$SUPABASE_PROJECT_ID" ]; then
        echo -e "${YELLOW}⚠️  SUPABASE_PROJECT_ID is not set${NC}"
        echo "This will be set after creating the project"
    fi
    
    echo -e "${GREEN}✅ Environment variables checked${NC}"
}

# Create Supabase project
create_project() {
    echo -e "${BLUE}🏗️  Creating Supabase project...${NC}"
    
    # First confirm the cost (free tier)
    COST_ID=$(manus-mcp-cli tool call confirm_cost --server supabase --input '{
        "type": "project",
        "recurrence": "monthly", 
        "amount": 0
    }' | jq -r '.')
    
    echo "Cost confirmation ID: $COST_ID"
    
    # Create the project
    PROJECT_RESULT=$(manus-mcp-cli tool call create_project --server supabase --input "{
        \"name\": \"sakina-app\",
        \"organization_id\": \"\",
        \"region\": \"us-east-1\",
        \"confirm_cost_id\": \"$COST_ID\"
    }")
    
    echo "Project creation result: $PROJECT_RESULT"
    
    # Extract project ID from result
    PROJECT_ID=$(echo $PROJECT_RESULT | jq -r '.id // .project_ref // .ref')
    
    if [ "$PROJECT_ID" != "null" ] && [ -n "$PROJECT_ID" ]; then
        echo -e "${GREEN}✅ Project created successfully: $PROJECT_ID${NC}"
        export SUPABASE_PROJECT_ID=$PROJECT_ID
        
        # Save to .env file
        echo "SUPABASE_PROJECT_ID=$PROJECT_ID" >> .env.local
        echo -e "${GREEN}✅ Project ID saved to .env.local${NC}"
    else
        echo -e "${RED}❌ Failed to create project${NC}"
        echo "Result: $PROJECT_RESULT"
        exit 1
    fi
}

# Get project credentials
get_credentials() {
    echo -e "${BLUE}🔑 Getting project credentials...${NC}"
    
    # Get project URL
    PROJECT_URL=$(manus-mcp-cli tool call get_project_url --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\"
    }" | jq -r '.')
    
    # Get anonymous key
    ANON_KEY=$(manus-mcp-cli tool call get_anon_key --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\"
    }" | jq -r '.')
    
    echo -e "${GREEN}✅ Project URL: $PROJECT_URL${NC}"
    echo -e "${GREEN}✅ Anonymous Key: ${ANON_KEY:0:20}...${NC}"
    
    # Save to .env file
    {
        echo "VITE_SUPABASE_URL=$PROJECT_URL"
        echo "VITE_SUPABASE_ANON_KEY=$ANON_KEY"
        echo "SUPABASE_URL=$PROJECT_URL"
        echo "SUPABASE_ANON_KEY=$ANON_KEY"
    } >> .env.local
    
    echo -e "${GREEN}✅ Credentials saved to .env.local${NC}"
}

# Deploy database schema
deploy_schema() {
    echo -e "${BLUE}🗄️  Deploying database schema...${NC}"
    
    # Execute initial schema migration
    manus-mcp-cli tool call execute_sql --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"query\": \"$(cat supabase/migrations/20240101000000_initial_schema.sql | sed 's/"/\\"/g' | tr '\n' ' ')\"
    }"
    
    echo -e "${GREEN}✅ Initial schema deployed${NC}"
    
    # Execute RLS policies
    manus-mcp-cli tool call execute_sql --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"query\": \"$(cat supabase/migrations/20240101000001_rls_policies.sql | sed 's/"/\\"/g' | tr '\n' ' ')\"
    }"
    
    echo -e "${GREEN}✅ RLS policies deployed${NC}"
    
    # Execute API integrations schema
    manus-mcp-cli tool call execute_sql --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"query\": \"$(cat supabase/migrations/20240101000002_api_integrations.sql | sed 's/"/\\"/g' | tr '\n' ' ')\"
    }"
    
    echo -e "${GREEN}✅ API integrations schema deployed${NC}"
}

# Seed database with initial data
seed_database() {
    echo -e "${BLUE}🌱 Seeding database with initial data...${NC}"
    
    # Execute initial content seed
    manus-mcp-cli tool call execute_sql --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"query\": \"$(cat supabase/seed/01_initial_content.sql | sed 's/"/\\"/g' | tr '\n' ' ')\"
    }"
    
    echo -e "${GREEN}✅ Initial content seeded${NC}"
    
    # Execute anxiety content seed
    manus-mcp-cli tool call execute_sql --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"query\": \"$(cat supabase/seed/02_anxiety_content.sql | sed 's/"/\\"/g' | tr '\n' ' ')\"
    }"
    
    echo -e "${GREEN}✅ Anxiety content seeded${NC}"
}

# Deploy Edge Functions
deploy_functions() {
    echo -e "${BLUE}⚡ Deploying Edge Functions...${NC}"
    
    # Deploy prayer-times function
    manus-mcp-cli tool call deploy_edge_function --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"name\": \"prayer-times\",
        \"files\": [{
            \"path\": \"index.ts\",
            \"content\": \"$(cat supabase/functions/prayer-times/index.ts | sed 's/"/\\"/g' | tr '\n' ' ')\"
        }]
    }"
    
    echo -e "${GREEN}✅ Prayer times function deployed${NC}"
    
    # Deploy quran-verse function
    manus-mcp-cli tool call deploy_edge_function --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"name\": \"quran-verse\",
        \"files\": [{
            \"path\": \"index.ts\",
            \"content\": \"$(cat supabase/functions/quran-verse/index.ts | sed 's/"/\\"/g' | tr '\n' ' ')\"
        }]
    }"
    
    echo -e "${GREEN}✅ Quran verse function deployed${NC}"
    
    # Deploy stripe-webhook function
    manus-mcp-cli tool call deploy_edge_function --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\",
        \"name\": \"stripe-webhook\",
        \"files\": [{
            \"path\": \"index.ts\",
            \"content\": \"$(cat supabase/functions/stripe-webhook/index.ts | sed 's/"/\\"/g' | tr '\n' ' ')\"
        }]
    }"
    
    echo -e "${GREEN}✅ Stripe webhook function deployed${NC}"
}

# Generate TypeScript types
generate_types() {
    echo -e "${BLUE}📝 Generating TypeScript types...${NC}"
    
    manus-mcp-cli tool call generate_typescript_types --server supabase --input "{
        \"project_id\": \"$SUPABASE_PROJECT_ID\"
    }" > packages/types/src/supabase.ts
    
    echo -e "${GREEN}✅ TypeScript types generated${NC}"
}

# Main deployment function
main() {
    echo -e "${GREEN}🌙 Sakina App - Supabase Deployment${NC}"
    echo -e "${BLUE}Islamic-inspired anxiety relief app${NC}"
    echo ""
    
    # Create .env.local if it doesn't exist
    touch .env.local
    
    check_env_vars
    
    if [ -z "$SUPABASE_PROJECT_ID" ]; then
        create_project
    else
        echo -e "${YELLOW}📋 Using existing project: $SUPABASE_PROJECT_ID${NC}"
    fi
    
    get_credentials
    deploy_schema
    seed_database
    deploy_functions
    generate_types
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo "1. Update your .env.local file with additional API keys (Stripe, etc.)"
    echo "2. Deploy the web app to Vercel: pnpm web:deploy"
    echo "3. Build the mobile app: pnpm mobile:build:ios or pnpm mobile:build:android"
    echo ""
    echo -e "${BLUE}🔗 Project URL: $PROJECT_URL${NC}"
    echo -e "${BLUE}📱 Dashboard: https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID${NC}"
    echo ""
    echo -e "${GREEN}May Allah grant you success! 🤲${NC}"
}

# Run main function
main "$@"
