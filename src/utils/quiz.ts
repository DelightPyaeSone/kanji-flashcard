import type { KanjiCard, VocabCard } from '@/types';

// Shuffle array
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random items from array (excluding specific index)
export function getRandomItems<T>(array: T[], count: number, excludeIndex?: number): T[] {
  const filtered = excludeIndex !== undefined
    ? array.filter((_, i) => i !== excludeIndex)
    : array;

  const shuffled = shuffle(filtered);
  return shuffled.slice(0, count);
}

// Generate quiz choices for Kanji card
export function generateKanjiQuizChoices(
  correctCard: KanjiCard,
  allCards: KanjiCard[],
  correctIndex: number
): { text: string; isCorrect: boolean }[] {
  // Get 3 random wrong answers
  const wrongCards = getRandomItems(allCards, 3, correctIndex);

  const choices = [
    { text: correctCard.myanmar, isCorrect: true },
    ...wrongCards.map(card => ({ text: card.myanmar, isCorrect: false }))
  ];

  return shuffle(choices);
}

// Generate quiz choices for Vocab card
export function generateVocabQuizChoices(
  correctCard: VocabCard,
  allCards: VocabCard[],
  correctIndex: number
): { text: string; isCorrect: boolean }[] {
  // Get 3 random wrong answers
  const wrongCards = getRandomItems(allCards, 3, correctIndex);

  const choices = [
    { text: correctCard.myanmar, isCorrect: true },
    ...wrongCards.map(card => ({ text: card.myanmar, isCorrect: false }))
  ];

  return shuffle(choices);
}

// Quiz result type
export interface QuizResult {
  correct: number;
  total: number;
  percentage: number;
}

// Calculate quiz result
export function calculateQuizResult(correct: number, total: number): QuizResult {
  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
  };
}
