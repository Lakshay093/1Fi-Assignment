import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/orders - Fetch all placed EMI orders from database
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('API GET /api/orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Submit & store new EMI order in database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productName,
      variantTitle,
      tenureMonths,
      monthlyAmount,
      interestRate,
      totalAmount,
      customerName,
      customerEmail,
    } = body;

    if (!productName || !variantTitle || !tenureMonths || !monthlyAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required order details' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        productName,
        variantTitle,
        tenureMonths,
        monthlyAmount,
        interestRate: interestRate || 0,
        totalAmount,
        customerName: customerName || 'Valued Customer',
        customerEmail: customerEmail || 'customer@1fi.app',
        status: 'MUTUAL_FUND_PLEDGE_APPROVED',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Mutual-fund backed EMI application approved successfully!',
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API POST /api/orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
