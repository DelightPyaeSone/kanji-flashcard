import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Volume2, ExternalLink } from 'lucide-react';
import type { VocabCard } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface VocabFlashCardProps {
  card: VocabCard;
  isFlipped: boolean;
  isBookmarked: boolean;
  onFlip: () => void;
  onToggleBookmark: () => void;
  videoUrl?: string;
}

export function VocabFlashCard({
  card,
  isFlipped,
  isBookmarked,
  onFlip,
  onToggleBookmark,
  videoUrl,
}: VocabFlashCardProps) {
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <motion.div
        className="relative w-full aspect-[3/4] cursor-pointer"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side - Word */}
        <div
          className={cn(
            'absolute inset-0 rounded-3xl p-6',
            'flex flex-col items-center justify-center',
            'backface-hidden border shadow-2xl',
            isDark
              ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-white/10'
              : isSakura
                ? 'bg-gradient-to-br from-rose-100 via-pink-100 to-rose-50 border-rose-200'
                : 'bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 border-slate-200'
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
              isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
            )}
          >
            {isBookmarked ? (
              <BookmarkCheck className={cn('w-6 h-6', isSakura ? 'text-rose-500' : 'text-yellow-500')} />
            ) : (
              <Bookmark className={cn('w-6 h-6', config.textMuted)} />
            )}
          </button>

          {/* Video Link */}
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'absolute top-4 left-4 p-2 rounded-full transition-all',
                isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
              )}
            >
              <ExternalLink className={cn('w-5 h-5', config.textMuted)} />
            </a>
          )}

          {/* Word */}
          <motion.div
            className={cn('text-6xl md:text-7xl font-bold mb-4', config.text)}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {card.word}
          </motion.div>

          {/* Reading */}
          <div className={cn('text-2xl', config.textAccent)}>
            {card.reading}
          </div>

          {/* Tap hint */}
          <div className={cn('absolute bottom-4 text-sm', config.textMuted)}>
            Tap to see meaning
          </div>
        </div>

        {/* Back Side - Meaning */}
        <div
          className={cn(
            'absolute inset-0 rounded-3xl p-6',
            'flex flex-col items-center justify-center',
            'backface-hidden border shadow-2xl',
            isDark
              ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 border-white/10'
              : isSakura
                ? 'bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 border-rose-200'
                : 'bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 border-slate-200'
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Word (smaller) */}
          <div className={cn('text-3xl font-bold mb-2', config.text)}>
            {card.word}
          </div>

          {/* Reading */}
          <div className={cn('text-xl mb-4', config.textAccent)}>
            {card.reading}
          </div>

          {/* Divider */}
          <div className={cn('w-16 h-0.5 mb-4', isDark ? 'bg-white/20' : 'bg-slate-300')} />

          {/* English Meaning */}
          <div className={cn('text-xl font-medium mb-2 text-center', config.text)}>
            {card.meaning}
          </div>

          {/* Myanmar Meaning */}
          <div className={cn('text-lg mb-4 text-center', config.textAccent)}>
            {card.myanmar}
          </div>

          {/* Example Sentence */}
          {card.example && (
            <div className={cn(
              'mt-4 p-4 rounded-xl w-full text-center',
              isDark ? 'bg-white/5' : 'bg-white/60'
            )}>
              <p className={cn('text-base mb-1', config.text)}>
                {card.example}
              </p>
              {card.exampleMeaning && (
                <p className={cn('text-sm', config.textMuted)}>
                  {card.exampleMeaning}
                </p>
              )}
            </div>
          )}

          {/* Tap hint */}
          <div className={cn('absolute bottom-4 text-sm', config.textMuted)}>
            Tap to see word
          </div>
        </div>
      </motion.div>
    </div>
  );
}
