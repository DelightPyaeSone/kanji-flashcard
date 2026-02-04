import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookmarkX, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';
import { useStore } from '@/store';
import { getKanjiCardWithInfo } from '@/data';
import { getVocabCardById } from '@/data/vocab';
import type { KanjiCard } from '@/types';

interface BookmarkItem {
  id: string;
  card: KanjiCard;
  week: string;
  day: string;
  type: 'kanji' | 'vocab';
}

export function BookmarkedCards() {
  const { config, isDark } = useTheme();
  const { bookmarkedCards, toggleBookmark } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'kanji' | 'vocab'>('all');

  // Resolve bookmarked card IDs to actual card data
  const bookmarks: BookmarkItem[] = bookmarkedCards
    .map((id) => {
      if (id.startsWith('vocab-')) {
        const result = getVocabCardById(id);
        if (!result) return null;
        return { id, card: result.card, week: result.week, day: result.day, type: 'vocab' as const };
      } else {
        const result = getKanjiCardWithInfo(id);
        if (!result) return null;
        return { id, card: result.card, week: result.week, day: result.day, type: 'kanji' as const };
      }
    })
    .filter((b): b is BookmarkItem => b !== null);

  const filtered = filter === 'all' ? bookmarks : bookmarks.filter(b => b.type === filter);

  const kanjiCount = bookmarks.filter(b => b.type === 'kanji').length;
  const vocabCount = bookmarks.filter(b => b.type === 'vocab').length;

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">🔖</div>
        <h2 className={cn('text-lg font-medium mb-2', config.text)}>No Saved Cards</h2>
        <p className={cn('text-sm', config.textMuted)}>
          Tap the bookmark icon on any card to save it here
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h2 className={cn('text-xl font-bold mb-4', config.text)}>
        Saved Cards ({bookmarks.length})
      </h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all' as const, label: `All (${bookmarks.length})` },
          { key: 'kanji' as const, label: `漢字 (${kanjiCount})` },
          { key: 'vocab' as const, label: `単語 (${vocabCount})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm transition-colors',
              filter === key
                ? isDark ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-white'
                : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Card List */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={cn(
                  'rounded-xl border overflow-hidden',
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                )}
              >
                {/* Card Header - Always Visible */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className={cn(
                    'w-full p-3 flex items-center justify-between',
                    'transition-colors',
                    isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Kanji/Word */}
                    <div className={cn(
                      'text-2xl font-bold min-w-[3rem] text-center',
                      config.text
                    )}>
                      {'kanji' in item.card ? item.card.kanji : (item.card as KanjiCard).kanji}
                    </div>

                    {/* Info */}
                    <div className="text-left">
                      <div className={cn('text-sm', config.textMuted)}>
                        {item.card.reading}
                      </div>
                      <div className={cn('text-xs', config.textMuted)}>
                        <span className={cn(
                          'inline-block px-1.5 py-0.5 rounded text-[10px] mr-1',
                          item.type === 'kanji'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-purple-500/20 text-purple-400'
                        )}>
                          {item.type === 'kanji' ? '漢字' : '単語'}
                        </span>
                        {item.week} • {item.day}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={cn(
                    'w-4 h-4 transition-transform',
                    config.textMuted,
                    isExpanded && 'rotate-90'
                  )} />
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={cn(
                      'px-4 pb-3 border-t',
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    )}
                  >
                    <div className="pt-3 space-y-2">
                      <div>
                        <span className={cn('text-xs', config.textMuted)}>Meaning</span>
                        <p className={cn('text-sm', config.text)}>{item.card.meaning}</p>
                      </div>
                      <div>
                        <span className={cn('text-xs', config.textMuted)}>Myanmar</span>
                        <p className={cn('text-sm', config.text)}>{item.card.myanmar}</p>
                      </div>

                      {/* Remove Bookmark */}
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={cn(
                          'flex items-center gap-1.5 text-xs mt-2 px-2 py-1 rounded-lg',
                          'text-red-400 hover:bg-red-500/10 transition-colors'
                        )}
                      >
                        <BookmarkX className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
