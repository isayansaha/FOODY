# 🚀 Free Cloud Deployment Guide

This guide covers how to deploy the entire Foody Platform (4 Frontends, 1 Backend, Postgres, and Redis) across the free tiers of Vercel, Render, Supabase, and Upstash.

## Prerequisites
- A GitHub Account
- The entire `FOODY` folder must be pushed to a single GitHub Repository.

---

## 1. Deploy Databases (Free)

### 🐘 PostgreSQL (Supabase)
1. Go to [Supabase](https://supabase.com/) and sign up.
2. Create a new Project.
3. In your project dashboard, go to **Settings > Database** and copy the **Connection string (URI)**.
   - It will look like: `postgresql://postgres.[ref]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

### ⚡ Redis (Upstash)
1. Go to [Upstash](https://upstash.com/) and sign up.
2. Create a new Redis Database.
3. Copy the **Endpoint** and **Port**.

---

## 2. Deploy Backend (Back4App Containers - Free & No Card Required)

Because most cloud providers now require credit cards or force paid add-ons, we will use **Back4App Containers** which allows you to deploy Dockerized Node.js applications completely free.

1. Go to [Back4App Containers](https://www.back4app.com/containers) and sign up using your GitHub account.
2. Click **New App**.
3. Select your Foody GitHub repository.
4. **Configuration:**
   - **Name**: `foody-backend`
   - **Branch**: `main`
   - **Auto-Deploy**: Enabled
   - *Note: Leave all directory/Dockerfile settings completely blank/default. Back4App will automatically find the Dockerfile at the root of the repository!*
5. **Environment Variables** (Add these before deploying):
   - `DATABASE_URL` = (Paste Supabase URI)
   - `REDIS_HOST` = (Paste Upstash Endpoint)
   - `REDIS_PORT` = (Paste Upstash Port)
   - `JWT_SECRET` = (Any random secret string, e.g., `supersecretjwtkey123`)
6. Click **Deploy**.

*Once deployed and marked as "Healthy", copy the live URL (e.g., `https://foody-backend-xyz.b4a.run`). You will need this URL when deploying the frontends on Vercel.*

---

## 3. Seed Production Database

Before deploying the frontends, you must seed your live Supabase database with the test users.

1. In your local terminal, temporarily change `DATABASE_URL` in `apps/backend/.env` to your Supabase URI.
2. Push the schema to the live database:
   ```bash
   npm run db:push --workspace=apps/backend
   ```
3. Run the raw SQL seed script to populate the tables:
   ```bash
   npm run seed --workspace=apps/backend
   ```

---

## 4. Deploy Frontends (Vercel - Free Tier)

You will deploy each frontend as a separate Vercel project pointing to the same GitHub repository.

1. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Select your Foody repository.

### For the Customer App:
- **Project Name**: `foody-customer`
- **Root Directory**: `apps/customer-app`
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL` = `https://foody-backend.onrender.com/api/v1` (Replace with your Render URL)
- Click **Deploy**.

### For the Restaurant App:
- Repeat the exact same steps, but set **Root Directory** to `apps/restaurant-app`.

### For the Delivery App:
- Repeat the exact same steps, but set **Root Directory** to `apps/delivery-app`.

### For the Admin App:
- Repeat the exact same steps, but set **Root Directory** to `apps/admin-app`.

---

## 🎉 Done!
Your entire micro-frontend monorepo is now live, entirely on free cloud tiers. You can log into any of the Vercel URLs using the seeded test accounts (e.g., `customer@foody.com` / `password123`).
