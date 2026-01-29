import type { SRSCardData, SRSGrade } from '@/types';

/**
 * SM-2 Algorithm Implementation for Spaced Repetition
 * Based on the SuperMemo 2 algorithm
 */

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export function createInitialSRSData(cardId: string): SRSCardData {
  return {
    cardId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    lastReviewDate: new Date().toISOString(),
  };
}

export function calculateNextReview(
  card: SRSCardData,
  grade: SRSGrade
): SRSCardData {
  let { easeFactor, interval, repetitions } = card;

  // Grade 0-2: Complete failure, reset
  if (grade < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    // Grade 3-5: Successful recall
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < MIN_EASE_FACTOR) {
    easeFactor = MIN_EASE_FACTOR;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    cardId: card.cardId,
    easeFactor,
    interval,
    repetitions,
    nextReviewDate: nextReviewDate.toISOString(),
    lastReviewDate: new Date().toISOString(),
  };
}

export function isDue(card: SRSCardData): boolean {
  return new Date(card.nextReviewDate) <= new Date();
}

export function getDueCards(srsData: Record<string, SRSCardData>): string[] {
  return Object.values(srsData)
    .filter(isDue)
    .sort((a, b) =>
      new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime()
    )
    .map((card) => card.cardId);
}

export function getGradeLabel(grade: SRSGrade): string {
  const labels: Record<SRSGrade, string> = {
    0: 'မသိဘူး',
    1: 'မမှတ်မိဘူး',
    2: 'ခက်တယ်',
    3: 'မှန်ပေမယ့် ခက်တယ်',
    4: 'မှန်တယ်',
    5: 'လွယ်တယ်',
  };
  return labels[grade];
}

export function getGradeColor(grade: SRSGrade): string {
  const colors: Record<SRSGrade, string> = {
    0: 'bg-red-500',
    1: 'bg-red-400',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-green-400',
    5: 'bg-green-500',
  };
  return colors[grade];
}
