FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY ./ ./

RUN bun run gen:prisma

CMD ["bun", "run", "start"]
