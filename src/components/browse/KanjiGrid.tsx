import { motion } from 'framer-motion';
import type { KanjiCard } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface KanjiGridProps {
  cards: KanjiCard[];
  onSelectCard: (index: number) => void;
  currentIndex: number;
}

export function KanjiGrid({ cards, onSelectCard, currentIndex }: KanjiGridProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {cards.map((card, index) => (
        <motion.button
          key={index}
          onClick={() => onSelectCard(index)}
          className={cn(
            'aspect-square rounded-lg flex items-center justify-center',
            'text-2xl md:text-3xl font-bold transition-all duration-200',
            'border',
            currentIndex === index
              ? config.gridCardActive
              : config.gridCard
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.01 }}
        >
          <span className={config.text}>{card.kanji}</span>
        </motion.button>
      ))}
    </div>
  );
}
