import { useStore } from '@/store';
import type { Theme } from '@/types';

// Minimalist Kanji Study-inspired theme
// Clean, flat design with subtle accents
export const themeConfig = {
  dark: {
    // Background - flat dark
    bg: 'bg-slate-950',
    // Text colors
    text: 'text-slate-50',
    textMuted: 'text-slate-400',
    textAccent: 'text-cyan-400',
    textSecondary: 'text-slate-300',
    textHighlight: 'text-amber-400',
    // Card styles - flat, minimal
    cardBg: 'bg-slate-900 border border-slate-800',
    cardBgActive: 'bg-cyan-600',
    cardBgHover: 'hover:bg-slate-800',
    cardFrontBg: 'bg-slate-900',
    cardBackBg: 'bg-slate-800',
    // Border
    border: 'border-slate-800',
    borderActive: 'border-cyan-500',
    // Buttons - flat with borders
    buttonPrimary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    buttonSecondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700',
    buttonDanger: 'bg-rose-900/50 text-rose-300 border border-rose-800 hover:bg-rose-900/70',
    buttonSuccess: 'bg-emerald-900/50 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/70',
    buttonGhost: 'bg-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200',
    // Interactive elements
    selectorBg: 'bg-slate-900',
    selectorActive: 'bg-cyan-600 text-white',
    selectorInactive: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800',
    // SRS grades - cleaner colors
    gradeEasy: 'bg-emerald-900/50 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-800',
    gradeGood: 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-300 border border-amber-800',
    gradeHard: 'bg-rose-900/50 hover:bg-rose-900/70 text-rose-300 border border-rose-800',
    // Progress and stats
    progressBg: 'bg-slate-800',
    progressFill: 'bg-cyan-500',
    statBg: 'bg-slate-900 border-slate-800',
    // Footer
    footerText: 'text-slate-500',
    footerMuted: 'text-slate-600',
    keyBg: 'bg-slate-800',
    // Modal
    modalBg: 'bg-slate-900 border-slate-800',
    modalOverlay: 'bg-black/70',
    // Badge
    badgeBg: 'bg-amber-900/50 border-amber-800',
    badgeText: 'text-amber-300',
    // Due count badge
    dueBadge: 'bg-rose-900/50 text-rose-300',
    // Grid/List view
    gridCard: 'bg-slate-900 hover:bg-slate-800 border border-slate-800',
    gridCardActive: 'bg-cyan-900/30 border-cyan-600',
  },
  light: {
    // Background
    bg: 'bg-slate-100',
    // Text colors
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
    textAccent: 'text-cyan-600',
    textSecondary: 'text-slate-600',
    textHighlight: 'text-amber-600',
    // Card styles
    cardBg: 'bg-white border border-slate-200 shadow-sm',
    cardBgActive: 'bg-cyan-500',
    cardBgHover: 'hover:bg-slate-50',
    cardFrontBg: 'bg-white',
    cardBackBg: 'bg-slate-50',
    // Border
    border: 'border-slate-200',
    borderActive: 'border-cyan-500',
    // Buttons
    buttonPrimary: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    buttonSecondary: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300',
    buttonDanger: 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100',
    buttonSuccess: 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100',
    buttonGhost: 'bg-transparent hover:bg-slate-100 text-slate-500',
    // Interactive elements
    selectorBg: 'bg-slate-200',
    selectorActive: 'bg-cyan-500 text-white shadow-sm',
    selectorInactive: 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
    // SRS grades
    gradeEasy: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200',
    gradeGood: 'bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200',
    gradeHard: 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200',
    // Progress and stats
    progressBg: 'bg-slate-200',
    progressFill: 'bg-cyan-500',
    statBg: 'bg-white border-slate-200 shadow-sm',
    // Footer
    footerText: 'text-slate-500',
    footerMuted: 'text-slate-400',
    keyBg: 'bg-slate-200',
    // Modal
    modalBg: 'bg-white border-slate-200 shadow-xl',
    modalOverlay: 'bg-black/40',
    // Badge
    badgeBg: 'bg-amber-100 border-amber-200',
    badgeText: 'text-amber-600',
    // Due count badge
    dueBadge: 'bg-rose-100 text-rose-600',
    // Grid/List view
    gridCard: 'bg-white hover:bg-slate-50 border border-slate-200',
    gridCardActive: 'bg-cyan-50 border-cyan-500',
  },
  sakura: {
    // Background
    bg: 'bg-rose-50',
    // Text colors
    text: 'text-rose-900',
    textMuted: 'text-rose-400',
    textAccent: 'text-rose-600',
    textSecondary: 'text-rose-500',
    textHighlight: 'text-amber-600',
    // Card styles
    cardBg: 'bg-white border border-rose-200 shadow-sm',
    cardBgActive: 'bg-rose-500',
    cardBgHover: 'hover:bg-rose-50',
    cardFrontBg: 'bg-white',
    cardBackBg: 'bg-rose-50',
    // Border
    border: 'border-rose-200',
    borderActive: 'border-rose-500',
    // Buttons
    buttonPrimary: 'bg-rose-500 hover:bg-rose-600 text-white',
    buttonSecondary: 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200',
    buttonDanger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
    buttonSuccess: 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100',
    buttonGhost: 'bg-transparent hover:bg-rose-100 text-rose-500',
    // Interactive elements
    selectorBg: 'bg-rose-100',
    selectorActive: 'bg-rose-500 text-white shadow-sm',
    selectorInactive: 'text-rose-400 hover:text-rose-600 hover:bg-rose-100',
    // SRS grades
    gradeEasy: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200',
    gradeGood: 'bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200',
    gradeHard: 'bg-rose-100 hover:bg-rose-200 text-rose-600 border border-rose-300',
    // Progress and stats
    progressBg: 'bg-rose-200',
    progressFill: 'bg-rose-500',
    statBg: 'bg-white border-rose-200 shadow-sm',
    // Footer
    footerText: 'text-rose-400',
    footerMuted: 'text-rose-300',
    keyBg: 'bg-rose-100',
    // Modal
    modalBg: 'bg-white border-rose-200 shadow-xl',
    modalOverlay: 'bg-black/40',
    // Badge
    badgeBg: 'bg-amber-100 border-amber-200',
    badgeText: 'text-amber-600',
    // Due count badge
    dueBadge: 'bg-rose-200 text-rose-600',
    // Grid/List view
    gridCard: 'bg-white hover:bg-rose-50 border border-rose-200',
    gridCardActive: 'bg-rose-100 border-rose-500',
  },
} as const;

export type ThemeConfig = typeof themeConfig[Theme];

export function useTheme() {
  const theme = useStore((state) => state.settings.theme);
  const setTheme = useStore((state) => state.setTheme);
  const config = themeConfig[theme];

  return {
    theme,
    setTheme,
    config,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isSakura: theme === 'sakura',
  };
}
