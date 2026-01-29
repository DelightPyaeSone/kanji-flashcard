import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Home, ExternalLink } from 'lucide-react';

import { useStore } from '@/store';
import { getWeeks, getDays, getCards, getTopic, generateCardId } from '@/data';
import {
  getVocabChapters,
  getVocabSections,
  getVocabCards,
  getVocabSectionTitle,
  getVocabVideoUrl,
  generateVocabCardId,
} from '@/data/vocab';
import { useKeyboard, useTheme } from '@/hooks';
import { cn } from '@/utils';

import { HomeScreen } from '@/components/home';
import { FlashCard } from '@/components/flashcard';
import { WeekSelector, DaySelector } from '@/components/navigation';
import { VocabFlashCard, ChapterSelector, SectionSelector } from '@/components/vocab';
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
    appMode,
    selectedWeek,
    selectedDay,
    selectedChapter,
    selectedSection,
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
    setAppMode,
    setSelectedWeek,
    setSelectedDay,
    setSelectedChapter,
    setSelectedSection,
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
    resetSectionProgress,
    setTheme,
    updateStreak,
    refreshSRSQueue,
  } = useStore();

  // Get data based on app mode
  const weeks = getWeeks();
  const days = getDays(selectedWeek);
  const kanjiCards = getCards(selectedWeek, selectedDay);
  const kanjiTopic = getTopic(selectedWeek, selectedDay);

  const chapters = getVocabChapters();
  const sections = getVocabSections(selectedChapter);
  const vocabCards = getVocabCards(selectedChapter, selectedSection);
  const vocabTitle = getVocabSectionTitle(selectedChapter, selectedSection);
  const vocabVideoUrl = getVocabVideoUrl(selectedChapter, selectedSection);

  // Current cards based on mode
  const cards = appMode === 'kanji' ? kanjiCards : vocabCards;
  const currentCard = cards[currentCardIndex];
  const currentCardId = currentCard
    ? appMode === 'kanji'
      ? generateCardId(selectedWeek, selectedDay, currentCardIndex)
      : generateVocabCardId(selectedChapter, selectedSection, currentCardIndex)
    : '';

  // Check if current card is bookmarked
  const isBookmarked = bookmarkedCards.includes(currentCardId);

  // Get score for current day/section
  const scoreKey =
    appMode === 'kanji'
      ? `${selectedWeek}-${selectedDay}`
      : `${selectedChapter}-${selectedSection}`;
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

  const handleReset = () => {
    if (appMode === 'kanji') {
      resetDayProgress();
    } else {
      resetSectionProgress();
    }
  };

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

        {/* Navigation Selectors */}
        {appMode === 'kanji' ? (
          <>
            <div className="mb-6">
              <WeekSelector
                weeks={weeks}
                selectedWeek={selectedWeek}
                onSelectWeek={setSelectedWeek}
              />
            </div>
            <div className="mb-6">
              <DaySelector
                days={days}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <ChapterSelector
                chapters={chapters}
                selectedChapter={selectedChapter}
                onSelectChapter={setSelectedChapter}
              />
            </div>
            <div className="mb-6">
              <SectionSelector
                sections={sections}
                selectedSection={selectedSection}
                onSelectSection={setSelectedSection}
              />
            </div>
          </>
        )}

        {/* Topic / Title */}
        {(appMode === 'kanji' ? kanjiTopic : vocabTitle) && (
          <motion.div
            className="text-center mb-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={appMode === 'kanji' ? kanjiTopic : vocabTitle}
          >
            <p className={cn('text-sm md:text-base', config.textAccent)}>
              📚 {appMode === 'kanji' ? kanjiTopic : vocabTitle}
            </p>
            {appMode === 'vocab' && vocabVideoUrl && (
              <a
                href={vocabVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1 text-xs mt-2',
                  'hover:underline',
                  config.textMuted
                )}
              >
                <ExternalLink className="w-3 h-3" />
                Watch Video Lesson
              </a>
            )}
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
              {appMode === 'kanji' ? (
                <FlashCard
                  card={currentCard as any}
                  isFlipped={isFlipped}
                  showReading={showReading}
                  isBookmarked={isBookmarked}
                  onFlip={toggleFlip}
                  onToggleReading={toggleReading}
                  onToggleBookmark={handleToggleBookmark}
                />
              ) : (
                <VocabFlashCard
                  card={currentCard as any}
                  isFlipped={isFlipped}
                  isBookmarked={isBookmarked}
                  onFlip={toggleFlip}
                  onToggleBookmark={handleToggleBookmark}
                  videoUrl={vocabVideoUrl}
                />
              )}
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
