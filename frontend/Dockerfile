# ---------- Stage 1: Build ----------
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY ./ ./

RUN bun run build

# ---------- Stage 2: Run ----------
FROM oven/bun:latest

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["bun", "run", "start"]
