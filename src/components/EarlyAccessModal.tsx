import React, { useState } from 'react';
import { X, Zap, CheckCircle2, Phone, Mail, Building, Flame, Droplets, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TradeType } from '../types';

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
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg rounded-3xl glass border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                14-Day Free Pilot
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Put your front desk on autopilot
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
              We’ll configure your pricebook guardrails and link your calendar in 10 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Trade Selection */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1.5">
                  Select Your Primary Trade:
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
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        trade === t.id
                          ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                          : 'bg-slate-900 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
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
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              {/* Owner Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                    Cell / Business SMS Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(512) 894-0231"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Crew Size */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                  Fleet / Crew Count:
                </label>
                <select
                  value={crewSize}
                  onChange={(e) => setCrewSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                >
                  <option value="1 Solo Truck">1 Truck (Solo Owner-Operator)</option>
                  <option value="2-5 Trucks">2–5 Trucks (Growing Crew)</option>
                  <option value="6-15 Trucks">6–15 Trucks (Regional Operation)</option>
                  <option value="15+ Trucks">15+ Trucks (Commercial / Multi-Location)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="modal-submit-pilot-btn"
                  className="w-full py-3.5 px-4 rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Start My 14-Day Free Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-2">
                  No credit card required to start • Pricebook onboarding included
                </p>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              You’re all set, {ownerName || 'Partner'}!
            </h3>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              We’ve reserved your spot for <span className="text-white font-semibold">{businessName}</span>. We sent a test quote simulation link to <span className="text-blue-400 font-mono">{phone}</span>.
            </p>

            <div className="p-4 rounded-2xl glass-card border border-white/10 text-left text-xs space-y-1.5 font-mono text-slate-300">
              <div className="text-blue-400 font-bold">Pilot Activation Steps:</div>
              <div>1. Upload your pricebook / rate sheet</div>
              <div>2. Sync your Google / Outlook calendar</div>
              <div>3. Forward missed calls & incoming SMS</div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-full bg-slate-900 border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
