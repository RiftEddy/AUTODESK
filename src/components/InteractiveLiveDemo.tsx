import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Send, 
  CheckCheck, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Smartphone, 
  ChevronRight, 
  FileText, 
  Receipt, 
  MapPin, 
  User, 
  Flame, 
  Droplets, 
  Zap, 
  Trees, 
  SlidersHorizontal,
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEMO_SCENARIOS } from '../data/mockData';
import { DemoScenario, DemoMessage } from '../types';

export const InteractiveLiveDemo: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const scenario = DEMO_SCENARIOS[selectedScenarioIndex];

  // Playback state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [customInput, setCustomInput] = useState<string>('');
  const [extraMessages, setExtraMessages] = useState<DemoMessage[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Reset when scenario changes
  useEffect(() => {
    setCurrentStep(1);
    setExtraMessages([]);
    setIsPlaying(true);
    setIsTyping(false);
  }, [selectedScenarioIndex]);

  // Auto-advance logic
  useEffect(() => {
    if (!isPlaying) return;

    const totalSteps = scenario.messages.length;
    if (currentStep >= totalSteps) {
      // Loop or stop
      const timer = setTimeout(() => {
        // stay completed or allow user to reset
      }, 3000);
      return () => clearTimeout(timer);
    }

    const nextMsg = scenario.messages[currentStep];
    const isAiMessage = nextMsg?.sender === 'autodeck';

    let delay = isAiMessage ? 2200 / playbackSpeed : 1600 / playbackSpeed;

    if (isAiMessage) {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, isPlaying, scenario, playbackSpeed]);

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentStep, isTyping, extraMessages]);

  const visibleMessages = [
    ...scenario.messages.slice(0, currentStep),
    ...extraMessages,
  ];

  const currentReasoning = scenario.aiReasoning[Math.min(currentStep > 2 ? 1 : 0, scenario.aiReasoning.length - 1)];

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userMsg: DemoMessage = {
      id: `custom-${Date.now()}`,
      sender: 'customer',
      timestamp: 'Just now',
      text: customInput,
    };

    setExtraMessages((prev) => [...prev, userMsg]);
    setCustomInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiReply: DemoMessage = {
        id: `ai-${Date.now()}`,
        sender: 'autodeck',
        timestamp: 'Just now',
        text: `Got it! I’ve updated the service ticket for ${scenario.businessName}. Our technician has this in their on-site notes. We will see you as scheduled!`,
        attachment: {
          type: 'calendar',
          title: 'Notes Attached to Work Order',
          subtitle: scenario.businessName,
          details: [`Customer note: "${userMsg.text.slice(0, 45)}..."`, 'Assigned to Lead Tech'],
        },
      };
      setExtraMessages((prev) => [...prev, aiReply]);
    }, 1400);
  };

  const handleQuickPrompt = (promptText: string) => {
    setCustomInput(promptText);
  };

  return (
    <section id="live-demo" className="py-16 md:py-24 bg-slate-950 relative border-y border-white/5">
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Watch Autodeck quote & close in real-time
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            See how incoming leads are converted into booked calendar jobs with exact pricebook estimates — zero human effort required.
          </p>
        </div>

        {/* Trade Scenarios Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {DEMO_SCENARIOS.map((item, idx) => {
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-500'
                    : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {item.trade === 'hvac' && <Flame className="w-4 h-4 text-amber-400" />}
                {item.trade === 'plumbing' && <Droplets className="w-4 h-4 text-blue-400" />}
                {item.trade === 'electrical' && <Zap className="w-4 h-4 text-yellow-400" />}
                {item.trade === 'landscaping' && <Trees className="w-4 h-4 text-emerald-400" />}
                <span>{item.tradeName}</span>
              </button>
            );
          })}
        </div>

        {/* Main Live Widget Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Smartphone SMS Simulation (7 cols) */}
          <div className="lg:col-span-7 glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[650px]">
            
            {/* Phone Top Header */}
            <div className="px-5 py-3.5 bg-slate-900/90 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs shadow">
                  👤
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-['Outfit']">
                      {scenario.customerName}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Now
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {scenario.customerPhone} • via SMS
                  </div>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-300" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setExtraMessages([]);
                    setIsPlaying(true);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Restart simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono font-bold text-blue-400 border border-white/10 cursor-pointer"
                  title="Playback speed"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Live Message Thread Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-950/60"
            >
              <div className="flex justify-center">
                <span className="text-[10px] text-slate-400 font-mono px-3 py-1 rounded-full bg-slate-900 border border-white/5">
                  ⚡ Autodeck Autonomous Channel Active
                </span>
              </div>

              <AnimatePresence>
                {visibleMessages.map((msg) => {
                  const isUser = msg.sender === 'customer';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] font-semibold text-slate-400">
                          {isUser ? scenario.customerName : 'Autodeck AI'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Message Bubble styled to match theme */}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isUser
                            ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                            : 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20'
                        }`}
                      >
                        {!isUser && (
                          <span className="text-[10px] block opacity-80 mb-1 font-bold uppercase tracking-wider font-mono">
                            Autodeck AI
                          </span>
                        )}
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Attachment Card if present */}
                      {msg.attachment && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="mt-2 max-w-[85%] sm:max-w-[80%] w-full rounded-2xl glass p-3.5 shadow-xl border border-blue-500/30"
                        >
                          <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                {msg.attachment.type === 'quote' && <FileText className="w-3.5 h-3.5 text-blue-400" />}
                                {msg.attachment.type === 'invoice' && <CreditCard className="w-3.5 h-3.5 text-emerald-400" />}
                                {msg.attachment.type === 'calendar' && <Calendar className="w-3.5 h-3.5 text-purple-400" />}
                                <span>{msg.attachment.title}</span>
                              </div>
                              <div className="text-[11px] text-slate-400">{msg.attachment.subtitle}</div>
                            </div>
                            {msg.attachment.amount && (
                              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {msg.attachment.amount}
                              </span>
                            )}
                          </div>

                          {msg.attachment.details && (
                            <ul className="space-y-1 text-[11px] text-slate-300">
                              {msg.attachment.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-white/5 w-fit"
                >
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] text-blue-300 font-mono">
                    Autodeck calculating quote...
                  </span>
                </motion.div>
              )}
            </div>

            {/* Quick Prompts Sandbox & Chat Input */}
            <div className="p-3.5 bg-slate-900/90 border-t border-white/5 space-y-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                <span className="text-slate-400 shrink-0 text-[10px] font-mono">Simulate reply:</span>
                <button
                  onClick={() => handleQuickPrompt("Can you do earlier in the morning?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 text-[11px] border border-white/5 cursor-pointer"
                >
                  "Can you do 8:00 AM?"
                </button>
                <button
                  onClick={() => handleQuickPrompt("Sounds great. Let's do it.")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 text-[11px] border border-white/5 cursor-pointer"
                >
                  "Sounds great. Let's do it."
                </button>
                <button
                  onClick={() => handleQuickPrompt("Do you guys do financing?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 text-[11px] border border-white/5 cursor-pointer"
                >
                  "Do you accept cards?"
                </button>
              </div>

              <form onSubmit={handleCustomSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={`Type custom customer SMS response...`}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT: AI Autonomous Brain & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Autonomous Engine Card */}
            <div className="glass rounded-3xl border border-white/10 p-5 shadow-xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Agent Pipeline Telemetry
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  Lat: 380ms
                </span>
              </div>

              {/* Live Reasoner Step */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Current AI Decision Node</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {currentReasoning?.title || 'Autonomous Quote Negotiation'}
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-white/5 font-sans">
                  {currentReasoning?.thought || 'Analyzing customer messages, mapping trade pricebook items, and verifying technician availability.'}
                </p>
              </div>

              {/* Extracted Structured Entities */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                  Extracted Scope & Pricebook Rules
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Urgency</span>
                    <span className="text-amber-400 font-semibold truncate block">
                      {currentReasoning?.extractedData.urgency || 'HIGH'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Price Quoted</span>
                    <span className="text-emerald-400 font-semibold truncate block">
                      {currentReasoning?.extractedData.quotedPrice || scenario.estimatedTicket}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5 col-span-2">
                    <span className="text-slate-500 block text-[10px]">Job Scope</span>
                    <span className="text-slate-200 truncate block">
                      {currentReasoning?.extractedData.jobType || scenario.title}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5 col-span-2">
                    <span className="text-slate-500 block text-[10px]">Parts & Labor Allocation</span>
                    <span className="text-slate-300 truncate block">
                      {currentReasoning?.extractedData.partsRequired || 'Stock Van Inventory'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guardrails Check */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-300 leading-tight">
                  <span className="font-bold block text-emerald-200">Owner Guardrail Check Passed</span>
                  {currentReasoning?.guardrailCheck || 'Price matches strict margin guidelines. Zero risk of undercharging.'}
                </div>
              </div>

            </div>

            {/* Calendar & Contractor App Notification Preview */}
            <div className="glass rounded-3xl border border-white/10 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 font-mono">
                  CALENDAR DISPATCH SYNC
                </span>
                <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Auto-Booked
                </span>
              </div>
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    Job Booked: {scenario.customerName} ({scenario.estimatedTicket})
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Tomorrow • 08:00 AM • Van #1 Assigned
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
