FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/customer-app/package*.json ./apps/customer-app/
RUN npm install
COPY . .
RUN npm run build --workspace=apps/customer-app

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/customer-app ./apps/customer-app
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=apps/customer-app"]
