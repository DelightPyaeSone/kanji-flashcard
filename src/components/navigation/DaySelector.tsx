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
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {days.map((day) => (
        <motion.button
          key={day}
          onClick={() => onSelectDay(day)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm transition-all duration-300',
            selectedDay === day
              ? cn(
                  isSakura
                    ? 'bg-rose-400/80 shadow-lg shadow-rose-400/30'
                    : 'bg-cyan-500/80 shadow-lg shadow-cyan-500/30',
                  'text-white'
                )
              : isDark
                ? 'bg-white/5 hover:bg-white/15 text-white/70'
                : isSakura
                  ? 'bg-white/50 hover:bg-white/70 text-rose-600 shadow-sm'
                  : 'bg-white/50 hover:bg-white/70 text-slate-600 shadow-sm'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {day}
        </motion.button>
      ))}
    </div>
  );
}
