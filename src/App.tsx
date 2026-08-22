import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
import { ViewMode } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
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
            />
          </motion.div>
        ) : (
          <motion.div
            key="for-devs-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="flex-1"
          >
            {/* SPECIAL REQUIREMENT: Dedicated Conversational AI Interview Page for Developers */}
            <ForDevsPage onBackToLanding={() => handleNavigate('landing')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Early Access / 14-Day Free Pilot Modal */}
      <EarlyAccessModal
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
      />

    </div>
  );
}
