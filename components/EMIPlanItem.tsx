'use client';

import { EmiPlan } from '@/lib/types';
import { formatINR } from '@/lib/emi';
import { Check } from 'lucide-react';

interface EMIPlanItemProps {
  plan: EmiPlan;
  monthlyAmount: number;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export default function EMIPlanItem({
  plan,
  monthlyAmount,
  isSelected,
  onSelect,
}: EMIPlanItemProps) {
  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
        isSelected
          ? 'bg-purple-50/40 border-[#6b38c2] ring-2 ring-[#6b38c2]/20 shadow-sm'
          : 'bg-gray-50/60 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Monthly payment & Tenure */}
        <div className="flex items-baseline gap-1.5 font-bold text-gray-900 text-base sm:text-lg tracking-tight">
          <span>{formatINR(monthlyAmount)}</span>
          <span className="text-gray-600 font-medium text-sm sm:text-base">
            x {plan.tenureMonths} months
          </span>
        </div>

        {/* Interest Rate Tag */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              plan.interestRate === 0
                ? 'text-gray-900'
                : 'text-gray-700'
            }`}
          >
            {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
          </span>

          {/* Selection indicator */}
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
              isSelected
                ? 'bg-[#6b38c2] border-[#6b38c2] text-white'
                : 'border-gray-300 bg-white'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
      </div>

      {/* Cashback sub-badge */}
      {plan.cashbackAmount > 0 && (
        <div className="mt-1 text-xs font-semibold text-emerald-600 tracking-tight">
          Additional cashback of {formatINR(plan.cashbackAmount)}
        </div>
      )}

      {/* Popular tag */}
      {plan.isPopular && (
        <div className="absolute -top-2.5 right-4 bg-[#6b38c2] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm">
          Most Popular
        </div>
      )}
    </div>
  );
}
