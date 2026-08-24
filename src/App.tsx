import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveLiveDemo } from './components/InteractiveLiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesGrid } from './components/FeaturesGrid';
import { RoiCalculator } from './components/RoiCalculator';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ForDevsPage } from './components/ForDevsPage';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { AdminAccessModal } from './components/AdminAccessModal';
import { NdaConsentModal } from './components/NdaConsentModal';
import { Play, Sparkles, Terminal } from 'lucide-react';
import { ViewMode } from './types';

function MainLayout() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState<boolean>(false);
  const [isAdminAccessOpen, setIsAdminAccessOpen] = useState<boolean>(false);

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToDemo = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const demoElement = document.getElementById('live-demo');
        if (demoElement) {
          demoElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const demoElement = document.getElementById('live-demo');
      if (demoElement) {
        demoElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
      
      {/* Sticky Global Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenDemo={handleScrollToDemo}
        onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
      />

      {/* Main View Router with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {/* 1. Hero Section */}
            <Hero
              onScrollToDemo={handleScrollToDemo}
              onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
            />

            {/* 2. Interactive Live Demo Simulated Widget */}
            <InteractiveLiveDemo />

            {/* 3. "How it Works" 4-Step Visual Flow */}
            <HowItWorks />

            {/* 4. Concrete Contractor Field Features */}
            <FeaturesGrid />

            {/* 5. Recovered Revenue ROI Calculator */}
            <RoiCalculator onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} />

            {/* 6. Pricing Section */}
            <PricingSection onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} />

            {/* 7. Contractor Testimonials & Proof */}
            <Testimonials />

            {/* 8. Footer */}
            <Footer
              onNavigate={handleNavigate}
              onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
              onOpenAdminAccess={() => setIsAdminAccessOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="for-devs-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* SPECIAL REQUIREMENT: Dedicated Conversational AI Interview Page for Developers */}
            <ForDevsPage onBackToLanding={() => handleNavigate('landing')} />
            <Footer
              onNavigate={handleNavigate}
              onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
              onOpenAdminAccess={() => setIsAdminAccessOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Action Quick-Dock */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40 flex items-center justify-between p-1.5 rounded-2xl bg-[#0d131f]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl">
        <button
          onClick={handleScrollToDemo}
          className="flex-1 py-2 px-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80 active:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
          <span>Live Demo</span>
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        <button
          onClick={() => setIsEarlyAccessOpen(true)}
          className="flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold bg-blue-600 active:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Request Pilot</span>
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        <button
          onClick={() => handleNavigate(currentView === 'landing' ? 'for-devs' : 'landing')}
          className="py-2 px-2.5 rounded-xl text-[11px] font-mono text-slate-400 hover:text-white hover:bg-slate-800/80 active:bg-slate-800 flex items-center justify-center gap-1 transition-colors cursor-pointer"
          title="Toggle Developer Mode"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentView === 'landing' ? 'Devs' : 'Home'}</span>
        </button>
      </div>

      {/* Early Access / 14-Day Free Pilot Modal */}
      <EarlyAccessModal
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
      />

      {/* Secret Admin Application Vault Modal (Requires PIN: 2699263) */}
      <AdminAccessModal
        isOpen={isAdminAccessOpen}
        onClose={() => setIsAdminAccessOpen(false)}
      />

      {/* NDA / Confidentiality Agreement Pop-up Banner */}
      <NdaConsentModal />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

