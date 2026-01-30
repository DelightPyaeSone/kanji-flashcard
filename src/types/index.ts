// ========== App Mode Types ==========
export type AppMode = 'home' | 'kanji' | 'vocab';

// ========== Kanji Card Types ==========
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

// ========== Vocabulary Types ==========
export interface VocabCard {
  word: string;           // 単語 (kanji or kana)
  reading: string;        // ふりがな
  meaning: string;        // English meaning
  myanmar: string;        // Myanmar meaning
  example?: string;       // 例文
  exampleMeaning?: string; // 例文の意味
}

export interface SectionData {
  title: string;
  videoUrl?: string;      // Facebook video reference
  cards: VocabCard[];
}

export interface ChapterData {
  [section: string]: SectionData;
}

export interface VocabData {
  [chapter: string]: ChapterData;
}

// ========== Study Types ==========
export type StudyMode = 'browse' | 'quiz' | 'srs';

export interface Score {
  correct: number;
  total: number;
}

// ========== SRS Types ==========
export type SRSGrade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SRSCardData {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate: string;
}

// ========== Theme Types ==========
export type Theme = 'dark' | 'light' | 'sakura';

// ========== Statistics Types ==========
export interface StudySession {
  date: string;
  cardsStudied: number;
  correctAnswers: number;
  duration: number;
  mode: StudyMode;
}

export interface StreakInfo {
  current: number;
  longest: number;
  lastStudyDate: string;
}

// ========== Settings Types ==========
export interface Settings {
  theme: Theme;
  showMyanmarFirst: boolean;
  autoFlipDelay: number | null;
  soundEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
}

// ========== Progress Types ==========
export interface Progress {
  knownCards: string[];
  bookmarkedCards: string[];
  scores: Record<string, Score>;
  srsData: Record<string, SRSCardData>;
  studyHistory: StudySession[];
  streak: StreakInfo;
}

// ========== Unlock System Types ==========
export interface UnlockProgress {
  kanji: {
    [week: string]: string[]; // Array of unlocked days for each week
  };
  vocab: {
    [week: string]: string[];
  };
}

export interface ViewedCards {
  kanji: {
    [key: string]: string[]; // key = "Week 1-Day 1", value = array of viewed card indices
  };
  vocab: {
    [key: string]: string[];
  };
}

// ========== Auth Types ==========
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
