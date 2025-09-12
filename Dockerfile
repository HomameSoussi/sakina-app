# Multi-stage Dockerfile for Sakina monorepo

# Base stage with Node.js and pnpm
FROM node:20-alpine AS base
RUN npm install -g pnpm@8
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/*/
COPY apps/*/package.json ./apps/*/
RUN pnpm install --frozen-lockfile

# Build stage for packages
FROM base AS build-packages
COPY --from=deps /app/node_modules ./node_modules
COPY packages ./packages
COPY tsconfig.json ./
COPY pnpm-workspace.yaml ./
RUN pnpm build:packages

# Build stage for web app
FROM base AS build-web
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build-packages /app/packages ./packages
COPY apps/web ./apps/web
COPY tsconfig.json ./
COPY pnpm-workspace.yaml ./

# Build arguments for environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_STRIPE_PUBLISHABLE_KEY

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

RUN pnpm build:web

# Production stage for web app
FROM nginx:alpine AS web-production
COPY --from=build-web /app/apps/web/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Development stage
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000 5173 8081
CMD ["pnpm", "dev"]

# Test stage
FROM base AS test
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm test

# Production stage for Supabase functions
FROM denoland/deno:alpine AS supabase-functions
WORKDIR /app
COPY supabase/functions ./functions
EXPOSE 54321
CMD ["deno", "run", "--allow-all", "functions/serve.ts"]
