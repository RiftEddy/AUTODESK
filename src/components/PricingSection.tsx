import React, { useState } from 'react';
import { Check, Zap, Sparkles, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, FAQS } from '../data/mockData';

interface PricingSectionProps {
  onOpenEarlyAccess: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenEarlyAccess }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Contractor Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Simple plans that pay for themselves on your first closed quote
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            No long-term contracts. No percentage take on your revenue. 14-day free pilot on all plans.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full glass border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'glass border-2 border-blue-500 shadow-2xl shadow-blue-600/20 -translate-y-2'
                    : 'glass-card border border-white/5 hover:border-white/20'
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-md border border-blue-400">
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {!plan.popular && plan.badge && (
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-2xl font-bold text-white font-['Outfit']">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-['Outfit']">
                        ${price}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        / month
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-mono">
                      {billingCycle === 'annual' ? 'Billed annually ($' + (price * 12) + '/yr)' : 'Billed month-to-month'}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-blue-400" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`pricing-${plan.id}-btn`}
                  onClick={onOpenEarlyAccess}
                  className={`w-full py-3 px-4 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-white/5">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Common questions from contractors and service business owners
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, fIdx) => {
              const isExpanded = expandedFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : fIdx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white font-['Outfit']">
                      {faq.question}
                    </span>
                    <span className="text-lg text-blue-400 font-mono">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 font-sans">
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
