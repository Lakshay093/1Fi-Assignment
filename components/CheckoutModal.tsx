'use client';

import { useState } from 'react';
import { Product, Variant, EmiPlan } from '../lib/types';
import { formatINR } from '../lib/emi';
import { X, CheckCircle2, ShieldCheck, Loader2, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedVariant: Variant;
  selectedPlan: EmiPlan;
  monthlyAmount: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedPlan,
  monthlyAmount,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('Lakshay Sharma');
  const [customerEmail, setCustomerEmail] = useState('lakshay@example.com');
  const [folioNumber, setFolioNumber] = useState('MF-8923491-CAMS');
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          variantTitle: `${selectedVariant.title} (${selectedVariant.color})`,
          tenureMonths: selectedPlan.tenureMonths,
          monthlyAmount,
          interestRate: selectedPlan.interestRate,
          totalAmount: monthlyAmount * selectedPlan.tenureMonths,
          customerName,
          customerEmail,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessOrder(data.data);
      } else {
        alert(data.error || 'Failed to submit order');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred submitting order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successOrder ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">EMI Application Approved!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your Mutual Fund lien pledge of folio <span className="font-semibold text-gray-800">{folioNumber}</span> has been processed automatically by 1Fi Engine.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-200 text-xs space-y-2 mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-semibold text-gray-800">{successOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Product:</span>
                <span className="font-semibold text-gray-800">{product.name} ({selectedVariant.title})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly EMI:</span>
                <span className="font-bold text-[#6b38c2]">{formatINR(monthlyAmount)} x {selectedPlan.tenureMonths} mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                  {successOrder.status}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#6b38c2] text-white py-3 rounded-xl font-bold hover:bg-[#5b2fb0] transition-colors shadow-md"
            >
              Done & Return to Product
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#6b38c2] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              1Fi Mutual Fund EMI Checkout
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Confirm Plan & Lien Pledge</h2>

            {/* Selected Summary Card */}
            <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-purple-200/60">
                <img
                  src={selectedVariant.image}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg border border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{product.name}</h4>
                  <div className="text-xs text-gray-600">
                    Variant: <span className="font-semibold">{selectedVariant.title}</span> ({selectedVariant.color})
                  </div>
                  <div className="text-xs text-gray-500">
                    Price: <span className="font-bold text-gray-900">{formatINR(selectedVariant.price)}</span>{' '}
                    <span className="line-through text-gray-400">{formatINR(selectedVariant.mrp)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500 block">Monthly Payment</span>
                  <span className="text-base font-extrabold text-[#6b38c2]">
                    {formatINR(monthlyAmount)}
                  </span>
                  <span className="text-[11px] text-gray-600"> / mo ({selectedPlan.tenureMonths} mos)</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block">Interest Rate</span>
                  <span className="text-sm font-bold text-emerald-600">
                    {selectedPlan.interestRate === 0 ? '0% No-Cost EMI' : `${selectedPlan.interestRate}% interest`}
                  </span>
                  {selectedPlan.cashbackAmount > 0 && (
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      +{formatINR(selectedPlan.cashbackAmount)} Cashback
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Applicant Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b38c2] bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b38c2] bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mutual Fund Folio / PAN Link
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={folioNumber}
                    onChange={(e) => setFolioNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b38c2] bg-gray-50/50 font-mono"
                  />
                  <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Pledges collateral without selling your Mutual Fund units. Zero tax impact.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#6b38c2] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5b2fb0] transition-colors shadow-lg shadow-[#6b38c2]/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Pledging MF & Authorizing EMI...
                  </>
                ) : (
                  `Pledge MF & Proceed with ${formatINR(monthlyAmount)}/mo`
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
