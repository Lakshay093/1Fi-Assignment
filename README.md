# 1Fi SDE1 Assignment — 1Fi Marketplace & Shop Platform

A dynamic full-stack web application built for the **1Fi SDE Intern Assignment**.

The application implements the **1Fi Shop Page** with 3 section tabs matching the official 1Fi App UI guidelines:
1. **Top Brands** — *No implementation required (blank placeholder)*
2. **Nearby Stores** — *No implementation required (blank placeholder)*
3. **1Fi Marketplace** — **Fully designed and implemented** with dynamic database products, Mutual Fund backed EMI calculators, variant swatches, checkout modal, and REST APIs.

---

## 🌟 Key Features

1. **Dynamic Database & API Architecture**:
   - Zero hardcoded product/EMI data on the frontend.
   - Dynamic product detail fetching via slug `/products/[slug]`.
   - SQLite relational database powered by Prisma ORM.

2. **Pixel-Perfect 1Fi EMI Calculator UI**:
   - Exact implementation of reference image design specifications.
   - Dynamic price calculation upon switching product variants (storage options, color finishes).
   - Instant calculation of 0% No-Cost EMI & low-interest long tenure plans (3, 6, 12, 24, 36, 48, 60 months).
   - Highlighting cashback rewards (e.g. *Additional cashback of ₹7,500*).

3. **Interactive Mutual Fund Lien Pledge Checkout**:
   - Complete checkout modal simulating digital Mutual Fund folio pledge verification.
   - Real-time order creation endpoint `POST /api/orders`.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend API**: Next.js Route Handlers (`/api/products`, `/api/products/[slug]`, `/api/orders`)
- **Database**: SQLite with Prisma ORM
- **Seed Script**: TypeScript executable seed script (`prisma/seed.ts`)

---

## 🚀 Quick Setup & Run Instructions

### Option 1: One-Click Run (Windows Batch File)
1. Install dependencies (`npm install`)
2. Push database schema & seed products (`npx prisma db push && npx tsx prisma/seed.ts`)
3. Launch local dev server and open `http://localhost:3005/products/iphone-17-pro` in your browser.

---

### Option 2: Manual Terminal Commands

#### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd "1Fi Assignment"
npm install
```

#### 2. Initialize Database & Seed Sample Data
```bash
# Push Prisma schema to SQLite database & seed
npm run setup
```


---

## 📊 Database Schema (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String    @id @default(uuid())
  slug        String    @unique
  name        String
  brand       String
  subtitle    String?
  description String
  rating      Float     @default(4.8)
  reviewCount Int       @default(124)
  isNew       Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  variants    Variant[]
  emiPlans    EmiPlan[]
}

model Variant {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  title     String
  color     String
  colorHex  String
  storage   String
  price     Int
  mrp       Int
  image     String
  inStock   Boolean  @default(true)
  sku       String   @unique
  createdAt DateTime @default(now())
}

model EmiPlan {
  id             String   @id @default(uuid())
  productId      String
  product        Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  tenureMonths   Int
  interestRate   Float
  cashbackAmount Int      @default(0)
  isZeroInterest Boolean  @default(false)
  isPopular      Boolean  @default(false)
  createdAt      DateTime @default(now())
}

model Order {
  id            String   @id @default(uuid())
  productName   String
  variantTitle  String
  tenureMonths  Int
  monthlyAmount Int
  interestRate  Float
  totalAmount   Int
  customerName  String
  customerEmail String
  status        String   @default("APPROVED")
  createdAt     DateTime @default(now())
}
```

---

## 📡 API Endpoints & Example Responses

### 1. Get All Products
`GET /api/products`

**Sample Curl**:
```bash
curl -X GET http://localhost:3005/api/products
```

**Example JSON Response**:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "c1f7a2d4-8e12-4b5c-9123-[#6b38c2]",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "subtitle": "Available in 3 finishes",
      "description": "The ultimate iPhone with titanium design, A19 Pro chip...",
      "rating": 4.9,
      "reviewCount": 248,
      "isNew": true,
      "variants": [
        {
          "id": "var-1",
          "title": "256GB",
          "color": "Desert Titanium",
          "colorHex": "#C5A087",
          "storage": "256GB",
          "price": 127400,
          "mrp": 134900,
          "image": "https://images.unsplash.com/...",
          "inStock": true,
          "sku": "IP17P-256-DESERT"
        }
      ],
      "emiPlans": [
        {
          "id": "emi-1",
          "tenureMonths": 3,
          "interestRate": 0.0,
          "cashbackAmount": 7500,
          "isZeroInterest": true,
          "isPopular": false
        },
        {
          "id": "emi-3",
          "tenureMonths": 12,
          "interestRate": 0.0,
          "cashbackAmount": 7500,
          "isZeroInterest": true,
          "isPopular": true
        }
      ]
    }
  ]
}
```

### 2. Get Product by Slug
`GET /api/products/:slug`

**Sample Curl**:
```bash
curl -X GET http://localhost:3005/api/products/iphone-17-pro
```

**Example JSON Response**:
```json
{
  "success": true,
  "data": {
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "variants": [...],
    "emiPlans": [...]
  }
}
```

### 3. Submit EMI Order Application
`POST /api/orders`

**Sample Curl**:
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
    "customerName": "Lakshay Sharma",
    "customerEmail": "lakshay@example.com"
  }'
```

**Example JSON Response**:
```json
{
  "success": true,
  "message": "Mutual-fund backed EMI application approved successfully!",
  "data": {
    "id": "order-98234-uuid",
    "productName": "iPhone 17 Pro",
    "status": "MUTUAL_FUND_PLEDGE_APPROVED",
    "createdAt": "2026-09-03T19:00:00.000Z"
  }
}
```

---

## 🌐 Deployment

This repository is pre-configured for instant deployment on **Vercel** or **Render**.

```bash
npm run build
npm start
```
