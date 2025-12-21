
export enum ViewState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  USER_DASHBOARD = 'USER_DASHBOARD',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface AdminInsight {
  sessionId: string;
  userEmail: string;
  lastMessage: string;
  score: number;
  interested: 'YES' | 'NO';
  status: 'Pursuable' | 'Not Pursuable';
  detectedIntent: string;
  reasoning: string;
}

export interface LeadResult {
  chatResponse: string;
  adminInsight: AdminInsight;
  timestamp: string;
  id: string;
}
