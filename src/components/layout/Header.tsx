import { motion } from 'framer-motion';
import { Sun, Moon, Flower2, BarChart3 } from 'lucide-react';
import type { Theme } from '@/types';
import { cn } from '@/utils';
import { themeConfig } from '@/hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  streak: number;
  onOpenStats?: () => void;
  title?: string;
}

const themes: { theme: Theme; icon: typeof Sun; label: string }[] = [
  { theme: 'dark', icon: Moon, label: 'Dark' },
  { theme: 'light', icon: Sun, label: 'Light' },
  { theme: 'sakura', icon: Flower2, label: 'Sakura' },
];

export function Header({
  theme,
  onThemeChange,
  streak,
  onOpenStats,
  title,
}: HeaderProps) {
  const config = themeConfig[theme];

  return (
    <header className="text-center mb-6">
      {/* Title - Clean flat text */}
      <motion.h1
        className={cn('text-2xl md:text-4xl font-bold mb-1', config.text)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {title ? `N2 ${title}` : 'N2 Master'}
      </motion.h1>

      <motion.p
        className={cn('text-sm md:text-base mb-4', config.textMuted)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title === '漢字'
          ? 'Kanji Flash Cards'
          : title === '単語'
            ? 'Vocabulary Flash Cards'
            : 'JLPT N2 Study App'
        }
      </motion.p>

      {/* Compact Toolbar */}
      <div className="flex items-center justify-center gap-2">
        {/* Theme Selector - Minimal */}
        <div className={cn('flex items-center gap-0.5 rounded-lg p-0.5', config.selectorBg)}>
          {themes.map(({ theme: t, icon: Icon }) => (
            <button
              key={t}
              onClick={() => onThemeChange(t)}
              className={cn(
                'p-2 rounded-md transition-colors',
                theme === t ? config.selectorActive : config.selectorInactive
              )}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Streak Badge - Minimal */}
        {streak > 0 && (
          <div
            className={cn(
              'flex items-center gap-1 px-2.5 py-1.5 rounded-lg',
              config.selectorBg
            )}
          >
            <span className="text-sm">🔥</span>
            <span className={cn('text-sm font-medium', config.textAccent)}>
              {streak}
            </span>
          </div>
        )}

        {/* Stats Button - Minimal */}
        {onOpenStats && (
          <button
            onClick={onOpenStats}
            className={cn(
              'p-2 rounded-lg transition-colors',
              config.selectorBg,
              config.selectorInactive
            )}
            title="Statistics"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
