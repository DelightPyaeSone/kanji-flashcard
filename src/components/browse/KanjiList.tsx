import { motion } from 'framer-motion';
import type { KanjiCard } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface KanjiListProps {
  cards: KanjiCard[];
  onSelectCard: (index: number) => void;
  currentIndex: number;
}

export function KanjiList({ cards, onSelectCard, currentIndex }: KanjiListProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="space-y-2">
      {cards.map((card, index) => (
        <motion.button
          key={index}
          onClick={() => onSelectCard(index)}
          className={cn(
            'w-full p-3 rounded-lg flex items-center gap-4 text-left',
            'transition-all duration-200 border',
            currentIndex === index
              ? config.gridCardActive
              : config.gridCard
          )}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.02 }}
        >
          {/* Index Number */}
          <span className={cn('text-sm w-6 text-center', config.textMuted)}>
            {index + 1}
          </span>

          {/* Kanji */}
          <span className={cn('text-2xl font-bold w-12', config.text)}>
            {card.kanji}
          </span>

          {/* Reading */}
          <span className={cn('text-sm flex-1', config.textAccent)}>
            {card.reading}
          </span>

          {/* Meaning */}
          <span className={cn('text-sm text-right', config.textMuted)}>
            {card.meaning}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
