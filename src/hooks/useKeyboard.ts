import { useEffect, useCallback } from 'react';
import { useStore } from '@/store';

interface UseKeyboardOptions {
  totalCards: number;
  onGrade?: (grade: 0 | 1 | 2 | 3 | 4 | 5) => void;
}

export function useKeyboard({ totalCards, onGrade }: UseKeyboardOptions) {
  const {
    settings,
    toggleFlip,
    nextCard,
    prevCard,
    toggleBookmark,
    selectedWeek,
    selectedDay,
    currentCardIndex,
  } = useStore();

  const generateCurrentCardId = useCallback(() => {
    const weekNum = selectedWeek.replace('Week ', '');
    const dayNum = selectedDay.replace('Day ', '');
    return `${weekNum}-${dayNum}-${currentCardIndex}`;
  }, [selectedWeek, selectedDay, currentCardIndex]);

  useEffect(() => {
    if (!settings.keyboardShortcutsEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          toggleFlip();
          break;
        case 'ArrowRight':
        case 'l':
          e.preventDefault();
          nextCard(totalCards);
          break;
        case 'ArrowLeft':
        case 'h':
          e.preventDefault();
          prevCard(totalCards);
          break;
        case 'b':
          e.preventDefault();
          toggleBookmark(generateCurrentCardId());
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (onGrade) {
            e.preventDefault();
            onGrade(parseInt(e.key) as 1 | 2 | 3 | 4 | 5);
          }
          break;
        case '0':
          if (onGrade) {
            e.preventDefault();
            onGrade(0);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    settings.keyboardShortcutsEnabled,
    toggleFlip,
    nextCard,
    prevCard,
    toggleBookmark,
    totalCards,
    generateCurrentCardId,
    onGrade,
  ]);
}
