import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  CheckCheck, 
  Calendar, 
  FileText, 
  CreditCard, 
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Flame,
  Droplets,
  Zap,
  Trees,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/mockData';
import { DemoMessage } from '../types';

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
  const [mobileTab, setMobileTab] = useState<'chat' | 'inspector'>('chat');

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
      return;
    }

    const nextMsg = scenario.messages[currentStep];
    const isAiMessage = nextMsg?.sender === 'autodeck';

    const delay = isAiMessage ? 2000 / playbackSpeed : 1400 / playbackSpeed;

    if (isAiMessage) {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }, delay);

    return () => clearTimeout(timer);
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
        text: `Understood! I've noted that for the technician. Our standard diagnostic fee is applied and we'll have Dave out with the right parts.`,
      };
      setExtraMessages((prev) => [...prev, aiReply]);
    }, 1200);
  };

  const getTradeIcon = (trade: string) => {
    switch (trade.toLowerCase()) {
      case 'hvac':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'plumbing':
        return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'electrical':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'landscaping':
        return <Trees className="w-4 h-4 text-emerald-400" />;
      default:
        return <SlidersHorizontal className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="live-demo" className="py-16 md:py-24 bg-[#0b0f17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Outfit']">
            Watch Autodeck close an inbound lead in real time
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Select a trade scenario below to simulate how Autodeck responds, calculates pricebook estimates, and books the customer into your schedule.
          </p>
        </div>

        {/* Scenario Switcher Tabs (Scrollable on mobile) */}
        <div className="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8 px-1">
          {DEMO_SCENARIOS.map((sc, idx) => {
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {getTradeIcon(sc.trade)}
                <span>{sc.trade}: {sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile View Toggle: Chat vs Inspector */}
        <div className="flex lg:hidden items-center justify-center p-1 rounded-xl bg-slate-900 border border-slate-800 mb-4 max-w-sm mx-auto">
          <button
            onClick={() => setMobileTab('chat')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'chat'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SMS Simulator</span>
          </button>
          <button
            onClick={() => setMobileTab('inspector')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'inspector'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Dispatch & Quote</span>
          </button>
        </div>

        {/* Main 2-Column Split: SMS Simulator (Left) + Dispatch Inspection Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start max-w-6xl mx-auto">
          
          {/* Left Column: SMS Conversation Phone View (7 cols) */}
          <div className={`lg:col-span-7 surface-card rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[480px] sm:h-[540px] lg:h-[580px] shadow-sm ${
            mobileTab === 'chat' ? 'flex' : 'hidden lg:flex'
          }`}>
            
            {/* Header Bar */}
            <div className="p-3 sm:p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                    <span className="truncate">{scenario.customerName}</span>
                    <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium shrink-0">
                      Inbound SMS
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 truncate font-mono">
                    {scenario.customerPhone}
                  </div>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setExtraMessages([]);
                    setIsPlaying(true);
                  }}
                  className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Restart simulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)}
                  className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] sm:text-[11px] font-mono text-slate-300 border border-slate-700 cursor-pointer"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Message Thread Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-3.5 bg-slate-950/40"
            >
              <div className="text-center">
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono">
                  Today • Inbound SMS session
                </span>
              </div>

              {visibleMessages.map((msg) => {
                const isUser = msg.sender === 'customer';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-medium text-slate-400">
                        {isUser ? scenario.customerName : 'Autodeck'}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>

                    <div
                      className={`max-w-[90%] sm:max-w-[85%] rounded-lg p-2.5 sm:p-3 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/60'
                          : 'bg-blue-600 text-white rounded-tr-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {/* Attachment Card if present */}
                    {msg.attachment && (
                      <div className="mt-2 max-w-[90%] sm:max-w-[85%] w-full rounded-lg bg-slate-900 border border-slate-800 p-2.5 sm:p-3 shadow-sm">
                        <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                          <div>
                            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                              {msg.attachment.type === 'quote' && <FileText className="w-3.5 h-3.5 text-blue-400" />}
                              {msg.attachment.type === 'invoice' && <CreditCard className="w-3.5 h-3.5 text-emerald-400" />}
                              {msg.attachment.type === 'calendar' && <Calendar className="w-3.5 h-3.5 text-purple-400" />}
                              <span>{msg.attachment.title}</span>
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-400">{msg.attachment.subtitle}</div>
                          </div>
                          {msg.attachment.amount && (
                            <span className="text-[11px] sm:text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                              {msg.attachment.amount}
                            </span>
                          )}
                        </div>

                        {msg.attachment.details && (
                          <ul className="space-y-1 text-[10px] sm:text-[11px] text-slate-300">
                            {msg.attachment.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex flex-col items-end">
                  <div className="bg-blue-600/80 text-white rounded-lg rounded-tr-none px-3 py-2 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Custom Input Bar */}
            <form 
              onSubmit={handleCustomSend}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type customer reply to test agent..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!customInput.trim()}
                className="p-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Column: Dispatch & Pricebook Execution Inspector (5 cols) */}
          <div className={`lg:col-span-5 space-y-4 ${
            mobileTab === 'inspector' ? 'block' : 'hidden lg:block'
          }`}>
            
            {/* Live Job Ticket Summary */}
            <div className="surface-card rounded-xl border border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Dispatch Ticket #AD-4902
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-medium">
                  {scenario.trade}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-500 text-[11px]">Customer & Location</div>
                  <div className="text-slate-200 font-medium">{scenario.customerName} • {scenario.aiReasoning[0]?.extractedData?.location || 'Austin, TX'}</div>
                </div>

                <div>
                  <div className="text-slate-500 text-[11px]">Primary Scope</div>
                  <div className="text-slate-200">{scenario.title} ({scenario.aiReasoning[0]?.extractedData?.jobType || 'Standard Service'})</div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-slate-500 text-[11px] mb-1.5">Pricebook Rules Applied</div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span>Standard Dispatch / Trip Fee:</span>
                      <span>$89.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Parts & Materials Markup:</span>
                      <span>40% Target</span>
                    </div>
                    <div className="flex justify-between text-slate-300 font-semibold text-white pt-1 border-t border-slate-800">
                      <span>Dispatched Estimate:</span>
                      <span className="text-emerald-400">$340.00 – $480.00</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-slate-500 text-[11px] mb-1">Assigned Route & Status</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-500">Assigned Tech</div>
                      <div className="text-white font-medium">Dave (Van #2)</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-500">Stripe Deposit</div>
                      <div className="text-emerald-400 font-medium">$150.00 Paid</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Integration Sync Status */}
            <div className="surface-card rounded-xl border border-slate-800 p-4 shadow-sm text-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                System Sync Log
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Google Calendar Event Created</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">10:04 AM</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>QuickBooks Invoice Drafted</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">10:04 AM</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Technician SMS Push Dispatched</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">10:05 AM</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
