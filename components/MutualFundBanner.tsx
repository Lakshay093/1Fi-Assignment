import { TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function MutualFundBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#6b38c2] text-white rounded-2xl p-5 sm:p-6 shadow-xl mb-6 relative overflow-hidden">
      {/* Decorative background overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
              1Fi Innovation
            </span>
            <span className="text-xs text-purple-200 font-medium">Instant Mutual Fund Lien Pledge</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Why Mutual Fund Backed EMIs?
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Don't sell your investments! Pledge your existing mutual funds as collateral to unlock 0% & low-cost EMI plans while your portfolio continues to compound and earn market returns.
          </p>
        </div>

        {/* Feature stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Keep Earning</div>
              <div className="text-[11px] text-purple-200">100% Fund Growth</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Zero Tax Hit</div>
              <div className="text-[11px] text-purple-200">No Capital Gains</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
