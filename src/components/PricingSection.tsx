import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, FAQS } from '../data/mockData';

interface PricingSectionProps {
  onOpenEarlyAccess: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenEarlyAccess }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#0b0f17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Plans for solo contractors and multi-truck fleets
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            No long-term contracts. No percentage take on your gross job revenue.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-20 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors ${
                  plan.popular
                    ? 'surface-card border-2 border-blue-600 shadow-sm relative'
                    : 'surface-card border border-slate-800'
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-600 text-white">
                      Recommended
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white font-['Outfit']">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white font-['Outfit']">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {billingCycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono">
                      What's Included:
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={onOpenEarlyAccess}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors cursor-pointer text-center ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="surface-card rounded-lg border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-500 font-mono text-base ml-2">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
