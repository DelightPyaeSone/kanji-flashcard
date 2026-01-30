import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Eye, EyeOff } from 'lucide-react';
import type { KanjiCard } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface FlashCardProps {
  card: KanjiCard;
  isFlipped: boolean;
  showReading: boolean;
  isBookmarked: boolean;
  onFlip: () => void;
  onToggleReading: () => void;
  onToggleBookmark: () => void;
  className?: string;
}

export function FlashCard({
  card,
  isFlipped,
  showReading,
  isBookmarked,
  onFlip,
  onToggleReading,
  onToggleBookmark,
  className,
}: FlashCardProps) {
  const { config, isDark } = useTheme();

  return (
    <div className={cn('perspective-1000', className)}>
      <motion.div
        className="relative w-full aspect-[4/3] md:aspect-[16/9] cursor-pointer"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card - Clean, minimal design */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl p-6 md:p-8',
            'flex flex-col items-center justify-center',
            config.cardFrontBg,
            'border',
            config.border,
            isDark ? 'shadow-lg shadow-black/20' : 'shadow-md'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-lg transition-colors',
              isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100',
              isBookmarked ? 'text-amber-400' : config.textMuted
            )}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          {/* Kanji - Large and prominent */}
          <motion.div
            className={cn(
              'text-7xl md:text-9xl font-bold',
              config.text,
              'select-none'
            )}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {card.kanji}
          </motion.div>

          {/* Reading (toggleable) */}
          {showReading && (
            <motion.div
              className={cn('text-xl md:text-2xl mt-4', config.textSecondary)}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {card.reading}
            </motion.div>
          )}

          {/* Toggle Reading Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleReading();
            }}
            className={cn(
              'mt-6 px-4 py-2 rounded-lg flex items-center gap-2',
              'transition-colors text-sm font-medium',
              config.buttonSecondary
            )}
          >
            {showReading ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide Reading
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Show Reading
              </>
            )}
          </button>

          {/* Hint */}
          <p className={cn('absolute bottom-3 text-xs', config.textMuted)}>
            Tap to flip
          </p>
        </div>

        {/* Back of Card - Clean info layout */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl p-6 md:p-8',
            'flex flex-col items-center justify-center gap-3',
            config.cardBackBg,
            'border',
            config.border,
            isDark ? 'shadow-lg shadow-black/20' : 'shadow-md'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-lg transition-colors',
              isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100',
              isBookmarked ? 'text-amber-400' : config.textMuted
            )}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          {/* Kanji */}
          <div className={cn('text-4xl md:text-6xl font-bold', config.text)}>
            {card.kanji}
          </div>

          {/* Reading */}
          <div className={cn('text-lg md:text-xl', config.textAccent)}>
            {card.reading}
          </div>

          {/* Divider */}
          <div className={cn('w-16 h-px my-1', isDark ? 'bg-slate-700' : 'bg-slate-200')} />

          {/* English Meaning */}
          <div className={cn('text-base md:text-lg', config.textSecondary)}>
            {card.meaning}
          </div>

          {/* Myanmar Translation */}
          <div
            className={cn(
              'text-lg md:text-xl font-medium mt-2',
              'px-4 py-2 rounded-lg border',
              isDark
                ? 'text-amber-300 bg-amber-900/30 border-amber-800'
                : 'text-amber-700 bg-amber-50 border-amber-200'
            )}
          >
            {card.myanmar}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
