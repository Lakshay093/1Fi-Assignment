-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.8,
    "reviewCount" INTEGER NOT NULL DEFAULT 124,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "mrp" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "sku" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmiPlan" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "tenureMonths" INTEGER NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "cashbackAmount" INTEGER NOT NULL DEFAULT 0,
    "isZeroInterest" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmiPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "variantTitle" TEXT NOT NULL,
    "tenureMonths" INTEGER NOT NULL,
    "monthlyAmount" INTEGER NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Variant_sku_key" ON "Variant"("sku");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EmiPlan" ADD CONSTRAINT "EmiPlan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
