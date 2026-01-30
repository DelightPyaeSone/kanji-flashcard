import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface DaySelectorProps {
  days: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

export function DaySelector({
  days,
  selectedDay,
  onSelectDay,
}: DaySelectorProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {days.map((day) => (
        <motion.button
          key={day}
          onClick={() => onSelectDay(day)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
            'border',
            selectedDay === day
              ? cn(config.selectorActive, isDark ? 'border-cyan-500' : 'border-transparent')
              : cn(
                  config.selectorInactive,
                  isDark ? 'border-slate-800' : 'border-slate-200'
                )
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {day}
        </motion.button>
      ))}
    </div>
  );
}
