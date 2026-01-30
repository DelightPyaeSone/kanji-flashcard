import { BookOpen, Brain, Repeat } from 'lucide-react';
import type { StudyMode } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface StudyModeSelectorProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
  dueCount?: number;
}

const modes: { mode: StudyMode; label: string; icon: typeof BookOpen }[] = [
  { mode: 'browse', label: 'Browse', icon: BookOpen },
  { mode: 'quiz', label: 'Quiz', icon: Brain },
  { mode: 'srs', label: 'SRS', icon: Repeat },
];

export function StudyModeSelector({
  currentMode,
  onSelectMode,
  dueCount,
}: StudyModeSelectorProps) {
  const { config } = useTheme();

  return (
    <div className={cn('flex justify-center rounded-lg p-0.5', config.selectorBg)}>
      {modes.map(({ mode, label, icon: Icon }) => (
        <button
          key={mode}
          onClick={() => onSelectMode(mode)}
          className={cn(
            'px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors',
            currentMode === mode
              ? config.selectorActive
              : config.selectorInactive
          )}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
          {mode === 'srs' && dueCount !== undefined && dueCount > 0 && (
            <span className={cn(
              'ml-1 px-1.5 py-0.5 text-xs rounded-full',
              config.textAccent,
              config.selectorBg
            )}>
              {dueCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
