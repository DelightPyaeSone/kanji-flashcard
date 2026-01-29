import type { KanjiData, KanjiCard } from '@/types';
import { vocabWeek1 } from './week1';
import { vocabWeek2 } from './week2';

// Vocab data uses same structure as Kanji (Week/Day)
export const vocabData: KanjiData = {
  'Week 1': vocabWeek1,
  'Week 2': vocabWeek2,
  // More weeks will be added (Week 3-8)
  // PDF links:
  // Week 3: shorturl.at/szQ04 (Day 1-3), shorturl.at/vOQZ3 (Day 4-6)
  // Week 4: shorturl.at/osvO0 (Day 1-3), shorturl.at/bgFJ3 (Day 4-6)
  // Week 5: shorturl.at/koFJW (Day 1-3), shorturl.at/eBPZ0 (Day 4-6)
  // Week 6: shorturl.at/BNW47 (Day 1-3), shorturl.at/dmxSX (Day 4-6)
  // Week 7: shorturl.at/hGIWX (Day 1-3), shorturl.at/mFH23 (Day 4-6)
  // Week 8: shorturl.at/hoEJ8 (Day 1-3), shorturl.at/asBJQ (Day 4-6)
};

// Helper functions (same as kanji)
export function getVocabWeeks(): string[] {
  return Object.keys(vocabData);
}

export function getVocabDays(week: string): string[] {
  return vocabData[week] ? Object.keys(vocabData[week]) : [];
}

export function getVocabCards(week: string, day: string): KanjiCard[] {
  return vocabData[week]?.[day]?.cards || [];
}

export function getVocabTopic(week: string, day: string): string {
  return vocabData[week]?.[day]?.topic || '';
}

export function generateVocabCardId(week: string, day: string, index: number): string {
  return `vocab-${week}-${day}-${index}`;
}

export function getTotalVocabCards(): number {
  let total = 0;
  for (const week of Object.values(vocabData)) {
    for (const day of Object.values(week)) {
      total += day.cards.length;
    }
  }
  return total;
}
