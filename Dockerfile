# syntax=docker/dockerfile:1@sha256:ecfaec9ed6d810b56388c508f4121597bfbba70d41a6dfeee4d8cad5f295fc32

ARG BUN_VERSION
FROM oven/bun:${BUN_VERSION}-alpine AS deps
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

FROM node:24.20.0-alpine@sha256:e67514e5d0f6c46656005e1b693b2ec9d52e80b641307de684d4a015ba7a4eaf AS builder
WORKDIR /app

ARG VITE_APTABASE_KEY
ARG API_URL
ARG COMMIT_HASH
ENV VITE_APTABASE_KEY=${VITE_APTABASE_KEY}
ENV API_URL=${API_URL}
ENV VITE_COMMIT_HASH=${COMMIT_HASH}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx contentlayer2 build
RUN npm run build

FROM node:24.20.0-alpine@sha256:e67514e5d0f6c46656005e1b693b2ec9d52e80b641307de684d4a015ba7a4eaf AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack

COPY --from=builder --chown=tanstack:nodejs /app/.output ./.output
COPY --from=builder --chown=tanstack:nodejs /app/public ./public

USER tanstack

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", ".output/server/index.mjs"]
