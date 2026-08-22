import React from 'react';
import { Star, Quote, CheckCircle2, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Field Proven Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Trusted by 450+ trade contractors across the country
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            See how real plumbing, HVAC, electrical, and landscaping owners are putting their sales on autopilot.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-card border border-white/5 p-6 flex flex-col justify-between relative shadow-xl hover:border-white/15 transition-colors"
            >
              <div>
                {/* Metric pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.metric}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-['Outfit']">
                    {item.author}
                  </div>
                  <div className="text-[11px] text-blue-400 font-medium">
                    {item.role} • {item.company}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrations Strip */}
        <div className="mt-16 text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-6 font-mono">
            Seamlessly Integrates With Your Existing Field Stack
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 text-xs font-semibold">
            <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300">⚡ Google Calendar</span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300">💳 Stripe & Square</span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300">📗 QuickBooks Online</span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300">🛠️ Jobber & Housecall Pro</span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300">📱 Twilio & Apple Messages</span>
          </div>
        </div>

      </div>
    </section>
  );
};
