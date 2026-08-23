export interface ContractorApplication {
  id: string;
  type: 'contractor_pilot';
  trade: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email?: string;
  crewSize: string;
  status: 'new' | 'contacted' | 'active_pilot';
  submittedAt: string;
}

export interface DeveloperApplication {
  id: string;
  type: 'developer_interview';
  background: string;
  customBackground?: string;
  excitementFocus: string[];
  customExcitement?: string;
  name: string;
  email: string;
  githubOrPortfolio?: string;
  notes?: string;
  status: 'new' | 'reviewed' | 'invited';
  submittedAt: string;
}

export type AnyApplication = ContractorApplication | DeveloperApplication;

const CONTRACTOR_KEY = 'autodeck_contractor_apps';
const DEV_KEY = 'autodeck_dev_apps';

const SEED_CONTRACTOR_APPS: ContractorApplication[] = [
  {
    id: 'app-pilot-101',
    type: 'contractor_pilot',
    trade: 'hvac',
    businessName: 'Apex Precision Heating & Air',
    ownerName: 'Marcus Vance',
    phone: '(512) 894-0231',
    email: 'marcus@apexprecisionair.com',
    crewSize: '2-5 Trucks',
    status: 'active_pilot',
    submittedAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
  },
  {
    id: 'app-pilot-102',
    type: 'contractor_pilot',
    trade: 'plumbing',
    businessName: 'Ironclad Hydro & Drain Solutions',
    ownerName: 'Robert Sterling',
    phone: '(214) 773-9941',
    email: 'robert@ironcladplumbingtx.com',
    crewSize: '6-10 Trucks',
    status: 'new',
    submittedAt: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
  },
  {
    id: 'app-pilot-103',
    type: 'contractor_pilot',
    trade: 'electrical',
    businessName: 'VoltCraft Master Electric LLC',
    ownerName: 'Dave Vanecek',
    phone: '(206) 554-1829',
    email: 'dave@voltcraftwa.com',
    crewSize: '2-5 Trucks',
    status: 'contacted',
    submittedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
];

const SEED_DEV_APPS: DeveloperApplication[] = [
  {
    id: 'app-dev-201',
    type: 'developer_interview',
    background: 'AI & LLM Engineer / Agentic Workflows',
    excitementFocus: ['Autonomous Voice & SMS Agent State Machines', 'Deterministic Pricebook Math & Safeguards'],
    name: 'Elena Rostova',
    email: 'elena.rostova@techmail.io',
    githubOrPortfolio: 'github.com/erostova-agents',
    notes: 'Built multi-turn SMS agent systems with Redis state graphs and tool-calling validation.',
    status: 'reviewed',
    submittedAt: new Date(Date.now() - 3600 * 1000 * 42).toISOString(),
  },
  {
    id: 'app-dev-202',
    type: 'developer_interview',
    background: 'Full-Stack TypeScript / Node / Next.js',
    excitementFocus: ['Low-Latency Real-Time Telemetry', 'Field CRM & ERP Connectors (Jobber/QuickBooks)'],
    name: 'Julian Chen',
    email: 'julian.c@devhub.co',
    githubOrPortfolio: 'https://julianchen.dev',
    notes: 'Interested in the offline-first sync engine and Twilio SMS dispatch webhooks architecture.',
    status: 'new',
    submittedAt: new Date(Date.now() - 3600 * 1000 * 9).toISOString(),
  },
];

export function getContractorApplications(): ContractorApplication[] {
  try {
    const raw = localStorage.getItem(CONTRACTOR_KEY);
    if (!raw) {
      localStorage.setItem(CONTRACTOR_KEY, JSON.stringify(SEED_CONTRACTOR_APPS));
      return SEED_CONTRACTOR_APPS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read contractor apps from storage', err);
    return SEED_CONTRACTOR_APPS;
  }
}

export function getDeveloperApplications(): DeveloperApplication[] {
  try {
    const raw = localStorage.getItem(DEV_KEY);
    if (!raw) {
      localStorage.setItem(DEV_KEY, JSON.stringify(SEED_DEV_APPS));
      return SEED_DEV_APPS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read dev apps from storage', err);
    return SEED_DEV_APPS;
  }
}

export function addContractorApplication(app: Omit<ContractorApplication, 'id' | 'type' | 'status' | 'submittedAt'>): ContractorApplication {
  const current = getContractorApplications();
  const newApp: ContractorApplication = {
    ...app,
    id: `pilot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: 'contractor_pilot',
    status: 'new',
    submittedAt: new Date().toISOString(),
  };
  const updated = [newApp, ...current];
  try {
    localStorage.setItem(CONTRACTOR_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('autodeck_apps_updated'));
  } catch (err) {
    console.error('Failed to save contractor app', err);
  }
  return newApp;
}

export function addDeveloperApplication(app: Omit<DeveloperApplication, 'id' | 'type' | 'status' | 'submittedAt'>): DeveloperApplication {
  const current = getDeveloperApplications();
  const newApp: DeveloperApplication = {
    ...app,
    id: `dev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: 'developer_interview',
    status: 'new',
    submittedAt: new Date().toISOString(),
  };
  const updated = [newApp, ...current];
  try {
    localStorage.setItem(DEV_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('autodeck_apps_updated'));
  } catch (err) {
    console.error('Failed to save dev app', err);
  }
  return newApp;
}

export function deleteApplication(id: string, type: 'contractor_pilot' | 'developer_interview') {
  if (type === 'contractor_pilot') {
    const list = getContractorApplications().filter((item) => item.id !== id);
    localStorage.setItem(CONTRACTOR_KEY, JSON.stringify(list));
  } else {
    const list = getDeveloperApplications().filter((item) => item.id !== id);
    localStorage.setItem(DEV_KEY, JSON.stringify(list));
  }
  window.dispatchEvent(new Event('autodeck_apps_updated'));
}

export function updateApplicationStatus(id: string, type: 'contractor_pilot' | 'developer_interview', newStatus: any) {
  if (type === 'contractor_pilot') {
    const list = getContractorApplications().map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    localStorage.setItem(CONTRACTOR_KEY, JSON.stringify(list));
  } else {
    const list = getDeveloperApplications().map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    localStorage.setItem(DEV_KEY, JSON.stringify(list));
  }
  window.dispatchEvent(new Event('autodeck_apps_updated'));
}
