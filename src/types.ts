export type ViewMode = 'landing' | 'for-devs';

export type TradeType = 'hvac' | 'plumbing' | 'electrical' | 'landscaping' | 'roofing';

export interface DemoMessage {
  id: string;
  sender: 'customer' | 'autodeck' | 'system';
  timestamp: string;
  text: string;
  attachment?: {
    type: 'image' | 'quote' | 'invoice' | 'calendar';
    title: string;
    subtitle?: string;
    amount?: string;
    details?: string[];
  };
}

export interface DemoScenario {
  id: string;
  trade: TradeType;
  tradeName: string;
  businessName: string;
  customerName: string;
  customerPhone: string;
  channel: 'SMS' | 'Web Form' | 'Missed Call / Voicemail';
  title: string;
  estimatedTicket: string;
  marginPercent: string;
  messages: DemoMessage[];
  aiReasoning: {
    step: number;
    title: string;
    thought: string;
    extractedData: {
      urgency: string;
      jobType: string;
      location: string;
      estimatedTime: string;
      partsRequired: string;
      quotedPrice: string;
    };
    guardrailCheck: string;
  }[];
}

export interface DeveloperApplication {
  background: string;
  customBackground?: string;
  excitementFocus: string[];
  customExcitement?: string;
  name: string;
  email: string;
  githubOrPortfolio?: string;
  notes?: string;
  submittedAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  cta: string;
  popular?: boolean;
}
