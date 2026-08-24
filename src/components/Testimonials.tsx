import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0b0f17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>Contractor Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Trusted by 450+ trade contractors
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            See how HVAC, plumbing, electrical, and roofing business owners are managing quotes and dispatching with Autodeck.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="surface-card rounded-xl p-6 flex flex-col justify-between border border-slate-800"
            >
              <div>
                {/* Metric pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-medium mb-4">
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
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white font-['Outfit']">
                    {item.author}
                  </div>
                  <div className="text-[11px] text-blue-400">
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
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-4 font-mono">
            Integrates directly with your current software stack
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800">Google Calendar</span>
            <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800">Stripe & Square</span>
            <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800">QuickBooks Online</span>
            <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800">Jobber</span>
            <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800">Housecall Pro</span>
            <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800">Twilio SMS</span>
          </div>
        </div>

      </div>
    </section>
  );
};
