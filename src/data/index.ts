import type { KanjiData } from '@/types';
import { week1 } from './week1';
import { week2 } from './week2';
import { week3 } from './week3';
import { week4 } from './week4';
import { week5 } from './week5';
import { week6 } from './week6';
import { week7 } from './week7';
import { week8 } from './week8';

export const kanjiData: KanjiData = {
  "Week 1": week1,
  "Week 2": week2,
  "Week 3": week3,
  "Week 4": week4,
  "Week 5": week5,
  "Week 6": week6,
  "Week 7": week7,
  "Week 8": week8,
};

// Helper functions
export const getWeeks = (): string[] => Object.keys(kanjiData);

export const getDays = (week: string): string[] =>
  Object.keys(kanjiData[week] || {});

export const getCards = (week: string, day: string) =>
  kanjiData[week]?.[day]?.cards || [];

export const getTopic = (week: string, day: string) =>
  kanjiData[week]?.[day]?.topic || '';

export const getTotalCards = (): number => {
  let total = 0;
  for (const week of Object.values(kanjiData)) {
    for (const day of Object.values(week)) {
      total += day.cards.length;
    }
  }
  return total;
};

export const getCardById = (cardId: string) => {
  const [week, day, index] = cardId.split('-');
  const weekKey = `Week ${week}`;
  const dayKey = `Day ${day}`;
  const cards = kanjiData[weekKey]?.[dayKey]?.cards;
  return cards?.[parseInt(index)];
};

export const generateCardId = (week: string, day: string, index: number): string => {
  const weekNum = week.replace('Week ', '');
  const dayNum = day.replace('Day ', '');
  return `${weekNum}-${dayNum}-${index}`;
};

// Re-export individual weeks for lazy loading if needed
export { week1, week2, week3, week4, week5, week6, week7, week8 };
