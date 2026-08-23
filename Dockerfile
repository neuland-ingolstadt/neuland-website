# syntax=docker/dockerfile:1@sha256:ecfaec9ed6d810b56388c508f4121597bfbba70d41a6dfeee4d8cad5f295fc32

ARG BUN_VERSION
FROM oven/bun:${BUN_VERSION}-alpine AS deps
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

FROM node:24.19.0-alpine@sha256:d32cdf619f63fe0471182d08996dd516c6275bb5fd31ae06e55a570bd9e1ad43 AS builder
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

FROM node:24.19.0-alpine@sha256:d32cdf619f63fe0471182d08996dd516c6275bb5fd31ae06e55a570bd9e1ad43 AS runner
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
