import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Target, TrendingUp, BookOpen } from 'lucide-react';
import type { StreakInfo, Score } from '@/types';
import { getTotalCards } from '@/data';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak: StreakInfo;
  knownCardsCount: number;
  scores: Record<string, Score>;
}

export function StatsModal({
  isOpen,
  onClose,
  streak,
  knownCardsCount,
  scores,
}: StatsModalProps) {
  const { config, isDark, isSakura } = useTheme();
  const totalCards = getTotalCards();
  const totalCorrect = Object.values(scores).reduce(
    (sum, s) => sum + s.correct,
    0
  );
  const totalAttempts = Object.values(scores).reduce(
    (sum, s) => sum + s.total,
    0
  );
  const accuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const progress = Math.round((knownCardsCount / totalCards) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal - Flat, minimal design */}
          <motion.div
            className={cn(
              'fixed inset-x-4 top-1/2 -translate-y-1/2 z-50',
              'max-w-md mx-auto',
              'border rounded-xl p-5',
              isDark
                ? 'bg-slate-900 border-slate-800'
                : isSakura
                  ? 'bg-white border-rose-200'
                  : 'bg-white border-slate-200'
            )}
            initial={{ opacity: 0, scale: 0.95, y: '-45%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className={cn('text-xl font-bold', config.text)}>Statistics</h2>
              <button
                onClick={onClose}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  config.selectorInactive,
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stats Grid - Clean flat cards */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Streak */}
              <div className={cn('rounded-lg p-3', config.selectorBg)}>
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className={cn('text-xs', config.textMuted)}>Streak</span>
                </div>
                <div className="text-2xl font-bold text-orange-500">
                  {streak.current}
                  <span className="text-xs font-normal opacity-60 ml-1">days</span>
                </div>
                <div className={cn('text-xs', config.textMuted)}>
                  Best: {streak.longest}
                </div>
              </div>

              {/* Accuracy */}
              <div className={cn('rounded-lg p-3', config.selectorBg)}>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <span className={cn('text-xs', config.textMuted)}>Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-emerald-500">
                  {accuracy}
                  <span className="text-xs font-normal opacity-60">%</span>
                </div>
                <div className={cn('text-xs', config.textMuted)}>
                  {totalCorrect}/{totalAttempts}
                </div>
              </div>

              {/* Progress */}
              <div className={cn('rounded-lg p-3', config.selectorBg)}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className={cn('w-4 h-4', config.textAccent)} />
                  <span className={cn('text-xs', config.textMuted)}>Progress</span>
                </div>
                <div className={cn('text-2xl font-bold', config.textAccent)}>
                  {progress}
                  <span className="text-xs font-normal opacity-60">%</span>
                </div>
                <div className={cn('text-xs', config.textMuted)}>
                  {knownCardsCount}/{totalCards}
                </div>
              </div>

              {/* Total */}
              <div className={cn('rounded-lg p-3', config.selectorBg)}>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className={cn('w-4 h-4', config.textMuted)} />
                  <span className={cn('text-xs', config.textMuted)}>Total</span>
                </div>
                <div className={cn('text-2xl font-bold', config.text)}>
                  {totalCards}
                </div>
                <div className={cn('text-xs', config.textMuted)}>cards</div>
              </div>
            </div>

            {/* Progress Bar - Thin and clean */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className={config.textMuted}>Overall Progress</span>
                <span className={config.textAccent}>{progress}%</span>
              </div>
              <div className={cn('h-1.5 rounded-full overflow-hidden', config.progressBg)}>
                <motion.div
                  className={config.progressFill}
                  style={{ height: '100%' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
