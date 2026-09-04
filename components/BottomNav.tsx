'use client';

import { useState } from 'react';
import { Home, Store, Receipt, TrendingUp, User } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
  const [activeItem, setActiveItem] = useState<'home' | 'shop' | 'dues' | 'limit' | 'profile'>('shop');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'shop', label: 'Shop', icon: Store, href: '/' },
    { id: 'dues', label: 'EMI Dues', icon: Receipt, href: '#' },
    { id: 'limit', label: 'Limit', icon: TrendingUp, href: '#' },
    { id: 'profile', label: 'Profile', icon: User, href: '#' },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-lg border border-gray-200/80 rounded-3xl shadow-xl px-3 py-2 flex items-center justify-around gap-2 sm:gap-6 max-w-md w-full pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id as any)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-[#6b38c2] font-bold'
                  : 'text-gray-400 hover:text-gray-600 font-medium'
              }`}
            >
              {/* Top Active Bar */}
              {isActive && (
                <div className="absolute -top-2 w-8 h-1 bg-[#6b38c2] rounded-full shadow-xs" />
              )}

              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
