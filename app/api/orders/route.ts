import { NextResponse } from 'next/server';
import { calculateEmiDetails } from '../../../lib/emi';
import { prisma } from '../../../lib/prisma';
import { enforceRateLimit } from '../../../lib/rate-limit';

export const dynamic = 'force-dynamic';

const NAME_PATTERN = /^[\p{L}\p{M} .,'-]{1,100}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

// GET is intentionally not implemented: orders include customer PII and are not a public resource.
export async function POST(request: Request) {
  const rateLimit = enforceRateLimit(request, 'order', 5, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many order attempts. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
    );
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return badRequest('Invalid request body');
    }

    const { variantSku, tenureMonths, customerName, customerEmail } = body as Record<string, unknown>;
    if (typeof variantSku !== 'string' || !/^[A-Z0-9-]{3,64}$/.test(variantSku)) {
      return badRequest('Invalid product selection');
    }
    if (
      typeof tenureMonths !== 'number' ||
      !Number.isSafeInteger(tenureMonths) ||
      tenureMonths < 1 ||
      tenureMonths > 60
    ) {
      return badRequest('Invalid EMI tenure');
    }
    const tenure = tenureMonths;
    if (typeof customerName !== 'string' || !NAME_PATTERN.test(customerName.trim())) {
      return badRequest('Enter a valid applicant name');
    }
    if (
      typeof customerEmail !== 'string' ||
      customerEmail.length > 254 ||
      !EMAIL_PATTERN.test(customerEmail)
    ) {
      return badRequest('Enter a valid email address');
    }

    const variant = await prisma.variant.findUnique({ where: { sku: variantSku } });
    if (!variant || !variant.inStock) {
      return badRequest('This product or EMI plan is no longer available');
    }

    const [product, plan] = await Promise.all([
      prisma.product.findUnique({ where: { id: variant.productId } }),
      prisma.emiPlan.findFirst({ where: { productId: variant.productId, tenureMonths: tenure } }),
    ]);
    if (!product || !plan) return badRequest('This product or EMI plan is no longer available');

    // Never accept monetary values from the browser. They are derived from the catalogue.
    const { monthlyAmount, totalPayable } = calculateEmiDetails(variant.price, plan);
    const order = await prisma.order.create({
      data: {
        productName: product.name,
        variantTitle: `${variant.title} (${variant.color})`,
        tenureMonths: plan.tenureMonths,
        monthlyAmount,
        interestRate: plan.interestRate,
        totalAmount: totalPayable,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        status: 'MUTUAL_FUND_PLEDGE_APPROVED',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Mutual-fund backed EMI application approved successfully!',
        data: order,
      },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (error instanceof SyntaxError) return badRequest('Invalid JSON body');

    console.error('API POST /api/orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
