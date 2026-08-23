import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Sparkles, 
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
  ChevronRight,
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
  { id: 'other', label: 'Something else / Hybrid', icon: Sparkles },
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
  // Step tracking: 0 = Intro typing, 1 = Question 1, 2 = Question 2, 3 = Question 3, 4 = Submitted
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Typewriter intro text state
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

  // Typewriter effect on mount
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
          setActiveStep(1); // reveal Question 1
        }, 500);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Auto scroll to latest question
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
    // Save to centralized application store for admin view
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
    console.log('✅ Autodeck Developer Interview Submission Captured In-Memory:', payload);
    setActiveStep(4); // Success state
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col"
    >
      {/* Top Dev Header Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/5 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            id="dev-back-home-btn"
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Autodeck Home</span>
          </button>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Developer Interview & Architecture</span>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Status:</span>
          {activeStep === 4 ? (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
              Submitted
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">
              Step {Math.min(Math.max(activeStep, 1), 3)} of 3
            </span>
          )}
        </div>
      </header>

      {/* Main Conversational Interface */}
      <main 
        ref={containerRef}
        className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 overflow-y-auto space-y-8"
      >
        
        {/* Terminal Header Card */}
        <div className="rounded-3xl glass border border-white/10 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-500">
              autodeck-interview-bot://interactive-session
            </span>
          </div>

          {/* AI Intro Typing message */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono text-blue-400 font-semibold mb-1">
                Autodeck Founding Bot
              </div>
              <p className="text-base sm:text-lg text-slate-100 font-medium font-mono leading-relaxed">
                {displayedIntro}
                {isTypingIntro && (
                  <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse" />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* QUESTION 1: Background */}
        {activeStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl p-6 border transition-all duration-300 ${
              activeStep === 1
                ? 'glass border-blue-500/60 shadow-2xl shadow-blue-600/10'
                : 'glass-card border-white/5 opacity-90'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold mb-2">
              <span>Question 01</span>
              <span>•</span>
              <span>Engineering Background</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-4">
              What's your background — frontend, backend, full-stack, AI/agents, or something else?
            </h3>

            {/* Background Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {BACKGROUND_OPTIONS.map((opt) => {
                const isSelected = selectedBackground === opt.label;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={activeStep > 1 && activeStep !== 4}
                    onClick={() => {
                      setSelectedBackground(opt.label);
                      if (opt.id !== 'other') setCustomBackground('');
                    }}
                    className={`p-3 rounded-2xl text-left text-xs font-medium border flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-900/80 border-white/5 text-slate-300 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom note or specific stack */}
            <input
              type="text"
              disabled={activeStep > 1 && activeStep !== 4}
              value={customBackground}
              onChange={(e) => setCustomBackground(e.target.value)}
              placeholder="Or add details on your primary languages / frameworks (e.g. Next.js, FastAPI, LangGraph)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
            />

            {/* Step 1 CTA */}
            {activeStep === 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleStep1Next}
                  disabled={!selectedBackground && !customBackground.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* QUESTION 2: Excitement Focus */}
        {activeStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl p-6 border transition-all duration-300 ${
              activeStep === 2
                ? 'glass border-purple-500/60 shadow-2xl shadow-purple-600/10'
                : 'glass-card border-white/5 opacity-90'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold mb-2">
              <span>Question 02</span>
              <span>•</span>
              <span>Mission & Technical Challenges</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-4">
              What excites you about AI + automation for small service businesses?
            </h3>

            {/* Tags Selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              {EXCITEMENT_TAGS.map((tag) => {
                const isSelected = selectedExcitementTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    disabled={activeStep > 2 && activeStep !== 4}
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Optional open text area */}
            <textarea
              rows={3}
              disabled={activeStep > 2 && activeStep !== 4}
              value={customExcitement}
              onChange={(e) => setCustomExcitement(e.target.value)}
              placeholder="What kind of architecture, agents, or software problems do you love tackling? (Optional thoughts)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono resize-none"
            />

            {/* Step 2 CTA */}
            {activeStep === 2 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleStep2Next}
                  disabled={selectedExcitementTags.length === 0 && !customExcitement.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
                >
                  <span>Next: Contact Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* QUESTION 3: Contact & Submission Form */}
        {activeStep >= 3 && activeStep !== 4 && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl p-6 glass border border-blue-500/60 shadow-2xl shadow-blue-600/10 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <span>Question 03</span>
              <span>•</span>
              <span>Contact & Profiles</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              How can we reach you?
            </h3>
            <p className="text-xs text-slate-400">
              We review submissions directly and reach out for technical chats, open roles, or early architecture testing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={devName}
                    onChange={(e) => setDevName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={devEmail}
                    onChange={(e) => setDevEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                  GitHub / Portfolio / LinkedIn / X (Optional)
                </label>
                <div className="relative">
                  <Github className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={devGithub}
                    onChange={(e) => setDevGithub(e.target.value)}
                    placeholder="github.com/yourhandle or your personal site"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1">
                  Anything else you'd like to share or ask? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={devNotes}
                  onChange={(e) => setDevNotes(e.target.value)}
                  placeholder="Tell us about a favorite project you've built or what you're tinkering with..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans resize-none"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Data captured in-memory for this demo session
              </span>
              <button
                type="submit"
                id="dev-submit-interview-btn"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Response</span>
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 4: Success & Friendly Confirmation Animation */}
        <AnimatePresence>
          {activeStep === 4 && submissionData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl glass border border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6"
            >
              {/* Success Badge */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Thanks {submissionData.name}! We'll be in touch.
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Your developer profile has been captured in-memory and logged to the developer console.
                  </p>
                </div>
              </div>

              {/* In-Memory JSON Inspector */}
              <div className="bg-slate-950 rounded-2xl border border-white/10 p-4 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
                  <span className="text-[11px] text-blue-400 font-bold">
                    Captured Developer Payload (In-Memory Mockup)
                  </span>
                  <button
                    onClick={handleCopyPayload}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 hover:bg-slate-800 text-[10px] text-slate-300 transition-colors cursor-pointer"
                  >
                    {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] text-emerald-300/90 leading-relaxed max-h-60 overflow-y-auto">
                  {JSON.stringify(submissionData, null, 2)}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-mono transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Interview</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onBackToLanding}
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                  >
                    Return to Product Demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </motion.div>
  );
};
