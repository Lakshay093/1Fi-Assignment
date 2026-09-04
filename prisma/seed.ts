import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with 1Fi products & mutual-fund backed EMI plans...');

  // Product catalogue data is safe to refresh. Orders are deliberately retained.
  // Variant and EMI-plan rows are removed through the Product relations' cascade.
  await prisma.product.deleteMany();

  // 1. iPhone 17 Pro
  const iphone = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      subtitle: 'Available in 3 finishes',
      description: 'The ultimate iPhone with titanium design, A19 Pro chip, and revolutionary mutual-fund backed flexible EMI plans.',
      rating: 4.9,
      reviewCount: 248,
      isNew: true,
      variants: {
        create: [
          {
            sku: 'IP17P-256-DESERT',
            title: '256GB',
            color: 'Desert Titanium',
            colorHex: '#C5A087',
            storage: '256GB',
            price: 127400,
            mrp: 134900,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
          {
            sku: 'IP17P-512-NATURAL',
            title: '512GB',
            color: 'Natural Titanium',
            colorHex: '#8E867B',
            storage: '512GB',
            price: 147400,
            mrp: 154900,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
          {
            sku: 'IP17P-1TB-BLACK',
            title: '1TB',
            color: 'Black Titanium',
            colorHex: '#2C2B29',
            storage: '1TB',
            price: 167400,
            mrp: 174900,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, isPopular: false },
          { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, isPopular: false },
          { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, isPopular: true },
          { tenureMonths: 24, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, isPopular: false },
          { tenureMonths: 36, interestRate: 10.5, cashbackAmount: 7500, isZeroInterest: false, isPopular: false },
          { tenureMonths: 48, interestRate: 10.5, cashbackAmount: 7500, isZeroInterest: false, isPopular: false },
          { tenureMonths: 60, interestRate: 10.5, cashbackAmount: 7500, isZeroInterest: false, isPopular: false },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      subtitle: 'Titanium Armor & Galaxy AI',
      description: 'Galaxy AI is here. Epic camera with 200MP sensor, built-in S Pen, and long-lasting battery life.',
      rating: 4.8,
      reviewCount: 186,
      isNew: true,
      variants: {
        create: [
          {
            sku: 'S24U-256-GREY',
            title: '256GB',
            color: 'Titanium Grey',
            colorHex: '#64676D',
            storage: '256GB',
            price: 119999,
            mrp: 129999,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
          {
            sku: 'S24U-512-BLACK',
            title: '512GB',
            color: 'Titanium Black',
            colorHex: '#1E1E20',
            storage: '512GB',
            price: 139999,
            mrp: 149999,
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
          {
            sku: 'S24U-1TB-VIOLET',
            title: '1TB',
            color: 'Titanium Violet',
            colorHex: '#4C435A',
            storage: '1TB',
            price: 159999,
            mrp: 169999,
            image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, isPopular: false },
          { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, isPopular: true },
          { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, isPopular: false },
          { tenureMonths: 24, interestRate: 9.9, cashbackAmount: 5000, isZeroInterest: false, isPopular: false },
          { tenureMonths: 36, interestRate: 9.9, cashbackAmount: 5000, isZeroInterest: false, isPopular: false },
        ],
      },
    },
  });

  // 3. MacBook Pro M3 Max
  const macbook = await prisma.product.create({
    data: {
      slug: 'macbook-pro-m3',
      name: 'MacBook Pro 16" M3 Max',
      brand: 'Apple',
      subtitle: 'Mind-blowing performance. Liquid Retina XDR.',
      description: 'The most advanced Mac laptop ever made. Powered by M3 Max chip with 16-core CPU and 40-core GPU.',
      rating: 5.0,
      reviewCount: 92,
      isNew: true,
      variants: {
        create: [
          {
            sku: 'MBP16-512-BLACK',
            title: '512GB',
            color: 'Space Black',
            colorHex: '#252729',
            storage: '512GB',
            price: 199900,
            mrp: 219900,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
          {
            sku: 'MBP16-1TB-SILVER',
            title: '1TB',
            color: 'Silver Finish',
            colorHex: '#E2E3E5',
            storage: '1TB',
            price: 239900,
            mrp: 259900,
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop',
            inStock: true,
          },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 10000, isZeroInterest: true, isPopular: false },
          { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 10000, isZeroInterest: true, isPopular: true },
          { tenureMonths: 24, interestRate: 8.5, cashbackAmount: 10000, isZeroInterest: false, isPopular: false },
          { tenureMonths: 36, interestRate: 8.5, cashbackAmount: 10000, isZeroInterest: false, isPopular: false },
          { tenureMonths: 48, interestRate: 8.5, cashbackAmount: 10000, isZeroInterest: false, isPopular: false },
        ],
      },
    },
  });

  console.log('Seed completed successfully!');
  console.log(`Created products: ${iphone.name}, ${samsung.name}, ${macbook.name}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
