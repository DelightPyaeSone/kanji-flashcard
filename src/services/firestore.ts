import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UnlockProgress, ViewedCards, Score, SRSCardData, StreakInfo, Settings } from '@/types';

// User progress document structure
export interface UserProgress {
  unlockedProgress: UnlockProgress;
  viewedCards: ViewedCards;
  knownCards: string[];
  bookmarkedCards: string[];
  scores: Record<string, Score>;
  srsData: Record<string, SRSCardData>;
  streak: StreakInfo;
  settings: Settings;
  lastUpdated: ReturnType<typeof serverTimestamp>;
}

// Save user progress to Firestore
export const saveUserProgress = async (
  userId: string,
  progress: Omit<UserProgress, 'lastUpdated'>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...progress,
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
};

// Load user progress from Firestore
export const loadUserProgress = async (
  userId: string
): Promise<UserProgress | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProgress;
    }
    return null;
  } catch (error) {
    console.error('Error loading progress:', error);
    throw error;
  }
};

// Subscribe to real-time progress updates
export const subscribeToProgress = (
  userId: string,
  callback: (progress: UserProgress | null) => void
) => {
  const userRef = doc(db, 'users', userId);

  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as UserProgress);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error subscribing to progress:', error);
  });
};

// Initialize new user with default progress
export const initializeNewUser = async (
  userId: string,
  displayName: string | null,
  email: string | null
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    // Only initialize if user doesn't exist
    if (!docSnap.exists()) {
      const defaultProgress: UserProgress = {
        unlockedProgress: {
          kanji: { 'Week 1': ['Day 1'] },
          vocab: { 'Week 1': ['Day 1'] },
        },
        viewedCards: {
          kanji: {},
          vocab: {},
        },
        knownCards: [],
        bookmarkedCards: [],
        scores: {},
        srsData: {},
        streak: {
          current: 0,
          longest: 0,
          lastStudyDate: '',
        },
        settings: {
          theme: 'dark',
          showMyanmarFirst: false,
          autoFlipDelay: null,
          soundEnabled: false,
          keyboardShortcutsEnabled: true,
        },
        lastUpdated: serverTimestamp(),
      };

      await setDoc(userRef, {
        ...defaultProgress,
        profile: {
          displayName,
          email,
          createdAt: serverTimestamp(),
        },
      });
    }
  } catch (error) {
    console.error('Error initializing user:', error);
    throw error;
  }
};
