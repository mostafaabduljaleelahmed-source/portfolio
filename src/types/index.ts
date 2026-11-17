export interface ProjectCase {
  number: string;
  title: string;
  meta: string;
  summary: string;
  problem: string;
  goal: string;
  architecture: string;
  architectureDiagram?: string[];
  challenges: string[];
  decisions: string[];
  technologies: string[];
  results: string[];
  link?: string;
  code?: string;
}

export interface ExperimentSignal {
  tag: string;
  title: string;
  description: string;
}

export interface StackItem {
  name: string;
  category: string;
  tag: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface SiteConfig {
  name: string;
  handle: string;
  version: string;
  title: string;
  description: string;
  location: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  stack: StackItem[];
  projects: ProjectCase[];
  experiments: ExperimentSignal[];
  aiKnowledge: Record<string, string>;
}
