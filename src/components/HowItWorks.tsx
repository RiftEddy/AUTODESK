import React, { useState } from 'react';
import { 
  MessageSquare, 
  Calculator, 
  Handshake, 
  CalendarCheck, 
  ArrowRight, 
  Zap, 
  Clock, 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Customer Messages In',
      subtitle: 'SMS, Web Form, or Missed-Call Voicemail',
      icon: MessageSquare,
      accentColor: 'from-blue-600 to-cyan-500',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      description:
        'A homeowner texts your business phone or fills a form: "My AC is blowing warm air in 78704" or "Need a 200A subpanel installed." Autodeck intercepts the lead in under 45 seconds.',
      details: [
        'Works with your existing business phone number',
        'Auto-transcribes voicemails and texts back immediately',
        'Instant multi-channel lead ingestion (SMS, Yelp, Google LSA)',
      ],
      previewCard: {
        tag: 'Lead Captured • 11:02 AM',
        content: '"Water is pooling under my kitchen sink! Can anyone come look today?"',
        sender: 'SMS from (512) 555-0192',
      },
    },
    {
      stepNumber: '02',
      title: 'AI Drafts & Sends Quote',
      subtitle: 'Strict Pricebook Math, Zero Undercharging',
      icon: Calculator,
      accentColor: 'from-amber-500 to-orange-600',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description:
        'Autodeck parses job specifics, cross-references your custom pricebook (labor rates, markup, minimum dispatch fee), and sends a professional flat-rate or tiered estimate.',
      details: [
        'Custom pricebook guardrails ensure target gross margins (60%+)',
        'Supports Good/Better/Best 3-tier proposals',
        'Can ask for photos of panels, pipework, or equipment labels',
      ],
      previewCard: {
        tag: 'Pricebook Matched • $189.00 - $340.00',
        content: 'Diagnostic $89 + standard P-trap rebuild ($180–$250). Quote dispatched in 32 seconds.',
        sender: 'Autodeck Estimation Engine',
      },
    },
    {
      stepNumber: '03',
      title: 'AI Negotiates & Closes',
      subtitle: 'Polite, Persistent, 24/7 SMS Salesperson',
      icon: Handshake,
      accentColor: 'from-purple-600 to-indigo-600',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      description:
        'Autodeck handles scheduling questions, time preferences, and budget hesitation. It offers smart morning/afternoon slots matching your tech routes until the customer says yes.',
      details: [
        'Follows up automatically after 15 mins if customer goes silent',
        'Answers technical questions (permits, warranty, payment options)',
        'Collects required booking deposit via Stripe link',
      ],
      previewCard: {
        tag: 'Objection Handled',
        content: 'Customer: "Can you do tomorrow 10am?" → Autodeck: "Locked in! Tech Dave is assigned."',
        sender: 'Autonomous SMS Negotiation',
      },
    },
    {
      stepNumber: '04',
      title: 'Job Booked & Invoiced',
      subtitle: 'Calendar Locked, QuickBooks/Jobber Updated',
      icon: CalendarCheck,
      accentColor: 'from-emerald-500 to-teal-600',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description:
        'The appointment lands on your calendar, the invoice is drafted in QuickBooks/Stripe, and a dispatch notification is sent to your technician. You just show up and turn the wrench.',
      details: [
        'Direct 2-way sync with Google Calendar, Outlook, and Jobber',
        'Automatic customer text reminders 24h & 1h prior',
        'Zero manual data entry at night after 10 hours in the field',
      ],
      previewCard: {
        tag: 'Calendar & Dispatch Synced',
        content: 'Event added to Master Schedule • Stripe Deposit Paid: $150.00 • Van #2 Assigned',
        sender: 'Auto-Dispatch Integration',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            How Autodeck closes jobs without you lifting a finger
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            From the first incoming inquiry to the signed estimate and calendar lock — 100% automated on your rules.
          </p>
        </div>

        {/* 4 Interactive Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = activeStep === index;

            return (
              <div
                key={step.stepNumber}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`relative rounded-2xl p-6 glass-card border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? 'border-blue-500/80 shadow-2xl shadow-blue-600/10 -translate-y-1 bg-slate-900/90'
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                <div>
                  {/* Top Bar: Step Number + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-500 font-mono">
                      {step.stepNumber}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white font-['Outfit']">
                    {step.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-400 mt-0.5 mb-3">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="mt-4 space-y-1.5 pt-4 border-t border-white/5">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro Preview Pill */}
                <div className="mt-5 p-2.5 rounded-xl bg-slate-900/90 border border-white/5 text-[11px]">
                  <div className="text-[10px] font-mono text-blue-400 font-bold mb-1">
                    {step.previewCard.tag}
                  </div>
                  <div className="text-slate-300 italic">
                    {step.previewCard.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Summary Banner */}
        <div className="mt-12 glass rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-['Outfit']">
                Human-in-the-Loop Override at any second
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Ondeck alerts your phone via SMS/push. If you ever want to step in and text the homeowner directly, 1 tap pauses the AI instantly.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Contractor Control
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
