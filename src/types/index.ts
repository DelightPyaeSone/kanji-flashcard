// Kanji Card Types
export interface KanjiCard {
  kanji: string;
  reading: string;
  meaning: string;
  myanmar: string;
}

export interface DayData {
  topic: string;
  cards: KanjiCard[];
}

export interface WeekData {
  [day: string]: DayData;
}

export interface KanjiData {
  [week: string]: WeekData;
}

// Study Types
export type StudyMode = 'browse' | 'quiz' | 'srs';

export interface Score {
  correct: number;
  total: number;
}

// SRS Types
export type SRSGrade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SRSCardData {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate: string;
}

// Theme Types
export type Theme = 'dark' | 'light' | 'sakura';

// Statistics Types
export interface StudySession {
  date: string;
  cardsStudied: number;
  correctAnswers: number;
  duration: number; // in minutes
  mode: StudyMode;
}

export interface StreakInfo {
  current: number;
  longest: number;
  lastStudyDate: string;
}

// Settings Types
export interface Settings {
  theme: Theme;
  showMyanmarFirst: boolean;
  autoFlipDelay: number | null;
  soundEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
}

// Progress Types
export interface Progress {
  knownCards: string[];
  bookmarkedCards: string[];
  scores: Record<string, Score>;
  srsData: Record<string, SRSCardData>;
  studyHistory: StudySession[];
  streak: StreakInfo;
}
