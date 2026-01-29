import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Target, Clock, TrendingUp } from 'lucide-react';
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
            className={cn('fixed inset-0 backdrop-blur-sm z-40', config.modalOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={cn(
              'fixed inset-x-4 top-1/2 -translate-y-1/2 z-50',
              'max-w-md mx-auto',
              'backdrop-blur-xl border rounded-3xl',
              'p-6 shadow-2xl',
              isDark
                ? 'bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-white/10'
                : isSakura
                  ? 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200'
                  : 'bg-gradient-to-br from-white to-purple-50 border-slate-200'
            )}
            initial={{ opacity: 0, scale: 0.9, y: '-40%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: '-40%' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={cn('text-2xl font-bold', config.text)}>📊 Statistics</h2>
              <button
                onClick={onClose}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  isDark
                    ? 'hover:bg-white/10 text-white/60 hover:text-white'
                    : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Streak */}
              <div className={cn(
                'rounded-2xl p-4 border',
                isDark
                  ? 'bg-white/5 border-orange-500/20'
                  : 'bg-white/80 border-orange-200'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className={config.textMuted + ' text-sm'}>Streak</span>
                </div>
                <div className="text-3xl font-bold text-orange-400">
                  {streak.current}
                  <span className="text-sm font-normal text-orange-400/60 ml-1">
                    days
                  </span>
                </div>
                <div className={cn('text-xs mt-1', config.textMuted)}>
                  Longest: {streak.longest} days
                </div>
              </div>

              {/* Accuracy */}
              <div className={cn(
                'rounded-2xl p-4 border',
                isDark
                  ? 'bg-white/5 border-green-500/20'
                  : 'bg-white/80 border-green-200'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className={config.textMuted + ' text-sm'}>Accuracy</span>
                </div>
                <div className="text-3xl font-bold text-green-500">
                  {accuracy}
                  <span className="text-sm font-normal text-green-500/60">%</span>
                </div>
                <div className={cn('text-xs mt-1', config.textMuted)}>
                  {totalCorrect}/{totalAttempts} correct
                </div>
              </div>

              {/* Cards Learned */}
              <div className={cn(
                'rounded-2xl p-4 border',
                isDark
                  ? 'bg-white/5 border-cyan-500/20'
                  : isSakura
                    ? 'bg-white/80 border-rose-200'
                    : 'bg-white/80 border-cyan-200'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={isSakura ? 'w-5 h-5 text-rose-500' : 'w-5 h-5 text-cyan-500'} />
                  <span className={config.textMuted + ' text-sm'}>Progress</span>
                </div>
                <div className={cn('text-3xl font-bold', isSakura ? 'text-rose-500' : 'text-cyan-500')}>
                  {progress}
                  <span className={cn('text-sm font-normal', isSakura ? 'text-rose-500/60' : 'text-cyan-500/60')}>%</span>
                </div>
                <div className={cn('text-xs mt-1', config.textMuted)}>
                  {knownCardsCount}/{totalCards} cards
                </div>
              </div>

              {/* Total Cards */}
              <div className={cn(
                'rounded-2xl p-4 border',
                isDark
                  ? 'bg-white/5 border-purple-500/20'
                  : isSakura
                    ? 'bg-white/80 border-pink-200'
                    : 'bg-white/80 border-purple-200'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className={isSakura ? 'w-5 h-5 text-pink-500' : 'w-5 h-5 text-purple-500'} />
                  <span className={config.textMuted + ' text-sm'}>Total Cards</span>
                </div>
                <div className={cn('text-3xl font-bold', isSakura ? 'text-pink-500' : 'text-purple-500')}>
                  {totalCards}
                </div>
                <div className={cn('text-xs mt-1', config.textMuted)}>8 weeks × 6 days</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={cn(
              'rounded-2xl p-4',
              isDark ? 'bg-white/5' : 'bg-white/80'
            )}>
              <div className="flex justify-between text-sm mb-2">
                <span className={config.textMuted}>Overall Progress</span>
                <span className={cn('font-medium', isSakura ? 'text-rose-500' : 'text-cyan-500')}>{progress}%</span>
              </div>
              <div className={cn(
                'h-3 rounded-full overflow-hidden',
                isDark ? 'bg-white/10' : 'bg-slate-200'
              )}>
                <motion.div
                  className={cn(
                    'h-full',
                    isSakura
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
