import React from 'react';
import { 
  ShieldCheck, 
  PhoneMissed, 
  Camera, 
  CreditCard, 
  MapPin, 
  Layers
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Pricebook Margin Guardrails',
      description: 'Define your flat-rate books, hourly labor, and minimum dispatch fees. Autodeck enforces your exact pricing logic with zero margin erosion.',
      tag: 'Margin Protection',
    },
    {
      icon: PhoneMissed,
      title: 'Missed-Call Instant SMS Recovery',
      description: 'When a customer calls while you are on a roof, Autodeck automatically texts them within 15 seconds to capture the lead before they call a competitor.',
      tag: 'Lead Capture',
    },
    {
      icon: Camera,
      title: 'Photo Diagnostic Parsing',
      description: 'Customers can text photos of water heater tags, AC units, or breaker boxes. Autodeck identifies model numbers and confirms replacement specs.',
      tag: 'Diagnostics',
    },
    {
      icon: CreditCard,
      title: 'Automated Booking Deposits',
      description: 'Eliminate tire-kickers and last-minute cancellations by collecting a $50–$250 deposit via Apple Pay or card before booking on your schedule.',
      tag: 'No-Show Defense',
    },
    {
      icon: MapPin,
      title: 'Route-Clustered Scheduling',
      description: 'Steer appointments to align with existing technician routes by neighborhood, reducing driving time and vehicle fuel expenses.',
      tag: 'Route Optimization',
    },
    {
      icon: Layers,
      title: 'Good / Better / Best Multi-Tier Quoting',
      description: 'Automatically present tiered replacement proposals with clear equipment differences, helping increase average ticket size.',
      tag: 'Tiered Proposals',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-[#0b0f17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Engineered for real contractor field operations
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Unlike generic chatbots, Autodeck is built specifically around dispatch fees, permit lead times, vehicle inventory, and pricebooks.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="surface-card-hover rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-['Outfit']">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
