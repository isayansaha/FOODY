# 🍔 Foody: Enterprise Monorepo Architecture

Foody is a highly scalable, production-ready food delivery platform built with a micro-frontend monorepo architecture. 

It uses **Turborepo** to manage shared packages and independently deployable Next.js frontends, communicating with a central **NestJS** backend.

---

## 🏗️ Architecture & Ports

The ecosystem consists of the following microservices:

| Service | Technology | Port | URL |
|---------|------------|------|-----|
| **Customer App** | Next.js (React) | 3000 | `http://localhost:3000` |
| **Backend API** | NestJS (Node) | 3001 | `http://localhost:3001` |
| **Restaurant App** | Next.js (React) | 3002 | `http://localhost:3002` |
| **Delivery App** | Next.js (React) | 3003 | `http://localhost:3003` |
| **Admin App** | Next.js (React) | 3004 | `http://localhost:3004` |
| **API Docs** | Swagger / OpenAPI | 3001 | `http://localhost:3001/api/docs` |
| **Database** | PostgreSQL | 5432 | `localhost:5432` |
| **Cache/Rate Limits** | Redis | 6379 | `localhost:6379` |

---

## 🔑 Test Credentials

The database is seeded with the following accounts. The password for **all** accounts is `password123`.

*   **Customer:** `customer@foody.com` (Use at `localhost:3000`)
*   **Restaurant Owner:** `owner@foody.com` (Use at `localhost:3002`)
*   **Delivery Partner:** `driver@foody.com` (Use at `localhost:3003`)
*   **System Admin:** `admin@foody.com` (Use at `localhost:3004`)

---

## 🚀 How to Run (The Easy Way - Docker)

Because this is a production-grade application, the entire ecosystem (including Postgres and Redis) is containerized. This is the recommended way to run the app.

1. Ensure **Docker Desktop** is running.
2. Open a terminal at the root of the project.
3. Run the following command:
```bash
docker compose up --build
```
This single command will orchestrate the database, cache, backend, and all 4 frontends simultaneously. 

---

## 💻 How to Run (Local Development Mode)

If you want to edit code and see Hot Module Replacement (HMR), run it locally using Turborepo.

### Prerequisites:
You **must** have PostgreSQL and Redis running locally on your machine on their default ports (5432 and 6379).
If you don't have them installed, run them via docker first:
```bash
docker compose up postgres redis -d
```

### Steps:
1. Install all dependencies across the monorepo:
```bash
npm install
```

2. **Initialize Database Schema:**
   Because we use Prisma, you must push the schema to your fresh database to create the tables.
```bash
npm run db:push --workspace=apps/backend
```

3. **Seed the Database:**
   We use a highly robust, raw SQL seeding script to ensure it works across all TypeScript/Prisma versions without compilation errors.
```bash
npm run seed --workspace=apps/backend
```

4. **Start the Monorepo:**
   Start all 5 microservices simultaneously using Turborepo.
```bash
npm run dev
```

> [!WARNING]
> **Troubleshooting Login/Fetching Errors:**
> If you ever try logging in and the frontend says "Failed to fetch", it means either the backend crashed, or the database is completely empty (meaning you forgot to run Steps 2 and 3 above). Make sure the seed script successfully prints "Seeding finished successfully!" before attempting to log in.

---

## 📦 Shared Packages (Monorepo Best Practices)

To demonstrate enterprise engineering, core logic is extracted into the `packages/` directory instead of duplicated across apps.

*   `@foody/shared-types`: Centralized TypeScript interfaces (`Order`, `User`, `Restaurant`) shared between the backend and all frontends.
*   `@foody/ts-config`: Centralized strict compiler rules.
*   `@foody/eslint-config`: Centralized code quality rules.

If you edit anything in `packages/shared-types`, Turborepo will automatically detect the dependency and rebuild it for the frontends.
