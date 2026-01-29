import { motion } from 'framer-motion';
import { BookOpen, Brain, Repeat } from 'lucide-react';
import type { StudyMode } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface StudyModeSelectorProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
  dueCount?: number;
}

const modes: { mode: StudyMode; label: string; labelMM: string; icon: typeof BookOpen }[] = [
  { mode: 'browse', label: 'Browse', labelMM: 'ကြည့်ရှု', icon: BookOpen },
  { mode: 'quiz', label: 'Quiz', labelMM: 'စာမေးပွဲ', icon: Brain },
  { mode: 'srs', label: 'SRS', labelMM: 'ပြန်လေ့လာ', icon: Repeat },
];

export function StudyModeSelector({
  currentMode,
  onSelectMode,
  dueCount,
}: StudyModeSelectorProps) {
  const { config, isDark, isSakura } = useTheme();

  return (
    <div className="flex justify-center gap-2">
      {modes.map(({ mode, label, labelMM, icon: Icon }) => (
        <motion.button
          key={mode}
          onClick={() => onSelectMode(mode)}
          className={cn(
            'px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all border',
            currentMode === mode
              ? cn(
                  isSakura
                    ? 'bg-gradient-to-r from-rose-400/50 to-pink-400/50 border-rose-400/30'
                    : 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 border-purple-400/30',
                  isDark ? 'text-white' : isSakura ? 'text-rose-900' : 'text-slate-900'
                )
              : cn(
                  isDark
                    ? 'bg-white/5 text-white/60 hover:bg-white/10 border-transparent'
                    : isSakura
                      ? 'bg-white/50 text-rose-600 hover:bg-white/70 border-rose-200'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70 border-slate-200'
                )
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon className="w-4 h-4" />
          <span>{labelMM}</span>
          {mode === 'srs' && dueCount !== undefined && dueCount > 0 && (
            <span className={cn('ml-1 px-1.5 py-0.5 text-xs rounded-full', config.dueBadge)}>
              {dueCount}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
