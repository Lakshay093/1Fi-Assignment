import Link from 'next/link';
import { ShieldCheck, Database, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#6b38c2] text-white rounded-lg flex items-center justify-center font-bold text-base sm:text-lg shadow-md shadow-[#6b38c2]/20 group-hover:scale-105 transition-transform">
            ↑Fi
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 tracking-tight text-base sm:text-lg leading-none">1Fi Shop</span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">MF Backed Credit</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#6b38c2] transition-colors flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-[#6b38c2]" />
            <span>Shop Page</span>
          </Link>
          <Link href="/products/iphone-17-pro" className="hover:text-[#6b38c2] transition-colors flex items-center gap-1">
            iPhone 17 Pro
            <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">New</span>
          </Link>
          <a
            href="/api/products"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6b38c2] transition-colors flex items-center gap-1"
          >
            <Database className="w-3.5 h-3.5 text-gray-400" />
            Backend API
          </a>
        </nav>

        {/* Action Button & Badges */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>0% Liquidation EMI</span>
          </div>
          <Link
            href="/products/iphone-17-pro"
            className="bg-[#6b38c2] text-white text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#5b2fb0] transition-all shadow-sm flex items-center gap-1 shrink-0"
          >
            <span>Live Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
