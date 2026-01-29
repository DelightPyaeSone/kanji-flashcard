import { useStore } from '@/store';
import type { Theme } from '@/types';

export const themeConfig = {
  dark: {
    // Background
    bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    // Text colors
    text: 'text-white',
    textMuted: 'text-white/60',
    textAccent: 'text-purple-300',
    textSecondary: 'text-cyan-300',
    textHighlight: 'text-yellow-300',
    // Card styles
    cardBg: 'bg-white/10 backdrop-blur-xl',
    cardBgActive: 'bg-gradient-to-r from-pink-500 to-purple-500',
    cardBgHover: 'hover:bg-white/20',
    cardFrontBg: 'bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30',
    cardBackBg: 'bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-indigo-500/30',
    // Border
    border: 'border-white/10',
    borderActive: 'border-purple-400/30',
    // Buttons
    buttonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30',
    buttonSecondary: 'bg-white/10 text-white hover:bg-white/20',
    buttonDanger: 'bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/30',
    buttonSuccess: 'bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30',
    buttonGhost: 'bg-transparent hover:bg-white/10 text-white/70',
    // Interactive elements
    selectorBg: 'bg-white/5',
    selectorActive: 'bg-white/20 text-white',
    selectorInactive: 'text-white/50 hover:text-white/80',
    // SRS grades
    gradeEasy: 'bg-green-500/20 hover:bg-green-500/30 text-green-300',
    gradeGood: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300',
    gradeHard: 'bg-red-500/20 hover:bg-red-500/30 text-red-300',
    // Progress and stats
    progressBg: 'bg-white/10',
    statBg: 'bg-white/5 border-white/10',
    // Footer
    footerText: 'text-purple-300/40',
    footerMuted: 'text-purple-300/50',
    keyBg: 'bg-white/5',
    // Modal
    modalBg: 'bg-slate-900/95 border-white/10',
    modalOverlay: 'bg-black/60',
    // Badge
    badgeBg: 'bg-orange-500/20 border-orange-400/30',
    badgeText: 'text-orange-300',
    // Due count badge
    dueBadge: 'bg-red-500/30 text-red-300',
  },
  light: {
    // Background
    bg: 'bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100',
    // Text colors
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
    textAccent: 'text-purple-700',
    textSecondary: 'text-cyan-600',
    textHighlight: 'text-amber-700',
    // Card styles
    cardBg: 'bg-white/70 shadow-lg backdrop-blur-xl',
    cardBgActive: 'bg-gradient-to-r from-purple-500 to-pink-500',
    cardBgHover: 'hover:bg-white/90',
    cardFrontBg: 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100',
    cardBackBg: 'bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100',
    // Border
    border: 'border-slate-200',
    borderActive: 'border-purple-400/50',
    // Buttons
    buttonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30',
    buttonSecondary: 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-200',
    buttonDanger: 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200',
    buttonSuccess: 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200',
    buttonGhost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    // Interactive elements
    selectorBg: 'bg-slate-200/60',
    selectorActive: 'bg-white text-purple-600 shadow-sm',
    selectorInactive: 'text-slate-500 hover:text-slate-700',
    // SRS grades
    gradeEasy: 'bg-green-100 hover:bg-green-200 text-green-700 border border-green-300',
    gradeGood: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300',
    gradeHard: 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-300',
    // Progress and stats
    progressBg: 'bg-slate-200',
    statBg: 'bg-white/80 border-slate-200 shadow-sm',
    // Footer
    footerText: 'text-slate-500',
    footerMuted: 'text-slate-400',
    keyBg: 'bg-slate-200',
    // Modal
    modalBg: 'bg-white border-slate-200 shadow-2xl',
    modalOverlay: 'bg-black/40',
    // Badge
    badgeBg: 'bg-orange-100 border-orange-200',
    badgeText: 'text-orange-600',
    // Due count badge
    dueBadge: 'bg-red-100 text-red-600',
  },
  sakura: {
    // Background
    bg: 'bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50',
    // Text colors
    text: 'text-rose-900',
    textMuted: 'text-rose-400',
    textAccent: 'text-rose-600',
    textSecondary: 'text-pink-600',
    textHighlight: 'text-amber-700',
    // Card styles
    cardBg: 'bg-white/70 shadow-lg backdrop-blur-xl',
    cardBgActive: 'bg-gradient-to-r from-rose-400 to-pink-500',
    cardBgHover: 'hover:bg-white/90',
    cardFrontBg: 'bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200',
    cardBackBg: 'bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200',
    // Border
    border: 'border-rose-200',
    borderActive: 'border-rose-400/50',
    // Buttons
    buttonPrimary: 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-500/30',
    buttonSecondary: 'bg-white text-rose-700 hover:bg-rose-50 shadow-sm border border-rose-200',
    buttonDanger: 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200',
    buttonSuccess: 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200',
    buttonGhost: 'bg-transparent hover:bg-rose-50 text-rose-600',
    // Interactive elements
    selectorBg: 'bg-rose-200/50',
    selectorActive: 'bg-white text-rose-600 shadow-sm',
    selectorInactive: 'text-rose-400 hover:text-rose-600',
    // SRS grades
    gradeEasy: 'bg-green-100 hover:bg-green-200 text-green-700 border border-green-300',
    gradeGood: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300',
    gradeHard: 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-300',
    // Progress and stats
    progressBg: 'bg-rose-200/50',
    statBg: 'bg-white/80 border-rose-200 shadow-sm',
    // Footer
    footerText: 'text-rose-400',
    footerMuted: 'text-rose-300',
    keyBg: 'bg-rose-100',
    // Modal
    modalBg: 'bg-white border-rose-200 shadow-2xl',
    modalOverlay: 'bg-black/40',
    // Badge
    badgeBg: 'bg-orange-100 border-orange-200',
    badgeText: 'text-orange-600',
    // Due count badge
    dueBadge: 'bg-red-100 text-red-600',
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
