import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface WeekListProps {
  weeks: string[];
  unlockedWeeks: string[];
  completedWeeks: string[];
  onSelectWeek: (week: string) => void;
  getWeekProgress: (week: string) => number;
}

export function WeekList({
  weeks,
  unlockedWeeks,
  completedWeeks,
  onSelectWeek,
  getWeekProgress,
}: WeekListProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="space-y-2">
      {weeks.map((week) => {
        const isUnlocked = unlockedWeeks.includes(week);
        const isCompleted = completedWeeks.includes(week);
        const progress = getWeekProgress(week);

        return (
          <button
            key={week}
            onClick={() => isUnlocked && onSelectWeek(week)}
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
                  <span className="text-sm font-bold">{week.replace('Week ', '')}</span>
                )}
              </div>

              {/* Week Info */}
              <div className="text-left">
                <div className={cn('font-medium', config.text)}>{week}</div>
                <div className={cn('text-sm', config.textMuted)}>
                  {isCompleted ? 'Completed' : `${progress}% complete`}
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
  );
}
