import { Sparkles } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-br from-[#260580] via-[#3d0fb5] to-[#5b19d4] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 mb-6 overflow-hidden shadow-lg">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-3">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 fill-amber-300" />
            <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">NO-COST EMIs</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.18] text-white mb-2 sm:mb-3">
            Shop today, <br className="hidden sm:inline" />
            Pay later using <br className="hidden sm:inline" />
            <span className="text-amber-300">Mutual funds.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-purple-100/90 font-medium max-w-md leading-relaxed">
            No credit score required. No interest. <br className="hidden sm:inline" />
            Backed by your investments.
          </p>
        </div>

        {/* 3D Visual Card */}
        <div className="relative shrink-0 w-full sm:w-auto flex justify-start sm:justify-end mt-1 sm:mt-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-xl w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-900 font-extrabold text-xl sm:text-2xl shadow-md transform -rotate-3 shrink-0">
              🛍️
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs font-extrabold text-amber-300 uppercase tracking-wider">1Fi Special</div>
              <div className="text-xs sm:text-sm font-bold text-white">0% Liquidation EMI</div>
              <div className="text-[10px] sm:text-[11px] text-purple-200 mt-0.5">Keep earning 100% MF returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
