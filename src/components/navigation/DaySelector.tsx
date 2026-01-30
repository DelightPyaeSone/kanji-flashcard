import { Lock, Check } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface DaySelectorProps {
  days: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
  unlockedDays?: string[];
  completedDays?: string[];
}

export function DaySelector({
  days,
  selectedDay,
  onSelectDay,
  unlockedDays = days, // Default: all unlocked
  completedDays = [],
}: DaySelectorProps) {
  const { config, isDark } = useTheme();

  const handleClick = (day: string) => {
    if (unlockedDays.includes(day)) {
      onSelectDay(day);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {days.map((day) => {
        const isUnlocked = unlockedDays.includes(day);
        const isCompleted = completedDays.includes(day);
        const isSelected = selectedDay === day;

        return (
          <button
            key={day}
            onClick={() => handleClick(day)}
            disabled={!isUnlocked}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm transition-colors',
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
            {!isUnlocked && <Lock className="w-3 h-3" />}
            {isCompleted && isUnlocked && <Check className="w-3 h-3 text-emerald-500" />}
            {day}
          </button>
        );
      })}
    </div>
  );
}
