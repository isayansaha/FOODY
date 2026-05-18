# Food Delivery Ecosystem 🍔🚀

A production-grade, highly scalable food delivery platform inspired by industry leaders like Swiggy, Uber Eats, and DoorDash.

## 🏗 Architecture

This project is built using a **Modular Monolith** architecture within a **Turborepo** monorepo, designed to scale gracefully into microservices.

### Tech Stack:

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Caching & Real-time:** Redis
- **Search:** Elasticsearch
- **DevOps:** Docker, Husky, GitHub Actions

## 📦 Project Structure

```
├── apps/
│   ├── customer-app/     # Next.js web application
│   ├── restaurant-app/   # Next.js dashboard
│   ├── delivery-app/     # Next.js PWA
│   ├── admin-app/        # Next.js dashboard
│   └── backend/          # NestJS Server
├── packages/
│   ├── ui/               # Shared React components
│   ├── config-eslint/    # Shared linting config
│   └── config-typescript/# Shared TS config
└── docker-compose.yml    # PG, Redis, Elasticsearch
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the infrastructure (DB, Redis, ES): `docker-compose up -d`
4. Run the development server: `npm run dev`

_(More instructions to be added as features are developed.)_
