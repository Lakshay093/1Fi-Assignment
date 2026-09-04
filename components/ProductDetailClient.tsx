'use client';

import { useState } from 'react';
import { Product, Variant, EmiPlan } from '../lib/types';
import { calculateEmiDetails, formatINR } from '../lib/emi';
import EMIPlanItem from './EMIPlanItem';
import CheckoutModal from './CheckoutModal';
import MutualFundBanner from './MutualFundBanner';
import { ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Currently selected variant (default to first variant e.g. 256GB Desert Titanium)
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0] || {
      id: 'default',
      productId: product.id,
      title: '256GB',
      color: 'Desert Titanium',
      colorHex: '#C5A087',
      storage: '256GB',
      price: 127400,
      mrp: 134900,
      image: '',
      inStock: true,
      sku: 'default-sku',
    }
  );

  // Currently selected EMI plan (default to 12 months or first plan)
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan>(
    product.emiPlans.find((p) => p.isPopular) || product.emiPlans[0]
  );

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate monthly payment details for the selected plan and selected variant's price
  const currentPlanCalc = selectedPlan
    ? calculateEmiDetails(selectedVariant.price, selectedPlan)
    : { monthlyAmount: Math.round(selectedVariant.price / 12) };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6b38c2] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products Catalog
      </Link>

      {/* Mutual Fund Banner */}
      <MutualFundBanner />

      {/* Main Reference Card Layout */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-lg p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Product Visuals & Variant Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gray-50/70 border border-gray-100 rounded-2xl p-6 sm:p-8 relative">
          <div>
            {/* NEW Tag */}
            {product.isNew && (
              <div className="text-red-500 text-xs font-extrabold uppercase tracking-widest mb-2">
                NEW
              </div>
            )}

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            {/* Variant Storage / Title */}
            <div className="text-sm font-medium text-gray-500 mb-6">
              {selectedVariant.storage || selectedVariant.title}
            </div>

            {/* Product Image */}
            <div className="relative aspect-square w-full max-w-xs mx-auto flex items-center justify-center my-4 transition-all duration-300">
              <img
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.color}`}
                className="max-h-72 object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Variants Selector */}
          <div className="mt-6 pt-6 border-t border-gray-200/70">
            <div className="text-xs text-center text-gray-600 font-medium mb-3">
              Available in {product.variants.length} finishes
            </div>

            {/* Swatches */}
            <div className="flex items-center justify-center gap-3">
              {product.variants.map((variant) => {
                const isSelected = variant.id === selectedVariant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    title={`${variant.title} - ${variant.color}`}
                    className={`w-7 h-7 rounded-full transition-all flex items-center justify-center relative ${
                      isSelected
                        ? 'ring-2 ring-offset-2 ring-[#6b38c2] scale-110'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: variant.colorHex || '#888' }}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Storage options pill list */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    v.id === selectedVariant.id
                      ? 'bg-[#6b38c2] text-white border-[#6b38c2] shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & EMI Plans */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Header: Price & Strikethrough MRP */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {formatINR(selectedVariant.price)}
                </span>
                <span className="text-lg text-gray-400 line-through font-medium">
                  {formatINR(selectedVariant.mrp)}
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-1 flex items-center gap-1.5">
                <span>EMI plans backed by mutual funds</span>
                <Sparkles className="w-4 h-4 text-[#6b38c2]" />
              </div>
            </div>

            {/* List of EMI Plans */}
            <div className="space-y-3 mb-8">
              {product.emiPlans.map((plan) => {
                const calc = calculateEmiDetails(selectedVariant.price, plan);
                const isSelected = selectedPlan.id === plan.id;

                return (
                  <EMIPlanItem
                    key={plan.id}
                    plan={plan}
                    monthlyAmount={calc.monthlyAmount}
                    isSelected={isSelected}
                    onSelect={(p) => setSelectedPlan(p)}
                  />
                );
              })}
            </div>
          </div>

          {/* Action Button to Proceed */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#6b38c2] hover:bg-[#5b2fb0] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#6b38c2]/25 transition-all text-base flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              <span>Proceed with {formatINR(currentPlanCalc.monthlyAmount)}/mo Plan</span>
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-2">
              No collateral sale required • Keep earning MF interest • Instant digital pledge
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
          selectedVariant={selectedVariant}
          selectedPlan={selectedPlan}
          monthlyAmount={currentPlanCalc.monthlyAmount}
        />
      )}
    </div>
  );
}
