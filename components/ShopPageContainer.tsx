'use client';

import { useState } from 'react';
import { Product } from '../lib/types';
import ProductCard from './ProductCard';
import HeroBanner from './HeroBanner';
import MutualFundBanner from './MutualFundBanner';
import { Search, Store, Award, ArrowRight, Database } from 'lucide-react';
import Link from 'next/link';

interface ShopPageContainerProps {
  products: Product[];
}

export default function ShopPageContainer({ products }: ShopPageContainerProps) {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'brands' | 'stores'>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 sm:pb-20">
      {/* Top Hero Banner */}
      <HeroBanner />

      {/* Pill Tabs Bar Floating Below Hero Banner */}
      <div className="bg-[#f0ebfa] p-1.5 rounded-full max-w-xl mx-auto mb-6 flex items-center justify-between shadow-inner border border-purple-200/50">
        <button
          onClick={() => setActiveTab('brands')}
          className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full text-[11px] sm:text-sm font-bold transition-all text-center truncate ${
            activeTab === 'brands'
              ? 'bg-white text-[#6b38c2] shadow-sm sm:shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Top Brands
        </button>

        <button
          onClick={() => setActiveTab('stores')}
          className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full text-[11px] sm:text-sm font-bold transition-all text-center truncate ${
            activeTab === 'stores'
              ? 'bg-white text-[#6b38c2] shadow-sm sm:shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Nearby Stores
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full text-[11px] sm:text-sm font-bold transition-all text-center relative truncate ${
            activeTab === 'marketplace'
              ? 'bg-white text-[#6b38c2] shadow-sm sm:shadow-md ring-2 ring-[#6b38c2]/20'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span>1Fi Marketplace</span>
          <span className="hidden sm:inline-block absolute -top-1 right-2 bg-purple-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full shadow-xs">
            NEW
          </span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto mb-6 sm:mb-8">
        <Search className="absolute left-4 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeTab === 'marketplace'
              ? 'Search 1Fi Marketplace (iPhone, Samsung, Mac...)'
              : activeTab === 'brands'
              ? 'Search online stores...'
              : 'Search nearby stores...'
          }
          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-full bg-white border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6b38c2] shadow-xs text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* TAB 1: Top Brands */}
      {activeTab === 'brands' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-50 text-[#6b38c2] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-purple-100">
            <Award className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Top Brands Section</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto mb-5 sm:mb-6">
            As per the 1Fi SDE assignment specification, Top Brands implementation is omitted and left blank.
          </p>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="bg-[#6b38c2] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#5b2fb0] transition-colors shadow-sm"
          >
            Switch to 1Fi Marketplace Section
          </button>
        </div>
      )}

      {/* TAB 2: Nearby Stores */}
      {activeTab === 'stores' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-50 text-[#6b38c2] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-purple-100">
            <Store className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Nearby Stores Section</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto mb-5 sm:mb-6">
            As per the 1Fi SDE assignment specification, Nearby Stores implementation is omitted and left blank.
          </p>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="bg-[#6b38c2] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#5b2fb0] transition-colors shadow-sm"
          >
            Switch to 1Fi Marketplace Section
          </button>
        </div>
      )}

      {/* TAB 3: 1Fi Marketplace */}
      {activeTab === 'marketplace' && (
        <div>
          {/* Mutual Fund Info Banner */}
          <MutualFundBanner />

          {/* Target Assignment Banner */}
          <div className="bg-white border border-purple-100 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 text-[#6b38c2] flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
                ↑Fi
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-purple-600 font-bold uppercase tracking-wider">
                  Assignment Reference Target
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  iPhone 17 Pro — Dynamic EMI Calculator
                </h3>
              </div>
            </div>
            <Link
              href="/products/iphone-17-pro"
              className="bg-[#6b38c2] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs hover:bg-[#5b2fb0] transition-colors flex items-center gap-1.5 shrink-0 shadow-sm w-full sm:w-auto justify-center"
            >
              <span>View Reference Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Marketplace Grid Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">1Fi Marketplace Products</h2>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Products dynamically loaded from SQLite Database via REST APIs.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 bg-white border border-gray-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-2xs shrink-0">
              <Database className="w-3.5 h-3.5 text-[#6b38c2]" />
              <span>{filteredProducts.length} Items</span>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
              <p className="text-gray-500 text-sm mb-3">No matching products found.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#6b38c2] font-bold underline"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
