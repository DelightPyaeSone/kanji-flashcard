import type { VocabData, VocabCard } from '@/types';
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';

export const vocabData: VocabData = {
  'Chapter 1': chapter1,
  'Chapter 2': chapter2,
  // More chapters will be added later
};

// Helper functions
export function getVocabChapters(): string[] {
  return Object.keys(vocabData);
}

export function getVocabSections(chapter: string): string[] {
  return vocabData[chapter] ? Object.keys(vocabData[chapter]) : [];
}

export function getVocabCards(chapter: string, section: string): VocabCard[] {
  return vocabData[chapter]?.[section]?.cards || [];
}

export function getVocabSectionTitle(chapter: string, section: string): string {
  return vocabData[chapter]?.[section]?.title || '';
}

export function getVocabVideoUrl(chapter: string, section: string): string | undefined {
  return vocabData[chapter]?.[section]?.videoUrl;
}

export function generateVocabCardId(chapter: string, section: string, index: number): string {
  return `vocab-${chapter}-${section}-${index}`;
}

export function getTotalVocabCards(): number {
  let total = 0;
  for (const chapter of Object.values(vocabData)) {
    for (const section of Object.values(chapter)) {
      total += section.cards.length;
    }
  }
  return total;
}
