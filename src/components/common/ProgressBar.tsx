import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface ProgressBarProps {
  current: number;
  total: number;
  correct?: number;
  className?: string;
}

export function ProgressBar({
  current,
  total,
  correct,
  className,
}: ProgressBarProps) {
  const { config, isDark } = useTheme();
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('flex justify-between text-sm mb-2', config.textMuted)}>
        <span>
          {current} / {total}
        </span>
        {correct !== undefined && (
          <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
            {correct} correct
          </span>
        )}
      </div>
      <div className={cn('h-1.5 rounded-full overflow-hidden', config.progressBg)}>
        <motion.div
          className={config.progressFill}
          style={{ height: '100%' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
