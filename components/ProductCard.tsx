'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { calculateEmiDetails, formatINR } from '@/lib/emi';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use first variant as default
  const defaultVariant = product.variants[0] || {
    price: 99999,
    mrp: 109999,
    image: '',
    title: '',
  };

  // Find lowest monthly payment EMI plan
  const lowestEmiPlan = product.emiPlans.reduce((lowest, current) => {
    const currentCalc = calculateEmiDetails(defaultVariant.price, current);
    const lowestCalc = calculateEmiDetails(defaultVariant.price, lowest);
    return currentCalc.monthlyAmount < lowestCalc.monthlyAmount ? current : lowest;
  }, product.emiPlans[0]);

  const lowestMonthlyAmount = lowestEmiPlan
    ? calculateEmiDetails(defaultVariant.price, lowestEmiPlan).monthlyAmount
    : Math.round(defaultVariant.price / 12);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative bg-gray-50 p-6 flex items-center justify-center overflow-hidden aspect-square">
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-sm z-10">
              NEW
            </span>
          )}
          <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-gray-200 shadow-xs z-10">
            {product.brand}
          </span>

          <img
            src={defaultVariant.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#6b38c2] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-4 line-clamp-1">{product.subtitle || product.description}</p>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold text-gray-900">{formatINR(defaultVariant.price)}</span>
            <span className="text-xs text-gray-400 line-through">{formatINR(defaultVariant.mrp)}</span>
          </div>

          {/* Mutual Fund EMI Tag */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6b38c2] mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MF-Backed EMI available</span>
            </div>
            <div className="text-xs text-gray-700 font-medium">
              From <span className="font-bold text-[#6b38c2]">{formatINR(lowestMonthlyAmount)}/mo</span> for {lowestEmiPlan?.tenureMonths || 12} mos
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 pt-0">
        <Link
          href={`/products/${product.slug}`}
          className="w-full bg-gray-900 text-white font-semibold text-xs py-3 px-4 rounded-xl hover:bg-[#6b38c2] transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          View Product & EMI Plans
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
