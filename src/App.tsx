import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

import { useStore } from '@/store';
import { getWeeks, getDays, getCards, getTopic, generateCardId } from '@/data';
import { useKeyboard, useTheme } from '@/hooks';
import { cn } from '@/utils';

import { FlashCard } from '@/components/flashcard';
import { WeekSelector, DaySelector } from '@/components/navigation';
import { ProgressBar, Button } from '@/components/common';
import { CardControls, SRSControls, StudyModeSelector } from '@/components/study';
import { Header, Footer } from '@/components/layout';
import { StatsModal } from '@/components/stats';

const themeClasses = {
  dark: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
  light: 'bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100',
  sakura: 'bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50',
};

export default function App() {
  const [showStats, setShowStats] = useState(false);
  const { config, isDark, isSakura } = useTheme();

  const {
    selectedWeek,
    selectedDay,
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
    setSelectedWeek,
    setSelectedDay,
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
    setTheme,
    updateStreak,
    refreshSRSQueue,
  } = useStore();

  // Get data
  const weeks = getWeeks();
  const days = getDays(selectedWeek);
  const cards = getCards(selectedWeek, selectedDay);
  const topic = getTopic(selectedWeek, selectedDay);
  const currentCard = cards[currentCardIndex];
  const currentCardId = currentCard
    ? generateCardId(selectedWeek, selectedDay, currentCardIndex)
    : '';

  // Check if current card is bookmarked
  const isBookmarked = bookmarkedCards.includes(currentCardId);

  // Get score for current day
  const scoreKey = `${selectedWeek}-${selectedDay}`;
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

  // Update streak on mount and day change
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Refresh SRS queue when mode changes
  useEffect(() => {
    if (studyMode === 'srs') {
      refreshSRSQueue();
    }
  }, [studyMode, refreshSRSQueue]);

  // Handlers
  const handleNext = () => nextCard(cards.length);
  const handlePrev = () => prevCard(cards.length);

  const handleKnown = () => {
    markAsKnown(currentCardId);
    nextCard(cards.length);
  };

  const handleUnknown = () => {
    markAsUnknown(currentCardId);
    nextCard(cards.length);
  };

  const handleToggleBookmark = () => {
    toggleBookmark(currentCardId);
  };

  return (
    <div
      className={cn(
        'min-h-screen p-4 md:p-8 transition-all duration-500',
        themeClasses[settings.theme],
        config.text
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header
          theme={settings.theme}
          onThemeChange={setTheme}
          streak={streak.current}
          onOpenStats={() => setShowStats(true)}
        />

        {/* Week Selector */}
        <div className="mb-6">
          <WeekSelector
            weeks={weeks}
            selectedWeek={selectedWeek}
            onSelectWeek={setSelectedWeek}
          />
        </div>

        {/* Day Selector */}
        <div className="mb-6">
          <DaySelector
            days={days}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        {/* Topic */}
        {topic && (
          <motion.div
            className="text-center mb-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={topic}
          >
            <p className={cn('text-sm md:text-base', config.textAccent)}>
              📚 {topic}
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
          <Button
            variant="ghost"
            size="sm"
            onClick={resetDayProgress}
          >
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
