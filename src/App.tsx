import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import { useStore } from '@/store';
import { initAuthListener, useAuthStore } from '@/store/authStore';
import { getWeeks, getDays, getCards, getTopic, generateCardId } from '@/data';
import {
  getVocabWeeks,
  getVocabDays,
  getVocabCards,
  getVocabTopic,
  generateVocabCardId,
} from '@/data/vocab';
import { useKeyboard, useTheme } from '@/hooks';
import { cn } from '@/utils';

import { FlashCard } from '@/components/flashcard';
import { BottomNav, WeekList, DayList } from '@/components/navigation';
import { ProgressBar } from '@/components/common';
import { CardControls } from '@/components/study';
import { StatsModal } from '@/components/stats';
import { LoginPage } from '@/components/auth';
import { AuthButton } from '@/components/auth';

// Flat background colors
const themeClasses = {
  dark: 'bg-slate-950',
  light: 'bg-slate-50',
  sakura: 'bg-rose-50',
};

// View modes within kanji/vocab
type StudyView = 'weeks' | 'days' | 'study';

export default function App() {
  const [showStats, setShowStats] = useState(false);
  const [studyView, setStudyView] = useState<StudyView>('weeks');
  const { config, isDark } = useTheme();
  const { user, isInitialized, syncToCloud } = useAuthStore();

  // Initialize Firebase auth listener
  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, []);

  // Auto-sync to cloud
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => syncToCloud(), 5000);
    return () => clearTimeout(timer);
  }, [user, syncToCloud]);

  const {
    appMode,
    selectedWeek,
    selectedDay,
    selectedVocabWeek,
    selectedVocabDay,
    currentCardIndex,
    isFlipped,
    showReading,
    settings,
    knownCards,
    bookmarkedCards,
    scores,
    streak,
    unlockedProgress,
    viewedCards,
    setAppMode,
    setSelectedWeek,
    setSelectedDay,
    setSelectedVocabWeek,
    setSelectedVocabDay,
    nextCard,
    prevCard,
    toggleFlip,
    toggleReading,
    toggleBookmark,
    setTheme,
    updateStreak,
    markCardViewed,
  } = useStore();

  // Get data based on app mode
  const kanjiWeeks = getWeeks();
  const vocabWeeks = getVocabWeeks();

  const currentWeeks = appMode === 'kanji' ? kanjiWeeks : vocabWeeks;
  const currentSelectedWeek = appMode === 'kanji' ? selectedWeek : selectedVocabWeek;
  const currentSelectedDay = appMode === 'kanji' ? selectedDay : selectedVocabDay;

  const currentDays = appMode === 'kanji' ? getDays(currentSelectedWeek) : getVocabDays(currentSelectedWeek);
  const cards = appMode === 'kanji'
    ? getCards(currentSelectedWeek, currentSelectedDay)
    : getVocabCards(currentSelectedWeek, currentSelectedDay);
  const currentTopic = appMode === 'kanji'
    ? getTopic(currentSelectedWeek, currentSelectedDay)
    : getVocabTopic(currentSelectedWeek, currentSelectedDay);

  const currentCard = cards[currentCardIndex];
  const currentCardId = currentCard
    ? appMode === 'kanji'
      ? generateCardId(currentSelectedWeek, currentSelectedDay, currentCardIndex)
      : generateVocabCardId(currentSelectedWeek, currentSelectedDay, currentCardIndex)
    : '';

  const isBookmarked = bookmarkedCards.includes(currentCardId);
  const currentMode = appMode === 'kanji' ? 'kanji' : 'vocab';

  // Unlock status
  const unlockedWeeks = Object.keys(unlockedProgress[currentMode]);
  const unlockedDays = unlockedProgress[currentMode][currentSelectedWeek] || [];

  // Keyboard shortcuts
  useKeyboard({ totalCards: cards.length });

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Track card views when flipped
  useEffect(() => {
    if (isFlipped && currentCard && appMode !== 'home') {
      markCardViewed(currentMode, currentSelectedWeek, currentSelectedDay, currentCardIndex, cards.length);
    }
  }, [isFlipped, currentCardIndex, appMode, currentMode, currentSelectedWeek, currentSelectedDay, cards.length, currentCard, markCardViewed]);

  // Handlers
  const handleNext = () => nextCard(cards.length);
  const handlePrev = () => prevCard(cards.length);
  const handleToggleBookmark = () => toggleBookmark(currentCardId);

  const handleWeekSelect = (week: string) => {
    if (appMode === 'kanji') {
      setSelectedWeek(week);
    } else {
      setSelectedVocabWeek(week);
    }
    setStudyView('days');
  };

  const handleDaySelect = (day: string) => {
    if (appMode === 'kanji') {
      setSelectedDay(day);
    } else {
      setSelectedVocabDay(day);
    }
    setStudyView('study');
  };

  const handleTabChange = (tab: 'home' | 'kanji' | 'vocab' | 'stats' | 'settings') => {
    if (tab === 'stats') {
      setShowStats(true);
    } else if (tab === 'home' || tab === 'kanji' || tab === 'vocab') {
      setAppMode(tab);
      setStudyView('weeks');
    }
  };

  // Progress helpers
  const getWeekProgress = (week: string) => {
    const weekDays = appMode === 'kanji' ? getDays(week) : getVocabDays(week);
    let totalCards = 0;
    let viewedCount = 0;
    weekDays.forEach(day => {
      const key = `${week}-${day}`;
      const dayCards = appMode === 'kanji' ? getCards(week, day) : getVocabCards(week, day);
      totalCards += dayCards.length;
      viewedCount += (viewedCards[currentMode][key] || []).length;
    });
    return totalCards > 0 ? Math.round((viewedCount / totalCards) * 100) : 0;
  };

  const getDayProgress = (day: string) => {
    const key = `${currentSelectedWeek}-${day}`;
    const dayCards = appMode === 'kanji' ? getCards(currentSelectedWeek, day) : getVocabCards(currentSelectedWeek, day);
    const viewed = viewedCards[currentMode][key] || [];
    return dayCards.length > 0 ? Math.round((viewed.length / dayCards.length) * 100) : 0;
  };

  const getDayCardCount = (day: string) => {
    return appMode === 'kanji' ? getCards(currentSelectedWeek, day).length : getVocabCards(currentSelectedWeek, day).length;
  };

  const getCompletedDays = () => {
    return currentDays.filter(day => getDayProgress(day) >= 100);
  };

  const getCompletedWeeks = () => {
    return currentWeeks.filter(week => getWeekProgress(week) >= 100);
  };

  // Loading state
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  // Login required
  if (!user) {
    return <LoginPage />;
  }

  // Get active tab for bottom nav
  const activeTab = appMode === 'home' ? 'home' : appMode;

  return (
    <div
      className={cn(
        'min-h-screen pb-20 transition-all duration-300',
        themeClasses[settings.theme],
        config.text
      )}
    >
      {/* Top Header - Minimal */}
      <header className={cn(
        'sticky top-0 z-40 px-4 py-3 flex items-center justify-between',
        isDark ? 'bg-slate-950/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
      )}>
        <div className="flex items-center gap-2">
          {/* Back button for days/study view */}
          {appMode !== 'home' && studyView !== 'weeks' && (
            <button
              onClick={() => setStudyView(studyView === 'study' ? 'days' : 'weeks')}
              className={cn('p-2 rounded-lg', config.textMuted)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className={cn('text-lg font-bold', config.text)}>
            {appMode === 'home' ? 'N2 Master' :
             appMode === 'kanji' ? '漢字' : '単語'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak */}
          {streak.current > 0 && (
            <div className={cn('flex items-center gap-1 px-2 py-1 rounded-lg text-sm', config.selectorBg)}>
              <span>🔥</span>
              <span className={config.textAccent}>{streak.current}</span>
            </div>
          )}
          <AuthButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 max-w-lg mx-auto">
        {/* Home Screen */}
        {appMode === 'home' && (
          <div className="space-y-4">
            <p className={cn('text-center mb-6', config.textMuted)}>
              JLPT N2 Study App
            </p>

            {/* Quick Stats */}
            <div className={cn('p-4 rounded-xl', isDark ? 'bg-slate-900' : 'bg-white')}>
              <h3 className={cn('text-sm font-medium mb-3', config.textMuted)}>Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className={cn('text-2xl font-bold', config.textAccent)}>{knownCards.length}</div>
                  <div className={cn('text-xs', config.textMuted)}>Cards Learned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{streak.current}</div>
                  <div className={cn('text-xs', config.textMuted)}>Day Streak</div>
                </div>
              </div>
            </div>

            <p className={cn('text-center text-sm', config.textMuted)}>
              Select 漢字 or 単語 from the menu below
            </p>
          </div>
        )}

        {/* Kanji/Vocab - Week List */}
        {appMode !== 'home' && studyView === 'weeks' && (
          <WeekList
            weeks={currentWeeks}
            unlockedWeeks={unlockedWeeks}
            completedWeeks={getCompletedWeeks()}
            onSelectWeek={handleWeekSelect}
            getWeekProgress={getWeekProgress}
          />
        )}

        {/* Kanji/Vocab - Day List */}
        {appMode !== 'home' && studyView === 'days' && (
          <DayList
            week={currentSelectedWeek}
            days={currentDays}
            unlockedDays={unlockedDays}
            completedDays={getCompletedDays()}
            onSelectDay={handleDaySelect}
            onBack={() => setStudyView('weeks')}
            getDayProgress={getDayProgress}
            getDayCardCount={getDayCardCount}
          />
        )}

        {/* Kanji/Vocab - Study View */}
        {appMode !== 'home' && studyView === 'study' && (
          <div>
            {/* Topic */}
            {currentTopic && (
              <div className={cn('text-center mb-4 text-sm', config.textMuted)}>
                {currentTopic}
              </div>
            )}

            {/* Progress */}
            <div className="mb-4">
              <ProgressBar
                current={currentCardIndex + 1}
                total={cards.length}
                correct={0}
              />
            </div>

            {/* Flash Card */}
            <AnimatePresence mode="wait">
              {currentCard && (
                <motion.div
                  key={currentCardId}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <FlashCard
                    card={currentCard}
                    isFlipped={isFlipped}
                    showReading={showReading}
                    isBookmarked={isBookmarked}
                    onFlip={toggleFlip}
                    onToggleReading={toggleReading}
                    onToggleBookmark={handleToggleBookmark}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <CardControls
              onPrev={handlePrev}
              onNext={handleNext}
              onFlip={toggleFlip}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenStats={() => setShowStats(true)}
      />

      {/* Stats Modal */}
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        streak={streak}
        knownCardsCount={knownCards.length}
        scores={scores}
      />
    </div>
  );
}
