import { prisma } from '../../../lib/prisma';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { Product } from '../../../lib/types';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
    });

    if (!p) return null;

    return {
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
    };
  } catch (error) {
    console.error(`Error querying product ${slug}:`, error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
