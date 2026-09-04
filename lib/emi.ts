import { EmiPlan } from './types';

/**
 * Calculates monthly EMI and total cost for a given price and interest rate.
 */
export function calculateEmiDetails(price: number, plan: EmiPlan) {
  const { tenureMonths, interestRate } = plan;

  if (interestRate === 0) {
    const monthlyAmount = Math.round(price / tenureMonths);
    return {
      monthlyAmount,
      totalPayable: price,
      totalInterest: 0,
      effectiveSavings: plan.cashbackAmount,
    };
  }

  // Monthly interest rate
  const r = interestRate / 12 / 100;
  const n = tenureMonths;
  
  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyAmount = Math.round(emi);
  const totalPayable = monthlyAmount * tenureMonths;
  const totalInterest = Math.max(0, totalPayable - price);

  return {
    monthlyAmount,
    totalPayable,
    totalInterest,
    effectiveSavings: plan.cashbackAmount,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
