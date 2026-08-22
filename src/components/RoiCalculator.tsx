import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock, Zap, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenEarlyAccess: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenEarlyAccess }) => {
  const [monthlyLeads, setMonthlyLeads] = useState<number>(35);
  const [avgTicket, setAvgTicket] = useState<number>(750);
  const [currentCloseRate, setCurrentCloseRate] = useState<number>(30); // 30%

  // Calculations
  // Average contractor loses ~35% of leads due to slow response (>30 mins) or missed calls
  // With Autodeck, response is <45s, boosting close rate by ~18% points
  const estimatedNewCloseRate = Math.min(currentCloseRate + 18, 75);
  const currentMonthlyRevenue = (monthlyLeads * (currentCloseRate / 100)) * avgTicket;
  const projectedMonthlyRevenue = (monthlyLeads * (estimatedNewCloseRate / 100)) * avgTicket;
  const additionalMonthlyGain = projectedMonthlyRevenue - currentMonthlyRevenue;
  const annualGain = additionalMonthlyGain * 12;

  // Extra hours saved per month (estimating quotes + back-and-forth scheduling = 45m per lead)
  const hoursSavedPerMonth = Math.round((monthlyLeads * 0.75));

  return (
    <section id="calculator" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Calculate your recovered revenue from instant quoting
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            78% of homeowners hire the first contractor that gives them a clear, professional quote. See what speed does to your bottom line.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slider 1: Monthly Leads */}
            <div className="glass-card p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-200">
                  Incoming Monthly Inquiries / Leads:
                </label>
                <span className="text-sm font-bold text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  {monthlyLeads} leads/mo
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>10 (Solo part-time)</span>
                <span>75 (2–3 crews)</span>
                <span>200+ (Fleet)</span>
              </div>
            </div>

            {/* Slider 2: Average Job Ticket Price */}
            <div className="glass-card p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-200">
                  Average Completed Job Ticket Price:
                </label>
                <span className="text-sm font-bold text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  ${avgTicket.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="50"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>$200 (Service calls)</span>
                <span>$1,800 (Replacements)</span>
                <span>$5,000 (Major projects)</span>
              </div>
            </div>

            {/* Slider 3: Current Close Rate */}
            <div className="glass-card p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-200">
                  Current Estimate-to-Job Close Rate:
                </label>
                <span className="text-sm font-bold text-purple-400 font-mono bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {currentCloseRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={currentCloseRate}
                onChange={(e) => setCurrentCloseRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>15% (Lagged replies)</span>
                <span>30% (Industry avg)</span>
                <span>50% (High word-of-mouth)</span>
              </div>
            </div>

          </div>

          {/* Results Outcome Box (5 cols) */}
          <div className="lg:col-span-5 glass rounded-2xl border border-blue-500/30 p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                Estimated Revenue Expansion
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-['Outfit'] mt-1">
                +${Math.round(additionalMonthlyGain).toLocaleString()}
                <span className="text-lg font-medium text-slate-400">/mo</span>
              </div>
              <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>+${Math.round(annualGain).toLocaleString()} projected yearly boost</span>
              </div>

              {/* Breakdown metrics */}
              <div className="mt-6 space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Estimated Close Rate with Autodeck:</span>
                  <span className="font-bold text-white font-mono">{estimatedNewCloseRate}% (+18%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Extra Closed Jobs / Month:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    +{Math.round((monthlyLeads * (18 / 100)))} jobs
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Owner Estimating Hours Saved:</span>
                  <span className="font-bold text-blue-300 font-mono">
                    ~{hoursSavedPerMonth} hours / mo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                id="calc-claim-roi-btn"
                onClick={onOpenEarlyAccess}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Capture This Revenue with Autodeck</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-slate-500 mt-2">
                14-day zero-risk trial • 10-minute setup • Cancel anytime
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
