import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Theme,
  StudyMode,
  Score,
  SRSCardData,
  StudySession,
  StreakInfo,
  Settings,
} from '@/types';
import { createInitialSRSData, calculateNextReview, getDueCards } from '@/services/srs';
import { generateCardId } from '@/data';

interface StudyState {
  // Navigation
  selectedWeek: string;
  selectedDay: string;
  currentCardIndex: number;

  // Card State
  isFlipped: boolean;
  showReading: boolean;

  // Study Mode
  studyMode: StudyMode;

  // Progress
  knownCards: string[];
  bookmarkedCards: string[];
  scores: Record<string, Score>;

  // SRS
  srsData: Record<string, SRSCardData>;
  srsQueue: string[];

  // Statistics
  studyHistory: StudySession[];
  streak: StreakInfo;
  sessionStartTime: number | null;
  cardsStudiedThisSession: number;

  // Settings
  settings: Settings;

  // Actions - Navigation
  setSelectedWeek: (week: string) => void;
  setSelectedDay: (day: string) => void;
  setCurrentCardIndex: (index: number) => void;
  nextCard: (totalCards: number) => void;
  prevCard: (totalCards: number) => void;

  // Actions - Card State
  setIsFlipped: (flipped: boolean) => void;
  toggleFlip: () => void;
  setShowReading: (show: boolean) => void;
  toggleReading: () => void;

  // Actions - Study Mode
  setStudyMode: (mode: StudyMode) => void;

  // Actions - Progress
  markAsKnown: (cardId: string) => void;
  markAsUnknown: (cardId: string) => void;
  toggleBookmark: (cardId: string) => void;
  resetDayProgress: () => void;
  resetAllProgress: () => void;

  // Actions - SRS
  initializeSRS: (cardId: string) => void;
  gradeSRSCard: (cardId: string, grade: 0 | 1 | 2 | 3 | 4 | 5) => void;
  refreshSRSQueue: () => void;

  // Actions - Statistics
  startSession: () => void;
  endSession: () => void;
  updateStreak: () => void;

  // Actions - Settings
  setTheme: (theme: Theme) => void;
  toggleShowMyanmarFirst: () => void;
  setAutoFlipDelay: (delay: number | null) => void;
  toggleSound: () => void;
  toggleKeyboardShortcuts: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useStore = create<StudyState>()(
  persist(
    (set, get) => ({
      // Initial State - Navigation
      selectedWeek: 'Week 1',
      selectedDay: 'Day 1',
      currentCardIndex: 0,

      // Initial State - Card
      isFlipped: false,
      showReading: false,

      // Initial State - Study Mode
      studyMode: 'browse',

      // Initial State - Progress
      knownCards: [],
      bookmarkedCards: [],
      scores: {},

      // Initial State - SRS
      srsData: {},
      srsQueue: [],

      // Initial State - Statistics
      studyHistory: [],
      streak: {
        current: 0,
        longest: 0,
        lastStudyDate: '',
      },
      sessionStartTime: null,
      cardsStudiedThisSession: 0,

      // Initial State - Settings
      settings: {
        theme: 'dark',
        showMyanmarFirst: false,
        autoFlipDelay: null,
        soundEnabled: false,
        keyboardShortcutsEnabled: true,
      },

      // Actions - Navigation
      setSelectedWeek: (week) =>
        set({
          selectedWeek: week,
          currentCardIndex: 0,
          isFlipped: false,
          showReading: false,
        }),

      setSelectedDay: (day) =>
        set({
          selectedDay: day,
          currentCardIndex: 0,
          isFlipped: false,
          showReading: false,
        }),

      setCurrentCardIndex: (index) =>
        set({
          currentCardIndex: index,
          isFlipped: false,
          showReading: false,
        }),

      nextCard: (totalCards) =>
        set((state) => ({
          currentCardIndex: (state.currentCardIndex + 1) % totalCards,
          isFlipped: false,
          showReading: false,
          cardsStudiedThisSession: state.cardsStudiedThisSession + 1,
        })),

      prevCard: (totalCards) =>
        set((state) => ({
          currentCardIndex: (state.currentCardIndex - 1 + totalCards) % totalCards,
          isFlipped: false,
          showReading: false,
        })),

      // Actions - Card State
      setIsFlipped: (flipped) => set({ isFlipped: flipped }),
      toggleFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
      setShowReading: (show) => set({ showReading: show }),
      toggleReading: () => set((state) => ({ showReading: !state.showReading })),

      // Actions - Study Mode
      setStudyMode: (mode) => set({ studyMode: mode }),

      // Actions - Progress
      markAsKnown: (cardId) =>
        set((state) => {
          const { selectedWeek, selectedDay } = state;
          const scoreKey = `${selectedWeek}-${selectedDay}`;
          const currentScore = state.scores[scoreKey] || { correct: 0, total: 0 };

          return {
            knownCards: state.knownCards.includes(cardId)
              ? state.knownCards
              : [...state.knownCards, cardId],
            scores: {
              ...state.scores,
              [scoreKey]: {
                correct: currentScore.correct + 1,
                total: currentScore.total + 1,
              },
            },
          };
        }),

      markAsUnknown: (cardId) =>
        set((state) => {
          const { selectedWeek, selectedDay } = state;
          const scoreKey = `${selectedWeek}-${selectedDay}`;
          const currentScore = state.scores[scoreKey] || { correct: 0, total: 0 };

          return {
            knownCards: state.knownCards.filter((id) => id !== cardId),
            scores: {
              ...state.scores,
              [scoreKey]: {
                correct: currentScore.correct,
                total: currentScore.total + 1,
              },
            },
          };
        }),

      toggleBookmark: (cardId) =>
        set((state) => ({
          bookmarkedCards: state.bookmarkedCards.includes(cardId)
            ? state.bookmarkedCards.filter((id) => id !== cardId)
            : [...state.bookmarkedCards, cardId],
        })),

      resetDayProgress: () =>
        set((state) => {
          const { selectedWeek, selectedDay } = state;
          const scoreKey = `${selectedWeek}-${selectedDay}`;
          const prefix = generateCardId(selectedWeek, selectedDay, 0).slice(0, -1);

          return {
            knownCards: state.knownCards.filter((id) => !id.startsWith(prefix)),
            scores: {
              ...state.scores,
              [scoreKey]: { correct: 0, total: 0 },
            },
            currentCardIndex: 0,
          };
        }),

      resetAllProgress: () =>
        set({
          knownCards: [],
          bookmarkedCards: [],
          scores: {},
          srsData: {},
          srsQueue: [],
          studyHistory: [],
          streak: { current: 0, longest: 0, lastStudyDate: '' },
          currentCardIndex: 0,
        }),

      // Actions - SRS
      initializeSRS: (cardId) =>
        set((state) => {
          if (state.srsData[cardId]) return state;
          return {
            srsData: {
              ...state.srsData,
              [cardId]: createInitialSRSData(cardId),
            },
          };
        }),

      gradeSRSCard: (cardId, grade) =>
        set((state) => {
          const currentData = state.srsData[cardId] || createInitialSRSData(cardId);
          const updatedData = calculateNextReview(currentData, grade);

          return {
            srsData: {
              ...state.srsData,
              [cardId]: updatedData,
            },
            cardsStudiedThisSession: state.cardsStudiedThisSession + 1,
          };
        }),

      refreshSRSQueue: () =>
        set((state) => ({
          srsQueue: getDueCards(state.srsData),
        })),

      // Actions - Statistics
      startSession: () =>
        set({
          sessionStartTime: Date.now(),
          cardsStudiedThisSession: 0,
        }),

      endSession: () =>
        set((state) => {
          if (!state.sessionStartTime) return state;

          const duration = Math.round(
            (Date.now() - state.sessionStartTime) / 60000
          );
          const session: StudySession = {
            date: new Date().toISOString(),
            cardsStudied: state.cardsStudiedThisSession,
            correctAnswers: 0, // Can be calculated from scores
            duration,
            mode: state.studyMode,
          };

          return {
            studyHistory: [...state.studyHistory, session],
            sessionStartTime: null,
          };
        }),

      updateStreak: () =>
        set((state) => {
          const today = getToday();
          const { lastStudyDate, current, longest } = state.streak;

          if (lastStudyDate === today) return state;

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          let newCurrent = current;
          if (lastStudyDate === yesterdayStr) {
            newCurrent = current + 1;
          } else if (lastStudyDate !== today) {
            newCurrent = 1;
          }

          return {
            streak: {
              current: newCurrent,
              longest: Math.max(newCurrent, longest),
              lastStudyDate: today,
            },
          };
        }),

      // Actions - Settings
      setTheme: (theme) =>
        set((state) => ({
          settings: { ...state.settings, theme },
        })),

      toggleShowMyanmarFirst: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            showMyanmarFirst: !state.settings.showMyanmarFirst,
          },
        })),

      setAutoFlipDelay: (delay) =>
        set((state) => ({
          settings: { ...state.settings, autoFlipDelay: delay },
        })),

      toggleSound: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            soundEnabled: !state.settings.soundEnabled,
          },
        })),

      toggleKeyboardShortcuts: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            keyboardShortcutsEnabled: !state.settings.keyboardShortcutsEnabled,
          },
        })),
    }),
    {
      name: 'kanji-flashcard-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Persist these
        knownCards: state.knownCards,
        bookmarkedCards: state.bookmarkedCards,
        scores: state.scores,
        srsData: state.srsData,
        studyHistory: state.studyHistory,
        streak: state.streak,
        settings: state.settings,
        selectedWeek: state.selectedWeek,
        selectedDay: state.selectedDay,
      }),
    }
  )
);

// Selectors
export const useSelectedWeek = () => useStore((state) => state.selectedWeek);
export const useSelectedDay = () => useStore((state) => state.selectedDay);
export const useCurrentCardIndex = () => useStore((state) => state.currentCardIndex);
export const useIsFlipped = () => useStore((state) => state.isFlipped);
export const useShowReading = () => useStore((state) => state.showReading);
export const useStudyMode = () => useStore((state) => state.studyMode);
export const useTheme = () => useStore((state) => state.settings.theme);
export const useSettings = () => useStore((state) => state.settings);
export const useKnownCards = () => useStore((state) => state.knownCards);
export const useBookmarkedCards = () => useStore((state) => state.bookmarkedCards);
export const useStreak = () => useStore((state) => state.streak);
export const useSRSQueue = () => useStore((state) => state.srsQueue);
