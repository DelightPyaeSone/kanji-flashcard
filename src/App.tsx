import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';

import { useStore } from '@/store';
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

import { HomeScreen } from '@/components/home';
import { FlashCard } from '@/components/flashcard';
import { WeekSelector, DaySelector } from '@/components/navigation';
import { ProgressBar, Button } from '@/components/common';
import { CardControls, SRSControls, StudyModeSelector } from '@/components/study';
import { Header, Footer } from '@/components/layout';
import { StatsModal } from '@/components/stats';

// Flat background colors - no gradients for minimalist design
const themeClasses = {
  dark: 'bg-slate-950',
  light: 'bg-slate-50',
  sakura: 'bg-rose-50',
};

export default function App() {
  const [showStats, setShowStats] = useState(false);
  const { config } = useTheme();

  const {
    appMode,
    selectedWeek,
    selectedDay,
    selectedVocabWeek,
    selectedVocabDay,
    currentCardIndex,
    isFlipped,
    showReading,
    studyMode,
    settings,
    knownCards,
    bookmarkedCards,
    scores,
    streak,
    srsQueue,
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
    setStudyMode,
    markAsKnown,
    markAsUnknown,
    gradeSRSCard,
    resetDayProgress,
    resetVocabDayProgress,
    setTheme,
    updateStreak,
    refreshSRSQueue,
    markCardViewed,
  } = useStore();

  // Get data based on app mode
  const kanjiWeeks = getWeeks();
  const kanjiDays = getDays(selectedWeek);
  const kanjiCards = getCards(selectedWeek, selectedDay);
  const kanjiTopic = getTopic(selectedWeek, selectedDay);

  const vocabWeeks = getVocabWeeks();
  const vocabDays = getVocabDays(selectedVocabWeek);
  const vocabCards = getVocabCards(selectedVocabWeek, selectedVocabDay);
  const vocabTopic = getVocabTopic(selectedVocabWeek, selectedVocabDay);

  // Current cards based on mode
  const cards = appMode === 'kanji' ? kanjiCards : vocabCards;
  const currentCard = cards[currentCardIndex];
  const currentCardId = currentCard
    ? appMode === 'kanji'
      ? generateCardId(selectedWeek, selectedDay, currentCardIndex)
      : generateVocabCardId(selectedVocabWeek, selectedVocabDay, currentCardIndex)
    : '';

  // Check if current card is bookmarked
  const isBookmarked = bookmarkedCards.includes(currentCardId);

  // Get score for current day
  const scoreKey =
    appMode === 'kanji'
      ? `kanji-${selectedWeek}-${selectedDay}`
      : `vocab-${selectedVocabWeek}-${selectedVocabDay}`;
  const currentScore = scores[scoreKey] || { correct: 0, total: 0 };

  // Keyboard shortcuts
  const handleSRSGrade = useCallback(
    (grade: 0 | 1 | 2 | 3 | 4 | 5) => {
      if (studyMode === 'srs' && currentCardId) {
        gradeSRSCard(currentCardId, grade);
        nextCard(cards.length);
      }
    },
    [studyMode, currentCardId, gradeSRSCard, nextCard, cards.length]
  );

  useKeyboard({
    totalCards: cards.length,
    onGrade: studyMode === 'srs' ? handleSRSGrade : undefined,
  });

  // Update streak on mount
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Refresh SRS queue when mode changes
  useEffect(() => {
    if (studyMode === 'srs') {
      refreshSRSQueue();
    }
  }, [studyMode, refreshSRSQueue]);

  // Track card views when card is flipped
  useEffect(() => {
    if (isFlipped && currentCard) {
      const mode = appMode === 'kanji' ? 'kanji' : 'vocab';
      const week = appMode === 'kanji' ? selectedWeek : selectedVocabWeek;
      const day = appMode === 'kanji' ? selectedDay : selectedVocabDay;
      markCardViewed(mode, week, day, currentCardIndex, cards.length);
    }
  }, [isFlipped, currentCardIndex, appMode, selectedWeek, selectedDay, selectedVocabWeek, selectedVocabDay, cards.length, currentCard, markCardViewed]);

  // Handlers
  const handleNext = () => nextCard(cards.length);
  const handlePrev = () => prevCard(cards.length);

  const handleKnown = () => {
    markAsKnown(currentCardId, scoreKey);
    nextCard(cards.length);
  };

  const handleUnknown = () => {
    markAsUnknown(currentCardId, scoreKey);
    nextCard(cards.length);
  };

  const handleToggleBookmark = () => {
    toggleBookmark(currentCardId);
  };

  const handleReset = () => {
    if (appMode === 'kanji') {
      resetDayProgress();
    } else {
      resetVocabDayProgress();
    }
  };

  // Current navigation values based on mode
  const currentWeeks = appMode === 'kanji' ? kanjiWeeks : vocabWeeks;
  const currentDays = appMode === 'kanji' ? kanjiDays : vocabDays;
  const currentSelectedWeek = appMode === 'kanji' ? selectedWeek : selectedVocabWeek;
  const currentSelectedDay = appMode === 'kanji' ? selectedDay : selectedVocabDay;
  const currentTopic = appMode === 'kanji' ? kanjiTopic : vocabTopic;

  const handleWeekChange = appMode === 'kanji' ? setSelectedWeek : setSelectedVocabWeek;
  const handleDayChange = appMode === 'kanji' ? setSelectedDay : setSelectedVocabDay;

  // Get unlock status for current mode
  const currentMode = appMode === 'kanji' ? 'kanji' : 'vocab';
  const unlockedWeeks = Object.keys(unlockedProgress[currentMode]);
  const unlockedDays = unlockedProgress[currentMode][currentSelectedWeek] || [];

  // Check which days are completed (all cards viewed)
  const getCompletedDays = () => {
    const completed: string[] = [];
    currentDays.forEach(day => {
      const key = `${currentSelectedWeek}-${day}`;
      const viewed = viewedCards[currentMode][key] || [];
      const dayCards = appMode === 'kanji'
        ? getCards(currentSelectedWeek, day)
        : getVocabCards(currentSelectedWeek, day);
      if (viewed.length >= dayCards.length && dayCards.length > 0) {
        completed.push(day);
      }
    });
    return completed;
  };

  // Check which weeks are completed (all days completed)
  const getCompletedWeeks = () => {
    const completed: string[] = [];
    currentWeeks.forEach(week => {
      const weekDays = appMode === 'kanji' ? getDays(week) : getVocabDays(week);
      const allDaysCompleted = weekDays.every(day => {
        const key = `${week}-${day}`;
        const viewed = viewedCards[currentMode][key] || [];
        const dayCards = appMode === 'kanji'
          ? getCards(week, day)
          : getVocabCards(week, day);
        return viewed.length >= dayCards.length && dayCards.length > 0;
      });
      if (allDaysCompleted) {
        completed.push(week);
      }
    });
    return completed;
  };

  const completedDays = getCompletedDays();
  const completedWeeks = getCompletedWeeks();

  // Render Home Screen
  if (appMode === 'home') {
    return (
      <div
        className={cn(
          'min-h-screen p-4 md:p-8 transition-all duration-500',
          themeClasses[settings.theme],
          config.text
        )}
      >
        <div className="max-w-4xl mx-auto">
          <Header
            theme={settings.theme}
            onThemeChange={setTheme}
            streak={streak.current}
            onOpenStats={() => setShowStats(true)}
          />
          <HomeScreen onSelectMode={setAppMode} />
          <Footer />
        </div>
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

  // Render Kanji or Vocab Study Screen
  return (
    <div
      className={cn(
        'min-h-screen p-4 md:p-8 transition-all duration-500',
        themeClasses[settings.theme],
        config.text
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Home Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAppMode('home')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <div className="flex-1">
            <Header
              theme={settings.theme}
              onThemeChange={setTheme}
              streak={streak.current}
              onOpenStats={() => setShowStats(true)}
              title={appMode === 'kanji' ? '漢字' : '単語'}
            />
          </div>
        </div>

        {/* Week Selector */}
        <div className="mb-6">
          <WeekSelector
            weeks={currentWeeks}
            selectedWeek={currentSelectedWeek}
            onSelectWeek={handleWeekChange}
            unlockedWeeks={unlockedWeeks}
            completedWeeks={completedWeeks}
          />
        </div>

        {/* Day Selector */}
        <div className="mb-6">
          <DaySelector
            days={currentDays}
            selectedDay={currentSelectedDay}
            onSelectDay={handleDayChange}
            unlockedDays={unlockedDays}
            completedDays={completedDays}
          />
        </div>

        {/* Topic */}
        {currentTopic && (
          <motion.div
            className="text-center mb-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentTopic}
          >
            <p className={cn('text-sm md:text-base', config.textAccent)}>
              📚 {currentTopic}
            </p>
          </motion.div>
        )}

        {/* Study Mode Selector */}
        <div className="mb-6">
          <StudyModeSelector
            currentMode={studyMode}
            onSelectMode={setStudyMode}
            dueCount={srsQueue.length}
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar
            current={currentCardIndex + 1}
            total={cards.length}
            correct={currentScore.correct}
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
              transition={{ duration: 0.3 }}
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
        {studyMode === 'srs' ? (
          <SRSControls onGrade={handleSRSGrade} />
        ) : (
          <CardControls
            onPrev={handlePrev}
            onNext={handleNext}
            onFlip={toggleFlip}
            onKnown={handleKnown}
            onUnknown={handleUnknown}
            showQuizControls={studyMode === 'quiz' || studyMode === 'browse'}
          />
        )}

        {/* Reset Button */}
        <div className="text-center mt-6">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            အစကပြန်စရန်
          </Button>
        </div>

        {/* Footer */}
        <Footer />
      </div>

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
