import { prisma } from '../lib/prisma';
import ShopPageContainer from '../components/ShopPageContainer';
import { Product } from '../lib/types';

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
    });

    return products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      subtitle: p.subtitle,
      description: p.description,
      rating: p.rating,
      reviewCount: p.reviewCount,
      isNew: p.isNew,
      variants: p.variants.map((v) => ({
        id: v.id,
        productId: v.productId,
        title: v.title,
        color: v.color,
        colorHex: v.colorHex,
        storage: v.storage,
        price: v.price,
        mrp: v.mrp,
        image: v.image,
        inStock: v.inStock,
        sku: v.sku,
      })),
      emiPlans: p.emiPlans.map((e) => ({
        id: e.id,
        productId: e.productId,
        tenureMonths: e.tenureMonths,
        interestRate: e.interestRate,
        cashbackAmount: e.cashbackAmount,
        isZeroInterest: e.isZeroInterest,
        isPopular: e.isPopular,
      })),
    }));
  } catch (error) {
    console.error('Error querying products from DB:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();
  return <ShopPageContainer products={products} />;
}
