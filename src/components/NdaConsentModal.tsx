import React, { useState, useEffect } from 'react';
import { ShieldAlert, FileText, CheckCircle2, Lock, ArrowRight, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NdaConsentModalProps {
  onAgree: () => void;
}

const NDA_STORAGE_KEY = 'autodeck_nda_accepted_v1';

export const NdaConsentModal: React.FC = () => {
  const [hasAgreed, setHasAgreed] = useState<boolean>(true); // default true to avoid flash while checking
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(NDA_STORAGE_KEY);
      if (accepted === 'true') {
        setHasAgreed(true);
      } else {
        setHasAgreed(false);
      }
    } catch {
      setHasAgreed(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(NDA_STORAGE_KEY, 'true');
      localStorage.setItem('autodeck_nda_accepted_timestamp', new Date().toISOString());
    } catch {
      // ignore
    }
    setHasAgreed(true);
  };

  if (hasAgreed) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-3xl glass border border-blue-500/30 shadow-2xl overflow-hidden bg-slate-950/95"
          id="nda-consent-banner"
        >
          {/* Top Banner Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex items-start gap-3.5 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  Confidentiality Notice
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  AUTODECK PROPRIETARY PREVIEW
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                Confidentiality & Non-Disclosure Agreement
              </h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-300">
            <p className="leading-relaxed text-slate-300">
              Welcome to <strong>Autodeck Technologies</strong>. Before accessing our trade automation models, multi-tier pricing algorithms, and dispatch state machines, you must agree to the Mutual Non-Disclosure Agreement (NDA).
            </p>

            {/* NDA Summary Box */}
            <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-4 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NDA Terms Summary (Standard 2-Year Term)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{isExpanded ? 'Collapse Full Text' : 'Read Full Legal Text'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <ul className="space-y-1.5 text-slate-300 text-[11px] sm:text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Proprietary IP Protection:</strong> Trade quote heuristics, prompt logic, and voice/SMS integration architecture are strictly proprietary.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Non-Disclosure:</strong> You agree not to copy, reverse-engineer, leak, benchmark, or distribute preview assets without written consent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Contractor Privacy:</strong> All live simulated contractor dispatch data and pricebook structures remain strictly confidential.</span>
                </li>
              </ul>

              {/* Collapsible Full Legal Text */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 border-t border-white/5 text-[10px] sm:text-[11px] text-slate-400 space-y-2 max-h-40 overflow-y-auto pr-1"
                  >
                    <p>
                      <strong>1. Confidential Information:</strong> "Confidential Information" refers to any non-public information disclosed by Autodeck Technologies, Inc. to the recipient, including software architectures, pricebook algorithms, SMS negotiation flows, and benchmark performance metrics.
                    </p>
                    <p>
                      <strong>2. Obligations of Recipient:</strong> The recipient agrees to hold and maintain the Confidential Information in strictest confidence for the sole purpose of evaluating Autodeck products. The recipient will not disclose or use the information for commercial reproduction or competitor benchmarking.
                    </p>
                    <p>
                      <strong>3. Term & Governing Law:</strong> This Agreement and the duty of confidentiality shall remain in effect for a period of two (2) years from the date of acceptance and shall be governed under applicable state and federal laws.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Checkbox Agreement */}
            <label className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors select-none">
              <input
                type="checkbox"
                id="nda-checkbox-agree"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer accent-cyan-500"
              />
              <span className="text-xs text-slate-300 font-medium">
                I have read and agree to the <strong>Autodeck Confidentiality & Non-Disclosure Agreement</strong>
              </span>
            </label>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Acceptance logged via verified session storage</span>
            </div>

            <button
              type="button"
              id="nda-agree-proceed-btn"
              disabled={!isChecked}
              onClick={handleAccept}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                isChecked
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Agree & Proceed</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
