# ---------- Stage 1: Deps ----------
FROM oven/bun:1.1.6-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---------- Stage 2: Run ----------
FROM oven/bun:1.3.6-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run gen:prisma

CMD bun run start
