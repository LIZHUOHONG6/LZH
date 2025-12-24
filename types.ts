export enum Section {
  PRINCIPLE = 'principle',
  SYSTEM = 'system',
  ALGORITHM = 'algorithm',
  COMPARISON = 'comparison',
  CHAT = 'chat'
}

export interface ComparisonData {
  method: string;
  speed: number;
  accuracy: number;
  complexity: number;
  cost: number;
  blindHoleSuitability: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SystemComponent {
  name: string;
  description: string;
  specs: string[];
}
