FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/restaurant-app/package*.json ./apps/restaurant-app/
RUN npm install
COPY . .
RUN npm run build --workspace=apps/restaurant-app

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/restaurant-app ./apps/restaurant-app
EXPOSE 3002
CMD ["npm", "run", "start", "--workspace=apps/restaurant-app"]
