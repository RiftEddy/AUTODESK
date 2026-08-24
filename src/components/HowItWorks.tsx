import React, { useState } from 'react';
import { 
  MessageSquare, 
  Calculator, 
  Handshake, 
  CalendarCheck, 
  ArrowRight, 
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Customer Inquires via SMS or Form',
      subtitle: 'Instant Multi-Channel Capture',
      icon: MessageSquare,
      description:
        'A homeowner texts your business phone or submits an online lead form. Autodeck intercepts the lead in under 45 seconds while you are in the field.',
      highlights: [
        'Works with your existing business phone number',
        'Auto-transcribes missed call voicemails and texts back immediately',
        'Ingests leads from SMS, web forms, Yelp, and Google LSA',
      ],
    },
    {
      stepNumber: '02',
      title: 'Pricebook Rules Calculate the Quote',
      subtitle: 'Deterministic Margins & Parts Math',
      icon: Calculator,
      description:
        'Autodeck parses the issue, cross-references your custom pricebook (labor rates, minimum trip charges, and materials markup), and drafts a strict estimate.',
      highlights: [
        'Guaranteed minimum margin thresholds (no underquoting)',
        'Supports Good / Better / Best replacement tiers',
        'Prompts customer for equipment model tag photos if needed',
      ],
    },
    {
      stepNumber: '03',
      title: 'Autodeck Negotiates & Closes',
      subtitle: '24/7 Scheduling & Objection Handling',
      icon: Handshake,
      description:
        'Autodeck answers availability questions, recommends route-optimized schedule windows, and sends a secure deposit link to lock in the job.',
      highlights: [
        'Automatic follow-up if customer hesitates or goes cold',
        'Collects card deposits ($50–$250) to prevent no-shows',
        'Answers scope questions (permits, warranties, time estimates)',
      ],
    },
    {
      stepNumber: '04',
      title: 'Job Booked, Dispatched & Synced',
      subtitle: 'Zero Manual Nighttime Admin',
      icon: CalendarCheck,
      description:
        'The appointment is locked onto your team calendar, the draft invoice appears in QuickBooks, and a dispatch SMS is sent to the assigned technician.',
      highlights: [
        '2-way calendar sync (Google Calendar, Outlook, Jobber)',
        'Automated customer SMS reminders 24h and 1h before arrival',
        'All job notes and customer photos attached to the work order',
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#0b0f17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>Operational Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            How Autodeck runs your front desk
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            From first text to paid deposit, Autodeck automates the entire sales and dispatch loop so your technicians can stay focused on the job.
          </p>
        </div>

        {/* 4-Step Linear Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="surface-card rounded-xl p-6 flex flex-col justify-between border border-slate-800"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-['Outfit'] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs text-blue-400 font-medium mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    {step.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
