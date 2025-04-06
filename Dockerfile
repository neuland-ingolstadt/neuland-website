FROM oven/bun:1 AS builder
WORKDIR /app

ARG NEXT_PUBLIC_APTABASE_KEY
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APTABASE_KEY=${NEXT_PUBLIC_APTABASE_KEY}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

# Build the Next.js application
RUN bun run build

# Use Node.js for the production environment (Next.js works well with Node.js)
FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js server
CMD ["node", "server.js"]
