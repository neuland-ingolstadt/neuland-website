FROM oven/bun:1 as builder
WORKDIR /app

# Define build argument for Aptabase key
ARG VITE_APTABASE_KEY
# Make it available as an environment variable during build
ENV VITE_APTABASE_KEY=${VITE_APTABASE_KEY}

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM node:23-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN npm i -g serve

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
