import React, { useState } from 'react';
import { Layers, Sun, Moon, Menu, X, Terminal, ArrowRight, Play } from 'lucide-react';
import { ViewMode } from '../types';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Watermark */}
        <div className="flex items-center gap-4 lg:gap-8 min-w-0">
          <button
            id="brand-logo-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('landing');
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-sm shrink-0">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white font-['Outfit']">
                Autodeck
              </span>
              <span className="hidden xs:inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                Contractor OS
              </span>
              <a
                href="https://nialekaeti.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm transition-all"
                title="Creator: nialekaeti"
              >
                <span className="text-white">niale</span>
                <span className="text-red-500">kaeti</span>
              </a>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {currentView === 'landing' && (
            <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-400">
              <button
                onClick={onOpenDemo}
                className="hover:text-white transition-colors text-slate-300 cursor-pointer"
              >
                Interactive Demo
              </button>
              <a
                href="#how-it-works"
                className="hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Capabilities
              </a>
              <a
                href="#calculator"
                className="hover:text-white transition-colors"
              >
                ROI Calculator
              </a>
              <a
                href="#pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </a>
            </nav>
          )}
        </div>

        {/* Right Actions, Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Light / Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-slate-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* CTA Request Access (Desktop & Tablet) */}
          <button
            id="nav-early-access-btn"
            onClick={onOpenEarlyAccess}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-sm"
          >
            Request Access
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d131f] px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleMobileNav(onOpenDemo)}
              className="w-full py-2.5 px-3 rounded-lg text-left text-sm font-medium text-slate-200 bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-400" />
                <span>Interactive Live Demo</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>

            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white block"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white block"
            >
              Core Capabilities
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white block"
            >
              ROI Calculator
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white block"
            >
              Pricing Plans
            </a>
            <button
              onClick={() => handleMobileNav(() => onNavigate('for-devs'))}
              className="w-full py-2 px-3 rounded-lg text-left text-sm font-mono text-slate-400 hover:text-white hover:bg-slate-800/60 flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Developer Portal</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => handleMobileNav(onOpenEarlyAccess)}
              className="w-full py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white text-center shadow-sm"
            >
              Request 14-Day Pilot Access
            </button>
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
              <span>Creator:</span>
              <a
                href="https://nialekaeti.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                <span className="text-white">niale</span>
                <span className="text-red-500">kaeti</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
