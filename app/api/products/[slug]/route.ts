import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Look up by slug OR by unique ID
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug },
        ],
      },
      include: {
        variants: true,
        emiPlans: {
          orderBy: {
            tenureMonths: 'asc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with identifier '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('API product details error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
