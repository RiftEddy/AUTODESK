import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  X,
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  Terminal,
  Search,
  Trash2,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ContractorApplication,
  DeveloperApplication,
  getContractorApplications,
  getDeveloperApplications,
  deleteApplication,
  updateApplicationStatus,
} from '../services/applicationStore';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REQUIRED_PIN = '2699263';

export const AdminAccessModal: React.FC<AdminAccessModalProps> = ({ isOpen, onClose }) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'contractors' | 'developers'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [contractors, setContractors] = useState<ContractorApplication[]>([]);
  const [developers, setDevelopers] = useState<DeveloperApplication[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = () => {
    setContractors(getContractorApplications());
    setDevelopers(getDeveloperApplications());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    } else {
      // Reset sensitive states when closed
      setPinInput('');
      setErrorMsg('');
      setIsAuthenticated(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('autodeck_apps_updated', handleUpdate);
    return () => window.removeEventListener('autodeck_apps_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === REQUIRED_PIN) {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadData();
    } else {
      setErrorMsg('Incorrect PIN code. Access denied.');
      setPinInput('');
    }
  };

  const handleQuickKey = (num: string) => {
    if (pinInput.length < 7) {
      const next = pinInput + num;
      setPinInput(next);
      if (next === REQUIRED_PIN) {
        setIsAuthenticated(true);
        setErrorMsg('');
        loadData();
      }
    }
  };

  const handleDelete = (id: string, type: 'contractor_pilot' | 'developer_interview') => {
    if (window.confirm('Delete this application record?')) {
      deleteApplication(id, type);
      loadData();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJson = () => {
    const fullPayload = {
      exportedAt: new Date().toISOString(),
      contractorApplications: contractors,
      developerApplications: developers,
    };
    const blob = new Blob([JSON.stringify(fullPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autodeck-applications-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter lists
  const filteredContractors = contractors.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.businessName.toLowerCase().includes(q) ||
      c.ownerName.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      c.trade.toLowerCase().includes(q)
    );
  });

  const filteredDevelopers = developers.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.email.toLowerCase().includes(q) ||
      d.background.toLowerCase().includes(q) ||
      (d.githubOrPortfolio && d.githubOrPortfolio.toLowerCase().includes(q)) ||
      (d.notes && d.notes.toLowerCase().includes(q))
    );
  });

  const totalCount = contractors.length + developers.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`relative w-full rounded-3xl glass border shadow-2xl overflow-hidden transition-all duration-300 ${
          isAuthenticated ? 'max-w-5xl my-auto max-h-[92vh] flex flex-col border-blue-500/30' : 'max-w-md border-white/15 p-6 sm:p-8'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          id="admin-vault-close-btn"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* PIN Entry View */}
        {!isAuthenticated ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  Confidential Vault
                </span>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Internal Application Access
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Enter the authorized administrator 7-digit security PIN to view submitted contractor pilot requests and developer applications.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 font-semibold block mb-2">
                  Security PIN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoFocus
                    maxLength={10}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="•••••••"
                    className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 px-4 rounded-2xl bg-slate-950 border border-white/15 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-mono"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </div>

              {/* Quick keypad for convenience */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      if (key === 'C') {
                        setPinInput('');
                        setErrorMsg('');
                      } else if (key === '⌫') {
                        setPinInput((prev) => prev.slice(0, -1));
                        setErrorMsg('');
                      } else {
                        handleQuickKey(key);
                      }
                    }}
                    className="py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-slate-200 font-mono text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                id="admin-submit-pin-btn"
                className="w-full py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold font-mono tracking-wide shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Application Vault</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex flex-col h-full max-h-[85vh]">
            
            {/* Top Vault Header */}
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Vault Unlocked
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      PIN: {REQUIRED_PIN}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-['Outfit'] mt-0.5">
                    Applications Management Console
                  </h3>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Vault</span>
                </button>
              </div>
            </div>

            {/* Metrics & Filter Bar */}
            <div className="px-6 py-4 border-b border-white/5 bg-slate-900/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
              
              {/* Tab Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-white/10 shrink-0">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setActiveTab('contractors')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeTab === 'contractors'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Contractor Pilots ({contractors.length})
                </button>
                <button
                  onClick={() => setActiveTab('developers')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeTab === 'developers'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Developer Interviews ({developers.length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, business, phone, email..."
                  className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

            </div>

            {/* Submissions List Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              
              {/* If no records */}
              {((activeTab === 'all' && filteredContractors.length === 0 && filteredDevelopers.length === 0) ||
                (activeTab === 'contractors' && filteredContractors.length === 0) ||
                (activeTab === 'developers' && filteredDevelopers.length === 0)) && (
                <div className="text-center py-16 text-slate-500">
                  <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-mono">No matching applications found.</p>
                </div>
              )}

              {/* Contractor Pilots Section */}
              {(activeTab === 'all' || activeTab === 'contractors') && filteredContractors.length > 0 && (
                <div className="space-y-3">
                  {activeTab === 'all' && (
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider pb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Contractor Pilot Requests ({filteredContractors.length})</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredContractors.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl glass-card border border-white/10 p-5 space-y-3 relative hover:border-white/20 transition-all shadow-lg"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1.5">
                              <span>{item.trade.toUpperCase()}</span>
                              <span>•</span>
                              <span>{item.crewSize}</span>
                            </div>
                            <h4 className="text-base font-bold text-white font-['Outfit']">
                              {item.businessName}
                            </h4>
                            <div className="text-xs text-slate-300 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.ownerName || 'Owner'}</span>
                            </div>
                          </div>

                          {/* Status Pill */}
                          <div className="flex flex-col items-end gap-1">
                            <select
                              value={item.status}
                              onChange={(e) =>
                                updateApplicationStatus(item.id, 'contractor_pilot', e.target.value)
                              }
                              className="text-[10px] font-mono font-semibold px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-200 focus:outline-none"
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="active_pilot">🟢 Active Pilot</option>
                            </select>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(item.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs font-mono text-slate-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-blue-400" />
                              <span>{item.phone}</span>
                            </div>
                            <button
                              onClick={() => handleCopy(item.phone, `${item.id}-phone`)}
                              className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-white/5"
                            >
                              {copiedId === `${item.id}-phone` ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                          {item.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-400">{item.email}</span>
                            </div>
                          )}
                        </div>

                        {/* Footer delete */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span>ID: {item.id}</span>
                          <button
                            onClick={() => handleDelete(item.id, 'contractor_pilot')}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Developer Interviews Section */}
              {(activeTab === 'all' || activeTab === 'developers') && filteredDevelopers.length > 0 && (
                <div className="space-y-3 pt-2">
                  {activeTab === 'all' && (
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider pb-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Developer Interview Submissions ({filteredDevelopers.length})</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDevelopers.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl glass-card border border-white/10 p-5 space-y-3 relative hover:border-white/20 transition-all shadow-lg"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-1.5">
                              <span>{item.background}</span>
                            </div>
                            <h4 className="text-base font-bold text-white font-['Outfit']">
                              {item.name}
                            </h4>
                            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.email}</span>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex flex-col items-end gap-1">
                            <select
                              value={item.status}
                              onChange={(e) =>
                                updateApplicationStatus(item.id, 'developer_interview', e.target.value)
                              }
                              className="text-[10px] font-mono font-semibold px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-200 focus:outline-none"
                            >
                              <option value="new">🟡 New</option>
                              <option value="reviewed">🟣 Reviewed</option>
                              <option value="invited">🟢 Invited</option>
                            </select>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(item.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Focus tags */}
                        {item.excitementFocus && item.excitementFocus.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.excitementFocus.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Github & Notes */}
                        {(item.githubOrPortfolio || item.notes) && (
                          <div className="pt-2 border-t border-white/5 space-y-1 text-xs font-mono text-slate-300">
                            {item.githubOrPortfolio && (
                              <div className="text-blue-400 break-all text-[11px]">
                                🔗 {item.githubOrPortfolio}
                              </div>
                            )}
                            {item.notes && (
                              <p className="text-slate-400 text-[11px] line-clamp-2 italic">
                                "{item.notes}"
                              </p>
                            )}
                          </div>
                        )}

                        {/* Footer delete */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span>ID: {item.id}</span>
                          <button
                            onClick={() => handleDelete(item.id, 'developer_interview')}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
};
