import React from 'react';
import { Terminal, Shield, Zap, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenDemo: () => void;
  onOpenEarlyAccess: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenDemo,
  onOpenEarlyAccess,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-white/5 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/25 group-hover:scale-105 transition-all">
              <Zap className="w-4 h-4 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                  Autodeck
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                  AI AGENT
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {currentView === 'landing' && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
              <a
                href="#live-demo"
                className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                Live Demo
              </a>
              <a
                href="#how-it-works"
                className="hover:text-blue-400 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#calculator"
                className="hover:text-blue-400 transition-colors"
              >
                ROI
              </a>
              <a
                href="#pricing"
                className="hover:text-blue-400 transition-colors"
              >
                Pricing
              </a>
            </nav>
          )}
        </div>

        {/* Right CTA Area + Special 'For Devs' Button */}
        <div className="flex items-center gap-4">
          
          {/* SPECIAL REQUIREMENT: "For Devs" Secondary Ghost Button */}
          <button
            id="for-devs-nav-btn"
            onClick={() => onNavigate(currentView === 'for-devs' ? 'landing' : 'for-devs')}
            className={`group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 cursor-pointer ${
              currentView === 'for-devs'
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 shadow-sm'
                : 'border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
            title="Developer interview & engineering architecture"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span className="font-semibold">
              {currentView === 'for-devs' ? '← Back to Home' : 'FOR_DEVS'}
            </span>
            {currentView !== 'for-devs' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>

          {/* Primary CTA */}
          {currentView === 'landing' ? (
            <button
              id="nav-get-started-btn"
              onClick={onOpenEarlyAccess}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 cursor-pointer"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="dev-nav-view-demo-btn"
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-white/10 hover:bg-white/5 text-slate-200 transition-all cursor-pointer"
            >
              <span>View Product Demo</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
