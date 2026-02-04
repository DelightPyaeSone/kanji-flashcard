import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, ArrowLeft } from 'lucide-react';
import type { KanjiCard, VocabCard } from '@/types';
import { generateKanjiQuizChoices, generateVocabQuizChoices, shuffle } from '@/utils';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';
import { QuizCard } from './QuizCard';

interface QuizModeProps {
  cards: (KanjiCard | VocabCard)[];
  mode: 'kanji' | 'vocab';
  onBack: () => void;
  onComplete: (score: number, total: number) => void;
}

export function QuizMode({ cards, mode, onBack, onComplete }: QuizModeProps) {
  const { config, isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle cards for quiz
  const quizCards = useMemo(() => shuffle([...cards]), [cards]);

  const currentCard = quizCards[currentIndex];

  // Generate choices for current card
  const choices = useMemo(() => {
    if (!currentCard) return [];

    if (mode === 'kanji') {
      return generateKanjiQuizChoices(
        currentCard as KanjiCard,
        cards as KanjiCard[],
        cards.indexOf(currentCard)
      );
    } else {
      return generateVocabQuizChoices(
        currentCard as VocabCard,
        cards as VocabCard[],
        cards.indexOf(currentCard)
      );
    }
  }, [currentCard, cards, mode]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to next question or complete
    if (currentIndex + 1 >= quizCards.length) {
      setIsComplete(true);
      onComplete(score + (isCorrect ? 1 : 0), quizCards.length);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
  };

  // Get question text
  const questionText = mode === 'kanji'
    ? (currentCard as KanjiCard)?.kanji
    : (currentCard as VocabCard)?.word;

  const readingText = mode === 'kanji'
    ? (currentCard as KanjiCard)?.reading
    : (currentCard as VocabCard)?.reading;

  // Quiz Complete Screen
  if (isComplete) {
    const percentage = Math.round((score / quizCards.length) * 100);
    const isPerfect = percentage === 100;
    const isPassed = percentage >= 90;
    const isGood = percentage >= 70;

    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Perfect Score Celebration */}
        {isPerfect && (
          <motion.div
            className="text-5xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            🎉🏆🎉
          </motion.div>
        )}

        {/* Trophy */}
        {!isPerfect && (
          <div className={cn(
            'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center',
            isPassed ? 'bg-yellow-500/20' : isGood ? 'bg-orange-500/20' : 'bg-slate-500/20'
          )}>
            <Trophy className={cn(
              'w-10 h-10',
              isPassed ? 'text-yellow-500' : isGood ? 'text-orange-500' : 'text-slate-500'
            )} />
          </div>
        )}

        {/* Result */}
        <h2 className={cn('text-2xl font-bold mb-2', config.text)}>
          {isPerfect ? '🌟 Congratulations! 🌟' : isPassed ? 'အောင်မြင်ပါပြီ!' : isGood ? 'ကောင်းပါတယ်!' : 'ထပ်ကြိုးစားပါ!'}
        </h2>

        {isPerfect && (
          <motion.p
            className={cn('text-lg mb-2', config.textMuted)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Perfect Score! အားလုံးမှန်ပါတယ် 🎊
          </motion.p>
        )}

        {isPassed && !isPerfect && (
          <p className={cn('text-sm mb-2 text-emerald-500')}>
            ✅ နောက်တစ်နေ့ unlock ဖြစ်ပါပြီ!
          </p>
        )}

        <div className={cn('text-4xl font-bold mb-2', isPerfect ? 'text-yellow-500' : isPassed ? 'text-emerald-500' : isGood ? 'text-orange-500' : 'text-red-500')}>
          {percentage}%
        </div>

        <div className={cn('text-lg mb-6', config.textMuted)}>
          {score} / {quizCards.length} correct
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onBack}
            className={cn(
              'px-4 py-2 rounded-lg flex items-center gap-2',
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300',
              config.text
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleRestart}
            className={cn(
              'px-4 py-2 rounded-lg flex items-center gap-2',
              'bg-cyan-600 hover:bg-cyan-500 text-white'
            )}
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  // Quiz in progress
  return (
    <div>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className={config.textMuted}>Score: {score}/{currentIndex}</span>
          <span className={config.textMuted}>{currentIndex + 1}/{quizCards.length}</span>
        </div>
        <div className={cn('h-1.5 rounded-full', isDark ? 'bg-slate-800' : 'bg-slate-200')}>
          <div
            className="h-full rounded-full bg-cyan-500 transition-all"
            style={{ width: `${((currentIndex + 1) / quizCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Quiz Card */}
      {currentCard && (
        <QuizCard
          question={questionText}
          reading={readingText}
          choices={choices}
          onAnswer={handleAnswer}
          questionNumber={currentIndex + 1}
          totalQuestions={quizCards.length}
        />
      )}
    </div>
  );
}
