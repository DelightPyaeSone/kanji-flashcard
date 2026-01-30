import { LayoutGrid, List, CreditCard } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

export type ViewMode = 'flashcard' | 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const viewOptions = [
  { mode: 'flashcard' as ViewMode, icon: CreditCard, label: 'Card' },
  { mode: 'grid' as ViewMode, icon: LayoutGrid, label: 'Grid' },
  { mode: 'list' as ViewMode, icon: List, label: 'List' },
];

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  const { config, isDark } = useTheme();

  return (
    <div className={cn(
      'inline-flex rounded-lg p-1 border',
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
    )}>
      {viewOptions.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewModeChange(mode)}
          className={cn(
            'px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium',
            'transition-all duration-200',
            viewMode === mode
              ? config.selectorActive
              : config.selectorInactive
          )}
          title={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
