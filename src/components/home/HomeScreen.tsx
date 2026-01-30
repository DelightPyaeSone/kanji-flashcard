import { motion } from 'framer-motion';
import { BookOpen, Languages } from 'lucide-react';
import type { AppMode } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface HomeScreenProps {
  onSelectMode: (mode: AppMode) => void;
}

const modes = [
  {
    id: 'kanji' as AppMode,
    title: '漢字',
    subtitle: 'Kanji',
    description: 'N2 日本語総まとめ 漢字',
    myanmar: 'ခန်းဂျိစာလုံးများ',
    icon: Languages,
    color: 'cyan',
  },
  {
    id: 'vocab' as AppMode,
    title: '単語',
    subtitle: 'Vocabulary',
    description: 'N2 日本語総まとめ 単語',
    myanmar: 'ဝေါဟာရများ',
    icon: BookOpen,
    color: 'rose',
  },
];

export function HomeScreen({ onSelectMode }: HomeScreenProps) {
  const { config, isDark } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Title - Clean, minimal */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={cn('text-4xl md:text-5xl font-bold mb-3', config.text)}>
          N2 Master
        </h1>
        <p className={cn('text-base', config.textMuted)}>
          日本語能力試験 N2 学習アプリ
        </p>
        <p className={cn('text-sm mt-1', config.textMuted)}>
          JLPT N2 Study App
        </p>
      </motion.div>

      {/* Mode Selection Cards - Clean flat design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={cn(
              'relative p-6 rounded-xl text-left transition-all duration-200',
              'border',
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50',
              'shadow-sm hover:shadow-md'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <div className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
              mode.color === 'cyan'
                ? isDark ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-100 text-cyan-600'
                : isDark ? 'bg-rose-900/50 text-rose-400' : 'bg-rose-100 text-rose-600'
            )}>
              <mode.icon className="w-6 h-6" />
            </div>

            {/* Title */}
            <h2 className={cn('text-2xl font-bold mb-1', config.text)}>
              {mode.title}
            </h2>
            <p className={cn(
              'text-sm font-medium mb-2',
              mode.color === 'cyan' ? config.textAccent :
                isDark ? 'text-rose-400' : 'text-rose-600'
            )}>
              {mode.subtitle}
            </p>

            {/* Description */}
            <p className={cn('text-sm mb-1', config.textMuted)}>
              {mode.description}
            </p>
            <p className={cn('text-xs', config.textMuted)}>
              {mode.myanmar}
            </p>

            {/* Arrow indicator */}
            <div className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2',
              'text-xl',
              config.textMuted
            )}>
              →
            </div>
          </motion.button>
        ))}
      </div>

      {/* Coming Soon - Minimal badge */}
      <motion.div
        className={cn(
          'mt-8 px-4 py-2 rounded-lg text-sm border',
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-500'
            : 'bg-white border-slate-200 text-slate-500'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        JLPT Questions - Coming Soon
      </motion.div>
    </div>
  );
}
