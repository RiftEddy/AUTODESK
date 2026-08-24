import React from 'react';
import { 
  Play, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  PhoneCall,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToDemo: () => void;
  onOpenEarlyAccess: () => void;
}

const SUPPORTED_TRADES = [
  'HVAC & Heating',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Landscaping',
  'General Contracting',
];

export const Hero: React.FC<HeroProps> = ({ onScrollToDemo, onOpenEarlyAccess }) => {
  return (
    <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 md:pt-24 md:pb-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Label */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300 text-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
            <span>Automated Inbound Quoting & Dispatch for Trade Contractors</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mt-5 sm:mt-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.12] font-['Outfit']">
            Quote leads, book jobs, and collect deposits on autopilot.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Autodeck responds to incoming SMS inquiries in seconds, calculates pricebook estimates, negotiates time slots, and books appointments directly onto your calendar.
          </p>
        </div>

        {/* Trade Badges (Scrollable on mobile, centered on desktop) */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center">
          <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap shrink-0 mr-1">
              Built for:
            </span>
            {SUPPORTED_TRADES.map((trade) => (
              <span
                key={trade}
                className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium bg-slate-900/60 border border-slate-800 text-slate-300 whitespace-nowrap shrink-0"
              >
                {trade}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            id="hero-see-demo-btn"
            onClick={onScrollToDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-6 py-3.5 sm:py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            <span>Try Interactive Demo</span>
          </button>

          <button
            id="hero-early-access-btn"
            onClick={onOpenEarlyAccess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            <span>Request Pilot Access</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Key Operational Proof Metrics Strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          <div className="surface-card rounded-xl p-3.5 sm:p-5 text-center">
            <div className="text-xl sm:text-3xl font-bold text-white font-['Outfit']">
              &lt; 45 sec
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Inbound Response Time</div>
          </div>

          <div className="surface-card rounded-xl p-3.5 sm:p-5 text-center">
            <div className="text-xl sm:text-3xl font-bold text-blue-400 font-['Outfit']">
              +42%
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Quote-to-Job Close Rate</div>
          </div>

          <div className="surface-card rounded-xl p-3.5 sm:p-5 text-center">
            <div className="text-xl sm:text-3xl font-bold text-white font-['Outfit']">
              24 / 7
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">After-Hours Ingestion</div>
          </div>

          <div className="surface-card rounded-xl p-3.5 sm:p-5 text-center">
            <div className="text-xl sm:text-3xl font-bold text-emerald-400 font-['Outfit']">
              $0
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Uncollected Booking Fees</div>
          </div>
        </div>

      </div>
    </section>
  );
};
