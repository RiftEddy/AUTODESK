import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Layers, 
  Globe, 
  Mail, 
  User, 
  Github, 
  RotateCcw, 
  Copy, 
  Check, 
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DeveloperApplication } from '../types';
import { addDeveloperApplication } from '../services/applicationStore';

interface ForDevsPageProps {
  onBackToLanding: () => void;
}

const BACKGROUND_OPTIONS = [
  { id: 'fullstack', label: 'Full-stack (TypeScript / React / Node)', icon: Layers },
  { id: 'ai-agents', label: 'AI Agents / LLMOps / Autonomous Workflows', icon: Cpu },
  { id: 'backend', label: 'Backend & Distributed Systems (Go / Python / Rust)', icon: Terminal },
  { id: 'frontend', label: 'Frontend / UI Engineering & Motion Design', icon: Code2 },
  { id: 'mobile', label: 'Mobile Engineering (React Native / iOS / Android)', icon: Globe },
  { id: 'other', label: 'Something else / Hybrid', icon: Code2 },
];

const EXCITEMENT_TAGS = [
  'Real-time autonomous SMS state machines',
  'Strict deterministic pricebook guardrails for AI',
  'Multi-modal computer vision (analyzing breaker panels & HVAC)',
  'Zero-friction human-in-the-loop takeover UX',
  'Replacing legacy fragmented SMB software with pure intelligence',
  'Low-latency edge reasoning (< 500ms response)',
];

export const ForDevsPage: React.FC<ForDevsPageProps> = ({ onBackToLanding }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  const introFullText = "Hey — are you a developer interested in what we're building at Autodeck?";
  const [displayedIntro, setDisplayedIntro] = useState<string>('');
  const [isTypingIntro, setIsTypingIntro] = useState<boolean>(true);

  // Form states
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [customBackground, setCustomBackground] = useState<string>('');
  
  const [selectedExcitementTags, setSelectedExcitementTags] = useState<string[]>([]);
  const [customExcitement, setCustomExcitement] = useState<string>('');

  const [devName, setDevName] = useState<string>('');
  const [devEmail, setDevEmail] = useState<string>('');
  const [devGithub, setDevGithub] = useState<string>('');
  const [devNotes, setDevNotes] = useState<string>('');

  const [submissionData, setSubmissionData] = useState<DeveloperApplication | null>(null);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    setDisplayedIntro('');
    setIsTypingIntro(true);

    const interval = setInterval(() => {
      if (index < introFullText.length) {
        setDisplayedIntro(introFullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingIntro(false);
        clearInterval(interval);
        setTimeout(() => {
          setActiveStep(1);
        }, 400);
      }
    }, 24);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [activeStep, isTypingIntro]);

  const handleToggleTag = (tag: string) => {
    setSelectedExcitementTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleStep1Next = () => {
    if (!selectedBackground && !customBackground.trim()) return;
    setActiveStep(2);
  };

  const handleStep2Next = () => {
    if (selectedExcitementTags.length === 0 && !customExcitement.trim()) return;
    setActiveStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devName.trim() || !devEmail.trim()) return;

    const payload: DeveloperApplication = {
      background: selectedBackground || 'Custom',
      customBackground: customBackground.trim() || undefined,
      excitementFocus: selectedExcitementTags,
      customExcitement: customExcitement.trim() || undefined,
      name: devName.trim(),
      email: devEmail.trim(),
      githubOrPortfolio: devGithub.trim() || undefined,
      notes: devNotes.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    setSubmissionData(payload);
    addDeveloperApplication({
      background: payload.background,
      customBackground: payload.customBackground,
      excitementFocus: payload.excitementFocus,
      customExcitement: payload.customExcitement,
      name: payload.name,
      email: payload.email,
      githubOrPortfolio: payload.githubOrPortfolio,
      notes: payload.notes,
    });
    setActiveStep(4);
  };

  const handleCopyPayload = () => {
    if (!submissionData) return;
    navigator.clipboard.writeText(JSON.stringify(submissionData, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleReset = () => {
    setSelectedBackground('');
    setCustomBackground('');
    setSelectedExcitementTags([]);
    setCustomExcitement('');
    setDevName('');
    setDevEmail('');
    setDevGithub('');
    setDevNotes('');
    setSubmissionData(null);
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      {/* Top Dev Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            id="dev-back-home-btn"
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Developer Portal</span>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Status:</span>
          {activeStep === 4 ? (
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
              Submitted
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-bold border border-slate-700">
              Step {Math.min(Math.max(activeStep, 1), 3)} of 3
            </span>
          )}
        </div>
      </header>

      {/* Main Conversational Interface */}
      <main 
        ref={containerRef}
        className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 overflow-y-auto space-y-6"
      >
        
        {/* Terminal Header Card */}
        <div className="rounded-xl surface-card border border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="ml-2 text-xs font-mono text-slate-500">
              autodeck-portal://session
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono text-blue-400 font-semibold mb-1">
                Autodeck Bot
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-medium font-mono leading-relaxed">
                {displayedIntro}
                {isTypingIntro && (
                  <span className="inline-block w-1.5 h-3.5 ml-1 bg-blue-400 animate-pulse" />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* QUESTION 1: Background */}
        {activeStep >= 1 && (
          <div className="rounded-xl surface-card p-6 border border-slate-800 space-y-4">
            <div>
              <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                Question 01
              </span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                What is your primary engineering focus?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BACKGROUND_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedBackground === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={activeStep > 1}
                    onClick={() => {
                      setSelectedBackground(opt.id);
                      setCustomBackground('');
                    }}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    } ${activeStep > 1 ? 'opacity-80 cursor-default' : ''}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {activeStep === 1 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleStep1Next}
                  disabled={!selectedBackground && !customBackground.trim()}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Continue to Question 2 →
                </button>
              </div>
            )}
          </div>
        )}

        {/* QUESTION 2: Excitement Focus */}
        {activeStep >= 2 && (
          <div className="rounded-xl surface-card p-6 border border-slate-800 space-y-4">
            <div>
              <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                Question 02
              </span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                Which technical challenges interest you most?
              </h3>
            </div>

            <div className="space-y-2">
              {EXCITEMENT_TAGS.map((tag) => {
                const isSelected = selectedExcitementTags.includes(tag);
                return (
                  <button
                    key={tag}
                    disabled={activeStep > 2}
                    onClick={() => handleToggleTag(tag)}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950 text-blue-200 border-blue-800'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    } ${activeStep > 2 ? 'opacity-80 cursor-default' : ''}`}
                  >
                    <span className="text-xs">{tag}</span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700'}`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {activeStep === 2 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleStep2Next}
                  disabled={selectedExcitementTags.length === 0 && !customExcitement.trim()}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Continue to Final Step →
                </button>
              </div>
            )}
          </div>
        )}

        {/* QUESTION 3: Details & Submission */}
        {activeStep >= 3 && activeStep < 4 && (
          <form onSubmit={handleSubmit} className="rounded-xl surface-card p-6 border border-slate-800 space-y-4">
            <div>
              <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                Question 03
              </span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                Your contact details & links
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={devEmail}
                  onChange={(e) => setDevEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">GitHub / Portfolio URL</label>
              <input
                type="url"
                value={devGithub}
                onChange={(e) => setDevGithub(e.target.value)}
                placeholder="https://github.com/yourhandle"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Additional Notes</label>
              <textarea
                rows={2}
                value={devNotes}
                onChange={(e) => setDevNotes(e.target.value)}
                placeholder="What projects or agent architectures are you proud of?"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Submit Developer Profile
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success confirmation */}
        {activeStep === 4 && submissionData && (
          <div className="rounded-xl surface-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  Profile Recorded, {submissionData.name}!
                </h3>
                <div className="text-xs text-slate-400">
                  We'll be in touch at <span className="text-blue-400 font-mono">{submissionData.email}</span>.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <pre>{JSON.stringify(submissionData, null, 2)}</pre>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyPayload}
                className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
              </button>
              <button
                onClick={onBackToLanding}
                className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white cursor-pointer"
              >
                Back to Landing Page
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
