import React from 'react';
import { Layers, Terminal, Lock } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenEarlyAccess: () => void;
  onOpenAdminAccess?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEarlyAccess, onOpenAdminAccess }) => {
  return (
    <footer className="bg-[#0b0f17] border-t border-slate-800 pt-16 pb-24 md:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-white font-['Outfit'] tracking-tight">
                AUTODECK
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Autonomous quoting, 24/7 SMS lead response, and automated calendar dispatching for residential and commercial trade businesses.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>All Systems Operational • Uptime 99.98%</span>
            </div>
          </div>

          {/* Col 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Workflow</a></li>
              <li><a href="#live-demo" className="hover:text-white transition-colors">Interactive Demo</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Capabilities</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Col 2: Supported Trades */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Supported Trades
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>HVAC & Heating</li>
              <li>Plumbing & Water Heaters</li>
              <li>Electrical & Panels</li>
              <li>Landscaping & Tree Care</li>
              <li>Roofing & Remodeling</li>
            </ul>
          </div>

          {/* Col 3: Developers & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Integrations & Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('for-devs')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 font-mono cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Developer Portal</span>
                </button>
              </li>
              <li><span className="hover:text-white">QuickBooks Sync</span></li>
              <li><span className="hover:text-white">Jobber & Housecall Pro API</span></li>
              <li><span className="hover:text-white">Twilio & Stripe Webhooks</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright, nialekaeti Watermark & Discreet Admin Lock */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              © {new Date().getFullYear()} Autodeck Technologies. All rights reserved.
            </span>
            <span>•</span>
            <a
              href="https://nialekaeti.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-bold font-mono shadow-sm hover:border-slate-700 transition-all"
            >
              <span className="text-white">niale</span>
              <span className="text-red-500">kaeti</span>
            </a>
            {onOpenAdminAccess && (
              <button
                onClick={onOpenAdminAccess}
                title="Admin portal"
                className="opacity-40 hover:opacity-100 transition-opacity p-1 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span>
              crafted by{' '}
              <a
                href="https://nialekaeti.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold font-mono hover:underline"
              >
                <span className="text-white">niale</span>
                <span className="text-red-500">kaeti</span>
              </a>
            </span>
            <span>•</span>
            <button
              onClick={onOpenEarlyAccess}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Request Access
            </button>
            <span>•</span>
            <span className="text-slate-500">v2.4.0 Production</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
