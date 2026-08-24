import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Building, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TradeType } from '../types';
import { addContractorApplication } from '../services/applicationStore';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [trade, setTrade] = useState<TradeType>('hvac');
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [crewSize, setCrewSize] = useState('2-5 Trucks');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone) return;
    
    addContractorApplication({
      trade,
      businessName: businessName.trim(),
      ownerName: ownerName.trim() || 'Owner',
      phone: phone.trim(),
      email: email.trim() || undefined,
      crewSize,
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="relative w-full max-w-lg rounded-xl surface-card border border-slate-800 p-5 sm:p-8 shadow-xl max-h-[92vh] overflow-y-auto my-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-2">
              <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
                14-Day Free Pilot
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Request contractor access
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
              We will configure your pricebook guardrails and link your dispatch calendar in 10 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Trade Selection */}
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1.5">
                  Primary Trade:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hvac', label: 'HVAC' },
                    { id: 'plumbing', label: 'Plumbing' },
                    { id: 'electrical', label: 'Electrical' },
                    { id: 'landscaping', label: 'Landscaping' },
                    { id: 'roofing', label: 'Roofing / Other' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTrade(t.id as TradeType)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        trade === t.id
                          ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                  Business Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Precision Heating & Air"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              {/* Owner Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                    Direct SMS Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(512) 894-0231"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Crew Size */}
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                  Fleet / Crew Size:
                </label>
                <select
                  value={crewSize}
                  onChange={(e) => setCrewSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                >
                  <option value="1 Solo Truck">1 Truck (Solo Owner-Operator)</option>
                  <option value="2-5 Trucks">2–5 Trucks (Growing Crew)</option>
                  <option value="6-15 Trucks">6–15 Trucks (Regional Fleet)</option>
                  <option value="15+ Trucks">15+ Trucks (Multi-Location)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="modal-submit-pilot-btn"
                  className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Start 14-Day Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  No credit card required • Includes 1-on-1 pricebook onboarding
                </p>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Request received, {ownerName || 'Partner'}
            </h3>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              We have provisioned a sandbox workspace for <span className="text-white font-semibold">{businessName}</span>. A confirmation has been sent to <span className="text-blue-400 font-mono">{phone}</span>.
            </p>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-left text-xs space-y-1.5 font-mono text-slate-300">
              <div className="text-blue-400 font-semibold">Onboarding Checklist:</div>
              <div>1. Connect your rate sheet & margin targets</div>
              <div>2. Link Google Calendar or Jobber</div>
              <div>3. Activate missed-call SMS forwarding</div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Return to Overview
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
