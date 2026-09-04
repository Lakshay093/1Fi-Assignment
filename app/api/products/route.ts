import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
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

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('API /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products from database' },
      { status: 500 }
    );
  }
}
