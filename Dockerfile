FROM oven/bun:1 as builder
WORKDIR /app

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
