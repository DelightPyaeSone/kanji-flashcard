import { motion } from 'framer-motion';
import { BookOpen, Languages, HelpCircle } from 'lucide-react';
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
    gradient: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-500/30',
  },
  {
    id: 'vocab' as AppMode,
    title: '単語',
    subtitle: 'Vocabulary',
    description: 'N2 日本語総まとめ 単語',
    myanmar: 'ဝေါဟာရများ',
    icon: BookOpen,
    gradient: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-500/30',
  },
  // Future: JLPT Questions
  // {
  //   id: 'questions' as AppMode,
  //   title: '問題',
  //   subtitle: 'Questions',
  //   description: 'JLPT N2 Practice Questions',
  //   myanmar: 'မေးခွန်းများ',
  //   icon: HelpCircle,
  //   gradient: 'from-green-500 to-emerald-500',
  //   shadowColor: 'shadow-green-500/30',
  // },
];

export function HomeScreen({ onSelectMode }: HomeScreenProps) {
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={cn(
          'text-4xl md:text-5xl font-bold mb-3',
          isSakura
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent'
        )}>
          N2 Master
        </h1>
        <p className={cn('text-lg', config.textMuted)}>
          日本語能力試験 N2 学習アプリ
        </p>
        <p className={cn('text-sm mt-1', config.textMuted)}>
          JLPT N2 လေ့လာရေး App
        </p>
      </motion.div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={cn(
              'relative p-6 rounded-3xl text-left transition-all duration-300',
              'border backdrop-blur-xl',
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : isSakura
                  ? 'bg-white/60 border-rose-200 hover:bg-white/80'
                  : 'bg-white/60 border-slate-200 hover:bg-white/80',
              'shadow-xl hover:shadow-2xl',
              mode.shadowColor
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <div className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center mb-4',
              `bg-gradient-to-br ${mode.gradient}`,
              'shadow-lg',
              mode.shadowColor
            )}>
              <mode.icon className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h2 className={cn('text-2xl font-bold mb-1', config.text)}>
              {mode.title}
            </h2>
            <p className={cn('text-sm font-medium mb-2', config.textAccent)}>
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
              'text-2xl opacity-50'
            )}>
              →
            </div>
          </motion.button>
        ))}
      </div>

      {/* Coming Soon */}
      <motion.div
        className={cn(
          'mt-8 px-4 py-2 rounded-full text-sm',
          isDark ? 'bg-white/5' : 'bg-slate-100'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className={config.textMuted}>
          🚀 JLPT Questions - Coming Soon!
        </span>
      </motion.div>
    </div>
  );
}
