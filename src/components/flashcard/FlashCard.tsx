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
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className={cn('perspective-1000', className)}>
      <motion.div
        className="relative w-full aspect-[4/3] md:aspect-[16/9] cursor-pointer"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div
          className={cn(
            'absolute inset-0 rounded-3xl p-6 md:p-10',
            'flex flex-col items-center justify-center',
            config.cardFrontBg,
            'backdrop-blur-xl border',
            config.border,
            isDark ? 'shadow-2xl shadow-purple-500/20' : 'shadow-2xl shadow-purple-200/50'
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
              'absolute top-4 right-4 p-2 rounded-full transition-all',
              isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100',
              isBookmarked ? 'text-yellow-500' : config.textMuted
            )}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-6 h-6" />
            ) : (
              <Bookmark className="w-6 h-6" />
            )}
          </button>

          {/* Kanji */}
          <motion.div
            className={cn('text-7xl md:text-9xl font-bold drop-shadow-lg', config.text)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {card.kanji}
          </motion.div>

          {/* Reading (toggleable) */}
          {showReading && (
            <motion.div
              className={cn('text-2xl md:text-3xl mt-4', config.textSecondary)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
              'mt-6 px-4 py-2 rounded-xl flex items-center gap-2',
              'transition-all text-sm font-medium',
              config.buttonSecondary
            )}
          >
            {showReading ? (
              <>
                <EyeOff className="w-4 h-4" />
                ဖျောက်ရန်
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                အသံဖတ်ပုံပြရန်
              </>
            )}
          </button>

          {/* Hint */}
          <p className={cn('absolute bottom-4 text-sm', config.textMuted)}>
            Click to flip • Space နှိပ်ပါ
          </p>
        </div>

        {/* Back of Card */}
        <div
          className={cn(
            'absolute inset-0 rounded-3xl p-6 md:p-10',
            'flex flex-col items-center justify-center',
            config.cardBackBg,
            'backdrop-blur-xl border',
            config.border,
            isDark ? 'shadow-2xl shadow-blue-500/20' : 'shadow-2xl shadow-blue-200/50'
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
              'absolute top-4 right-4 p-2 rounded-full transition-all',
              isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100',
              isBookmarked ? 'text-yellow-500' : config.textMuted
            )}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-6 h-6" />
            ) : (
              <Bookmark className="w-6 h-6" />
            )}
          </button>

          {/* Kanji */}
          <div className={cn('text-5xl md:text-7xl font-bold mb-3', config.text)}>
            {card.kanji}
          </div>

          {/* Reading */}
          <div className={cn('text-xl md:text-2xl mb-2', config.textSecondary)}>
            {card.reading}
          </div>

          {/* English Meaning */}
          <div className={cn('text-lg md:text-xl mb-3', config.textAccent)}>
            {card.meaning}
          </div>

          {/* Myanmar Translation */}
          <div
            className={cn(
              'text-xl md:text-2xl font-medium',
              'px-6 py-3 rounded-2xl border',
              isDark
                ? 'text-yellow-300 bg-white/10 border-yellow-400/20'
                : isSakura
                  ? 'text-amber-700 bg-amber-50/80 border-amber-200'
                  : 'text-amber-700 bg-amber-50 border-amber-200'
            )}
          >
            🇲🇲 {card.myanmar}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
