FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist/frontend ./dist/frontend
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
ENV PORT=4000

CMD ["node", "dist/frontend/server/server.mjs"]
