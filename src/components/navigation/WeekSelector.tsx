import { Lock, CheckCircle } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface WeekSelectorProps {
  weeks: string[];
  selectedWeek: string;
  onSelectWeek: (week: string) => void;
  unlockedWeeks?: string[];
  completedWeeks?: string[];
}

export function WeekSelector({
  weeks,
  selectedWeek,
  onSelectWeek,
  unlockedWeeks = weeks, // Default: all unlocked
  completedWeeks = [],
}: WeekSelectorProps) {
  const { config, isDark } = useTheme();

  const handleClick = (week: string) => {
    if (unlockedWeeks.includes(week)) {
      onSelectWeek(week);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {weeks.map((week) => {
        const isUnlocked = unlockedWeeks.includes(week);
        const isCompleted = completedWeeks.includes(week);
        const isSelected = selectedWeek === week;

        return (
          <button
            key={week}
            onClick={() => handleClick(week)}
            disabled={!isUnlocked}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              'border flex items-center gap-1.5',
              !isUnlocked && 'opacity-50 cursor-not-allowed',
              isSelected
                ? cn(config.selectorActive, isDark ? 'border-cyan-500' : 'border-transparent')
                : cn(
                    config.selectorInactive,
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  )
            )}
          >
            {!isUnlocked && <Lock className="w-3.5 h-3.5" />}
            {isCompleted && isUnlocked && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
            {week}
          </button>
        );
      })}
    </div>
  );
}
