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
  const { config, isSakura } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {weeks.map((week) => (
        <motion.button
          key={week}
          onClick={() => onSelectWeek(week)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
            selectedWeek === week
              ? cn(
                  config.cardBgActive,
                  'text-white',
                  isSakura ? 'shadow-lg shadow-rose-400/30' : 'shadow-lg shadow-purple-500/30'
                )
              : config.buttonSecondary
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {week}
        </motion.button>
      ))}
    </div>
  );
}
