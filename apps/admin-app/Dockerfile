FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/admin-app/package*.json ./apps/admin-app/
RUN npm install
COPY . .
RUN npm run build --workspace=apps/admin-app

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/admin-app ./apps/admin-app
EXPOSE 3004
CMD ["npm", "run", "start", "--workspace=apps/admin-app"]
