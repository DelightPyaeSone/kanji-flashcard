import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface ChapterSelectorProps {
  chapters: string[];
  selectedChapter: string;
  onSelectChapter: (chapter: string) => void;
}

export function ChapterSelector({
  chapters,
  selectedChapter,
  onSelectChapter,
}: ChapterSelectorProps) {
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {chapters.map((chapter, index) => (
        <motion.button
          key={chapter}
          onClick={() => onSelectChapter(chapter)}
          className={cn(
            'px-4 py-2 rounded-xl font-medium transition-all duration-300',
            selectedChapter === chapter
              ? cn(
                  'text-white shadow-lg',
                  isSakura
                    ? 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-rose-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30'
                )
              : isDark
                ? 'bg-white/5 hover:bg-white/15 text-white/70'
                : isSakura
                  ? 'bg-white/50 hover:bg-white/70 text-rose-600 shadow-sm'
                  : 'bg-white/50 hover:bg-white/70 text-slate-600 shadow-sm'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          {chapter}
        </motion.button>
      ))}
    </div>
  );
}
