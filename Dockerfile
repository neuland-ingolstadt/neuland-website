FROM oven/bun:1 AS builder
WORKDIR /app

ARG VITE_APTABASE_KEY
ARG VITE_API_URL
ENV VITE_APTABASE_KEY=${VITE_APTABASE_KEY}
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run prebuild

RUN bun run build

FROM node:23-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN npm i -g serve

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
