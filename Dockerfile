FROM oven/bun:latest AS deps
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile 

FROM node:23-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_APTABASE_KEY
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APTABASE_KEY=${NEXT_PUBLIC_APTABASE_KEY}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_SHARP_PATH=/app/node_modules/sharp
ENV NEXT_TELEMETRY_DISABLED=1
RUN realpath . 

RUN npm run build

FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js", "--hostname", "0.0.0.0"]