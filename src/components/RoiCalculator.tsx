import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenEarlyAccess: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenEarlyAccess }) => {
  const [monthlyLeads, setMonthlyLeads] = useState<number>(35);
  const [avgTicket, setAvgTicket] = useState<number>(750);
  const [currentCloseRate, setCurrentCloseRate] = useState<number>(30); // 30%

  // Calculations
  const estimatedNewCloseRate = Math.min(currentCloseRate + 18, 75);
  const currentMonthlyRevenue = (monthlyLeads * (currentCloseRate / 100)) * avgTicket;
  const projectedMonthlyRevenue = (monthlyLeads * (estimatedNewCloseRate / 100)) * avgTicket;
  const additionalMonthlyGain = projectedMonthlyRevenue - currentMonthlyRevenue;
  const annualGain = additionalMonthlyGain * 12;
  const hoursSavedPerMonth = Math.round((monthlyLeads * 0.75));

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#0b0f17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>Financial Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Estimate your recovered revenue
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Contractors typically win jobs by responding first with a professional price. Calculate the impact of instant SMS quoting on your monthly cash flow.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start max-w-5xl mx-auto surface-card rounded-xl p-4 sm:p-6 lg:p-8 border border-slate-800 shadow-sm">
          
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Slider 1: Monthly Leads */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-200">
                  Monthly Inbound Leads / Inquiries
                </label>
                <span className="text-xs font-mono font-bold text-blue-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
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
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
                <span>10 leads</span>
                <span>100 leads</span>
                <span>200+ leads</span>
              </div>
            </div>

            {/* Slider 2: Average Job Ticket Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-200">
                  Average Ticket Size ($)
                </label>
                <span className="text-xs font-mono font-bold text-blue-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  ${avgTicket.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="5000"
                step="50"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
                <span>$150 (Service)</span>
                <span>$2,500 (Repair)</span>
                <span>$5,000+ (Install)</span>
              </div>
            </div>

            {/* Slider 3: Current Close Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-200">
                  Current Lead-to-Booked Close Rate (%)
                </label>
                <span className="text-xs font-mono font-bold text-blue-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
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
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
                <span>10% (Manual)</span>
                <span>35% (Industry avg)</span>
                <span>60% (High referrals)</span>
              </div>
            </div>

          </div>

          {/* Outputs (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-lg border border-slate-800 p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div>
              <div className="text-xs text-slate-400 font-medium">
                Estimated Additional Monthly Revenue
              </div>
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-['Outfit'] mt-1">
                +${Math.round(additionalMonthlyGain).toLocaleString()}
                <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ mo</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-1">
                Annual projected lift: <span className="text-slate-300 font-semibold">+${Math.round(annualGain).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-800 space-y-2 sm:space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Projected Close Rate:</span>
                <span className="font-semibold text-white">{estimatedNewCloseRate}% (+18% lift)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Admin Hours Saved:</span>
                <span className="font-semibold text-white">{hoursSavedPerMonth} hours / month</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Deposit Collection:</span>
                <span className="font-semibold text-emerald-400">100% Upfront Verified</span>
              </div>
            </div>

            <button
              onClick={onOpenEarlyAccess}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 sm:py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <span>Unlock This Revenue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
