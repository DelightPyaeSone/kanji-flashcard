import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface WeekSelectorProps {
  weeks: string[];
  selectedWeek: string;
  onSelectWeek: (week: string) => void;
}

export function WeekSelector({
  weeks,
  selectedWeek,
  onSelectWeek,
}: WeekSelectorProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {weeks.map((week) => (
        <motion.button
          key={week}
          onClick={() => onSelectWeek(week)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            'border',
            selectedWeek === week
              ? cn(config.selectorActive, isDark ? 'border-cyan-500' : 'border-transparent')
              : cn(
                  config.selectorInactive,
                  isDark ? 'border-slate-800' : 'border-slate-200'
                )
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {week}
        </motion.button>
      ))}
    </div>
  );
}
