import { motion } from 'framer-motion';
import { Sun, Moon, Flower2, BarChart3, Search, Settings } from 'lucide-react';
import type { Theme } from '@/types';
import { cn } from '@/utils';
import { themeConfig } from '@/hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  streak: number;
  onOpenStats?: () => void;
  onOpenSearch?: () => void;
  onOpenSettings?: () => void;
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
  onOpenSearch,
  onOpenSettings,
  title,
}: HeaderProps) {
  const config = themeConfig[theme];
  const isSakura = theme === 'sakura';

  return (
    <header className="text-center mb-8">
      {/* Title */}
      <motion.h1
        className={cn(
          'text-3xl md:text-5xl font-bold mb-2',
          isSakura
            ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title ? `N2 ${title}` : 'N2 Master'}
      </motion.h1>

      <motion.h2
        className={cn('text-xl md:text-2xl font-light mb-4', config.textAccent)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title === '漢字'
          ? 'Kanji Flash Cards • မြန်မာဘာသာပြန်'
          : title === '単語'
            ? 'Vocabulary Flash Cards • မြန်မာဘာသာပြန်'
            : 'JLPT N2 Study App • မြန်မာဘာသာပြန်'
        }
      </motion.h2>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Theme Selector */}
        <div className={cn('flex items-center gap-1 rounded-xl p-1', config.selectorBg)}>
          {themes.map(({ theme: t, icon: Icon }) => (
            <motion.button
              key={t}
              onClick={() => onThemeChange(t)}
              className={cn(
                'p-2.5 rounded-lg transition-all',
                theme === t ? config.selectorActive : config.selectorInactive
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>

        {/* Streak Badge */}
        {streak > 0 && (
          <motion.div
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border',
              config.badgeBg
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <span className="text-lg">🔥</span>
            <span className={cn('font-medium', config.badgeText)}>
              {streak} days
            </span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {onOpenSearch && (
            <motion.button
              onClick={onOpenSearch}
              className={cn(
                'p-2.5 rounded-lg transition-all',
                config.selectorInactive,
                theme === 'dark' ? 'hover:bg-white/10' : isSakura ? 'hover:bg-rose-50' : 'hover:bg-slate-100'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          )}

          {onOpenStats && (
            <motion.button
              onClick={onOpenStats}
              className={cn(
                'p-2.5 rounded-lg transition-all',
                config.selectorInactive,
                theme === 'dark' ? 'hover:bg-white/10' : isSakura ? 'hover:bg-rose-50' : 'hover:bg-slate-100'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Statistics"
            >
              <BarChart3 className="w-5 h-5" />
            </motion.button>
          )}

          {onOpenSettings && (
            <motion.button
              onClick={onOpenSettings}
              className={cn(
                'p-2.5 rounded-lg transition-all',
                config.selectorInactive,
                theme === 'dark' ? 'hover:bg-white/10' : isSakura ? 'hover:bg-rose-50' : 'hover:bg-slate-100'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
