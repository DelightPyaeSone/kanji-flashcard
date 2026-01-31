import { ChevronRight, Lock, CheckCircle, Play } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface DayListProps {
  week: string;
  days: string[];
  unlockedDays: string[];
  completedDays: string[];
  onSelectDay: (day: string) => void;
  onBack: () => void;
  getDayProgress: (day: string) => number;
  getDayCardCount: (day: string) => number;
  topic?: string;
}

export function DayList({
  week,
  days,
  unlockedDays,
  completedDays,
  onSelectDay,
  onBack,
  getDayProgress,
  getDayCardCount,
}: DayListProps) {
  const { config, isDark } = useTheme();

  return (
    <div>
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className={cn(
            'p-2 rounded-lg transition-colors',
            isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100',
            config.textMuted
          )}
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h2 className={cn('text-xl font-bold', config.text)}>{week}</h2>
      </div>

      {/* Day List */}
      <div className="space-y-2">
        {days.map((day) => {
          const isUnlocked = unlockedDays.includes(day);
          const isCompleted = completedDays.includes(day);
          const progress = getDayProgress(day);
          const cardCount = getDayCardCount(day);

          return (
            <button
              key={day}
              onClick={() => isUnlocked && onSelectDay(day)}
              disabled={!isUnlocked}
              className={cn(
                'w-full p-4 rounded-xl flex items-center justify-between',
                'transition-colors',
                isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200',
                !isUnlocked && 'opacity-50 cursor-not-allowed',
                isUnlocked && (isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50')
              )}
            >
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : !isUnlocked
                        ? isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-400'
                        : isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-white'
                  )}
                >
                  {!isUnlocked ? (
                    <Lock className="w-4 h-4" />
                  ) : isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </div>

                {/* Day Info */}
                <div className="text-left">
                  <div className={cn('font-medium', config.text)}>{day}</div>
                  <div className={cn('text-sm', config.textMuted)}>
                    {cardCount} cards • {isCompleted ? 'Completed' : `${progress}%`}
                  </div>
                </div>
              </div>

              {/* Progress Bar & Arrow */}
              <div className="flex items-center gap-3">
                {isUnlocked && !isCompleted && (
                  <div className={cn('w-16 h-1.5 rounded-full', isDark ? 'bg-slate-800' : 'bg-slate-200')}>
                    <div
                      className={cn('h-full rounded-full', config.progressFill)}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                {isUnlocked && (
                  <ChevronRight className={cn('w-5 h-5', config.textMuted)} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
