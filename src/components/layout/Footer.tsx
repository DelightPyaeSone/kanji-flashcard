import { cn } from '@/utils';
import { useTheme } from '@/hooks';

export function Footer() {
  const { config } = useTheme();

  return (
    <footer className="mt-8 text-center">
      {/* Minimal keyboard hints */}
      <div className={cn('mb-3 flex justify-center gap-4 text-xs', config.textMuted)}>
        <span>
          <kbd className={cn('px-1.5 py-0.5 rounded text-xs', config.selectorBg)}>Space</kbd> flip
        </span>
        <span>
          <kbd className={cn('px-1.5 py-0.5 rounded text-xs', config.selectorBg)}>←→</kbd> nav
        </span>
        <span>
          <kbd className={cn('px-1.5 py-0.5 rounded text-xs', config.selectorBg)}>B</kbd> bookmark
        </span>
      </div>

      {/* Minimal credits */}
      <p className={cn('text-xs', config.textMuted)}>
        Created by Pyae Sone for Lae Lae Wah❤️
      </p>
    </footer>
  );
}
