import React from 'react';
import { Zap, Terminal, Shield, Heart, Lock } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenEarlyAccess: () => void;
  onOpenAdminAccess?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEarlyAccess, onOpenAdminAccess }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white font-['Outfit'] tracking-tight">
                AUTODECK
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              The autonomous AI front desk and sales closer for service businesses and trade contractors. Instant quotes, 24/7 text negotiation, and zero-touch booking.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • 99.99% Quote Engine Uptime</span>
            </div>
          </div>

          {/* Col 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Product
            </h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#live-demo" className="hover:text-white transition-colors">Live Simulation</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Margin Guardrails</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Contractor Pricing</a></li>
            </ul>
          </div>

          {/* Col 2: Supported Trades */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Trades
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">HVAC & Heating</span></li>
              <li><span className="hover:text-white cursor-pointer">Master Plumbing</span></li>
              <li><span className="hover:text-white cursor-pointer">Electrical Contractors</span></li>
              <li><span className="hover:text-white cursor-pointer">Landscaping & Tree</span></li>
              <li><span className="hover:text-white cursor-pointer">Roofing & Remodeling</span></li>
            </ul>
          </div>

          {/* Col 3: Developers & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Developers
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('for-devs')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-300 font-mono cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>For Devs Portal</span>
                </button>
              </li>
              <li><span className="hover:text-white cursor-pointer">API & Webhooks</span></li>
              <li><span className="hover:text-white cursor-pointer">Pricebook Schema</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy & SOC-2</span></li>
              <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Discreet Admin Lock */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>
              © {new Date().getFullYear()} Autodeck Technologies, Inc. All rights reserved.
            </span>
            {/* Hidden / Discreet Admin Lock Symbol */}
            {onOpenAdminAccess && (
              <button
                type="button"
                id="footer-hidden-admin-lock-btn"
                onClick={onOpenAdminAccess}
                title="Admin Application Vault"
                aria-label="Admin Application Vault"
                className="opacity-20 hover:opacity-100 p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('for-devs')}
              className="text-slate-400 hover:text-blue-400 font-mono flex items-center gap-1 cursor-pointer"
            >
              <span>Built by developers for modern service pros</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
