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
  const { config, isSakura } = useTheme();
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('flex justify-between text-sm mb-2', config.textAccent)}>
        <span>
          Card {current} of {total}
        </span>
        {correct !== undefined && (
          <span className={isSakura ? 'text-green-600' : 'text-green-500'}>
            ✓ {correct}
          </span>
        )}
      </div>
      <div className={cn('h-2 rounded-full overflow-hidden', config.progressBg)}>
        <motion.div
          className={cn(
            'h-full',
            isSakura
              ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500'
              : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
