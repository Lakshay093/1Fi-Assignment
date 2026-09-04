import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
  title: '1Fi Shop — Mutual Fund Backed EMI Marketplace',
  description: 'Buy flagship smartphones and laptops on flexible EMI plans backed by mutual fund investments without liquidating your portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-900 font-sans antialiased selection:bg-[#6b38c2] selection:text-white relative">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <BottomNav />
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-6 mt-16 text-xs text-gray-500 pb-24">
          <div className="max-w-7xl mx-auto px-4 flex justify-end">
            <div className="font-medium text-gray-600">
              Made with 💜 by <span className="font-bold text-gray-900">Lakshay Dhiman</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
