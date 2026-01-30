import { create } from 'zustand';
import { User } from 'firebase/auth';
import { signInWithGoogle, signOut, onAuthChange } from '@/services/auth';
import { loadUserProgress, saveUserProgress, initializeNewUser } from '@/services/firestore';
import { useStore } from './index';
import type { AuthUser } from '@/types';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  isSyncing: boolean;
  error: string | null;

  // Actions
  login: () => Promise<void>;
  logout: () => Promise<void>;
  syncToCloud: () => Promise<void>;
  loadFromCloud: () => Promise<void>;
  clearError: () => void;
}

// Convert Firebase User to AuthUser
const toAuthUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
  isSyncing: false,
  error: null,

  login: async () => {
    set({ isLoading: true, error: null });
    try {
      const firebaseUser = await signInWithGoogle();
      if (firebaseUser) {
        const authUser = toAuthUser(firebaseUser);
        set({ user: authUser });

        // Initialize user in Firestore if new
        await initializeNewUser(
          firebaseUser.uid,
          firebaseUser.displayName,
          firebaseUser.email
        );

        // Load progress from cloud
        await get().loadFromCloud();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      // Sync to cloud before logout
      await get().syncToCloud();
      await signOut();
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  syncToCloud: async () => {
    const { user } = get();
    if (!user) return;

    set({ isSyncing: true });
    try {
      const store = useStore.getState();
      await saveUserProgress(user.uid, {
        unlockedProgress: store.unlockedProgress,
        viewedCards: store.viewedCards,
        knownCards: store.knownCards,
        bookmarkedCards: store.bookmarkedCards,
        scores: store.scores,
        srsData: store.srsData,
        streak: store.streak,
        settings: store.settings,
      });
    } catch (error) {
      console.error('Sync error:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ isSyncing: false });
    }
  },

  loadFromCloud: async () => {
    const { user } = get();
    if (!user) return;

    set({ isSyncing: true });
    try {
      const progress = await loadUserProgress(user.uid);
      if (progress) {
        // Update main store with cloud data
        useStore.setState({
          unlockedProgress: progress.unlockedProgress,
          viewedCards: progress.viewedCards,
          knownCards: progress.knownCards,
          bookmarkedCards: progress.bookmarkedCards,
          scores: progress.scores,
          srsData: progress.srsData,
          streak: progress.streak,
          settings: progress.settings,
        });
      }
    } catch (error) {
      console.error('Load error:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ isSyncing: false });
    }
  },

  clearError: () => set({ error: null }),
}));

// Initialize auth listener
export const initAuthListener = () => {
  return onAuthChange((firebaseUser) => {
    if (firebaseUser) {
      useAuthStore.setState({
        user: toAuthUser(firebaseUser),
        isInitialized: true,
      });
    } else {
      useAuthStore.setState({
        user: null,
        isInitialized: true,
      });
    }
  });
};
