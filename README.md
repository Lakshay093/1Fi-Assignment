# 1Fi SDE1 Assignment — 1Fi Marketplace & Shop Platform

A full-stack marketplace application built for the **1Fi SDE1 Intern Assignment**. It recreates the core 1Fi Shop experience with a dynamic product catalogue, product variants, EMI calculations, checkout flow, REST APIs, Prisma ORM, and PostgreSQL-backed persistence.

## 🌐 Live Demo

**Production:** https://onefi-assignment-kvc2.onrender.com/

**Example product:** https://onefi-assignment-kvc2.onrender.com/products/iphone-17-pro

---

## ✨ Features

- **1Fi Marketplace UI** with responsive product browsing and product detail pages.
- **Dynamic product data** loaded from the database through REST APIs — product and EMI information is not hardcoded into the UI.
- **Product variants** with storage, colour, pricing, MRP, stock state, SKU and images.
- **EMI calculator** supporting multiple tenures, including no-cost EMI plans and cashback offers.
- **Mutual-fund-backed EMI checkout simulation** with customer details and order submission.
- **Order API** with server-side validation and persistence.
- **PostgreSQL + Prisma ORM** for relational data and production deployment.
- **Health-check endpoint** at `/api/health` for deployment/runtime monitoring.
- **Production security headers** including CSP, HSTS, frame protection, content-type protection and permissions policy.
- **Render-ready deployment** using `render.yaml` and a production PostgreSQL database.
- **TypeScript + Next.js App Router** for a strongly typed full-stack application.

### Shop Sections

1. **Top Brands** — placeholder section as permitted by the assignment.
2. **Nearby Stores** — placeholder section as permitted by the assignment.
3. **1Fi Marketplace** — fully implemented marketplace experience.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| UI / Animation | Lucide React, Framer Motion |
| Backend | Next.js Route Handlers |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Server-side request validation |
| Deployment | Render |
| Runtime | Node.js 22 |

---

## 📁 Project Structure

```text
1Fi-Assignment/
├── app/
│   ├── api/
│   │   ├── health/
│   │   ├── orders/
│   │   └── products/
│   ├── products/
│   │   └── [slug]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CheckoutModal.tsx
│   ├── EmiCalculator.tsx
│   └── ProductCard.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── render.yaml
├── package.json
└── README.md
```

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Lakshay093/1Fi-Assignment.git
cd 1Fi-Assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

For local PostgreSQL, use your local connection string. For Render, use the PostgreSQL connection string provided by Render.

**Never commit `.env` or database credentials to GitHub.**

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Apply database migrations

For an existing migration history:

```bash
npx prisma migrate deploy
```

For local development where you intentionally want Prisma to synchronize the schema without creating migrations:

```bash
npx prisma db push
```

### 6. Seed sample products

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3005/products/iphone-17-pro
```

---

## 🗄️ Database

The production application uses **PostgreSQL** with Prisma ORM.

The main relational models are:

- `Product` — product catalogue information.
- `Variant` — storage, colour, price, MRP, SKU and stock information.
- `EmiPlan` — tenure, interest rate, cashback and popularity information.
- `Order` — submitted EMI applications and customer/order information.

### Prisma datasource

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The database URL is supplied through the `DATABASE_URL` environment variable rather than being committed to source control.

---

## 📡 API Documentation

### `GET /api/products`

Returns the available products with their variants and EMI plans.

```bash
curl http://localhost:3005/api/products
```

Example response shape:

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "uuid",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "variants": [],
      "emiPlans": []
    }
  ]
}
```

### `GET /api/products/:slug`

Returns one product by its unique slug.

```bash
curl http://localhost:3005/api/products/iphone-17-pro
```

### `POST /api/orders`

Creates an EMI order/application after server-side validation.

```bash
curl -X POST http://localhost:3005/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "iPhone 17 Pro",
    "variantTitle": "256GB (Desert Titanium)",
    "tenureMonths": 12,
    "monthlyAmount": 11242,
    "interestRate": 0,
    "totalAmount": 134904,
    "customerName": "Demo User",
    "customerEmail": "demo@example.com"
  }'
```

Example response shape:

```json
{
  "success": true,
  "message": "Mutual-fund backed EMI application approved successfully!",
  "data": {
    "id": "uuid",
    "productName": "iPhone 17 Pro",
    "status": "MUTUAL_FUND_PLEDGE_APPROVED",
    "createdAt": "2026-09-06T12:00:00.000Z"
  }
}
```

### `GET /api/health`

Used by Render to verify that the application is running and can reach PostgreSQL.

```bash
curl http://localhost:3005/api/health
```

Healthy response:

```json
{
  "status": "ok",
  "database": "ok"
}
```

---

## 🔐 Security & Production Hardening

The application has been prepared for production deployment with several security and reliability improvements:

- PostgreSQL is used instead of a local SQLite production database.
- `DATABASE_URL` is supplied through environment variables.
- Prisma Client is generated during dependency installation.
- Production database changes use Prisma migrations rather than relying on a local database file.
- API request data is validated server-side.
- Security-related HTTP headers are configured, including Content Security Policy, HSTS, `X-Frame-Options`, `X-Content-Type-Options` and `Permissions-Policy`.
- Local database files and environment files are excluded from version control.
- Production health checks verify database connectivity.
- The API avoids exposing unnecessary internal database details in successful responses.

> This project is an assignment/demo application. The mutual-fund pledge and EMI flow is a **simulation** and does not perform real financial transactions or actual mutual-fund pledging.

---

## ☁️ Render Deployment

The repository includes a `render.yaml` Blueprint configuration.

### Recommended deployment flow

1. Create a **PostgreSQL** database on Render.
2. Create a **Web Service** from this GitHub repository.
3. Set the `DATABASE_URL` environment variable to the Render PostgreSQL connection string.
4. Set `NODE_ENV=production`.
5. Deploy the `main` branch.
6. Render builds the Next.js application and starts it with `npm start`.
7. Render uses `/api/health` as the health-check endpoint.

### Build command

```bash
npm ci && npx prisma generate && npx prisma db push --accept-data-loss && npm run db:seed && npm run build
```

### Start command

```bash
npm start
```

### Required environment variables

```env
NODE_ENV=production
DATABASE_URL=<your Render PostgreSQL connection string>
```

**Important:** `DATABASE_URL` must begin with either:

```text
postgresql://
```

or

```text
postgres://
```

Do not use a SQLite URL such as `file:./dev.db` in production.

---

## 🧪 Useful Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Generate Prisma Client
npm run db:generate

# Deploy existing Prisma migrations
npm run db:deploy

# Seed sample data
npm run db:seed

# Inspect the database locally
npm run db:studio
```

---

## 📌 Assignment Notes

This implementation focuses on the core requirements of the 1Fi SDE1 assignment:

- Marketplace UI based on the provided 1Fi design/reference.
- Dynamic product and EMI data.
- Variant selection and price updates.
- EMI calculation across multiple tenures.
- Cashback presentation.
- Checkout/application flow.
- REST API integration.
- Persistent relational database storage.
- Production deployment on Render.

The **Top Brands** and **Nearby Stores** sections remain placeholders because the assignment did not require their implementation.

---

## 👨‍💻 Author

**Lakshay Dhiman**

GitHub: https://github.com/Lakshay093

Repository: https://github.com/Lakshay093/1Fi-Assignment
