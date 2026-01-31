import { BookOpen, MessageSquareText, BarChart3, Settings, Home } from 'lucide-react';
import type { AppMode } from '@/types';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

type NavTab = 'home' | 'kanji' | 'vocab' | 'stats' | 'settings';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenStats: () => void;
}

const tabs: { id: NavTab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'kanji', label: '漢字', icon: BookOpen },
  { id: 'vocab', label: '単語', icon: MessageSquareText },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
];

export function BottomNav({ activeTab, onTabChange, onOpenStats }: BottomNavProps) {
  const { config, isDark } = useTheme();

  const handleTabClick = (tab: NavTab) => {
    if (tab === 'stats') {
      onOpenStats();
    } else {
      onTabChange(tab);
    }
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'border-t',
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      )}
    >
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id || (id === 'stats' && false);
          return (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full',
                'transition-colors',
                isActive ? config.textAccent : config.textMuted
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
