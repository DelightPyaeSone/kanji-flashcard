import type { KanjiData, KanjiCard } from '@/types';
import { vocabWeek1 } from './week1';
import { vocabWeek2 } from './week2';
import { vocabWeek3 } from './week3';
import { vocabWeek4 } from './week4';
import { vocabWeek5 } from './week5';
import { vocabWeek6 } from './week6';
import { vocabWeek7 } from './week7';
import { vocabWeek8 } from './week8';

// N2 Sōmatome Vocabulary - Osaka City Japanese Language Center
// Week 1: 楽しく暮らしていますか？ (Are you living happily?)
// Week 2: 仕事は順調ですか？ (Is your work going smoothly?)
// Week 3: いろいろ表現しましょう (Let's express various things)
// Week 4: 副詞をたっぷり覚えましょう (Let's learn lots of adverbs)
// Week 5: 漢字の言葉を覚えましょう (Let's learn kanji words)
// Week 6: まとめて覚えましょう① (Let's memorize together 1)
// Week 7: まとめて覚えましょう② (Let's memorize together 2)
// Week 8: まとめて覚えましょう③ (Let's memorize together 3)

export const vocabData: KanjiData = {
  'Week 1': vocabWeek1,
  'Week 2': vocabWeek2,
  'Week 3': vocabWeek3,
  'Week 4': vocabWeek4,
  'Week 5': vocabWeek5,
  'Week 6': vocabWeek6,
  'Week 7': vocabWeek7,
  'Week 8': vocabWeek8,
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
