
export enum PerspectiveType {
  ORDER = 'PROVERBS',     // 箴言：理應如何
  VANITY = 'ECCLESIASTES', // 傳道書：實際常如何
  COLLAPSE = 'JOB'        // 約伯記：有時完全崩潰
}

export interface ScripturePoint {
  book: string;
  theme: string;
  description: string;
}

export interface User {
  name: string;
  loginTime: Date;
}

export interface Module {
  id: number;
  cycleId: number;
  title: string;
  subtitle: string;
  lifeQuestions: string[];
  perspectives: Record<PerspectiveType, ScripturePoint>;
  tensionGuide: string;
  discussionPrompts: string[];
  summary: string;
}

export interface Cycle {
  id: number;
  title: string;
  description: string;
}
