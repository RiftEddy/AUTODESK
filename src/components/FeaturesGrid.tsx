import React from 'react';
import { 
  ShieldCheck, 
  PhoneMissed, 
  Camera, 
  CreditCard, 
  MapPin, 
  Sliders, 
  Calendar, 
  Clock, 
  MessageSquareCode,
  Sparkles,
  Zap,
  Flame,
  Layers
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Pricebook Margin Guardrails',
      description: 'Upload your rate card or flat-rate books. Autodeck guarantees that every quote respects your minimum trip charges, parts markup, and labor rates.',
      tag: 'Zero Undercharging',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: PhoneMissed,
      title: 'Missed-Call Instant SMS Recovery',
      description: 'When a customer calls while you’re on a ladder, Autodeck texts them back within 15 seconds: "Hey, Marcus with Apex Air here—saw we just missed you! How can we help?"',
      tag: 'Stop Lost Leads',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Camera,
      title: 'Photo & Video Diagnostic Parsing',
      description: 'Customers can text photos of water heater tags, electrical panels, or AC condensers. Autodeck reads model numbers, assesses capacity, and suggests correct replacement parts.',
      tag: 'Computer Vision',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: CreditCard,
      title: 'Automated Booking Deposits',
      description: 'Eliminate tire-kickers and no-shows. Autodeck automatically collects a $50–$250 deposit via Apple Pay or credit card link before putting them on your calendar.',
      tag: '0% No-Shows',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: MapPin,
      title: 'Route-Smart Dispatch Optimization',
      description: 'Autodeck knows where your trucks are. If Tech #2 is in South Austin on Thursday morning, it steers nearby leads to that exact window to save on fuel and drive time.',
      tag: 'Cluster Scheduling',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: Layers,
      title: 'Good / Better / Best Multi-Tier Quoting',
      description: 'Automatically generate 3-tier proposals for replacements. Homeowners love having options, and contractors see an average 24% increase in average ticket size.',
      tag: 'Higher Average Ticket',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Built For Field Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Engineered for trade businesses in the real world
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Unlike generic chatbots, Autodeck understands dispatch fees, permit lead times, truck stock limitations, and booking deposits.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/5 p-6 hover:border-white/20 hover:bg-slate-900/80 transition-all group shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-600/10 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </div>
                  <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-['Outfit'] group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
