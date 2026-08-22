import React from 'react';
import { 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Calendar, 
  MessageSquareText, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Wrench,
  Zap,
  Droplets,
  Trees,
  Hammer
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToDemo: () => void;
  onOpenEarlyAccess: () => void;
}

const TRADES = [
  { label: 'HVAC', icon: Flame, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  { label: 'Plumbing', icon: Droplets, color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { label: 'Electrical', icon: Zap, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  { label: 'Landscaping', icon: Trees, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { label: 'Roofing & General', icon: Hammer, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
];

export const Hero: React.FC<HeroProps> = ({ onScrollToDemo, onOpenEarlyAccess }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-medium text-slate-300 shadow-lg">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-slate-400">Autonomous Sales Agent:</span>
            <span className="font-semibold text-white">Instant Quotes • 24/7 Text Negotiation • Auto-Booked</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mt-8 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] font-['Outfit']">
            The front desk <br />
            <span className="text-blue-500">on autopilot.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Autodeck handles your quotes, follow-ups, and booking while you stay on the tools. Never lose a high-value trade lead again.
          </p>
        </motion.div>

        {/* Trade Scopes */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mt-7"
        >
          <span className="text-xs text-slate-500 font-medium mr-1">Tuned for:</span>
          {TRADES.map((trade) => {
            const Icon = trade.icon;
            return (
              <div
                key={trade.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 border border-white/5 text-slate-300"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400" />
                <span>{trade.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Call to Actions + Social Proof Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            id="hero-see-demo-btn"
            onClick={onScrollToDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-50 transition-all shadow-xl shadow-white/5 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>See it in action</span>
          </button>

          <button
            id="hero-early-access-btn"
            onClick={onOpenEarlyAccess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <span>Start 14-Day Free Pilot</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="flex items-center gap-3 px-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">JD</div>
              <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">MR</div>
              <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">TK</div>
            </div>
            <span className="text-xs text-slate-400 font-medium">Joined by 500+ pros</span>
          </div>
        </motion.div>

        {/* 3-Step Micro-Flow Bar from Sleek Interface Theme */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-14 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-white/5 text-center md:text-left"
        >
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/30 border border-white/5">
            <div className="text-blue-500 font-mono text-xs font-bold">01</div>
            <div className="text-sm font-semibold text-white">Lead In</div>
            <div className="text-xs text-slate-400">AI scans incoming SMS, web form & calls in under 45s</div>
          </div>
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/30 border border-white/5">
            <div className="text-blue-500 font-mono text-xs font-bold">02</div>
            <div className="text-sm font-semibold text-white">Auto-Quote</div>
            <div className="text-xs text-slate-400">Calculates exact pricebook math & handles objections</div>
          </div>
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/30 border border-white/5">
            <div className="text-blue-500 font-mono text-xs font-bold">03</div>
            <div className="text-sm font-semibold text-white">Closed & Booked</div>
            <div className="text-xs text-slate-400">Locks calendar slot, collects deposit, notifies lead tech</div>
          </div>
        </motion.div>

        {/* Fast Proof Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
              38 sec
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Average Quote Speed</div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-['Outfit']">
              +42%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Quote-to-Job Close Rate</div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
              0
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Missed After-Hours Leads</div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-['Outfit']">
              $0
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Uncollected Deposits</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
